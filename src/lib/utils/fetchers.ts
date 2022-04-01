export function fetcher(url: string, data?: any) {

    return fetch(`${window.location.origin}/api${url}`, {
        method: data ? "POST" : "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.status < 399 && res.status >= 200) {
            return res.json()
        } else {
            throw new Error()
        }
    })
}

export const authFetch = (mode: "login" | "signup", body: {
    email: string,
    password: string,
    username?: string,
    color?: string
}) => {
    if (mode === "login") {
        return fetcher(`/${mode}`, body)
    }
    return fetcher(`/${mode}`, body)
}