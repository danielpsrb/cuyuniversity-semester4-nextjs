"use client"
import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Swal from "sweetalert2";


const LikedButton = ({ commentId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // useEffect(() => {
  //   const fetchLikesCount = async () => {
  //     try {
  //       const response = await fetch(`/api/v1/likes/${commentId}`);
  //       const data = await response.json();
  //       setLikesCount(data.likes);
  //     } catch (error) {
  //       console.error('Error fetching likes:', error);
  //     }
  //   };
  //   fetchLikesCount();
  // }, [commentId]);

  const handleLiked = (e) => {
    e.preventDefault();
    Swal.fire({
      text: "Sorry, Liked Comment feature is not Currently Available, because it is still in the development stage",
      icon: "error",
      confirmButtonColor: "#3085d6",
    })
    return setLiked(!liked);
    // You can also implement logic here to send a request to like/unlike the comment
  }

  return (
    <>
      <div className="absolute bottom-0 right-0 mb-2 mr-2">
        <button onClick={handleLiked}>
          {liked ? <AiFillHeart className='text-color-red' size={20} /> : <AiOutlineHeart className='text-color-primary' size={20} />}
        </button>
        <span className='text-color-primary'>{likesCount}</span>
      </div>
    </>
  )
}

export default LikedButton;
