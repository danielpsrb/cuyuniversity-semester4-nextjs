import { authUserSession } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import React from 'react'
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns';
import Header from '@/components/Dashboard/Header'
import NoCommentMessage from '@/components/Dashboard/MyComments/NoCommentMessage';
import MyCommentRating from '@/components/Dashboard/MyComments/MyCommentRating';
import EditBtn from '@/components/Dashboard/MyComments/Edit';
import DeleteBtn from '@/components/Dashboard/MyComments/Delete';

const page = async () => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({ where: { user_email: user.email } })
    // console.log(comments)

    return (
        <section className="mt-4 px-4 w-full">
            <Header title={"My Comment"} />
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4'>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div
                            key={comment.id}
                            className='bg-color-black text-color-lavender p-4 rounded-lg shadow-xl text-wrap relative'
                        >
                            <div className='absolute top-0 right-0 p-1 cursor-pointer'>
                                <EditBtn />
                                <DeleteBtn commentId={comment.id} />
                            </div>
                            <Link className="cursor-pointer" href={`/anime/${comment.anime_mal_id}`}>
                                <span className='text-xl font-semibold md:text-sm'>{comment.anime_title}</span>
                            </Link>
                            <div>
                                <p className='text-md mt-4 select-none'>{comment.comment}</p>
                                <MyCommentRating rating={comment.rating} />
                                <p>{formatDistanceToNow(new Date(comment.date), { addSuffix: true })}</p>
                            </div>
                            
                        </div>
                    ))
                ) : (
                    <NoCommentMessage />
                )}
            </div>
        </section>
    )
}

export default page