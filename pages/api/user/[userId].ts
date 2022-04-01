import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../src/lib/utils/auth";
import { updateFavorites } from "../../../src/lib/utils/user";

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {

    if (req.method !== "POST") {
        res.status(400)
        res.json({ message: "not allowed" })
        return
    }

    try {
        const favorites = req.body.favorites
        const updatedUser = await updateFavorites(user.id, favorites)
        res.status(200)
        res.json(updatedUser)
        return
    } catch (err) {
        res.status(500)
        res.json({ message: "something went wrong" })
        return
    }

}

export default validateRoute(handler)