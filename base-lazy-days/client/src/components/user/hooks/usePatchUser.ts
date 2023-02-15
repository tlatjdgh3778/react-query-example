import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
// eslint-disable-next-line import/no-unresolved
import { useCustomToast } from 'components/app/hooks/useCustomToast';
import jsonpatch from 'fast-json-patch';
// eslint-disable-next-line import/no-unresolved
import { queryKeys } from 'react-query/constants';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { useUser } from './useUser';

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
}

// TODO: update type to UseMutateFunction type
export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const { user, updateUser } = useUser();
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const { mutate: patchUser } = useMutation(
    (newUserData: User) => patchUserOnServer(newUserData, user),
    {
      onMutate: async (newData: User | null) => {
        // 쿼리 취소
        // 낙관적 업데이트를 덮어쓰지 않게
        queryClient.cancelQueries(queryKeys.user);
        // 기존 사용자 데이터의 스냅샷을 찍음(가져옴)
        const prevUserData: User = queryClient.getQueryData(queryKeys.user);
        // 새로운 값으로 캐시를 업데이트(낙관적 업데이트)
        updateUser(newData);
        // 이후 해당 컨텍스트를 반환한다.
        return { prevUserData };
      },
      // onError가 위에서 반환한 컨텍스트를 받음
      onError: (error, newData, context) => {
        // 롤백한다.
        if (context.prevUserData) {
          updateUser(context.prevUserData);
          toast({
            title: '업데이트에 실패해서 이전 데이터를 보여줍니다.',
            status: 'warning',
          });
        }
      },
      onSuccess: (userData: User | null) => {
        updateUser(userData);
        if (user) {
          toast({
            title: 'User updated!',
            status: 'success',
          });
        }
      },
      // 무조건 실행되는 부분
      onSettled: () => {
        // 쿼리 무효화 후 서버에서 최신 데이터를 받아오는 부분
        queryClient.invalidateQueries(queryKeys.user);
      },
    },
  );
  return patchUser;
}
