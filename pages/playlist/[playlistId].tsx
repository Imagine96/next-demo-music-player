import { Playlist } from "@prisma/client";
import { NextPage, GetServerSideProps, NextApiRequest } from "next";
import prisma from "../../src/lib/prisma";
import GradientLayout from "../../src/components/GradientLayout"
import { validateToken } from "../../src/lib/utils/auth"
import { useRouter } from "next/router"
import { useEffect } from "react";
import SongTable from "../../src/components/SongsTable"
import { PopulatedSong } from "../../src/components/SongsTable"
import { useStoreActions } from "easy-peasy"
import { useAuth } from "../../src/hooks/useUser"
import { Spinner } from "@chakra-ui/react"

interface PlaylistPopulated extends Playlist {
    songs: PopulatedSong[]
}

interface Props {
    playlist: PlaylistPopulated
}

const PlaylistPage: NextPage<Props> = ({ playlist }) => {

    const { user, isLoading } = useAuth()

    const router = useRouter()
    useEffect(() => {
        if (!playlist) {
            router.push("/")
        }
    }, [user, playlist])

    useEffect(() => {
        if (!isLoading && user === null) {
            router.push("/signin")
        }
    }, [isLoading])
    const { color, name, img, createdAt, songs } = playlist || {}

    const playFullPlaylist = useStoreActions((store: any) => store.changeActiveSongs)
    const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

    const playHandler = (song?: PopulatedSong) => {
        setActiveSong(song || songs[0])
        playFullPlaylist(songs)
    }

    return (
        playlist && !isLoading ? (
            <GradientLayout color={color} description={`Created at ${createdAt}`} title={name} img={img} subtittle="playlist" >
                <SongTable userId={user.id} favorites={user.favorites ?? []} playHandler={playHandler} songs={playlist.songs} />
            </GradientLayout>
        ) : <Spinner />
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {
        const playlistId = parseInt(ctx.params.playlistId as string)
        const { id } = validateToken(ctx.req.cookies[process.env.COOKIEAUTHNAME])

        const [playlist] = await prisma.playlist.findMany({
            where: {
                id: playlistId,
                userId: id,
            }, include: {
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
            props: {
                playlist
            }
        }
    } catch (err) {
        return {
            props: {

            }
        }
    }
}

export default PlaylistPage