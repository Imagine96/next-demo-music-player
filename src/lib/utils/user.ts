import prisma from "../prisma";

export const updateFavorites = async (userId: number, favorites: number[]) => {
    const user = await prisma.user.update({
        where: {
            id: userId
        }, data: {
            favorites: favorites
        }
    })
    return user
}
