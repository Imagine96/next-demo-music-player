import { NextRequest, NextResponse } from "next/server";

const WITH_AUTH_PAGES = ["/", "/playlist", "/library"]

export default function middleware(req: NextRequest) {
    if (WITH_AUTH_PAGES.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies[process.env.COOKIEAUTHNAME]
        const url = req.nextUrl.clone()
        url.pathname = '/signin'
        if (!token) {
            return NextResponse.redirect(url)
        }
    }
}