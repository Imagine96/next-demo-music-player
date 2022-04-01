import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../src/lib/utils/auth";
import { getPlaylists } from "../../src/lib/utils/playlist";

const handler = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const playlist = await getPlaylists(user.id)
    res.status(200)
    res.json(playlist)
}

export default validateRoute(handler)