import React from "react";
import Image from "next/image";
import Link from "next/link"
import { Box, List, Text, ListIcon, Divider, LinkBox, LinkOverlay, ListItem } from "@chakra-ui/layout";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from "react-icons/md";

const NAVMENU: {
    name: string,
    icon: any,
    link: string
}[] = [{
    name: "Home",
    icon: MdHome,
    link: "/"
}, {
    name: "Search",
    icon: MdSearch,
    link: "/search"
}, {
    name: "Your library",
    icon: MdLibraryMusic,
    link: "/library"
},]

const MUSICMENU: typeof NAVMENU = [
    {
        name: "Create Playlist",
        icon: MdPlaylistAdd,
        link: "/"
    }, {
        name: "favorites",
        icon: MdFavorite,
        link: "/favorites"
    }
]

const Sidebar: React.FC = ({ }) => {

    const { playlists, isLoading, error } = usePlaylist()

    return (
        <Box paddingY="2" display="grid" gridTemplateRows="0.1fr 0.2fr 1fr" gridTemplateColumns="1fr" gridGap="2" bg="black" textColor="gray.100" >
            <Box width="full" marginY="10px" borderColor={"gray.200"} paddingX="1rem" display="flex" gap="10px" flexDirection="row" placeItems="center" justifyContent="space-between" >
                <Image src="/White logo - no background.svg" height={50} width={180} ></Image>
                <Link href="https://github.com/Imagine96" passHref >
                    <a target="_blank" >
                        <Image src="/github-icon-2.svg" height={30} width={30} ></Image>
                    </a>
                </Link>
            </Box>
            <Box width="full"  >
                <List>
                    {NAVMENU.map(nav => (
                        <ListItem marginY={1} _hover={{
                            bg: "dark.900",
                            transition: "background-color 0.3s"
                        }} display="flex" padding="0.2rem" paddingLeft={"2rem"} backgroundColor="#000000" flexDirection="row" placeItems="center" fontSize={14} key={nav.name} >
                            <LinkBox>
                                <Link href={nav.link} >
                                    <LinkOverlay>
                                        <ListIcon as={nav.icon} color={"white"} />
                                        <Text display="inline" color={"white"}> {nav.name} </Text>
                                    </LinkOverlay>
                                </Link>
                            </LinkBox>
                        </ListItem>
                    ))}
                </List>
                <Divider marginY={2.5} color="gray.900" width="70%" marginX="2rem" />
                <List>
                    {MUSICMENU.map(nav => (
                        <ListItem marginY={1} _hover={{
                            bg: "dark.900",
                            transition: "background-color 0.3s"
                        }} display="flex" padding="0.2rem" paddingLeft={"2rem"} backgroundColor="#000000" flexDirection="row" placeItems="center" fontSize={14} key={nav.name} >
                            <LinkBox>
                                <Link href={nav.link} >
                                    <LinkOverlay>
                                        <ListIcon as={nav.icon} color="white" />
                                        {nav.name}
                                    </LinkOverlay>
                                </Link>
                            </LinkBox>
                        </ListItem>
                    ))}
                </List>
                <Divider marginY={2.5} color="gray.900" width="70%" marginX="2rem" />
            </Box>
            <Box overflowY="auto" maxHeight="50vh" paddingY="10px">
                <Box paddingLeft="2rem" >
                    Your Playlists
                </Box>
                <List>
                    {playlists?.map(playlist => (
                        <ListItem marginY={1} _hover={{
                            bg: "dark.900",
                        }} display="flex" transition="background-color 0.3s" padding="0.2rem" paddingLeft={"2rem"} backgroundColor="#000000" flexDirection="row" placeItems="center" fontSize={14} key={playlist.id} >
                            <LinkBox>
                                <Link href={`/playlist/${playlist.id}`} >
                                    <LinkOverlay>
                                        {playlist.name}
                                    </LinkOverlay>
                                </Link>
                            </LinkBox>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default Sidebar