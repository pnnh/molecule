import { loadServerConfig } from '@/services/server/config'
import {NextRequest, NextResponse} from 'next/server'
import axios from '~/axios' 

export const dynamic = 'force-dynamic'

interface OAuth2Token {
  access_token: string
  expires_in: number
  id_token: string
  token_type: string
  scope: string
}

export async function GET (request: NextRequest) {
  const search = request.nextUrl.searchParams

  const code = search.get('code')
  const scope = search.get('scope')
  const state = search.get('state')
  if (!code || !scope || !state) {
    return NextResponse.error()
  }

  const serverConfig = await loadServerConfig()
  const tokenUrl = `${serverConfig.AUTH_SERVER}/oauth2/token`

  const tokenResponse = await axios.post<OAuth2Token>(
    tokenUrl,
    {
      client_id: serverConfig.ClientId,
      client_secret: serverConfig.ClientSecret,
      grant_type: 'authorization_code',
      redirect_uri: `${serverConfig.SELF_URL}/oauth2/code`,
      code,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      validateStatus: () => true,
    })
  const tokenResult = tokenResponse.data

  if (!tokenResult || !tokenResult.id_token) {
    return NextResponse.error()
  }

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  const response = NextResponse.redirect(serverConfig.SELF_URL)
  const token = tokenResult.id_token
  response.cookies.set('Authorization', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/'
  })

  return response
}
