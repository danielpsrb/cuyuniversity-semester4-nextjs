import React, { useState } from 'react'
import showComments from '@/app/users/dashboard/comment/page'
import Header from '../Dashboard/Header'

const MyComment = () => {

    const [comments, setComments] = useState([])

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const data = await showComments()
                setComments(data)
            } catch (error) {
                console.error('Error fetching comments:', error)
            }
        };
        fetchData()
    }, [])

    return (
        <div>
            <h2>User Comments</h2>
            {comments.map(comment => (
                <div key={comment.id}>
                <p>Comment: {comment.comment}</p>
                <p>Rating: {comment.rating}</p>
                {/* Tambahkan detail lainnya sesuai kebutuhan */}
                </div>
            ))}
        </div>

    )
}

export default MyComment