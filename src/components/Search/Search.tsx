import { Box } from "@chakra-ui/layout";
import { fetcher } from "../../lib/utils/fetchers";
import { useState } from "react"
import { Artist } from "@prisma/client";
import { PopulatedSong } from "../SongsTable";
import { Input, IconButton } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md"

export interface PupulatedArtist extends Artist {
    songs: PopulatedSong[]
}

export interface SearchResult { songs: PopulatedSong[], artists: PupulatedArtist[] }

interface Props {
    isSearching: boolean
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
    setSearchResult: React.Dispatch<React.SetStateAction<SearchResult>>
}


const Search: React.FC<Props> = ({ isSearching, setIsSearching, setSearchResult }) => {

    const [searchTerm, setSearchTerm] = useState<string>()

    const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSearching(true)
        fetcher("/search", {
            keyword: searchTerm
        }).then(data => {
            const result = data as SearchResult
            setSearchResult(result)
            setIsSearching(false)
        })
    }

    return (
        <Box padding="1rem" >
            <form onSubmit={searchHandler} >
                <Box display="flex" gap="1rem" flexDirection="row" >
                    <Input width="70%" required={true} value={searchTerm ?? ""} placeholder="search" onChange={e => setSearchTerm(e.target.value)} />
                    <IconButton isRound aria-label="submit" icon={<MdSearch />} isLoading={isSearching} color="black" type="submit" >
                        Submit
                    </ IconButton>
                </Box>
            </form>
        </Box>
    )
}

export default Search