import { NextPage } from "next"
import { useAuth } from "../src/hooks/useUser"
import { Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { PopulatedSong } from "../src/components/SongsTable"
import { useStoreActions } from "easy-peasy"
import GradientLayout from "../src/components/GradientLayout"
import useRandomImage from "../src/hooks/useRandomImage"
import { SearchResult } from "../src/components/Search/Search"
import Search from "../src/components/Search/Search"
import SearchResultGrid from "../src/components/Search/SearchResultGrid"

const colors = ["gray", "red", "green", "blue", "teal", "purple"]

const Home: NextPage = () => {

    const { user, isLoading, error } = useAuth()
    const router = useRouter()
    const { imgUrl, isLoading: isImageLoading } = useRandomImage()
    const [searchResult, setSearchResult] = useState<SearchResult>({
        artists: [],
        songs: []
    })
    const [isSearching, setIsSearching] = useState<boolean>(false)

    useEffect(() => {
        if (isLoading === false && !user) {
            router.push("/signin")
        }
    }, [isLoading])

    const playFullPlaylist = useStoreActions((store: any) => store.changeActiveSongs)
    const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

    const playHandler = (song?: PopulatedSong, songs?: PopulatedSong[]) => {
        setActiveSong(song || songs[0])
        playFullPlaylist([song] || songs)
    }

    console.log(searchResult)

    return (

        isLoading ?
            <Spinner /> : user && imgUrl ? (
                <GradientLayout color={getColor()}
                    roundImage={true}
                    description={`${user.playListCount} Playlists`}
                    img={imgUrl}
                    subtittle="Profile"
                    title={user.username}
                >
                    <Search isSearching={isSearching} setIsSearching={setIsSearching} setSearchResult={setSearchResult} />
                    {isSearching ? <Spinner /> : <SearchResultGrid content={searchResult} playHandler={playHandler} />}
                </GradientLayout>
            ) : <Spinner />
    )
}

export default Home

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function getColor() {
    return colors[getRandomInt(5)]
}