
import { serverConfig } from '@/services/server/config'
import { NextResponse } from 'next/server'

export async function GET () {
  const result = {
    SERVER: serverConfig.SERVER,
    SELF_URL: serverConfig.SELF_URL,
    AUTH_SERVER: serverConfig.AUTH_SERVER,
    SIGN: serverConfig.SIGN,
  }

  return NextResponse.json(result, { status: 200 })
}
  
