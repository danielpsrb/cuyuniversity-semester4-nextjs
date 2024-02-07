"use client"

import { useState } from "react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactStars from "react-stars";
import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";

const CommentInput = ({ anime_mal_id, user_email, username, anime_title }) => {

    const [comment, setComment] = useState("");
    const [isCreated, setIsCreated] = useState(false);

    const [rating, setRating] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('');

    const ratingChanged = (newRating) => {
        // Set rating sesuai dengan nilai yang diberikan
        setRating(newRating);
        // Tentukan emoji berdasarkan rating
        let emoji;
        if (newRating === 1) {
            emoji = '😠';
        } else if (newRating === 2) {
            emoji = '😒';
        } else if (newRating === 3) {
            emoji = '😐';
        } else if (newRating === 4) {
            emoji = '😊';
        } else if (newRating === 5) {
            emoji = '😍';
        }
        setSelectedEmoji(emoji);
    };

    const handleInput = (event) => {
        setComment(event.target.value);
    };

    const handlePosting = async (event) => {
        event.preventDefault();
        //Validasi Rating Bintang
        if (rating === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Rating harus diisi',
                text: 'Rating tidak boleh kosong & harus minimal 1 bintang',
            });
            return;
        }
        // Validasi panjang komentar
        if (comment.length < 3) {
            // Tampilkan pesan SweetAlert jika komentar tidak memenuhi syarat
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Komentar harus berisi minimal 3 huruf.",
            });
            return;
        }

        const data = { anime_mal_id, user_email, comment, username, anime_title, rating, date: new Date() };
        const response = await fetch("/api/v1/comment", {
            method: "POST",
            body: JSON.stringify(data)
        });
        const sendComment = await response.json();
        if (sendComment.isCreated) {
            setIsCreated(true);
            toast.success('Comment berhasil dikirim', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setComment("");
            setRating(0); // Reset rating setelah dikirim
            setSelectedEmoji('');
        }
        return;
    };

    return (
        <div className="flex flex-col gap-2 mt-4">
            {isCreated && <ToastContainer />}
            <div className="flex items-center">
                <p className="text-color-primary mr-2">Rating {rating}</p> {/* Menambahkan margin-right */}
                {selectedEmoji && <p>{selectedEmoji}</p>}
                <ReactStars
                    count={5}
                    size={30}
                    value={rating}
                    onChange={ratingChanged}
                    color2="#ffd700"
                />
            </div>
            <textarea
                onChange={handleInput}
                value={comment}
                placeholder="Write a comment.."
                className="md:w-[60%] w-full h-40 text-md p-4 rounded-lg focus:outline-none bg-color-black text-color-primary border-4 border-color-darkgray shadow-md hover:border-4 hover:border-color-medium transition duration-700 ease-in-out active:border-color-medium active:border-4 placeholder-color-lavender resize-none"
            />
            <Button
                onClick={handlePosting}
                variant="contained"
                endIcon={<Send />}
                className="w-24 py-2 px-3 rounded-lg"
            >
                Send
            </Button>
        </div>
    );
};

export default CommentInput;
