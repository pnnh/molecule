import {startAuthentication, startRegistration} from '~/@simplewebauthn/browser'
import {AuthenticationResponseJSON} from '~/@simplewebauthn/typescript-types'
import { clientConfig } from './config'

export async function handleRegisterSubmit (username: string, displayName: string) {
  if (!username) {
    console.error('Username is required')
    return
  }

  const attestationType = 'none'

  const authenticatorAttachment = ''

  const userVerification = 'preferred'

  const requireResidentKey = 'false'

  const data = new FormData()
  data.append('username', username)
  data.append('displayName', displayName)
  data.append('attType', attestationType)
  data.append('authType', authenticatorAttachment)
  data.append('userVerification', userVerification)
  data.append('requireResidentKey', requireResidentKey)

  const fetchResult = await fetchMakeCredentialOptions(username, data)
  console.log('fetchResult', fetchResult)
  if (fetchResult.code !== 200 || !fetchResult.data || !fetchResult.data.options) {
    console.log('Error creating credential options')
    console.error('fetchResult.message5', fetchResult.message)
    return
  }

  const makeCredentialOptions = fetchResult.data.options

  console.log('Credential Options Object', makeCredentialOptions) 

  console.log({
    title: 'Registering...',
    text: 'Tap your security key to finish registration.',
    imageUrl: '/images/securitykey.min.svg',
    showCancelButton: true,
    showConfirmButton: false,
    focusConfirm: false,
    focusCancel: false
  })


  console.log('Creating PublicKeyCredential...')


  const attResp = await startRegistration(makeCredentialOptions)
  console.log('attResp', attResp)

  registerNewCredential(username, fetchResult.data.session, attResp)
}

export async function fetchMakeCredentialOptions (username: string, formData: FormData) {
  const response = await fetch('/account/signup/webauthn/begin', {
    method: 'POST', // or 'PUT'
    body: formData, // data can be `string` or {object}!
    headers: {
      Accept: 'application/json'
    }
  })

  return await response.json()
}


// This should be used to verify the auth data with the server
export async function registerNewCredential (username: string, session: string, newCredential: unknown) {
  const formData = {
    username: session,
    credential: newCredential
  }


  const registerResult = await registerCredentialWithServer(username, formData)
  if (registerResult.code !== 200 || !registerResult.data) {
    console.log('Error creating credential')
    console.error('registerResult.message', registerResult.message)
    return
  }

  const response = registerResult.data

  console.log('Credential Object', response)

  // show success
  console.log({
    title: 'Registration Successful!',
    text: 'You\'ve registered successfully.',
    type: 'success',
    timer: 2000
  })

  window.location.href = '/account/signin'
}

export async function registerCredentialWithServer (username: string, formData: unknown) {
  const response = await fetch('/account/signup/webauthn/finish', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(formData), // data can be `string` or {object}!
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  return data
}


export async function handleSignInSubmit (username: string) {
  const formData = new FormData()
  formData.append('username', username)
  
  const res = await fetch('/account/signin/webauthn/begin', {
    method: 'POST', // or 'PUT'
    body: formData, // data can be `string` or {object}!
    headers: {
      Accept: 'application/json'
    }
  })
  const fetchResult = await res.json()
  if (fetchResult.code !== 200 || !fetchResult.data) {
    console.log('Error creating assertion options')
    console.error('fetchResult.message3', fetchResult.message)
    return
  }

  const makeAssertionOptions = fetchResult.data.options

  console.log('Assertion Options Object', fetchResult.data)

  // console.log({
  //   title: 'Logging In...',
  //   text: 'Tap your security key to login.',
  //   imageUrl: '/images/securitykey.min.svg',
  //   showCancelButton: true,
  //   showConfirmButton: false,
  //   focusConfirm: false,
  //   focusCancel: false
  // })

  const attResp = await startAuthentication(makeAssertionOptions)
  console.log('attResp', attResp)

  //await verifyAssertionWithServer(fetchResult.data.session, attResp, rawQuery)

  return JSON.stringify(attResp)
}


export async function verifyAssertionWithServer (session: string, 
  assertedCredential: AuthenticationResponseJSON,
  rawQuery: string) {
  // const formData = {
  //   username: session,
  //   credential: assertedCredential
  // }
  const webauthnFormUrl = `${clientConfig.AUTH_SERVER}/account/signin/webauthn/finish/${session}?`+rawQuery
    
  let response
  try {
    const res = await fetch(webauthnFormUrl, {
      method: 'POST',
      body: JSON.stringify(assertedCredential),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    response = await res.json()
  } catch (e) {
    console.error('Request to server failed', e)
    throw e
  }

  console.log('Assertion Object', response)

  // show error
  if (response.code !== 200 || !response.data) {
    console.log('Error doing assertion')
    console.log(response.errorMessage)
    console.error(response.errorMessage)
    return
  }

  // show success message
  console.log({
    title: 'Logged In!',
    text: 'You\'re logged in successfully.',
    type: 'success',
    timer: 2000
  })

  // redirect?
  window.location.href = response.data.source
}

