import {NextRequest, NextResponse} from 'next/server'
import {serverSignupByPasswordBegin} from '@/models/account'

export async function POST (request: NextRequest) {
  const requestData = await request.json()
  console.debug('signup finish request: ', requestData)
  const username = requestData.username
  const nickname = requestData.nickname
  if (!username) {
    return NextResponse.json({
      code: 400,
      message: 'username为空'
    })
  }
  const result = await serverSignupByPasswordBegin(username, nickname)
  console.debug('signup begin result:', result)

  return NextResponse.json(result)
}
