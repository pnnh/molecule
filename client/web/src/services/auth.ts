import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import {logger} from '@/services/logger'
import {appCache} from '@/services/cache'
import axios from '~/axios'
import {base64} from '~/rfc4648'
import {serverConfig} from '@/services/server/config'


interface Oauth2Userinfo {
  username: string
  access_token: string
  id_token: string
}

async function fetchUserinfo (idToken: string) {

  const url = `${serverConfig.SERVER}/oauth2/user`

  const clientId = 'portal'
  const clientSecret = 'foobar'
  const enc = new TextEncoder()
  const data = enc.encode(`${clientId}:${clientSecret}`)
  const basicToken = 'Basic ' + base64.stringify(data)

  const response = await axios.post<Oauth2Userinfo>(
    url,
    {
      id_token: idToken,
    },
    {
      headers: {
        Authorization: basicToken,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
      validateStatus: () => true,
    })
  return response.data
}

async function fetchJwksUri (issuer: string) {
  const response = await fetch(`${issuer}/.well-known/openid-configuration`)
  const wellKnownOut = await response.json()
  if (!wellKnownOut || !wellKnownOut.jwks_uri) {
    throw new Error('jwks_uri为空')
  }
  return wellKnownOut.jwks_uri
}

async function verify (token: string) {
  const decodeOut = jwt.decode(token)
  if (typeof (decodeOut as jwt.JwtPayload).iss === 'string') {
    const {iss: issuer} = (decodeOut as jwt.JwtPayload)
    if (!issuer) {
      throw new Error('issure为空')
    }
    const jwksUri = await fetchJwksUri(issuer)

    const client = jwksClient({
      jwksUri
    })

    const kid = 'af37ec74-039b-4872-ab29-ef3d64fc7cd4'
    const signingKey = await client.getSigningKey(kid)
    const publicKey = signingKey.getPublicKey()

    const verifyResult = await jwt.verify(token, publicKey, {algorithms: ['RS256']})
    logger.debug('id_token验证结果', verifyResult)
    const jwtPayload = verifyResult as jwt.JwtPayload
    if (jwtPayload && jwtPayload.sub) {
      return jwtPayload
    }
  }
  return null
}

// 通过用id_token来获取access_token
export async function getAccessToken () {
  const cookieStore = cookies()
  const idToken = cookieStore.get('Authorization')?.value
  if (!idToken) {
    return undefined
  }
  const decodeToken = jwt.decode(idToken) as jwt.JwtPayload
  if (!decodeToken || !decodeToken.jti || !decodeToken.sub) {
    return undefined
  }

  const cacheKey = 'portal:token:' + decodeToken.jti

  const accessToken = await appCache.get(cacheKey)
  if (accessToken) {
    return 'Bearer ' + accessToken
  }

  const result = await fetchUserinfo(idToken)

  if (result && result.access_token) {
    const exAt = decodeToken.exp ?? 60 * 60 * 24
    await appCache.setExAt(cacheKey, result.access_token, exAt)
    return 'Bearer ' + result.access_token
  }

  return undefined
}

// 获取身份认证信息
export async function getIdentity (): Promise<string | undefined> {
  const cookieStore = cookies()
  const idToken = cookieStore.get('Authorization')?.value
  if (!idToken) {
    return undefined
  }
  const decodeToken = jwt.decode(idToken) as jwt.JwtPayload
  if (!decodeToken || !decodeToken.jti || !decodeToken.sub) {
    return undefined
  }
  const cacheKey = 'portal:identity:' + decodeToken.jti

  const identityModel = await appCache.get(cacheKey)
  if (identityModel) {
    return identityModel
  }

  try {
    const verifyResult = await verify(idToken)
    if (verifyResult && verifyResult.sub) {
      const identity = verifyResult.sub
      const exAt = verifyResult.exp ?? 60 * 60 * 24
      await appCache.setExAt(cacheKey, identity, exAt)
      return identity
    }
  } catch (ex: unknown) {
    logger.error('校验id_token出现异常', ex)
    return undefined
  }

  return undefined
}
