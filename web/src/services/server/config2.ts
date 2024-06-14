import 'server-only'
import {serverConfig} from "@/services/server/config";
import parseUri from "parse-uri";
import * as fs from "node:fs";
import path from "path";

export interface IDomainConfig {
    [name: string]: {
        url: string
        anonymous: boolean
    }
}

export function parseInitialDomains(): IDomainConfig {
    const initialDomains = serverConfig.INITIAL_DOMAINS
    if (!initialDomains || !initialDomains.startsWith('file://')) {
        throw new Error('protocol not supported')
    }
    const filePath = initialDomains.replace('file://', '')
    const fullPath = path.join(process.cwd(), filePath)
    const buffer = fs.readFileSync(fullPath)
    return JSON.parse(buffer.toString())
}
