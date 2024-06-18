import fs from "node:fs";
import frontMatter from "front-matter";
import ignore from "ignore";
import {SystemDomain, SystemPathParams} from "@/services/server/domain/system";
import path from "path";
import {base58ToString, generateUuid, stringToBase58, stringToMd5} from "@/utils/basex";
import {PSArticleModel} from "@/models/polaris/article";

const fileIgnore = ignore().add(['.git', 'node_modules', 'metadata.md'])

export class SystemArticleService {
    systemDomain: SystemDomain

    constructor(systemDomain: SystemDomain) {
        this.systemDomain = systemDomain
    }

    async selectArticles(pathParams: SystemPathParams | undefined) {
        const channelUrn = pathParams?.channel
        if (!channelUrn) {
            throw new Error('channel invalid')
        }
        const channelName = base58ToString(channelUrn)
        const basePath = path.join(this.systemDomain.basePath, channelName)
        const articles: PSArticleModel[] = []
        const files = fs.readdirSync(basePath)
        for (const file of files) {
            const fullPath = path.join(basePath, file)
            const stat = fs.statSync(fullPath)
            const testResult = fileIgnore.test(file)
            const extName = path.extname(file)
            if (stat.isFile() && !testResult.ignored && extName === '.md') {
                const fileName = file.replace('.md', '')
                const model: PSArticleModel = {
                    discover: 0,
                    create_time: "", creator: "", update_time: "",
                    uid: generateUuid(),
                    description: '',
                    urn: '',
                    title: fileName,
                    header: 'markdown',
                    body: '',
                    keywords: '',
                    cover: '',
                    owner: '',
                    owner_name: '',
                    channel: channelUrn,
                    channel_urn: channelUrn,
                    channel_name: '',
                    partition: '',
                    path: ''
                }
                model.urn = stringToBase58(fileName)
                const metadataText = fs.readFileSync(fullPath, 'utf-8')
                const metadata = frontMatter(metadataText).attributes as
                    { image: string, description: string, title: string }
                if (metadata) {
                    if (metadata.description) {
                        model.description = metadata.description
                    }
                    if (metadata.image) {
                        model.cover = `assets://${metadata.image}`
                    }
                    if (metadata.title) {
                        model.title = metadata.title
                    }
                }
                articles.push(model)
            }
        }
        return {
            range: articles,
            count: articles.length,
            page: 1,
            size: articles.length
        }
    }

    async getArticle(pathParams: SystemPathParams | undefined) {
        const channelUrn = pathParams?.channel
        const articleUrn = pathParams?.article
        if (!channelUrn || !articleUrn) {
            throw new Error('channel or article invalid')
        }
        const channelName = base58ToString(channelUrn)
        const articleName = base58ToString(articleUrn)
        const fullPath = path.join(this.systemDomain.basePath, channelName, articleName + '.md')

        const stat = fs.statSync(fullPath)
        if (stat.isFile()) {
            const model: PSArticleModel = {
                discover: 0,
                create_time: "", creator: "", update_time: "",
                uid: generateUuid(),
                description: '',
                urn: '',
                title: articleName,
                header: 'markdown',
                body: '',
                keywords: '',
                cover: '',
                owner: '',
                owner_name: '',
                channel: channelUrn,
                channel_urn: channelUrn,
                channel_name: '',
                partition: '',
                path: ''
            }
            model.urn = stringToBase58(articleName)
            const metadataText = fs.readFileSync(fullPath, 'utf-8')
            model.body = metadataText
            const metadata = frontMatter(metadataText).attributes as
                { image: string, description: string, title: string }
            if (metadata) {
                if (metadata.description) {
                    model.description = metadata.description
                }
                if (metadata.image) {
                    model.cover = `assets://${metadata.image}`
                }
                if (metadata.title) {
                    model.title = metadata.title
                }
            }
            return model
        }
    }
}
