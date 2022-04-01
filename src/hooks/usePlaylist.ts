import { Playlist } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../lib/utils/fetchers";

export const usePlaylist = () => {

    const { data, error } = useSWR("/playlist", fetcher)

    return {
        playlists: data as Playlist[] || [],
        isLoading: !data && !error,
        error: error
    }
}