import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'


const fetchFruits = async (pageId) => {
    const response = await axios.get(`http://localhost:4000/fruits?_page=${pageId}&_per_page=4`);
    // json-server v1 returns { first, prev, next, items, data: [...] }
    // Normalize so response.data is always the array of items
    const items = Array.isArray(response.data) ? response.data : response.data.data;
    return { ...response, data: items };
}

const PaginatedQueries = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["fruits", page],
        queryFn: () => fetchFruits(page),
        placeholderData: keepPreviousData,
    })

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className='container'>
            {data?.data?.map(item => (
                <div key={item.id} className='fruit-label'>{item.name}</div>
            ))}
            <div className="mt-4 space-x-2">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
                >
                    Prev Page
                </button>
                <span className="mx-2 text-white">Page {page}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={data?.data?.length < 4}
                    className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
                >
                    Next Page
                </button>
            </div>
        </div>
    )
}

export default PaginatedQueries