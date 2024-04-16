import axios from 'axios'
import { cookies } from 'next/headers'
import 'server-only'
import { serverConfig } from './config'

export async function serverMakeHttpGet<T>(url: string): Promise<T> {
  if (url.startsWith('/')) {
    url = serverConfig.NEXT_PUBLIC_SERVER + url
  }
  const cookieStore = cookies()
  const authHeader = cookieStore.toString()
   
  const response = await axios.get<T>(url, {
    headers: {
      Cookie: authHeader,
    },
  })
  return response.data
}  

export async function serverMakeHttpPut<T>(url: string, params: unknown): Promise<T> {
  if (url.startsWith('/')) {
    url = serverConfig.NEXT_PUBLIC_SERVER + url
  }
  const cookieStore = cookies()
  const authHeader = cookieStore.toString()
   
  const response = await axios.put<T>(url, {
    params: params,
    headers: {
      Cookie: authHeader,
    },
  })
  return response.data
}  