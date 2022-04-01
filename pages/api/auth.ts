import { validateRoute } from "../../src/lib/utils/auth"
import { setAuthCookieHeader } from "../../src/lib/utils/auth"
import prisma from "../../src/lib/prisma"

export default validateRoute(async (req, res, user) => {
    setAuthCookieHeader(user.id, user.email, res)
    const playListCount = await prisma.playlist.count({
        where: {
            userId: user.id
        }
    })

    res.json({ ...user, playListCount })
})