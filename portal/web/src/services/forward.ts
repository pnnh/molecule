import axios, {Method} from '~/axios'
import {getAccessToken} from '@/services/auth' 
import { loadServerConfig } from './server/config'

export async function sessionForwardToServer<T> (
  method: Method,
  path: string,
  data: object,
  contentType: string,) {
  const token = await getAccessToken()
  const serverConfig = await loadServerConfig()
  const url = serverConfig.SERVER + path

  const response = await axios<T>(
    {
      method,
      url,
      data,
      headers: {
        Authorization: token,
        'Content-Type': contentType
      },
      withCredentials: true,
      validateStatus: () => true,
    })
  return response
}