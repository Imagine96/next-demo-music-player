import { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "../../src/lib/utils/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(405)
        res.json({ message: "not allowed" })
    }

    const { email, password, username, color } = req.body

    if (!email || !password || !username) {
        res.status(400)
        res.json({ message: "bad req" })
        return
    }

    try {
        await signUp(username, password, email, color, res)
        return
    } catch (err) {
        res.status(401)
        res.json({ error: "user already exist" })
        return
    }
}
