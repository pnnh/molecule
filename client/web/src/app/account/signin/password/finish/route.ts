import {NextRequest, NextResponse} from 'next/server'
import {serverSigninByPasswordFinish} from '@/models/account'
// import {encryptAes} from '@/utils/aes'

export async function POST (request: NextRequest) {
  const requestData = await request.json()
  console.debug('signup finish request: ', requestData)
  const session = requestData.session
  const password = requestData.password
  if (!session || !password) {
    return NextResponse.json({
      code: 400,
      message: 'password不合法'
    })
  }
  const result = await serverSigninByPasswordFinish(session, password)
  console.debug('signup begin result:', result)

  if (!result || result.code !== 200) {
    console.log('Error doing assertion')
    console.error('signin finish error: ', result?.message)
    return
  }
  const response = NextResponse.json(result)
  // const token = encryptAes(result.data.authorization)
  // response.cookies.set('a', token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'strict',
  //   maxAge: 60 * 60 * 24 * 30,
  //   path: '/'
  // })

  return response
}
