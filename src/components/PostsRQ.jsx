import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'


const fetchPosts = () => {
    return axios.get('http://localhost:4000/posts')
}


const addPost = (post) => {
    return axios.post('http://localhost:4000/posts', post)
}
const PostsRQ = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");


    const queryClient = useQueryClient()

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    })
    const { mutate: addPostMutation } = useMutation({
        mutationFn: addPost,
        onSuccess: (newData) => {
            // queryClient.invalidateQueries("posts")
            queryClient.setQueryData(["posts"], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, newData.data]
                }
            })
        }

    })

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({ title, body });

        const post = { title, body }
        addPostMutation(post)
        setTitle("");
        setBody("");
    }
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
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter post title'
                    value={title}
                />
                <input
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='Enter post body'
                    value={body}
                />
                <button type='submit'>Post</button>
            </form>
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