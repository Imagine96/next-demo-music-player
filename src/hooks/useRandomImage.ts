import { useState, useEffect } from "react";

const useRandomImage = () => {
    const [imgUrl, setImage] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        setImage(`https://picsum.photos/250?random=${getRandomInt(20)}`)
        setIsLoading(false)
    }, [])

    return {
        imgUrl,
        isLoading
    }
}

export default useRandomImage