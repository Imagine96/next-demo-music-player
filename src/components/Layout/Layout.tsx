import { Box, Center, useMediaQuery } from "@chakra-ui/react"
import Sidebar from "./Sidebar/Sidebar"
import { useState } from "react"
import Playerbar from "./Playbar/Playbar"
import { MdClose, MdMenuOpen } from "react-icons/md"

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    const [childrenMediaQueryController] = useMediaQuery('(max-width: 700px)')

    const [sideBarOpen, setSideBarOpen] = useState<boolean>(childrenMediaQueryController ? false : true)

    return (
        <Box width={"100vw"} overflow="hidden" display={"grid"} position="relative" gridTemplateRows={{ sm: "unset", md: "0.9fr 0.1fr" }} gridAutoColumns={{ sm: "unset", md: "1fr" }} gridGap="0" height={"100vh"} >
            {
                childrenMediaQueryController ? (
                    <Center position="absolute" zIndex="10" top="2rem" marginX="50%" visibility={{ sm: "visible", md: "hidden" }} onClick={() => setSideBarOpen(prev => !prev)} >
                        {sideBarOpen ? <MdClose color="white" fontSize="24px" /> : <MdMenuOpen color="white" fontSize="24px" />}
                    </Center>
                ) : null
            }
            <Box display="grid" overflowY="hidden" height="full" gridTemplateColumns={{ sm: "1fr", md: "0.2fr 0.8fr" }} gridTemplateRows={{ md: "1fr" }} gridGap="0" >
                {sideBarOpen ? <Sidebar /> : null}
                {childrenMediaQueryController ? sideBarOpen ? null : children : children}
            </Box>
            <Box >
                <Playerbar />
            </Box>
        </Box>
    )
}

export default Layout