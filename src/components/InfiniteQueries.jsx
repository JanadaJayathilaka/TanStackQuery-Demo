import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const fetchFruits = async ({ pageParam = 1 }) => {
    const response = await axios.get(`http://localhost:4000/fruits?_page=${pageParam}&_per_page=10`)
    return response.data
}

const InfiniteQueries = () => {
    const { 
        data, 
        isLoading, 
        isError, 
        error, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useInfiniteQuery({
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.next ?? undefined
        }
    })

    const { ref, inView } = useInView({})

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView, hasNextPage])

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className="container">
            <h1>InfiniteQueries</h1>
            {data?.pages?.map((page) => (
                page.data.map((fruit) => (
                    <div key={fruit.id} className="fruit-item">{fruit.name}</div>
                ))
            ))}

            <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
                {isFetchingNextPage && <p>Loading more fruits...</p>}
                {!hasNextPage && <p>You have reached the end!</p>}
            </div>
        </div>
    )
}

export default InfiniteQueries