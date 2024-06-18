import {PSChannelModel} from "@/models/polaris/channel";
import fs from "node:fs";
import frontMatter from "front-matter";
import ignore from "ignore";
import {SystemDomain, SystemPathParams} from "@/services/server/domain/system";
import path from "path";
import {base58ToString, generateUuid, stringToBase58, stringToMd5} from "@/utils/basex";

const fileIgnore = ignore().add(['.git', 'node_modules', 'metadata.md'])

export class SystemChannelService {
    systemDomain: SystemDomain

    constructor(systemDomain: SystemDomain) {
        this.systemDomain = systemDomain
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
                    create_time: "", creator: "", profile: "", update_time: "",
                    uid: file,
                    image: '',
                    name: file,
                    description: '',
                    urn: stringToBase58(file)
                }
                const metadataFile = basePath + '/' + file + '/metadata.md'
                if (fs.existsSync(metadataFile)) {
                    const metadataText = fs.readFileSync(metadataFile, 'utf-8')
                    const metadata = frontMatter(metadataText).attributes as
                        { image: string, description: string, title: string }
                    if (metadata) {
                        if (metadata.description) {
                            model.description = metadata.description
                        }
                        if (metadata.image) {
                            model.image = `assets://${metadata.image}`
                        }
                        if (metadata.title) {
                            model.name = metadata.title
                        }
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
        const channelUrn = pathParams?.channel
        const filePath = pathParams?.path
        if (!channelUrn || !filePath) {
            throw new Error('channel or path invalid')
        }
        const channelName = base58ToString(channelUrn)

        const fullPath = path.join(this.systemDomain.basePath, channelName, 'assets', filePath)
        if (fs.existsSync(fullPath)) {
            return fs.readFileSync(fullPath)
        }
        throw new Error("Method not implemented.");
    }
}
