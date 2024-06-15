import {base58ToString} from "@/utils/basex";
import {stringToUri} from "@/utils/uri";
import {SystemDomain} from "@/services/server/domain/system";
import {RemoteDomain} from "@/services/server/domain/remote";

export interface IDomain {
    makeGet<T>(url: string): Promise<T>
}

const domainMap = new Map<string, IDomain>()

export function trySigninDomain(userToken: string): IDomain | undefined {
    if (domainMap.has(userToken)) {
        return domainMap.get(userToken)
    }
    const viewerString = base58ToString(userToken)
    const viewerUri = stringToUri(viewerString)
    if (viewerUri.host === 'system') {
        const systemDomain = new SystemDomain(viewerUri)
        domainMap.set(userToken, systemDomain)
        return systemDomain
    } else if (viewerUri.host === 'remote') {
        const systemDomain = new RemoteDomain(viewerUri)
        domainMap.set(userToken, systemDomain)
        return systemDomain
    }
}

export function signinDomain(userToken: string): IDomain {
    const domain = trySigninDomain(userToken)
    if (!domain) {
        throw new Error('domain not found')
    }
    return domain
}
