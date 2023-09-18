'use client'

import React, {useState} from 'react'
import styles from './page.module.scss' 
import Link from '~/next/link' 
import { WebauthnForm } from './webauthn/form'
import { PasswordForm } from './password/form'
import queryString from 'query-string'
import { clientConfig } from '@/services/client/config'
import { encodeBase64String } from '@/utils/base64'

export default function Home () {
  let rawQuery = location.search
  const queryParams = queryString.parse(rawQuery)
  if (!queryParams.source) {
    queryParams.source = encodeBase64String(clientConfig.SELF_URL + '/account/signin')
  }
  rawQuery = queryString.stringify(queryParams)

  const [loginMethod, setLoginMethod] = useState<'webauthn'|'password'>('password')

  return <div>
  <div className={styles.loginContainer}>
        <div className={styles.mainBox}>
            <div className={styles.boxTitle}>
                <div className={styles.titleLeft}>
                  注册
                </div>
                <div className={styles.titleRight}>
                  <Link href={''} className={loginMethod === 'password'?'active':''} onClick={()=> {
                    setLoginMethod('password') 
                  }}>账号密码</Link>
                  <div>|</div>
                  <Link href={''} className={loginMethod === 'webauthn'?'active':''} onClick={() => {
                    setLoginMethod('webauthn') 
                  }}>Webauthn</Link>
                </div>
            </div>
            {loginMethod === 'webauthn' 
              ? <WebauthnForm rawQuery={rawQuery} /> 
              : <PasswordForm rawQuery={rawQuery}/>}
            <div className={styles.tipRow}>
                已有账号?
                <Link href={'/account/signin?'+rawQuery}>立即登录</Link>
            </div>
        </div>
    </div> 
        </div>
}
