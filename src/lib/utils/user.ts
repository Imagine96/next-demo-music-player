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

    console.log(toSearchFor)

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

    console.log(songs)

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
        songs: songs.filter(song => song.name.includes(toSearchFor) || song.description.includes(toSearchFor)),
        artists: artists.filter(artist => artist.name.includes(toSearchFor))
    }
}
