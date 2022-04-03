import React from "react";
import { Box, Flex, Text, useMediaQuery, Center } from "@chakra-ui/react";
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

    const [widthMediaQueryController] = useMediaQuery('(min-width: 700px)')

    return (
        <Box color="white" position="relative" display="flex" flexDirection="column" overflowY="auto" placeItems="center" bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40% , rgba(0,0,0, 0.95) 75%)`} height="100vh" width="full" >
            {noContent ? null : (
                <Flex padding={{ sm: "0.5rem", md: "2rem" }} display="flex" flexDir="row" alignItems="flex-end" bg={`${color}.600`} align="end" width="full" justifyContent={{ sm: "space-between", md: "normal" }} >
                    <Center padding="1rem" >
                        <Image boxSize="10rem" width={widthMediaQueryController ? "auto" : "5rem"} height={widthMediaQueryController ? "auto" : "5rem"} marginTop={widthMediaQueryController ? "auto" : "3rem"} boxShadow="2xl" src={img} borderRadius={roundImage ? "full" : "lg"} />
                    </Center>
                    <Box padding="1rem" h="80%" display="flex" flexDirection="column" justifyContent="flex-end" lineHeight={{ sm: "1rem", md: "2rem" }} >
                        <Text fontSize="x-small" paddingLeft="2" fontWeight="bold" casing="uppercase" >
                            {subtittle}
                        </Text>
                        <Text as="h1" paddingLeft="2" marginY="1rem" fontWeight="light" casing="capitalize" fontSize={{ sm: "lg", md: "6xl" }} >
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