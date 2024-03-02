import { auth } from '../../auth'

export const authUserSession = async() => {
    const session = await auth()
    return session?.user
}