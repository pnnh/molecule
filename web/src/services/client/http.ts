import axios from 'axios'
import { serverConfig } from '../server/config'

export async function clientMakeHttpGet<T>(url: string): Promise<T> {
  if (url.startsWith('/')) {
    url = serverConfig.NEXT_PUBLIC_SERVER + url
  }
  const response = await axios.get<T>(url, {})
  return response.data
}  

export async function clientMakeHttpPut<T>(url: string, params: unknown): Promise<T> {
  if (url.startsWith('/')) {
    url = serverConfig.NEXT_PUBLIC_SERVER + url
  } 
   
  const response = await axios.put<T>(url, {
    params: params, 
  })
  return response.data
}  