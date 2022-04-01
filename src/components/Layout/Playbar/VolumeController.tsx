import { Box } from "@chakra-ui/layout";
import { useState } from "react"
import {
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Text,
    Center
} from "@chakra-ui/react"
import { MdVolumeDownAlt } from "react-icons/md"

interface Props {
    volumen: number
    setVolumen: React.Dispatch<React.SetStateAction<number>>
}

const VolumeController: React.FC<Props> = ({ volumen, setVolumen }) => {

    const onSeek = (e) => {
        setVolumen(parseFloat(e[0]))
    }

    return (
        <Box width="20%" >
            <Box color="gray-200" >
                <Box display="flex" flexDirection="row" gap="0.5rem" placeContent="center" justifyContent="center" >
                    <Box display="flex" flexDirection="row" placeItems="center" >
                        <MdVolumeDownAlt fontSize="24px" /><Text fontWeight="thin" fontSize="sm" >{Math.floor(volumen)}%</Text>
                    </Box>
                    <Center marginX="0.5rem" width="80%"  >
                        <RangeSlider
                            onChange={onSeek}
                            id="player-range"
                            aria-label={['min', 'max']}
                            step={0.1} min={0} max={100}
                            value={[volumen]}
                        >
                            <RangeSliderTrack bg="gray.700" >
                                <RangeSliderFilledTrack bg="gray.400" />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Center>
                </Box>
            </Box>
        </Box>
    )
}

export default VolumeController