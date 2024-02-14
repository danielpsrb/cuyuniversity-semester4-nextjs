import prisma from '@/libs/prisma';
import getComments from '@/app/getComment/page';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { anime_mal_id, user_email, comment, username, userId, anime_title, rating, date } = await request.json();

    // // Fetch user data to check if the user exists
    // const existingUser = await prisma.user.findUnique({
    //   where: { email: user_email },
    // });

    // if (!existingUser) {
    //   // If the user doesn't exist, you might want to handle this situation accordingly
    //   return Response.json({ status: 404, error: "User not found" });
    // }

    // Create the comment and associate it with the existing user
    const createComment = await prisma.comment.create({
      data: {
        anime_mal_id,
        comment,
        username,
        userId,
        anime_title,
        rating,
        date,
        user: { connect: { email: user_email } },
      },
    });
    if(createComment) return Response.json({ status: 201, isCreated: true });
    else return Response.json({ status: 500, error: "Internal Server Error" });
  } catch (error) {
    console.error("Error creating comment:", error);
  }
}


// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   console.log(searchParams.get("search"));
//   return NextResponse.json({ msg: "Hello World" });
// }


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('anime_mal_id');
    if (!query) {
      // Jika anime_mal_id tidak ada, kembalikan 400 Bad Request
      return Response.json({ status: 400, error: "Bad Request: Ups Sorry Your Anime mal id is empty" });
    }
    const comments = await getComments(query);
    return Response.json({ comments });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return Response.json({ status: 500, error: "Internal Server Error" });
  }
}

// export async function GET(request) {
//   try {
//     const comments = await prisma.comment.findMany();
//     return Response.json({ status: 200, comments });
//   } catch (error) {
//     console.error("Error retrieving comments:", error);
//     return Response.json({ status: 500, error: "Internal Server Error" });
//   }
// }