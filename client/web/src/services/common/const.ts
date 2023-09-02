import { base64url } from 'rfc4648'
import {v4 as uuidv4} from 'uuid'


export function fullAuthUrl (authServer: string, selfUrl: string, state: string): string {

  if (!state || state.length < 8) {
    state = uuidv4().replace(/-/g, '')
  }
  const nonce = uuidv4().replace(/-/g, '')
  const authQuery = `${authServer}/oauth2/auth?client_id=portal&redirect_uri=${selfUrl}/oauth2/code&response_type=code&scope=openid&scopes=openid&nonce=${nonce}&state=${state}`
  return encodeURI(authQuery)
}
 
