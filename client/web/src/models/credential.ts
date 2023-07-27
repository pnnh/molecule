 
import axios from 'axios'
import {CommonReslut} from './common-result'

export async function makeCredentialOptions (username: string, formData: unknown) {
  const url = serverConfig.SERVER + '/account/signup/webauthn/begin/' + username
  const response = await axios.post<CommonReslut<unknown>>(url,
    formData,
    {
      headers: {},
    }).catch((error) => {
    console.error('makeCredentialOptions', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  console.error('makeCredentialOptions', response.data.data)
  return response.data
}

export async function makeCredential (username: string, formData: unknown): Promise<unknown | null> {
  const url = serverConfig.SERVER + '/account/signup/webauthn/finish/' + username
  const response = await axios.post<CommonReslut<unknown>>(url,
    formData,
    {
      headers: {
        'Content-Type': 'application/json'
      },
    }).catch((error) => {
    console.error('makeCredential', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  console.error('makeCredential', response.data.data)
  return response.data
}

export async function makeAssertionOptions (username: string, formData: unknown): Promise<unknown | null> {
  const url = serverConfig.SERVER + '/account/signin/webauthn/begin/' + username
  const response = await axios.post<CommonReslut<unknown>>(url,
    formData,
    {
      headers: {},
    }).catch((error) => {
    console.error('makeAssertionOptions', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  console.error('makeAssertionOptions2', response.data.data)
  return response.data
}

export interface makeAssertionResult {
    authorization: string
}

export async function makeAssertion (username: string, formData: unknown): Promise<CommonReslut<makeAssertionResult> | null> {
  const url = serverConfig.SERVER + '/account/signin/webauthn/finish/' + username
  const response = await axios.post<CommonReslut<makeAssertionResult>>(url,
    formData,
    {
      headers: {
        'Content-Type': 'application/json'
      },
    }).catch((error) => {
    console.error('makeAssertion', error)
    return null
  })
  if (response?.status !== 200) {
    return null
  }
  console.error('makeAssertion2', response.data.data)
  return response.data
}
