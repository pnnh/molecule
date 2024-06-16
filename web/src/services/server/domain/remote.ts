import {IDomain} from "@/services/server/domain/domain";
import parseURI from "parse-uri"
import {cookies} from "next/headers";
import {parseInitialDomains} from "@/services/server/config2";

export class RemoteDomain implements IDomain {
    userUri: parseURI.URI
    baseUrl: string

    constructor(userUri: parseURI.URI) {
        this.userUri = userUri

        if (userUri.host !== 'remote') {
            throw new Error('host not supported')
        }
        const domainConfig = parseInitialDomains()
        if (!domainConfig.remote || !domainConfig.remote.url) {
            throw new Error('remote domain not found')
        }
        this.baseUrl = domainConfig.remote.url
    }

    async makeGet<T>(urlString: string) {
        urlString = this.baseUrl + urlString

        const cookieStore = cookies()
        const authHeader = cookieStore.toString()

        const response = await fetch(urlString, {
            credentials: 'include',
            method: 'GET',
            headers: {
                Cookie: authHeader,
                Accept: 'application/json',
            },
        })
        return response.json()
    }
}
