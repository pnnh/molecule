import { makeCredentialOptions } from '@/models/credential'
import { NextRequest, NextResponse } from 'next/server'


export async function POST (request: NextRequest) { 
  
  const formData = await request.formData()
  
  console.debug('signin begin request:', formData)
  const username = formData.get('username')?.toString()
  if (!username) {
    return NextResponse.json({
      code: 400,
      message: 'username is empty'
    })
  }
  const result = await makeCredentialOptions(username, formData)
  console.debug('signin begin result:', result)
  
  return NextResponse.json(result)

}
