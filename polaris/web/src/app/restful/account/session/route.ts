import { getIdentity } from '@/services/auth'
import { NextResponse } from 'next/server'

export async function GET () {
  const identity = await getIdentity()
  const result = {
    account: identity
  }
  return NextResponse.json(result, { status: 200 })
}
