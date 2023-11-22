import {NextRequest, NextResponse} from 'next/server'
import {serverSigninByMailFinish} from '@/models/account'

export async function POST (request: NextRequest) {
  const requestData = await request.json()
  console.debug('signup finish request: ', requestData)
  const session = requestData.session
  const code = requestData.code
  if (!session || !code) {
    return NextResponse.json({
      code: 400,
      message: 'code不合法'
    })
  }
  const result = await serverSigninByMailFinish(session, code)
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
