"use client"

import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Modal from './ModalEditComment';
import axios from 'axios';
import Swal from 'sweetalert2';
import StarRating from '@/components/AnimeList/StarRating';

const EditBtn = ({ comment }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);
    const router = useRouter();

    const handleEditClick = () => {
        setEditedComment(comment); // Set nilai awal komentar yang akan diedit
        setEditModalOpen(true);
    };

    const handleSaveEdit = async () => {
        if (editedComment.comment.length < 3) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "New Comments must contain at least 3 letters",
            });
            return;
        }

        try {
            // Lakukan permintaan PATCH untuk memperbarui komentar
            await axios.patch(`/api/v1/comment/${editedComment.id}`, {
                comment: editedComment.comment,
                rating: editedComment.rating
                // Tambahkan field lain yang ingin Anda perbarui di objek komentar seperti yang diperlukan
            });
            router.refresh();
            setEditModalOpen(false); // Tutup modal setelah berhasil mengedit komentar
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
        setEditedComment(null);
    };

    return (
        <>
            <button className='text-color-darkcyan' onClick={handleEditClick}>
                <FaEdit title='Edit Comment' />
            </button>
            <Modal isOpen={editModalOpen} onClose={handleCloseModal}>
                {/* Modal Content for Editing Comment */}
                <StarRating value={editedComment?.rating} onChange={(newRating) => setEditedComment({ ...editedComment, rating: newRating })} /> {/* Add StarRating component */}
                <textarea
                    value={editedComment?.comment}
                    onChange={(e) => setEditedComment({ ...editedComment, comment: e.target.value })}
                    className="focus:outline-none h-auto shadow-md border-4 border-color-gainsboro hover:border-color-deepskyblue transition duration-700 ease-in-out active:border-color-deepskyblue active:border-4 text-color-black editComment"
                />
                <button onClick={handleSaveEdit} className="bg-color-lightblue text-color-primary text-[16px] px-4 py-2 rounded-lg hover:bg-color-blue transition-all duration-300 ease-in active:bg-color-purple mt-4">Save</button>
                <button onClick={handleCloseModal} className="bg-color-primary text-color-black border text-[16px] border-color-darkgray px-4 py-2 rounded-lg hover:bg-color-black hover:text-color-primary mt-2 ml-4">Cancel</button>
            </Modal>
        </>
    )
}

export default EditBtn;