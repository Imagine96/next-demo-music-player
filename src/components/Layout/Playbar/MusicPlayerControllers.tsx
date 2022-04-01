import {
    ButtonGroup,
    Box,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Text,
    Center
} from "@chakra-ui/react"
import ReactHowler from "react-howler"
import { useEffect, useRef, useState } from "react"
import {
    MdShuffle,
    MdSkipPrevious,
    MdSkipNext,
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat
} from "react-icons/md"
import { useStoreActions } from "easy-peasy"
import { PopulatedSong } from "../../SongsTable"
import { formatTime } from "../../../lib/formaters"

interface Props {
    activeSong: PopulatedSong | null,
    songs: PopulatedSong[],
    volumen: number
}

const MusicPlayerControllers: React.FC<Props> = ({ activeSong, songs, volumen }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(true)
    const [index, setIndex] = useState<number>(getIndex(songs, activeSong))
    const [seek, setSeek] = useState<number>(0.0)
    const [isSeeking, setIsSeeking] = useState<boolean>(false)
    const [repeat, setRepeat] = useState<boolean>(false)
    const [random, setRandom] = useState<boolean>(false)
    const [duration, setDuration] = useState<number>()
    const soundRef = useRef(null)
    const repeatRef = useRef(repeat)
    const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

    useEffect(() => {
        repeatRef.current = repeat
    }, [repeat])

    useEffect(() => {
        let timerId: number
        if (isPlaying && !isSeeking && soundRef.current) {
            const f = () => {
                setSeek(soundRef.current.seek())
                timerId = requestAnimationFrame(f)
            }

            timerId = requestAnimationFrame(f)
            return () => {
                cancelAnimationFrame(timerId)
            }
        }
        cancelAnimationFrame(timerId)

    }, [isPlaying, isSeeking])

    useEffect(() => {
        if (songs && index !== -1) {
            setActiveSong(songs[index])
        }
    }, [index, songs, setActiveSong])

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.volume(volumen / 100)
        }
    }, [volumen, soundRef.current])

    const toogleIsPlaying = () => {
        setIsPlaying(prev => !prev)
    }

    const toggleRepeat = () => {
        setRepeat(prev => !prev)
    }

    const toggleRandom = () => {
        setRandom(prev => !prev)
    }

    const prevSong = () => {
        setIndex(prev => {
            return prev ? prev - 1 : songs.length - 1
        })
    }

    const nextSong = () => {
        if (random) {
            const nextIndex = Math.floor(Math.random() * (songs.length - 1))
            if (nextIndex === index) {
                nextSong()
            }
            setIndex(nextIndex)
        } else {
            setIndex(prev => {
                return prev < songs.length - 1 ? prev + 1 : 0
            })
        }
    }

    const onEndHandler = () => {
        if (repeatRef.current) {
            soundRef.current.seek(index)
            setSeek(0)
        } else {
            nextSong()
        }
    }

    const onLoadHandler = () => {
        const duration = soundRef.current.duration()
        setDuration(duration)
    }

    const onSeek = (e) => {
        setSeek(parseFloat(e[0]))
        soundRef.current.seek(e[0])
    }

    return (
        <Box width="50%">
            {
                activeSong !== null ? <ReactHowler onLoad={onLoadHandler} onEnd={onEndHandler} ref={soundRef} playing={isPlaying} src={activeSong.url} /> : null
            }
            <Box color="gray.600" display="flex" flexDirection="row" placeItems="center" gap="1rem" justifyContent="space-around" >
                <ButtonGroup>
                    <IconButton color={random ? "white" : "gray.600"} onClick={toggleRandom} outline="none" variant="link" aria-label="shuffle" fontSize="16px" icon={<MdShuffle />} />
                    <IconButton onClick={prevSong} outline="none" variant="link" aria-label="skip previous" fontSize="16px" icon={<MdSkipPrevious />} />
                    {
                        activeSong !== null ? <IconButton onClick={toogleIsPlaying} outline="none" variant="link" aria-label="play" fontSize="32px" icon={!isPlaying ? <MdOutlinePlayCircleFilled /> : <MdOutlinePauseCircleFilled />} /> : <Box />
                    }
                    <IconButton onClick={nextSong} outline="none" variant="link" aria-label="skip next" fontSize="16px" icon={<MdSkipNext />} />
                    <IconButton color={repeat ? "white" : "gray.600"} onClick={toggleRepeat} outline="none" variant="link" aria-label="skip next" fontSize="16px" icon={<MdOutlineRepeat />} />
                </ButtonGroup>
            </Box>
            <Box color="gray-200">
                <Box display="flex" flexDirection="row" placeContent="center" justifyContent="center" >
                    <Box>
                        <Text fontSize="x-small" fontWeight="thin" > {formatTime(seek) ?? 0} </Text>
                    </Box>
                    <Center marginX="0.5rem" width="80%"  >
                        <RangeSlider
                            onChange={onSeek}
                            id="player-range"
                            aria-label={['min', 'max']}
                            step={0.1} min={0} max={duration ? parseFloat(duration.toFixed(2)) : 0}
                            value={[seek]}
                            onChangeStart={() => setIsSeeking(true)}
                            onChangeEnd={() => setIsSeeking(false)}
                        >
                            <RangeSliderTrack bg="gray.700" >
                                <RangeSliderFilledTrack bg="gray.400" />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Center>
                    <Box>
                        <Text fontSize="x-small" fontWeight="thin" > {formatTime(duration) ?? 0} </Text>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default MusicPlayerControllers


function getIndex(songs: PopulatedSong[], targetSong: PopulatedSong) {
    let resp = -1
    songs.forEach((song, index) => {
        if (song.id === targetSong.id) {
            resp = index
        }
    })

    return resp
}