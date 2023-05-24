import {RestfulAddress} from '@/utils/config'
import axios from 'axios'
import {CommonReslut} from './common-result'
import FormData from '~/form-data'


export class AccountModel {
  pk = ''
  account = ''
  photo = ''
  description = ''
  mail = ''
  nickname = ''
}

export async function getAccountModel (token: string): Promise<AccountModel | null> {
  const response = await axios.post<CommonReslut<AccountModel>>(RestfulAddress.ServerUrl + '/account/userinfo',
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
  const url = RestfulAddress.ServerUrl + '/account/signup/email/begin'
  const response = await axios.post<CommonReslut<{ session: string }>>(url,
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
  const url = RestfulAddress.ServerUrl + '/account/signup/email/finish'
  const response = await axios.post<CommonReslut<string>>(url,
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
  const url = RestfulAddress.ServerUrl + '/account/signin/email/begin'
  const response = await axios.post<CommonReslut<{ session: string }>>(url,
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
  const url = RestfulAddress.ServerUrl + '/account/signin/email/finish'
  const response = await axios.post<CommonReslut<{ authorization: string }>>(url,
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
  const url = RestfulAddress.ServerUrl + '/account/signup/password/begin'
  const response = await axios.post<CommonReslut<{ session: string }>>(url,
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
  const url = RestfulAddress.ServerUrl + '/account/signup/password/finish'
  const response = await axios.post<CommonReslut<string>>(url,
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
  const url = RestfulAddress.ServerUrl + '/account/signin/password/begin'
  const response = await axios.post<CommonReslut<{ session: string }>>(url,
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
  const url = RestfulAddress.ServerUrl + '/account/signin/password/finish'
  const response = await axios.post<CommonReslut<{ authorization: string }>>(url,
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
