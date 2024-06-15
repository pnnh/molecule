import {PLSelectResult} from "@/models/common-result";
import {PSChannelModel} from "@/models/polaris/channel";
import fs from "node:fs";
import frontMatter from "front-matter";
import ignore from "ignore";
import parseURI from "parse-uri";
import {SystemDomain, SystemPathParams} from "@/services/server/domain/system";
import path from "path";

const fileIgnore = ignore().add(['.git', 'node_modules'])

export class SystemChannelService {
    systemDomain: SystemDomain

    constructor(systemDomain: SystemDomain) {
        this.systemDomain = systemDomain
    }

    makeGet<T>(url: parseURI.URI, pathParams: SystemPathParams | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async selectChannels(pathParams: SystemPathParams | undefined) {

        const basePath = this.systemDomain.basePath
        const channels: PSChannelModel[] = []
        const files = fs.readdirSync(basePath)
        for (const file of files) {
            const stat = fs.statSync(basePath + '/' + file)
            const testResult = fileIgnore.test(file)
            if (stat.isDirectory() && !testResult.ignored) {
                const model: PSChannelModel = {
                    create_time: "", creator: "", nid: 0, profile: "", update_time: "",
                    uid: file,
                    image: '',
                    name: file,
                    description: '',
                    urn: file
                }
                const metadataFile = basePath + '/' + file + '/metadata.md'
                if (fs.existsSync(metadataFile)) {
                    const metadataText = fs.readFileSync(metadataFile, 'utf-8')
                    const metadata = frontMatter(metadataText).attributes as { image: string, description: string }
                    if (metadata && metadata.description) {
                        model.description = metadata.description
                    }
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

    async readAssets(pathParams: SystemPathParams | undefined) {
        const channelName = pathParams?.channel
        const filePath = pathParams?.path
        if (!channelName || !filePath) {
            throw new Error('channel or path invalid')
        }
        const fullPath = path.join(this.systemDomain.basePath, channelName, 'assets', filePath)
        if (fs.existsSync(fullPath)) {
            return fs.readFileSync(fullPath)
        }
        throw new Error("Method not implemented.");
    }
}
