'use client'

import React, {useEffect, useState} from 'react'
import styles from './page.module.scss' 
import Link from '~/next/link' 
import { WebauthnForm } from './webauthn/form'
import { PasswordForm } from './password/form'
import queryString from 'query-string'
import { clientConfig } from '@/services/client/config'
import { encodeBase64String } from '@/utils/base64' 
 
import Button from '@mui/material/Button'
export default function Home () {
  const [rawSearch, setRawSearch] = useState<string>('')
  useEffect(() => {
    setRawSearch(location.search)
  }, [])
  const queryParams = queryString.parse(rawSearch)
  if (!queryParams.source) {
    queryParams.source = encodeBase64String(clientConfig.SELF_URL + '/account/signin')
  }
  const rawQuery = queryString.stringify(queryParams)
  
  function getSignMethods () {
    const signMethods: {key: string, title: string, form: React.ReactElement}[] = []
  
    if (clientConfig.SIGN.PASSWORD.ENABLE) {
      signMethods.push({key: 'password', title: '账号密码', form: <PasswordForm rawQuery={rawQuery}/>})
    }
    if (clientConfig.SIGN.WEBAUTHN.ENABLE) {
      signMethods.push({key: 'webauthn', title: 'Webauthn', form: <WebauthnForm rawQuery={rawQuery} /> })
    }
    if (signMethods.length === 0) {
      throw new Error('no sign method enabled')
    }
    return signMethods
  }

  const signMethods=getSignMethods()
  const defaultSignMethod = signMethods[0]
  const [loginMethod, setLoginMethod] = useState<string>(defaultSignMethod.key)
 

  return <div>
  <div className={styles.loginContainer}>
        <div className={styles.mainBox}>
            <div className={styles.boxTitle}>
                <div className={styles.titleLeft}>
                  注册
                </div>
                <div className={styles.titleRight}> 
{
                    signMethods.map((method) => {
                      return <React.Fragment key={method.key}>
                        <Link href={''} className={loginMethod === method.key?'active':''} onClick={()=> {
                          setLoginMethod(method.key)
                        }}>{method.title}</Link>
                      </React.Fragment>
                    })
                  }
                </div>
            </div> 
                {
                signMethods.map((method) => {
                  return <React.Fragment key={method.key}>
                    {loginMethod === method.key && method.form}
                  </React.Fragment>
                })
              }
            <div className={styles.tipRow}>
                已有账号?
                <Link href={'/account/signin?'+rawQuery}>立即登录</Link>
            </div>
        </div>
    </div> 
        </div>
}
