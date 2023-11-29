import {NextRequest, NextResponse} from 'next/server'
import {serverSignupByMailFinish} from '@/models/account'

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
  const result = await serverSignupByMailFinish(session, code)
  console.debug('signup begin result:', result)

  return NextResponse.json(result)
}
