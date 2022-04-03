import { SearchResult } from "./Search";
import { Box, useMediaQuery } from "@chakra-ui/react"
import Card from "../Card"
import { PopulatedSong } from "../SongsTable"

interface Props {
    content: SearchResult
    playHandler: (song?: PopulatedSong, songs?: PopulatedSong[]) => void
}

const SearchResultGrid: React.FC<Props> = ({ content, playHandler }) => {

    const [widthMediaQueryController] = useMediaQuery('(min-width: 700px)')


    return (
        <Box display="grid" marginBottom="15rem" height="full" gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr 1fr 1fr" }} gap={"0.8rem"} placeItems="center" padding="2rem" >
            {
                content.artists.map(artist => <Card key={artist.name} artist={artist} playHandler={playHandler} />)
            }
            {
                content.songs.map(song => <Card key={song.name} song={song} playHandler={playHandler} />)
            }
        </Box>
    )
}

export default SearchResultGrid