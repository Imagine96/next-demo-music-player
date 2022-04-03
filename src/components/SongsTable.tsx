import { Box, Text } from "@chakra-ui/layout"
import { Table, Thead, Tr, Tbody, Th, IconButton, Image, useMediaQuery } from "@chakra-ui/react"
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

    const [childrenMediaQueryController] = useMediaQuery('(min-width: 700px)')

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
        <Box bg="transparent" maxHeight={childrenMediaQueryController ? "30vh" : "45vh"} overflowY="auto" padding={"1rem"}>
            <Box marginBottom="1rem" >
                <IconButton onClick={() => playHandler()} icon={<BsFillPlayFill fontSize="24px" />} colorScheme="green" size="md" isRound aria-label="play" />
            </Box>
            <Table padding="1" overflowY="auto" paddingBottom="1rem" bg="rgba(255,255,255, 0.1)" backdropBlur="8px" rounded="md" variant="unstyled" >
                <Thead borderBottom="1px" borderColor="rgb(255, 255, 255, 0.2)" >
                    <Tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        {childrenMediaQueryController ? <Th>Artist</Th> : null}
                        {childrenMediaQueryController ? <Th><MdOutlineFavorite color="green.600" aria-label="favprite" /></Th> : null}
                        {childrenMediaQueryController ? <Th>Date added</Th> : null}
                        <Th><AiOutlineClockCircle /></Th>
                    </Tr>
                </Thead>
                <Tbody fontSize={{ sm: "x-small", md: "md" }} overflow="auto" >
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
                                <Th onClick={() => playHandler(song)} display="flex" flexDirection="row" gap={{ sm: "0.2rem", md: "1rem" }} > {childrenMediaQueryController ? <Image width="20px" src={song.img} /> : null} <Text fontWeight="thin" > {song.name} </Text> </Th>
                                {childrenMediaQueryController ? <Th ><Text fontWeight="thin" > {song.artist.name} </Text></Th> : null}
                                {
                                    favoriteOnly ? null : childrenMediaQueryController ? (
                                        <Th>
                                            <MdOutlineFavorite
                                                color={favoriteSongs.indexOf(song.id) !== -1 ? "#349362" : ""}
                                                aria-label="favprite"
                                                onClick={() => favoritesUpdateHandler(song.id)}
                                            />
                                        </Th>
                                    ) : null
                                }
                                {childrenMediaQueryController ? <Th onClick={() => playHandler(song)} fontWeight="thin">{formatDate(song.createdAt)}</Th> : null}
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