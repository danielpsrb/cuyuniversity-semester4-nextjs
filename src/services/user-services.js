import prisma from "@/services/prisma";

export const saveUserData = async (userData) => {
    try {
        // Cari pengguna berdasarkan email
        const existingUser = await prisma.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (existingUser) {
            // Jika pengguna sudah ada, lakukan pembaruan (update)
            const updatedUser = await prisma.user.update({
                where: {
                    email: userData.email,
                },
                data: userData,
            });
            return updatedUser;
        } else {
            // Jika pengguna belum ada, buat pengguna baru
            const newUser = await prisma.user.create({
                data: userData,
            });

            return newUser;
        }
    } catch (error) {
        throw new Error(`Error asaving user data: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
};
