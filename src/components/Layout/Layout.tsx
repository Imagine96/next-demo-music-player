import { Box } from "@chakra-ui/layout"
import Sidebar from "./Sidebar/Sidebar"
import React from "react"
import Playerbar from "./Playbar/Playbar"

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <Box width={"100vw"} overflow="hidden" display="grid" gridTemplateRows="0.9fr 0.1fr" gridAutoColumns="1fr" gridGap="0" height="100vh" >
            <Box display="grid" gridTemplateColumns="0.2fr 0.8fr" gridTemplateRows="1fr" gridGap="0" >
                <Sidebar />
                {children}
            </Box>
            <Box border="1px" >
                <Playerbar />
            </Box>
        </Box>
    )
}

export default Layout