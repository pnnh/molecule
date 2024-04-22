import {NextRequest, NextResponse} from 'next/server'
import validator from 'validator'
import {serverSigninByMailBegin} from '@/models/account'

export async function POST (request: NextRequest) {
  const requestData = await request.json()
  console.debug('signup finish request: ', requestData)
  const username = requestData.username
  if (!username || !validator.isEmail(username)) {
    return NextResponse.json({
      code: 400,
      message: 'username为空，或不是合法邮箱地址'
    })
  }
  const result = await serverSigninByMailBegin(username)
  console.debug('signup begin result:', result)

  return NextResponse.json(result)
}
