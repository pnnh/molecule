import {IDomain} from "@/services/server/domain/domain";
import {parseInitialDomains} from "@/services/server/config2";
import parseURI from "parse-uri"
import {SystemChannelService} from "@/services/server/domain/system/channel";
import {URLPattern} from "urlpattern-polyfill";
import {SystemArticleService} from "@/services/server/domain/system/article";
import {SystemAccountService} from "@/services/server/domain/system/account";

export type SystemPathParams = {
    [key: string]: string | undefined;
}

export type SystemServiceFunction = (pathParams: SystemPathParams | undefined) => Promise<unknown>

export interface ISystemService {
    makeGet<T>(url: parseURI.URI, pathParams: SystemPathParams | undefined): Promise<T>
}

export class SystemDomain implements IDomain {
    userUri: parseURI.URI
    basePath = ''
    routeMap = new Map<URLPattern, SystemServiceFunction>()

    constructor(userUri: parseURI.URI) {
        this.userUri = userUri

        if (userUri.host !== 'system') {
            throw new Error('host not supported')
        }
        const domains = parseInitialDomains()
        if (domains.system.anonymous) {
            console.debug('anonymous', domains.system.url)
            this.basePath = domains.system.url.replace('file://', '')
        }

        const accountService = new SystemAccountService(this)
        this.#registerRoute('/account/session', accountService, accountService.userSession)
        this.#registerRoute('/account/information', accountService, accountService.accountInformation)

        const channelService = new SystemChannelService(this)
        this.#registerRoute('/articles/channels', channelService, channelService.selectChannels)
        this.#registerRoute('/articles/channels/:channel/assets/:path+', channelService, channelService.readAssets)

        const articleService = new SystemArticleService(this)
        this.#registerRoute('/articles/channels/:channel/posts', articleService, articleService.selectArticles)
        this.#registerRoute('/channels/:channel/articles/:article', articleService, articleService.getArticle)
    }

    #registerRoute(route: string, object: unknown, serviceFunction: SystemServiceFunction) {
        this.routeMap.set(new URLPattern({
            pathname: route,
        }), serviceFunction.bind(object))
    }

    async makeGet<T>(urlString: string) {
        const mockUrl = `http://localhost:3000${urlString}`
        for (const [route, serviceFunction] of this.routeMap) {
            if (route.test(mockUrl)) {
                return await serviceFunction(route.exec(mockUrl)?.pathname.groups) as T
            }
        }
        throw new Error('route not found')
    }

    async makePost<T>(url: string, params: unknown): Promise<T> {
        // 暂不实现更新操作
        return {} as T
    }
}
