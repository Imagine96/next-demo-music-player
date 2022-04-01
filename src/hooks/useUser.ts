import useSWR from "swr";
import { fetcher } from "../lib/utils/fetchers";
import { User } from "@prisma/client";

interface UserData extends User {
    playListCount: number
}


export const useAuth = () => {
    const { data, error } = useSWR("/auth", fetcher)

    return {
        user: data as UserData,
        isLoading: !data && !error,
        error: error
    }
}