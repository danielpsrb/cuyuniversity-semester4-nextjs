"use client"
import React from 'react';
import useSWR from 'swr';
import ReactStars from 'react-stars';
import Image from 'next/image';
import LikedButton from './LikedButton';
import { formatDistanceToNow } from 'date-fns';

const fetcher = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`);
    }

    const data = await response.json();
    return data.comments;
};

const CommentBox = ({ anime_mal_id }) => {
    
    const apiUrl = `/api/v1/comment?anime_mal_id=${anime_mal_id}`;
    const { data: comments, error, isLoading } = useSWR(apiUrl, fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 2000 
    });

    if (error) return <div className='text-color-red'>Error fetching comments: {error.message}</div>;

    if (isLoading) return <div className='text-color-primary loading-comment'></div>;


    return (
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {comments &&
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className='text-color-dark border-2 border-color-purple bg-color-secondary p-4 rounded-lg shadow-xl relative'
                    >
                        <LikedButton />
                        <div className='mb-2'>
                            <p className='text-color-lavender text-sm'>
                                {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
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
                        <p className='text-color-primary overflow-hidden' style={{ wordWrap: 'break-word' }}>
                            {comment.comment}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default CommentBox;