import  { getServerSession } from "next-auth"
import { authOption } from "@/app/api/auth/[...nextauth]/route"

export const imageUserSession = async () => {
    const imageSession = await getServerSession(authOption)
    return imageSession.user
}