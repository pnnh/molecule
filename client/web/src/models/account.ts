
import axios from 'axios'
import {CommonResult} from './common-result'
import FormData from '~/form-data'
import { serverConfig } from '@/services/server/config'


export interface AccountModel {
  // pk = ''
  // account = ''
  // photo = ''
  // description = ''
  // mail = ''
  // nickname = ''
  pk: string
  username: string
  create_time: Date
  update_time: Date
  description: string 
  photo: string
  nickname: string
  mail: string
}

export async function getAccountModel (token: string): Promise<AccountModel | null> {
  const response = await axios.post<CommonResult<AccountModel>>(serverConfig.SERVER + '/account/userinfo',
    {},
    {
      params: {},
      headers: {Authorization: token},
      withCredentials: true,
    }).catch((error) => {
    console.error('tokenIntrospection', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('getAccountModel', response.data)
  return response.data.data
}

export async function serverSignupByMailBegin (username: string, nickname: string) {
  const requestForm = new FormData()
  requestForm.append('username', username)
  requestForm.append('nickname', nickname)
  const url = serverConfig.SERVER + '/account/signup/email/begin'
  const response = await axios.post<CommonResult<{ session: string }>>(url,
    requestForm,
    {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).catch((error) => {
    console.error('sendCodeToMail', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('getAccountModel', response.data)
  return response.data
}

export async function serverSignupByMailFinish (session: string, code: string) {
  const requestForm = new FormData()
  requestForm.append('session', session)
  requestForm.append('code', code)
  const url = serverConfig.SERVER + '/account/signup/email/finish'
  const response = await axios.post<CommonResult<string>>(url,
    requestForm,
    {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).catch((error) => {
    console.error('sendCodeToMailFinish', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('sendCodeToMailFinish', response.data)
  return response.data
}

export async function serverSigninByMailBegin (username: string) {
  const requestForm = new FormData()
  requestForm.append('username', username)
  const url = serverConfig.SERVER + '/account/signin/email/begin'
  const response = await axios.post<CommonResult<{ session: string }>>(url,
    requestForm,
    {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).catch((error) => {
    console.error('sendCodeToMail', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('getAccountModel', response.data)
  return response.data
}

export async function serverSigninByMailFinish (session: string, code: string) {
  const requestForm = new FormData()
  requestForm.append('session', session)
  requestForm.append('code', code)
  const url = serverConfig.SERVER + '/account/signin/email/finish'
  const response = await axios.post<CommonResult<{ authorization: string }>>(url,
    requestForm,
    {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).catch((error) => {
    console.error('sendCodeToMailFinish', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('sendCodeToMailFinish', response.data)
  return response.data
}

export async function serverSignupByPasswordBegin (username: string, nickname: string) {
  const requestForm = new FormData()
  requestForm.append('username', username)
  requestForm.append('nickname', nickname)
  const url = serverConfig.SERVER + '/account/signup/password/begin'
  const response = await axios.post<CommonResult<{ session: string }>>(url,
    requestForm,
    {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).catch((error) => {
    console.error('sendCodeToMail', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('getAccountModel', response.data)
  return response.data
}

export async function serverSignupByPasswordFinish (session: string, password: string) {
  const requestForm = new FormData()
  requestForm.append('session', session)
  requestForm.append('password', password)
  const url = serverConfig.SERVER + '/account/signup/password/finish'
  const response = await axios.post<CommonResult<string>>(url,
    requestForm,
    {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).catch((error) => {
    console.error('sendCodeToMailFinish', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('sendCodeToMailFinish', response.data)
  return response.data
}

export async function serverSigninByPasswordBegin (username: string) {
  const requestForm = new FormData()
  requestForm.append('username', username)
  const url = serverConfig.SERVER + '/account/signin/password/begin'
  const response = await axios.post<CommonResult<{ session: string }>>(url,
    requestForm,
    {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).catch((error) => {
    console.error('sendCodeToMail', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('getAccountModel', response.data)
  return response.data
}

export async function serverSigninByPasswordFinish (session: string, password: string) {
  const requestForm = new FormData()
  requestForm.append('session', session)
  requestForm.append('password', password)
  const url = serverConfig.SERVER + '/account/signin/password/finish'
  const response = await axios.post<CommonResult<{ authorization: string }>>(url,
    requestForm,
    {
      params: {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).catch((error) => {
    console.error('sendCodeToMailFinish', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('sendCodeToMailFinish', response.data)
  return response.data
}
