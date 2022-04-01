import { Box, Text } from "@chakra-ui/layout"
import { Table, Thead, Tr, Tbody, Th, IconButton, Image } from "@chakra-ui/react"
import { BsFillPlayFill } from "react-icons/bs"
import { AiOutlineClockCircle } from "react-icons/ai"
import { Song } from "@prisma/client"
import { formatDate, formatTime } from "../lib/formaters"
import { MdOutlineFavorite } from "react-icons/md"
import { useState } from "react"
import { updateFavorites } from "../lib/utils/user"
import { fetcher } from "../lib/utils/fetchers"

export interface PopulatedSong extends Song {
    artist: {
        name: string,
        id: number
    }
}

interface Props {
    songs: PopulatedSong[],
    playHandler: (song?: PopulatedSong) => void,
    favorites: number[],
    userId: number
    favoriteOnly?: boolean
}

const SongsTable: React.FC<Props> = ({ songs, playHandler, favorites, favoriteOnly, userId }) => {

    const [favoriteSongs, setFavoriteSongs] = useState(favorites)

    const favoritesUpdateHandler = async (songId: number) => {
        try {
            if (favoriteSongs.indexOf(songId) !== -1) {
                const newFavorites = favoriteSongs.filter(song => song !== songId)
                const data = {
                    favorites: newFavorites
                }
                const updatedUser = await fetcher(`/user/${userId}`, data)
                setFavoriteSongs(updatedUser.favorites)
            } else {
                const data = {
                    favorites: [...favoriteSongs, songId]
                }
                const updatedUser = await fetcher(`/user/${userId}`, data)
                setFavoriteSongs(updatedUser.favorites)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box bg="transparent" maxHeight="30vh" padding="1rem" paddingBottom="2rem">
            <Box marginBottom="1rem" >
                <IconButton onClick={() => playHandler()} icon={<BsFillPlayFill fontSize="24px" />} colorScheme="green" size="md" isRound aria-label="play" />
            </Box>
            <Table padding="1" paddingBottom="1rem" bg="rgba(255,255,255, 0.1)" backdropBlur="8px" rounded="md" variant="unstyled" >
                <Thead borderBottom="1px" borderColor="rgb(255, 255, 255, 0.2)" >
                    <Tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Artist</Th>
                        {favoriteOnly ? null : <Th><MdOutlineFavorite color="green.600" aria-label="favprite" /></Th>}
                        <Th>Date added</Th>
                        <Th><AiOutlineClockCircle /></Th>
                    </Tr>
                </Thead>
                <Tbody overflow="auto" >
                    {
                        songs.map((song, index) => {
                            return <Tr
                                sx={{
                                    transition: "all .3s",
                                    '&:hover': {
                                        bg: "rgba(255, 255, 255, 0.1)"
                                    }
                                }}
                                key={song.id}
                                cursor="pointer"
                            >
                                <Th> {index + 1} </Th>
                                <Th onClick={() => playHandler(song)} display="flex" flexDirection="row" gap="1rem" > <Image width="20px" src={song.img} /> <Text fontWeight="thin" > {song.name} </Text> </Th>
                                <Th><Text fontWeight="thin" > {song.artist.name} </Text></Th>
                                {
                                    favoriteOnly ? null : (
                                        <Th>
                                            <MdOutlineFavorite
                                                color={favoriteSongs.indexOf(song.id) !== -1 ? "#349362" : ""}
                                                aria-label="favprite"
                                                onClick={() => favoritesUpdateHandler(song.id)}
                                            />
                                        </Th>
                                    )
                                }
                                <Th onClick={() => playHandler(song)} fontWeight="thin">{formatDate(song.createdAt)}</Th>
                                <Th onClick={() => playHandler(song)} fontWeight="thin">{formatTime(song.duration)}</Th>
                            </Tr>
                        })
                    }
                </Tbody>
            </Table>
        </Box >
    )
}

export default SongsTable