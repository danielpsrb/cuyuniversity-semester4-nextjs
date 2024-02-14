import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function PATCH(request, { params }) {
    const body = await request.json();
    const updatedComment = await prisma.comment.update({
        where: {
        id: String(params.id)
        },
        data: {
            comment: body.comment,
            rating: body.rating
        }
    })
    if (!updatedComment) return NextResponse.json({ status: 500, message: 'Update comment failed'})
    else return NextResponse.json({ status: 200, message: 'Comment updated'})
}

export async function DELETE(request, { params }) {
    const deletedComment = await prisma.comment.delete({
        where: {
        id: String(params.id)
        }
    })
    if (!deletedComment) return NextResponse.json({ status: 500, message: 'Comment does not exist'})
    else return NextResponse.json({ status: 200, message: 'Comment deleted'}) 
}