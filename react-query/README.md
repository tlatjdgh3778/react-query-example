### isLoading vs isFetching

`isFetching` 은 아직 비동기 쿼리의 여부에 따라서 true/false 로 나누어진다.

`isLoading` 은 캐시된 데이터가 없고, 이 쿼리를 만든 적이 없다는 뜻이다. 로딩 여부에 따라서 true/false 로 나누어진다.

=> `isLoading` 은 첫 번쨰 쿼리를 가져올 때(캐시된 데이터X) `isFetching` 은 캐시된 데이터가 있거나 없거나 데이터를 요청 중일 때를 말한다.
