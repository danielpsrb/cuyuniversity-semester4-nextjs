import prisma from '@/libs/prisma';
import getComments from '@/app/getComment/page';

export async function POST(request) {
  try {
      const { anime_mal_id, user_email, comment, username, anime_title, userId, rating, date } = await request.json();

      const user = await prisma.user.findUnique({
        where: {
          email: user_email
        },
        select: {
          id: true
        }
      });
  
      if (!user) {
        return Response.json({ status: 404, error: "User not found" });
      }

      const createComment = await prisma.comment.create({
          data: {
              anime_mal_id,
              user_email,
              comment,
              username,
              anime_title,
              rating,
              date,
              userId // Menggunakan userId yang telah didapatkan
          },
      });
      if(createComment) return Response.json({ status: 201, isCreated: true });
      else return Response.json({ status: 500, error: "Internal Server Error" });
  } catch(error) {
      console.error("Error creating comment:", error);
  }
}

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
