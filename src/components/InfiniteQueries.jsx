import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"


const fetchFruits = ({ pageParam }) => {
    return axios.get(`http://localhost:4000/fruits?_page=${pageParam}&_per_page=4`)
}

const InfiniteQueries = () => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam: 1,
        getNextPageParam: (_lastPage, allPages) => {
            if (allPages.length < 5) {
                return allPages.length + 1
            } else {
                return undefined
            }
        }
    })

    console.log(data)

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div>
            <h1>InfiniteQueries</h1>
            {data?.pages?.map(page => (
                page.data?.data.map(fruit => (
                    <div key={fruit.id} className='fruit-item'>{fruit.name}</div>
                ))
            ))}
            <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>Fetch Next Page</button>
        </div>
    )
}

export default InfiniteQueries