import { v4 as uuidv4 } from 'uuid'
import { base64 } from '~/rfc4648'

export function fullAuthUrl (authServer: string|undefined, selfUrl: string|undefined, backPath?: string): string {
  const backUrl = backPath ? `${selfUrl}/${backPath}` : selfUrl
  const enc = new TextEncoder()
  const state = base64.stringify(enc.encode(backUrl))

  const nonce = uuidv4().replace(/-/g, '')
  const authQuery = `${authServer}/oauth2/auth?client_id=huable&redirect_uri=${selfUrl}/oauth2/code&response_type=code&scope=openid&nonce=${nonce}&state=${state}`
  return encodeURI(authQuery)
}
