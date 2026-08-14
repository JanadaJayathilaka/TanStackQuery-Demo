import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"

const fetchPostDetails = (postId) => {
    return axios.get(`http://localhost:4000/posts/${postId}`)
}

const PostDetailsRQ = () => {

    const { postId } = useParams()


    const { data, isLoading, isError, error, } = useQuery({
        queryKey: ["posts", postId],
        queryFn: () => fetchPostDetails(postId),
    })

    const { title, body } = data?.data || {}

    if (isLoading) {
        return <p className="text-center text-gray-500">Chargement...</p>
    }
    if (isError) {
        return <p className="text-center text-red-500">{error.message}</p>
    }

    return (
        <div className="post-details-container">
            <div className="post-details-title">{title}</div>
            <div className="post-details-body">{body}</div>
        </div>
    )
}

export default PostDetailsRQ