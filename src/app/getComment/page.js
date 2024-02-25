"use server"
import prisma from "@/services/prisma";

const getComments = async (anime_mal_id) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { anime_mal_id },
      include: {
        user: {
          select: {
            image: true,
          },
        },
      },
    });
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export default getComments;
