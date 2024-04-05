import 'server-only'
import axios from '~/axios'
import { serverConfig } from './server/config'
import { AccountModel } from '@/models/account'
import { cookies } from 'next/headers'

// 获取身份认证信息
export async function getIdentity (): Promise<AccountModel | undefined> {
  const cookieStore = cookies()
  const authHeader = cookieStore.toString()//.get('Polaris-Authorization')?.value
  
  const url = `${(await serverConfig).SERVER}/account/session`
  const response = await axios.get<AccountModel | undefined>(url, {
    headers: {
      Cookie: authHeader,
    },
  })
  return response.data
}