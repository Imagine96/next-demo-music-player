import { SearchResult } from "./Search";
import { Box } from "@chakra-ui/layout"
import Card from "../Card"
import { PopulatedSong } from "../SongsTable"

interface Props {
    content: SearchResult
    playHandler: (song?: PopulatedSong, songs?: PopulatedSong[]) => void
}

const SearchResultGrid: React.FC<Props> = ({ content, playHandler }) => {



    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gap="1rem" placeItems="center" padding="2rem" >
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