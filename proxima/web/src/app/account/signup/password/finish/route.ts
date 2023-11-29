import {NextRequest, NextResponse} from 'next/server'
import {serverSignupByPasswordFinish} from '@/models/account'

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
  const result = await serverSignupByPasswordFinish(session, password)
  console.debug('signup finish result:', result)

  return NextResponse.json(result)
}
