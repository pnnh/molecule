import {NextRequest, NextResponse} from 'next/server'
import {sessionForwardToServer} from '@/services/forward'
import queryString from '~/query-string'

interface IPUTParams {
  params: {
    path: string[]
  }
}

export async function GET (request: NextRequest, {params}: IPUTParams) {
  console.debug('path:', params.path)

  const path = '/server/' + params.path.join('/') + request.nextUrl.search

  //const data = await request.json()

  const result = await sessionForwardToServer('GET',
    path, {}, request.headers.get('Content-Type') || '')

  return NextResponse.json(result)
}

export async function DELETE (request: NextRequest, {params}: IPUTParams) {
  const path = '/server/' + params.path.join('/')

  const result = await sessionForwardToServer(
    'DELETE',
    path, {}, request.headers.get('Content-Type') || '')

  return NextResponse.json(result)
}

export async function PUT (request: NextRequest, {params}: IPUTParams) {
  console.debug('path:', params.path)

  const path = '/server/' + params.path.join('/')

  const data = await request.arrayBuffer()
  const contentType = request.headers.get('Content-Type') || ''

  const result = await sessionForwardToServer('PUT',
    path, data, contentType)

  return NextResponse.json(result)
}

export async function POST (request: NextRequest, {params}: IPUTParams) {
  const parsedUrl = queryString.parseUrl(request.nextUrl.href)
  const stringQuery = queryString.stringify(parsedUrl.query)
  const path = '/server/' + params.path.join('/') + '?' + stringQuery
  const data = await request.arrayBuffer()
  const contentType = request.headers.get('Content-Type') || ''
  const result = await sessionForwardToServer(
    'POST',
    path, data, contentType)

  return NextResponse.json(result)
}
