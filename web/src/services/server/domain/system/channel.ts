import {PSChannelModel} from "@/models/polaris/channel";
import fs from "node:fs";
import frontMatter from "front-matter";
import ignore from "ignore";
import parseURI from "parse-uri";
import {SystemDomain, SystemPathParams} from "@/services/server/domain/system";
import path from "path";
import {base58ToString, generateUuid, stringToBase58, stringToMd5} from "@/utils/basex";
import {SessionModel} from "@/models/session";
import {AccountModel} from "@/models/account";
import {PSArticleModel} from "@/models/polaris/article";

const fileIgnore = ignore().add(['.git', 'node_modules', 'metadata.md'])

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

    async userSession(pathParams: SystemPathParams | undefined) {
        const userSession: SessionModel = {
            account: {
                uid: stringToMd5('anonymous'),
                urn: stringToBase58('anonymous@system'),
                create_time: '',
                update_time: '',
                username: '',
                image: '',
                description: '',
                mail: '',
                nickname: 'anonymous',
                photo: '',
                role: 'anonymous'
            },
            name: 'anonymous',
            token: '',
            domain: 'system',
        }
        return userSession
    }

    async accountInformation(pathParams: SystemPathParams | undefined) {
        const userSession: AccountModel = {
            uid: stringToMd5('anonymous'),
            urn: stringToBase58('anonymous'),
            create_time: '',
            update_time: '',
            username: '',
            image: '/photos/8.png',
            description: '',
            mail: '',
            nickname: 'anonymous',
            photo: '',
            role: 'anonymous',
        }
        return userSession
    }
}
