import { NextPage, GetServerSideProps } from "next"
import GradientLayout from "../src/components/GradientLayout"
import prisma from "../src/lib/prisma"
import { Artist } from "@prisma/client"
import Artists from "../src/components/Home/Artists"
import { useAuth } from "../src/hooks/useUser"
import { Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { PopulatedSong } from "../src/components/SongsTable"
import SongsTable from "../src/components/SongsTable"
import { useStoreActions } from "easy-peasy"

interface Props {
    artists: Artist[]
    songs: PopulatedSong[]
}

const Home: NextPage<Props> = ({ artists, songs }) => {

    const { user, isLoading, error } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isLoading === false && !user) {
            router.push("/signin")
        }
    }, [isLoading])

    const playFullPlaylist = useStoreActions((store: any) => store.changeActiveSongs)
    const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

    const playHandler = (song?: PopulatedSong) => {
        setActiveSong(song || songs[0])
        playFullPlaylist(songs)
    }

    return (

        isLoading ?
            <Spinner /> : user ? (
                <GradientLayout color={user?.color ? user.color : "gray"}
                    roundImage={true}
                    description={`${user?.playListCount} public playlists`}
                    img="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
                    subtittle="profile"
                    title={user.username}>
                    <Artists artists={artists} />
                    <SongsTable userId={user.id} favorites={user.favorites ?? []} songs={songs.filter(song => user.favorites.indexOf(song.id) !== -1)} playHandler={playHandler} />
                </GradientLayout>
            ) : null
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    try {
        const artists = await prisma.artist.findMany({})
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
        return {
            props: {
                artists,
                songs
            }
        }
    } catch (err) {
        return {
            props: {
                artists: []
            }
        }
    }
}

export default Home
