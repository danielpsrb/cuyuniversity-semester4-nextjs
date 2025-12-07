import { auth } from "@/lib/auth/auth";

export const authUserSession = async() => {
    const session = await auth()
    return session?.user
}