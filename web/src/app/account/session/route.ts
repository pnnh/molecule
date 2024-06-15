import {NextRequest, NextResponse} from 'next/server'
import {loadSessions} from "@/services/auth";

export async function GET(request: NextRequest) {
    console.debug('signup begin result:', request.url, request.nextUrl.pathname)

    const sessionList = await loadSessions()
    return NextResponse.json({
        sessions: sessionList
    })
}