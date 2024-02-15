"use server"

import  { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

export const authUserSession = async() => {
    const session = await getServerSession(authOptions)
    return session?.user
}