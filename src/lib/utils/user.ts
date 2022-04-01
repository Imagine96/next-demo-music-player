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

export const searchByText = async (toSearchFor: string) => {

    const songs = await prisma.song.findMany({
        include: {
            artist: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })

    const artists = await prisma.artist.findMany({
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            }
        }
    })

    return {
        songs: songs.filter(song => song.name.toUpperCase().includes(toSearchFor.toUpperCase()) || song.description.toUpperCase().includes(toSearchFor.toUpperCase())),
        artists: artists.filter(artist => artist.name.toUpperCase().includes(toSearchFor.toUpperCase()))
    }
}
