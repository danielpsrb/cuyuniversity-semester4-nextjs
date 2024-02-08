import React, { useState } from 'react';
import ReactStars from 'react-stars';
import Swal from 'sweetalert2';

const StarRating = ({ onChange }) => {
    const [rating, setRating] = useState(0);
    const [selectedEmoji, setSelectedEmoji] = useState('');

    const ratingChanged = (newRating) => {
        // Set rating and emoji based on the new rating
        setRating(newRating);

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

        // Call onChange function if provided
        if (onChange) {
            onChange(newRating);
        }

        // Add validation for minimum rating
        if (newRating === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Rating harus diisi',
                text: 'Rating tidak boleh kosong & harus minimal 1 bintang',
            });
            return;
        }
    };

    return (
        <div className="flex flex-row items-center">
            <p className="text-color-black mr-2">Rating: {rating}</p>
            {selectedEmoji && <p>{selectedEmoji}</p>}
            <ReactStars
                count={5}
                size={30}
                value={parseFloat(rating)}
                onChange={ratingChanged}
                color2="#ffd700"
            />
        </div>
    );
};

export default StarRating;
