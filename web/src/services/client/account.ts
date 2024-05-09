'use client'

import axios from '~/axios'

import { SessionModel } from '@/models/session' 
import { CommonResult } from '@/models/common-result'

export function getLoginSession () {
  const url = '/server/account/session'
  const response = axios.get<SessionModel>(url)
  return response
}


export async function signupByMailBegin (username: string, nickname: string) {
  const response = await axios.post<CommonResult<{ session: string }>>('/account/signup/email/begin',
    {username, nickname},
    {
      headers: {},
    }).catch((error) => {
    console.error('registerByMail', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  return response.data
}

export async function signupByMailFinish (session: string, code: string) {
  const response = await axios.post<CommonResult<string>>('/account/signup/email/finish',
    {session, code},
    {
      headers: {},
    }).catch((error) => {
    console.error('registerByMailFinish', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  return response.data
}

export async function signinByMailBegin (username: string) {
  const response = await axios.post<CommonResult<{ session: string }>>('/account/signin/email/begin',
    {username},
    {
      headers: {},
    }).catch((error) => {
    console.error('loginByMailBegin', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  return response.data
}

export async function signinByMailFinish (session: string, code: string) {
  const response = await axios.post<CommonResult<string>>('/account/signin/email/finish',
    {session, code},
    {
      headers: {},
    }).catch((error) => {
    console.error('registerByMailFinish', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  return response.data
}


export async function signupByPasswordBegin (username: string, nickname: string) {
  const response = await axios.post<CommonResult<{ session: string }>>('/account/signup/password/begin',
    {username, nickname},
    {
      headers: {},
    }).catch((error) => {
    console.error('registerByPassword', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  return response.data
}

export async function signupByPasswordFinish (session: string, password: string) {
  const response = await axios.post<CommonResult<string>>('/account/signup/password/finish',
    {session, password},
    {
      headers: {},
    }).catch((error) => {
    console.error('registerByPasswordFinish', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  return response.data
}

export async function signinByPasswordBegin (username: string) {
  const response = await axios.post<CommonResult<{ session: string }>>('/account/signin/password/begin',
    {username},
    {
      headers: {},
    }).catch((error) => {
    console.error('loginByPasswordBegin', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  return response.data
}

export async function signinByPasswordFinish (session: string, password: string) {
  const response = await axios.post<CommonResult<string>>('/account/signin/password/finish',
    {session, password},
    {
      headers: {},
    }).catch((error) => {
    console.error('registerByPasswordFinish', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  return response.data
}
