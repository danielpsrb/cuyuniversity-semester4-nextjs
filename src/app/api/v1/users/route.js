import prisma from "@/services/prisma";

export async function GET(request) {
    try {
        const users = await prisma.user.findMany();
        return Response.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return Response.json({ status: 500, error: "Internal Server Error" });
    }
}
