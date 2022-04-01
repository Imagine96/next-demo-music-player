import { NextApiRequest, NextApiResponse } from "next";
import { logIn } from "../../src/lib/utils/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(405)
        res.json({ message: "not allowed" })
    }

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        res.json({ message: "bad req" })
        return
    }

    try {
        await logIn(password, email, res)
        return
    } catch (err) {
        res.status(400)
        res.json({ error: "bad credentials" })
        return
    }
}