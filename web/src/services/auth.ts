import 'server-only'
import axios from '~/axios'
import {serverConfig} from './server/config'
import {cookies} from 'next/headers'
import {SessionModel} from "@/models/session";
import {signinDomain, trySigninDomain} from "@/services/server/domain/domain";
import {parseInitialDomains} from "@/services/server/config2";
import {stringToBase58} from "@/utils/basex";

// 获取身份认证信息
export async function getIdentity(): Promise<SessionModel> {
    const cookieStore = cookies()
    const authHeader = cookieStore.toString()//.get('Polaris-Authorization')?.value

    const url = `${serverConfig.NEXT_PUBLIC_SERVER}/account/session`
    const response = await axios.get<SessionModel>(url, {
        headers: {
            Cookie: authHeader,
        },
    })
    return response.data
}

export async function loadSessions() {
    const sessionList: SessionModel[] = []

    const domainConfig = parseInitialDomains()
    for (const name in domainConfig) {
        if (!Object.prototype.hasOwnProperty.call(domainConfig, name) || !domainConfig[name].anonymous) {
            continue
        }
        const userToken = stringToBase58(`anonymous@${name}`)
        const session = await trySigninDomain(userToken)?.makeGet<SessionModel>('/account/session')
        if (session) {
            sessionList.push(session)
        }
    }
    return sessionList
}

// 根据viewer标识获取身份认证信息
export async function getIdentity2(viewerToken: string): Promise<SessionModel> {
    const domain = signinDomain(viewerToken)
    return await domain.makeGet<SessionModel>('/account/session')
}
