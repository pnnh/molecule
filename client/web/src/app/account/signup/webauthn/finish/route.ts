import {makeCredential} from '@/models/credential'
import {NextRequest, NextResponse} from 'next/server'

export async function POST (request: NextRequest) {
  const formData = await request.json()
  console.debug('signup finish request: ', formData)
  const username = formData.username
  if (!username) {
    return NextResponse.json({
      code: 400,
      message: 'username is empty'
    })
  }
  const result = await makeCredential(username, formData.credential)
  console.debug('signup begin result:', result)

  return NextResponse.json(result)
}
