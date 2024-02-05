"use client"

import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CollectionButton = ({ anime_mal_id, user_email, anime_image, anime_title }) => {
    const [isCreated, setIsCreated] = useState(false)

    const handleCollection = async (event) => {
        event.preventDefault()

        const data = { anime_mal_id, user_email, anime_image, anime_title }

        const response = await fetch("/api/v1/collection", {
            method: "POST",
            body: JSON.stringify(data)
        })
        const collection = await response.json()
        if (collection.isCreated) {
            setIsCreated(true)
            toast.success('Success Added to My Collection', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        return
    }

    return (
        <>
        <div></div>
            {
                isCreated 
                ? 
                <ToastContainer />
                :
                <div className='flex items-center justify-center'>
                    <button
                        onClick={handleCollection}
                        className="px-2 py-1 mt-2 bg-color-blue rounded-lg  hover:bg-color-lime transition duration-400 ease-in ">
                        Add To Collection
                    </button>
                </div>
                
                }
        </>
    )
}

export default CollectionButton