import { useState, useEffect, useMemo } from "react";
import { PopulatedSong } from "../components/SongsTable";

const useSearch = (songs: PopulatedSong[]) => {

    const artistsSource = useMemo(() => songs.map((song) => song.artist.name), [])

    const [songSearchResult, setSongSearchResult] = useState<PopulatedSong[]>(songs)
    const [artistSearchResult, setArtistSearchResutl] = useState<string[]>(artistsSource)

    useEffect(() => {
        reset()
    }, [songs])

    function filterFromKeyword(keyword: string) {
        songs.forEach((song) => {
            if (song.name.includes(keyword)) {
                setSongSearchResult(prev => [...prev, song])
            }
            if (song.artist.name.includes(keyword)) {
                setArtistSearchResutl(prev => [...prev, song.artist.name])
            }
        })
    }

    function reset() {
        setSongSearchResult(songs)
        setArtistSearchResutl(artistsSource)
    }

    return {
        songs: songSearchResult,
        artists: artistSearchResult,
        search: (keyword: string) => filterFromKeyword(keyword),
        reset: reset
    }
}