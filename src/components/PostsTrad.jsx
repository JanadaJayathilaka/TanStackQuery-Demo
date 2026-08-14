import axios from "axios"
import { useEffect, useState } from "react"

function PostsTrad() {

    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/posts')
            setPosts(response.data)
        } catch (error) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }



    useEffect(() => {
        fetchPosts()
    }, [])

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading...</p>
    }
    if (isError) {
        return <p className="text-center text-red-500">Error while fetching posts</p>
    }


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Posts Tradicionnels</h1>

            {isLoading && <p className="text-center text-gray-500">Loading...</p>}

            {isError && <p className="text-center text-red-500">Error while fetching posts</p>}

            {posts && (
                <ul className="space-y-2">
                    {posts.map((post) => (
                        <li key={post.id} className="p-2 bg-gray-100 rounded">
                            {post.title} <br />
                            {post.body}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default PostsTrad