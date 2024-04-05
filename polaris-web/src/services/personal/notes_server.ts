import 'server-only'

import axios from '~/axios/index'
import { cookies } from 'next/headers'

export async function serverGet<T>(fullUrl: string) {
  const cookieStore = cookies()
  const authHeader = cookieStore.toString() 

  const response = await axios.get<T>(fullUrl, {
    headers: {
      Cookie: authHeader,
    },
  })
  return response.data 
}