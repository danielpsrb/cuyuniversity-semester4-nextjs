import { authUserSession } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import React from 'react'
import Link from "next/link"
import Header from '@/components/Dashboard/Header'
import NoCommentMessage from '@/components/Dashboard/NoCommentMessage'

const page = async () => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({ where: { userEmail: user.email } })

    return (
        <section className="mt-4 px-4 w-full">
            <Header title={"My Comment"} />
            <div className='grid grid-cols-1 md:grid-cols-3 py-2 gap-4'>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <Link
                            href={`/anime/${comment.anime_mal_id}`}
                            key={comment.id}
                            className='border-2 border-color-red bg-color-medium text-color-lavender p-4 rounded-lg shadow-xl text-nowrap'
                        >
                            <div>
                                <p className='text-sm font-semibold mb-2'>{comment.anime_title}</p>
                                <p className='italic mb-2'>{comment.comment}</p>
                            </div>
                            
                        </Link>
                    ))
                ) : (
                    <NoCommentMessage />
                )}
            </div>
        </section>
    )
}

export default page