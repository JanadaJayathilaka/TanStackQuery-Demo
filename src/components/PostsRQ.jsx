import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const PostsRQ = () => {

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: () => {
            return axios.get('http://localhost:4000/posts')
        },
        enabled: false,

    })
    if (isLoading) {
        return <p className="text-center text-gray-500">Chargement...</p>
    }
    if (isError) {
        return <p className="text-center text-red-500">{error.message}</p>
    }

    console.log(isLoading, isFetching)
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Posts RQ</h1>
            <button onClick={() => refetch()} className="px-4 py-2 bg-blue-500 text-white rounded">Refetch</button>
            {data?.data && (
                <ul className="space-y-2">
                    {data?.data?.map((post) => (

                        <Link 
                            to={`/rq-posts/${post.id}`} 
                            key={post.id} 
                            style={{ color: 'white', textDecoration: 'none' }} 
                            className="p-2 bg-red-100 rounded block"
                        >
                            <div>
                                {post.title} <br />
                                {post.body}
                            </div>
                        </Link>

                    ))}
                </ul>
            )}
        </div>

    )
}

export default PostsRQ