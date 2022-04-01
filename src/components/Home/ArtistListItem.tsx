import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Image, Spinner } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import useRandomImage from "../../hooks/useRandomImage"

interface Props {
    artist: Artist
}

const ArtistListItem: React.FC<Props> = ({ artist }) => {

    const { imgUrl, isLoading } = useRandomImage()

    return (
        <Box maxWidth="8rem" transition="all" _hover={{
            boxShadow: "2xl"
        }} minWidth="8rem" display="flex" flexDirection="column" placeItems="center" gap="2" boxShadow="xl" borderRadius="lg" padding="0.5rem" >
            {isLoading ? <Spinner /> : <Image boxSize="4rem" borderRadius="full" width="80%" height="full" src={imgUrl} alt="random img" />}
            <Text fontSize="sm" fontWeight="semibold" > {artist.name} </Text>
            <Text fontSize="sm" fontWeight="thin" > Artist </Text>
        </Box >
    )
}

export default ArtistListItem