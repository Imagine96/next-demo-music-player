import prisma from "../prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies[process.env.COOKIEAUTHNAME]
        if (token) {
            try {
                const { id } = jwt.verify(token, process.env.KEYWORD)
                const user = await prisma.user.findUnique({
                    where: {
                        id: id
                    }
                })
                if (!user) {
                    throw "not user found"
                }
                return handler(req, res, user)
            } catch (err) {
                console.log(err)
                res.status(401)
                res.json({ error: err })
                return
            }
        }
        res.status(401)
        res.json({ error: "no authorized" })
        return
    }
}

export const signUp = async (username: string, password: string, email: string, color: string, res: NextApiResponse): Promise<void> => {

    const salt = bcrypt.genSaltSync()
    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: bcrypt.hashSync(password, salt),
            color
        }
    })

    setAuthCookieHeader(user.id, user.email, res)

    res.status(200)
    res.json(user)
    return
}

export const logIn = async (password: string, email: string, res: NextApiResponse): Promise<void> => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (user && bcrypt.compareSync(password, user.password)) {
        setAuthCookieHeader(user.id, user.email, res)

        res.status(200)
        res.json(user)
        return
    } else {
        throw new Error()
    }
}

export function setAuthCookieHeader(id: number, email: string, res: NextApiResponse) {
    const token = jwt.sign({
        email: email,
        id: id,
        time: Date.now()
    },
        process.env.KEYWORD,
        { expiresIn: "8h" }
    )

    res.setHeader("Set-Cookie", cookie.serialize(process.env.COOKIEAUTHNAME, token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    }))
}

export const validateToken = (token) => {
    const user = jwt.verify(token, process.env.KEYWORD)
    return user
}