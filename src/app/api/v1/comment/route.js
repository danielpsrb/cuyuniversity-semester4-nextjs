import prisma from '@/libs/prisma';
import getComments from '@/app/getComment/page';

export async function POST(request) {
  try {
      const { anime_mal_id, user_email, comment, username, anime_title, rating, date } = await request.json();

      // const user = await prisma.user.findFirst({
      //     where: {
      //         email: user.email
      //     }
      // })
      // if (!user) {
      //   return Response.json({ status: 404, error: "Account not found" });
      // }
      
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


      // const userId = user.id;

      const createComment = await prisma.comment.create({
          data: {
              anime_mal_id,
              user_email,
              comment,
              username,
              anime_title,
              rating,
              date,
              userId: user.id 
          },
      });
      if(createComment) return Response.json({ status: 201, isCreated: true });
  } catch(error) {
      console.error("Error creating comment:", error);
      return Response.json({ status: 500, error: "Internal Server Error" });
  }
}import prisma from '@/libs/prisma';
import getComments from '@/app/getComment/page';

export async function POST(request) {
  try {
      const { anime_mal_id, user_email, comment, username, anime_title, rating, date } = await request.json();

      // const user = await prisma.user.findFirst({
      //     where: {
      //         email: user.email
      //     }
      // })
      // if (!user) {
      //   return Response.json({ status: 404, error: "Account not found" });
      // }
      
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


      // const userId = user.id;

      const createComment = await prisma.comment.create({
          data: {
              anime_mal_id,
              user_email,
              comment,
              username,
              anime_title,
              rating,
              date,
              userId: user.id 
          },
      });
      if(createComment) return Response.json({ status: 201, isCreated: true });
  } catch(error) {
      console.error("Error creating comment:", error);
      return Response.json({ status: 500, error: "Internal Server Error" });
  }
}
