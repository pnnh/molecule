import { makeAssertion } from '@/models/credential'
import { NextRequest, NextResponse } from 'next/server' 
import { encryptAes } from '@/utils/aes'

export async function POST (request: NextRequest) { 
  const formData = await request.json()
  const username = formData.username
  if (!username) {
    return NextResponse.json({
      code: 400,
      message: 'username is empty'
    })
  }
  const result = await makeAssertion(username, formData.credential)

  if (!result) {
    console.log('makeAssertion 出错，返回空') 
    return
  }
  console.debug('signin finish result:', result)

  // show error
  if (result.code !== 200) {
    console.log('Error doing assertion') 
    console.error('signin finish error: ', result.message)
    return
  }  

  const response = NextResponse.json(result)
  const token = encryptAes(result.data.authorization)
  response.cookies.set('a', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict', 
    maxAge: 60 * 60 * 24 * 30,
    path: '/'
  })

  return response
}
