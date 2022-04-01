import { Box, Text } from "@chakra-ui/layout";
import { Image, Spinner } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import useRandomImage from "../../hooks/useRandomImage"
import { PopulatedSong } from "../SongsTable";
import { Playlist } from "@prisma/client";

export interface PopulatedPlaylist extends Playlist {
    songs: PopulatedSong[]
}

interface Props {
    artist?: {
        id: number,
        name: string
    }
    song?: PopulatedSong
    playlist?: PopulatedPlaylist
    playHandler: (song?: PopulatedSong, songs?: PopulatedSong[]) => void
}

const Card: React.FC<Props> = ({ artist, song, playlist, playHandler }) => {


    if (artist) {
        const { imgUrl, isLoading } = useRandomImage()
        return (
            <Box bg="rgba(255, 255, 255, 0.2)" blur="8px" maxWidth="80%" transition="all" _hover={{
                boxShadow: "2xl"
            }} display="flex" flexDirection="column" placeItems="center" gap="2" boxShadow="xl" borderRadius="lg" padding="0.5rem" >
                {isLoading ? <Spinner /> : <Image boxSize="4rem" borderRadius="full" width="80%" height="full" src={imgUrl} alt="random img" />}
                <Text fontSize="sm" fontWeight="semibold" > {artist.name} </Text>
                <Text fontSize="sm" fontWeight="thin" > Artist </Text>
            </Box >
        )
    }
    else if (song) {
        return (
            <Box bg="rgba(255, 255, 255, 0.2)" blur="8px" onClick={() => playHandler(song)} maxWidth="80%" transition="all" _hover={{
                boxShadow: "2xl"
            }} display="flex" flexDirection="column" placeItems="center" gap="2" boxShadow="xl" borderRadius="lg" padding="0.5rem" >
                <Image boxSize="4rem" borderRadius="full" width="80%" height="full" src={song.img} alt="random img" />
                <Text fontSize="sm" fontWeight="semibold" > {song.name} </Text>
                <Text fontSize="sm" fontWeight="thin" > Genre: {" "}{song.genre} </Text>
                <Text fontSize="sm" fontWeight="thin" > Song </Text>
            </Box >
        )
    }
    else if (playlist) {
        return (
            <Box bg="rgba(255, 255, 255, 0.2)" blur="8px" onClick={() => playHandler(undefined, playlist.songs)} maxWidth="80%" transition="all" _hover={{
                boxShadow: "2xl"
            }} display="flex" flexDirection="column" placeItems="center" gap="2" boxShadow="xl" borderRadius="lg" padding="0.5rem" >
                <Image boxSize="4rem" borderRadius="full" width="80%" height="full" src={playlist.img} alt="random img" />
                <Text fontSize="sm" fontWeight="semibold" > {playlist.name} </Text>
                <Text fontSize="sm" fontWeight="thin" > {playlist.songs.length} Songs</Text>
                <Text fontSize="sm" fontWeight="thin" > Playlist </Text>
            </Box >
        )
    }

}

export default Card