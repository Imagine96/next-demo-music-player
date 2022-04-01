import prisma from "../prisma";

export const getPlaylists = async (userId: number) => {

    const playlists = await prisma.playlist.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            updatedAt: "asc"
        }
    })

    return playlists
}  
