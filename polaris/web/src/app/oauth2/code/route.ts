import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { decodeBase64String } from '~/@pnnh/stele/esm/utils/base64'
import { loadServerConfig } from '@/services/server/config'

interface OAuth2Token {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
    created_at: number
    id_token: string
}

export async function GET (request: NextRequest) {
  const search = request.nextUrl.searchParams
  const code = search.get('code')
  const state = search.get('state')
  const scope = search.get('scope')
  const error = search.get('error')
  if (error || !code || !scope || !state) {
    return NextResponse.error()
  }

  const stateDecode = decodeBase64String(state)
  console.log('sourceUrl', stateDecode)
  const sourceUrl = new URL(stateDecode)
  console.log('sourceUrl222', sourceUrl)

  const serverConfig = await loadServerConfig()

  const tokenUrl = `${serverConfig.AUTH_SERVER}/oauth2/token`

  const tokenResponse = await axios.post<OAuth2Token>(
    tokenUrl,
    {
      client_id: 'polaris',
      client_secret: 'foobar',
      grant_type: 'authorization_code',
      redirect_uri: `${serverConfig.SELF_URL}/oauth2/code`,
      code
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  const tokenResult = tokenResponse.data

  if (!tokenResult || !tokenResult.id_token || !tokenResult.access_token) {
    return NextResponse.error()
  }
  let redirectPath = sourceUrl.pathname
  if (redirectPath === '/') {
    redirectPath = '/console'
  }
  const redirectUrl = `${serverConfig.SELF_URL}${redirectPath}${sourceUrl.search}`
  const response = NextResponse.redirect(redirectUrl)
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
