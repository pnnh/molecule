import {IDomain} from "@/services/server/domain/domain";
import parseUri from "parse-uri";
import {parseInitialDomains} from "@/services/server/config2";
import parseURI from "parse-uri"
import * as fs from "node:fs"
import ignore from 'ignore'
import {PLSelectResult} from "@/models/common-result";
import {PSChannelModel} from "@/models/polaris/channel";

export class SystemDomain implements IDomain {
    userUri: parseURI.URI = {} as any
    ig = ignore().add(['.git', 'node_modules'])

    constructor(userUri: parseURI.URI) {
        this.userUri = userUri
    }

    async makeGet<T>(urlString: string): Promise<T> {
        const url = parseUri(urlString)
        switch (url.path) {
            case '/articles/channels':
                return this.#selectChannels() as any
        }
        return {} as any
    }

    #selectChannels(): PLSelectResult<PSChannelModel> {
        if (this.userUri.user === 'anonymous') {
            let basePath = ''
            if (this.userUri.host === 'system') {
                const domains = parseInitialDomains()
                if (domains.system.anonymous) {
                    console.debug('anonymous', domains.system.url)
                    basePath = domains.system.url.replace('file://', '')
                }
            }
            const channels: PSChannelModel[] = []
            const files = fs.readdirSync(basePath)
            for (const file of files) {
                const stat = fs.statSync(basePath + '/' + file)
                const testResult = this.ig.test(file)
                if (stat.isDirectory() && !testResult.ignored) {
                    const model: PSChannelModel = {
                        create_time: "", creator: "", nid: 0, profile: "", update_time: "",
                        uid: file,
                        image: '',
                        name: file,
                        description: '',
                        urn: file
                    }
                    channels.push(model)
                }
            }
            return {
                range: channels,
                count: channels.length,
                page: 1,
                size: channels.length
            }
        }
        return {
            range: [],
            count: 0,
            page: 1,
            size: 100
        }
    }
}
