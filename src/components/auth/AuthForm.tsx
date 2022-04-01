import React, { useState } from "react";
import { Box, Flex, Input, Button, Stack, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { authFetch } from "../../lib/utils/fetchers"
import Image from "next/image"

interface Props {
}

const AuthForm: React.FC<Props> = () => {

    const [mode, setMode] = useState<"login" | "signup">("signup")
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [color, setColor] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const toggleMode = () => {
        setMode(prev => {
            if (prev === "login") {
                return "signup"
            } else {
                setUsername(undefined)
                return "login"
            }
        })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const user = await authFetch(mode, {
                email: email,
                password: password,
                username: username,
                color: color
            })
            if (user) {
                router.push("/")
            } else {
                throw user.error
            }
        } catch (err) {
            setIsLoading(false)
        }
    }

    return (
        <Box width="100vw" height="100vh" bg="black" display="grid" placeItems="center" >
            <Box color="gray.100" padding={5} shadow="md" rounded="md" border="1px">
                <Image src={"/trax.svg"} height={60} width={120} />
                <Flex flexDirection="row" justifyContent="space-between" >
                    {mode === "login" ? "Login" : "Signup"}
                </Flex>
                <form onSubmit={onSubmit} >
                    {
                        error ? <Box> {error} </Box> : null
                    }
                    <Flex flexDirection="column" gap="5" padding="5">
                        {
                            mode === "signup" ? (
                                <>
                                    <Input required={true} value={username ?? ""} placeholder="username" onChange={e => setUsername(e.target.value)} />
                                    <Stack spacing={3}>
                                        <Select required={true} placeholder="Color" onChange={(e) => setColor(e.target.value)} size="lg" >
                                            <option value="gray" > Gray </option>
                                            <option value="red" > Red </option>
                                            <option value="green" > Green </option>
                                            <option value="blue" > Blue </option>
                                        </Select>
                                    </Stack>
                                </>
                            ) : null
                        }
                        <Input required={true} value={email ?? ""} placeholder="email" type="email" onChange={e => setEmail(e.target.value)} />
                        <Input required={true} value={password ?? ""} placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
                        <Button isLoading={isLoading} color="black" type="submit" >
                            Submit
                        </Button >
                        {mode === "login" ?
                            <Box onClick={toggleMode} >
                                new? Signup.
                            </Box> :
                            <Box onClick={toggleMode}>
                                Have an account? Login
                            </Box>
                        }
                    </Flex>
                </form>
            </Box>
        </Box>
    )
}

export default AuthForm