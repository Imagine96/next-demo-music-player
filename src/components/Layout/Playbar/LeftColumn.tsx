import { Box, Text } from "@chakra-ui/layout";

interface Props {
    songName: string
    artistName: string
}

const LeftColumn: React.FC<Props> = ({ songName, artistName }) => {
    return (
        <Box display="grid" placeContent="center" >
            <Box display="flex" flexDirection="column" >
                <Text fontWeight="thin" fontSize="sm" > {songName ? songName : "No selection"}</Text>
                <Text fontWeight="thin" fontSize="x-small" > {artistName ? artistName : "No selection"}</Text>
            </Box>
        </Box>
    )
}

export default LeftColumn