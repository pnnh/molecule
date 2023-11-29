import {getSession} from '@/services/auth'
import React from 'react'

export default async function Home () {

  const auth = await getSession()
  console.log('auth:', auth)

  if (!auth) {
    return <div>个人中心页面，您尚未登陆</div>
  }
  return <div>欢迎，{auth.username}</div>
}
