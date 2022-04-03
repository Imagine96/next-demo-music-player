import { Box, Text, useMediaQuery } from "@chakra-ui/react";

interface Props {
    songName: string
    artistName: string
}

const LeftColumn: React.FC<Props> = ({ songName, artistName }) => {

    const [widthMediaQueryController] = useMediaQuery('(min-width: 700px)')

    return (
        <Box display="grid" placeContent="center"  >
            <Box display="flex" flexDirection="column" >
                <Text fontWeight="thin" maxWidth={widthMediaQueryController ? "auto" : "70%"} fontSize={widthMediaQueryController ? "sm" : "xx-small"} > {songName ? songName : "No selection"}</Text>
                <Text fontWeight="thin" fontSize="x-small" > {artistName ? artistName : "No selection"}</Text>
            </Box>
        </Box>
    )
}

export default LeftColumn