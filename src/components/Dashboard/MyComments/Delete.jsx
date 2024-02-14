"use client"
import React from 'react';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteBtn = ({ commentId }) => {
    const router = useRouter();
    const handleDeleteClick = async () => {
        try {
            await axios.delete(`/api/v1/comment/${commentId}`);
            router.refresh();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <button className='ml-3 text-color-orangered' onClick={handleDeleteClick}>
            <FaTrash title='Delete Comment' />
        </button>
    );
};

export default DeleteBtn;