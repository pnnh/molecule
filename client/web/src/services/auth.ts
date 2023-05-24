import {sessionIntrospect} from '@/models/session'
import {decryptAes} from '@/utils/aes'
import {cookies} from 'next/headers'

export async function getSession () {
  const cookieStore = cookies()
  const token = cookieStore.get('a')

  console.debug('proxyAuthorization:', token)
  if (!token || !token.value) {
    return null
  }
  const auth = decryptAes(token.value)
  if (!auth) {
    return null
  }
  const basicToken = 'Bearer ' + auth
  const result = await sessionIntrospect(basicToken)
  console.debug('result222:', result)
  return result
}
