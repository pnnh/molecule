import {NextRequest, NextResponse} from 'next/server'
import {signinDomain} from "@/services/server/domain/domain";
import mime from 'mime-types'

interface RouteParams {
    viewer: string,
    channel: string,
    path: string[]
}

export async function GET(request: NextRequest,
                          {params}: { params: RouteParams }) {

    console.debug('signup begin result:', request.url, request.nextUrl.pathname, params)

    const domain = signinDomain(params.viewer)
    const url = `/articles/channels/${params.channel}/assets/${params.path.join('/')}`
    const result = await domain.makeGet<ArrayBuffer>(url)
    const mimeType = mime.lookup(params.path[params.path.length - 1]) || 'application/octet-stream'

    return new Response(result, {headers: {'Content-Type': mimeType}});
}