import { Box } from "@chakra-ui/layout";
import LeftColumn from "./LeftColumn";
import MusicPlayerControllers from "./MusicPlayerControllers";
import VolumeController from "./VolumeController";
import { useStoreState } from "easy-peasy";
import { PopulatedSong } from "../../SongsTable";
import { useState } from "react";

const PlayerBar: React.FC = () => {

    const songs = useStoreState((state: any) => state.activeSongs) as PopulatedSong[]
    const activeSong = useStoreState((state: any) => state.activeSong) as PopulatedSong || null

    const [volumen, setVolumen] = useState<number>(100)


    return (
        <Box display="flex" color="white" bg="gray.900" height="full" padding="1rem" flexDirection="row" justifyContent="space-between" placeItems="center" >
            <LeftColumn artistName={activeSong !== null ? activeSong.artist.name : undefined} songName={activeSong !== null ? activeSong.name : undefined} />
            <MusicPlayerControllers volumen={volumen} activeSong={activeSong} songs={songs} />
            <VolumeController volumen={volumen} setVolumen={setVolumen} />
        </Box>
    )
}

export default PlayerBar