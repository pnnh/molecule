import {v4 as uuidv4} from 'uuid'
import {base64} from '~/rfc4648'
import {serverConfig} from '../server/config'

export function fullAuthUrl(backPath?: string): string {
    const backUrl = serverConfig.SELF_URL + (backPath || '')
    const enc = new TextEncoder()
    const state = base64.stringify(enc.encode(backUrl))

    const nonce = uuidv4().replace(/-/g, '')
    const authQuery = `${serverConfig.AUTH_SERVER}/oauth2/auth?client_id=polaris&redirect_uri=${serverConfig.SERVER}/oauth2/code&response_type=code&scope=openid&nonce=${nonce}&state=${state}`
    return encodeURI(authQuery)
}
