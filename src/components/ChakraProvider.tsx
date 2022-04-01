import React from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import "reset-css"

const theme = extendTheme({
    colors: {
        gray: {
            100: "#F5F5F5",
            200: "#EEEEEE",
            300: "#E0E0E0",
            400: "#BDBDBD",
            500: "#9E9E9E",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
        },
        dark: {
            900: "#100021"
        }
    },
    components: {
        Button: {
            variants: {
                link: {
                    ':focus:': {
                        outline: 'none',
                        boxShadow: 'none'
                    }
                }
            }
        }
    }
})

interface Props {
    children: React.ReactNode
}

const ChakraThemeProvider: React.FC<Props> = ({ children }) => {
    return (
        <ChakraProvider theme={theme} >
            {children}
        </ChakraProvider>
    )
}

export default ChakraThemeProvider

