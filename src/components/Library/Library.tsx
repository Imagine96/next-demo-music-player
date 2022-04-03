import { useMemo } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { PopulatedSong } from "../SongsTable";
import Card, { PopulatedPlaylist } from "../Card";
import Link from "next/link";

interface Props {
    playHandler: (song?: PopulatedSong, songs?: PopulatedSong[]) => void
    playlists: PopulatedPlaylist[]
}

const Library: React.FC<Props> = ({ playHandler, playlists }) => {

    const [widthMediaQueryController] = useMediaQuery('(min-width: 700px)')

    const songs: PopulatedSong[] = useMemo(() => {
        let songs: PopulatedSong[] = []
        playlists.forEach(playlist => {
            playlist.songs.forEach(song => {
                if (!songs.find(s => s.id === song.id)) {
                    songs = [...songs, song]
                }
            })
        })
        return songs
    }, [playlists])

    const artists = useMemo(() => {
        let artists: {
            name: string,
            id: number
        }[] = []

        songs.forEach(song => {
            if (!artists.find(s => s.id === song.artist.id)) {
                artists = [...artists, song.artist]
            }
        })

        return artists
    }, [playlists])

    return (
        <Box display="grid" marginBottom="5rem" gridTemplateColumns={widthMediaQueryController ? "1fr 1fr 1fr 1fr" : "1fr"} gap="1rem" placeItems="center" padding="2rem" paddingTop="4rem" maxHeight="100vh" overflowY={"auto"}>
            <Box width="80%" padding="2" display="flex" flexDirection="column" gap="1rem" height="15rem" overflow="auto" bgGradient="linear(to-l, #7928CA, #FF0080)" gridColumnStart="1" gridColumnEnd={widthMediaQueryController ? "3" : "auto"} >
                <Link passHref href="https://uppbeat.io/t/moire/dont-worry">
                    <a target="_blank">
                        Music from Uppbeat (free for Creators!):
                        License code: GMSSBGLTIVPJEVA5
                    </a>
                </Link>
                <Link passHref href="https://uppbeat.io/t/soundroll/poem">
                    <a target="_blank">
                        Music from Uppbeat (free for Creators!):
                        License code: 4JL165LJT6LBUFNX
                    </a>
                </Link>
                <Link passHref href="https://uppbeat.io/t/prigida/cozy" >
                    <a target="_blank">
                        Music from Uppbeat (free for Creators!):
                        License code: 5PBEEC3CYMXPJOHM
                    </a>
                </Link>
                <Link passHref href="https://uppbeat.io/t/prigida/mellow-bop">
                    <a target="_blank">
                        Music from Uppbeat (free for Creators!):
                        License code: 1W2ZXOQIOHBTXNDP
                    </a>
                </Link>
                <Link passHref href="https://uppbeat.io/t/pryces/music-is">
                    <a target="_blank">
                        Music from Uppbeat (free for Creators!):
                        License code: HU5MPYMVR8QTA98P
                    </a>
                </Link>
            </Box >
            {
                playlists.map(item => {
                    return (
                        <Card key={item.name} playHandler={playHandler} playlist={item} />
                    )
                })
            }
            {
                artists.map(item => {
                    return (
                        <Card key={item.name} playHandler={playHandler} artist={item} />
                    )
                })
            }
            {
                songs.map(item => {
                    return (
                        <Card key={item.name} playHandler={playHandler} song={item} />
                    )
                })
            }
        </Box >
    )
}

export default Library