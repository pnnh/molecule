 
import axios from 'axios'
import {CommonResult} from './common-result'
import { serverConfig } from '@/services/server/config'

export class SessionModel {
  pk = ''
  nickname = ''
  username = ''
}

export function genBasicToken (username: string): string {
  if (!username) {
    return ''
  }
  const str = username + ':' + username
  return 'Basic ' + Buffer.from(str).toString('base64')
}

export async function sessionIntrospect (token: string): Promise<SessionModel | null> {
  const url = serverConfig.SERVER + '/account/session/introspect'
  const response = await axios.post<CommonResult<SessionModel>>(url,
    {},
    {
      params: {},
      headers: {Authorization: token},
      withCredentials: true,
    }).catch((error) => {
    console.error('tokenIntrospection', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('getAccountModel', response.data)
  return response.data.data
}
