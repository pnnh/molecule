import 'server-only'
import {serverConfig} from "@/services/server/config";
import {cookies} from "~/next/headers";
import axios from "~/axios";

export async function serverMakeHttpPost<T>(url: string, params: unknown): Promise<T> {
    if (url.startsWith('/')) {
        url = serverConfig.INTERNAL_SERVER + url
    }
    const cookieStore = cookies()
    const authHeader = cookieStore.toString()

    const response = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {
            Cookie: authHeader,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(params),
    })
    return response.json()
}


export async function serverMakeHttpGetV2<T>(url: string): Promise<T> {
    if (url.startsWith('/')) {
        url = serverConfig.INTERNAL_SERVER + url
    }
    const cookieStore = cookies()
    const authHeader = cookieStore.toString()

    const response = await fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
            Cookie: authHeader,
            Accept: 'application/json',
        },
    })
    return response.json()
}
