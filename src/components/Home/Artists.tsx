import React from "react";
import { Box, Text } from "@chakra-ui/layout"
import { Artist } from "@prisma/client";
import ArtistListItem from "./ArtistListItem";

interface Props {
    artists: Artist[]
}

const Artists: React.FC<Props> = ({ artists }) => {
    return (
        <Box width="full">
            <Box paddingLeft="1rem" paddingY="1rem" >
                <Text fontSize="md" >Top artists this month </Text>
                <Text fontWeight="thin" >Only visible to you </Text>
            </Box>
            <Box width="full" display="flex" flexDirection="row" gap="3rem" paddingX="1rem" paddingBottom="0.5rem" overflowY="hidden" overflowX="auto" >
                {artists.map(artist => {
                    return <ArtistListItem artist={artist} key={artist.id} />
                })}
                {artists.map(artist => {
                    return <ArtistListItem artist={artist} key={artist.id} />
                })}
            </Box>
        </Box>
    )
}

export default Artists