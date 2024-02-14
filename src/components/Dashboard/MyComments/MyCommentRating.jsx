"use client"
import ReactStars from "react-stars";
import React from 'react'

const MyCommentRating = ({ rating }) => {
    return (
        <div className="select-none">
            <ReactStars
                count={5}
                size={25}
                value={rating}
                color2="#ffd700"
                edit={false}
            />
        </div>
    )
}

export default MyCommentRating