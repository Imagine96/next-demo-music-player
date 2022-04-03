import { NextPage, GetServerSideProps } from "next"
import GradientLayout from "../src/components/GradientLayout"
import prisma from "../src/lib/prisma"
import { useAuth } from "../src/hooks/useUser"
import { Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { PopulatedSong } from "../src/components/SongsTable"
import { useStoreActions } from "easy-peasy"
import Library from "../src/components/Library/Library"
import { validateToken } from "../src/lib/utils/auth"
import { Playlist } from "@prisma/client"

export interface PopulatedPlaylist extends Playlist {
    songs: PopulatedSong[]
}

interface Props {
    playlists: PopulatedPlaylist[]
}

const colors = ["gray", "red", "green", "blue", "teal", "purple"]

const Home: NextPage<Props> = ({ playlists }) => {

    const { user, isLoading, error } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isLoading === false && !user) {
            router.push("/signin")
        }
    }, [isLoading])

    const playFullPlaylist = useStoreActions((store: any) => store.changeActiveSongs)
    const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

    const playHandler = (song?: PopulatedSong, songs?: PopulatedSong[]) => {
        setActiveSong(song ? song : songs[0])
        playFullPlaylist(song ? [song] : songs)
    }

    return (

        isLoading ?
            <Spinner /> : user ? (
                <GradientLayout color={getColor()}
                    roundImage={true}
                    description=""
                    img=""
                    subtittle=""

                    title={user.username}
                    noContent
                >
                    <Library playHandler={playHandler} playlists={playlists} />
                </GradientLayout>
            ) : null
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {
        const { id } = validateToken(ctx.req.cookies[process.env.COOKIEAUTHNAME])

        const playlists = await prisma.playlist.findMany({
            where: {
                userId: id
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
                playlists
            }
        }
    } catch (err) {
        return {
            props: {
                playlists: []
            }
        }
    }
}

export default Home

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function getColor() {
    return colors[getRandomInt(5)]
}