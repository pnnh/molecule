
 
import { loadServerConfig } from '@/services/server/config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET () {
  const serverConfig = await loadServerConfig()
  const result = {
    SERVER: serverConfig.SERVER,
    SELF_URL: serverConfig.SELF_URL,
    AUTH_SERVER: serverConfig.AUTH_SERVER,
    SIGN: serverConfig.SIGN,
  }

  return NextResponse.json(result, { status: 200 })
}
  
