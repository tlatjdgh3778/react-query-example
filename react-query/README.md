### isLoading vs isFetching

`isFetching` 은 아직 비동기 쿼리의 여부에 따라서 true/false 로 나누어진다.

`isLoading` 은 캐시된 데이터가 없고, 이 쿼리를 만든 적이 없다는 뜻이다. 로딩 여부에 따라서 true/false 로 나누어진다.

=> `isLoading` 은 첫 번쨰 쿼리를 가져올 때(캐시된 데이터X) `isFetching` 은 캐시된 데이터가 있거나 없거나 데이터를 요청 중일 때를 말한다.

### staletime

데이터 리페칭은 stale한 상태에서 실행된다.(또는 윈도우 포커스, 컴포넌트가 마운트 될 때)

데이터의 성격에 따라 `staleTime`을 지정한다.

### cacheTime

나중에 필요할 수도 있는 데이터

`cacheTime` 의 시간이 지나면 GC에서 처리

데이터가 캐시에 있는 동안에는 페칭할 때 사용할 수 있다.
