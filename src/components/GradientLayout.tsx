import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

interface Props {
    img: string
    title: string
    subtittle: string
    description: string
    color: string
    children: React.ReactNode
    roundImage?: boolean
    noContent?: boolean
}

const GradientLayout: React.FC<Props> = ({ img, title, subtittle, description, color, children, roundImage, noContent }) => {
    return (
        <Box color="white" maxHeight="90vh" position="relative" overflowY="auto" overflowX="hidden" placeItems="center" bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40% , rgba(0,0,0, 0.95) 75%)`} height="full" width="full" >
            {noContent ? null : (
                <Flex padding="2rem" height="35%" bg={`${color}.600`} align="end" >
                    <Box padding="1rem" >
                        <Image boxSize="10rem" boxShadow="2xl" src={img} borderRadius={roundImage ? "full" : "lg"} />
                    </Box>
                    <Box padding="1rem" lineHeight="2rem" paddingBottom="5rem" >
                        <Text fontSize="x-small" fontWeight="bold" casing="uppercase" >
                            {subtittle}
                        </Text>
                        <Text as="h1" marginY="1rem" fontWeight="light" casing="capitalize" fontSize="6xl" >
                            {title}
                        </Text>
                        <Text paddingLeft="2" fontSize="x-small" >
                            {description}
                        </Text>
                    </Box>
                </Flex>
            )}
            {children}
        </Box >
    )
}

export default GradientLayout