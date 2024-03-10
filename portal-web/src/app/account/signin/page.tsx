'use client'

import React, {useEffect, useState} from 'react'
import styles from './page.module.scss' 
import Link from '~/next/link' 
import { WebauthnForm } from './webauthn/form'
import { PasswordForm } from './password/form'
import queryString from 'query-string'
import { encodeBase64String } from '@/utils/base64'   
import { IClientConfig, fetchConfig } from '@/services/client/config'

interface ISignMethod {
  key: string, title: string, form: React.ReactElement
}

export default function Home () {
  const [rawQuery, setRawQuery] = useState<string>('')
  const [clientConfig, setClientConfig] = useState<IClientConfig>()

  const [loginMethod, setLoginMethod] = useState<string>()
  const [signMethods, setSignMethods] = useState<ISignMethod[]>([])
  useEffect(() => {
    fetchConfig().then((config) => {
      setClientConfig(config)
      const queryParams = queryString.parse(location.search)
      if (!queryParams.source) {
        queryParams.source = encodeBase64String(config.SELF_URL)
      }
      const rawQuery = queryString.stringify(queryParams)
      setRawQuery(rawQuery)  
    
      const signMethods: ISignMethod[] = []

      if (config.SIGN.PASSWORD.ENABLE) {
        signMethods.push({
          key: 'password',
          title: '账号密码',
          form: 
        <PasswordForm serverUrl={config.SERVER} authServer={config.AUTH_SERVER} rawQuery={rawQuery}/>
        })
      }
      if (config.SIGN.WEBAUTHN.ENABLE) {
        signMethods.push({
          key: 'webauthn',
          title: 'Webauthn',
          form: 
        <WebauthnForm authServer={config.AUTH_SERVER} rawQuery={rawQuery} /> 
        })
      }
      if (signMethods.length === 0) {
        throw new Error('no sign method enabled')
      }
      const defaultSignMethod = signMethods[0]
      setLoginMethod(defaultSignMethod.key)
      setSignMethods(signMethods)

    })
  }, []) 
  if (!clientConfig) {
    return <div>Loading...</div>
  }




  return <div> 
  <div className={styles.loginContainer}>
        <div className={styles.mainBox}>
            <div className={styles.boxTitle}>
                <div className={styles.titleLeft}>
                  登录
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
                还没有账号?
                <Link href={'/account/signup?'+rawQuery}>立即注册</Link>
            </div>
        </div>
    </div> 
        </div>
}
