import 'server-only'
import axios from '~/axios'
import {serverConfig} from './server/config'
import {cookies} from 'next/headers'
import {SessionModel} from "@/models/session";
import {signinDomain, trySigninDomain} from "@/services/server/domain/domain";

// 获取身份认证信息
export async function getIdentity(): Promise<SessionModel> {
    const cookieStore = cookies()
    const authHeader = cookieStore.toString()//.get('Polaris-Authorization')?.value

    const url = `${(await serverConfig).NEXT_PUBLIC_SERVER}/account/session`
    const response = await axios.get<SessionModel>(url, {
        headers: {
            Cookie: authHeader,
        },
    })
    return response.data
}

// 根据viewer标识获取身份认证信息
export async function getIdentity2(viewerToken: string): Promise<SessionModel> {
    const domain = signinDomain(viewerToken)
    return await domain.makeGet<SessionModel>('/account/session')
}
