"use client"
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import ReactStars from 'react-stars';
import Image from 'next/image';
import { format } from 'date-fns';
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';
import { authUserSession } from '@/libs/auth-libs';
import Modal from './ModalEditComment';
import StarRating from './StarRating';
import Swal from 'sweetalert2';

const fetcher = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`);
    }

    const data = await response.json();
    return data.comments;
};

const CommentBox = ({ anime_mal_id }) => {

    const [user, setUser] = useState(null); // State to hold user authentication status
    const [isLoadingUser, setLoadingUser] = useState(true); // State to track loading user data
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedComment, setEditedComment] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getUserSession = async () => {
            try {
                const userSession = await authUserSession();
                setUser(userSession);
            } catch (error) {
                console.error('Error fetching user session:', error);
            } finally {
                setLoadingUser(false);
            }
        };

        getUserSession();
    }, []);
    
    // Buat URL dengan anime_mal_id sebagai query parameter
    const apiUrl = `/api/v1/comment?anime_mal_id=${anime_mal_id}`;
    const { data: comments, error, isLoading } = useSWR(apiUrl, fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 2000 
    });

    if (error) return <div>Error fetching comments: {error.message}</div>;

    if (isLoading || isLoadingUser) return <div>Loading...</div>;

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`/api/v1/comment/${id}`);
            router.refresh();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEditClick = (comment) => {
        setEditedComment(comment);
        setEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
        setEditedComment(null);
    };

    const handleSaveEdit = async (editedCommentData) => {

        if (editedCommentData.comment.length < 3) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Comments must contain at least 3 letters.",
            });
            return;
        }
        try {
            // Make a PATCH request to update the comment
            await axios.patch(`/api/v1/comment/${editedCommentData.id}`, {
                comment: editedCommentData.comment,
                rating: editedCommentData.rating
                // Add other fields you want to update in the comment object as needed
            });
            router.refresh();
            handleCloseModal(); // Close the modal after successfully updating the comment
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {comments &&
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className='text-color-dark border-2 border-color-aquamarine bg-color-secondary p-4 rounded-lg shadow-xl relative'
                    >
                        <div className='absolute top-0 right-0 p-2 cursor-pointer'>
                            {user && (
                                <>
                                    <button className='text-color-darkcyan' onClick={() => handleEditClick(comment)}>
                                        <FaEdit title='Edit Comment' />
                                    </button>
                                    <button
                                        className='ml-3 text-color-orangered'
                                        onClick={() => handleDeleteClick(comment.id)}
                                    >
                                        <FaTrash title='Delete Comment' />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className='mb-2'>
                            <p className='text-color-lavender text-sm'>
                                {format(new Date(comment.date), 'HH:mm, EEEE, MMMM d, yyyy')}
                            </p>
                        </div>
                        <div className='flex flex-row justify-between items-center mb-3'>
                            <div className='flex flex-row items-center'>
                                <Image
                                    src={comment.user.image || '/user.png'}
                                    width={45}
                                    height={45}
                                    className='object-cover rounded-full mr-2'
                                />
                                <p className='text-color-gainsboro font-semibold'>{comment.username}</p>
                            </div>
                            <ReactStars count={5} size={24} value={comment.rating} color2={'#ffd700'} edit={false} />
                        </div>
                        <p className='text-color-light overflow-hidden' style={{ wordWrap: 'break-word' }}>
                            {comment.comment}
                        </p>
                    </div>
                ))}
            {/* Render Edit Modal */}
            <Modal isOpen={editModalOpen} onClose={handleCloseModal}>
                {/* Modal Content for Editing Comment */}
                <StarRating onChange={(newRating) => setEditedComment({ ...editedComment, rating: newRating })} /> {/* Add StarRating component */}
                <textarea
                    value={editedComment?.comment}
                    onChange={(e) => setEditedComment({ ...editedComment, comment: e.target.value })}
                    className="focus:outline-none h-auto shadow-md border-4 border-color-gainsboro hover:border-color-deepskyblue transition duration-700 ease-in-out active:border-color-deepskyblue active:border-4 editComment"
                />
                <button onClick={() => handleSaveEdit(editedComment)} className="bg-color-lightblue text-color-primary text-[16px] px-4 py-2 rounded-lg hover:bg-color-blue transition-all duration-300 ease-in active:bg-color-purple mt-4">Save</button>
                <button onClick={handleCloseModal} className="bg-color-primary text-color-black border text-[16px] border-color-darkgray px-4 py-2 rounded-lg hover:bg-color-black hover:text-color-primary mt-2 ml-4">Cancel</button>
            </Modal>
        </div>
    );
};

export default CommentBox;