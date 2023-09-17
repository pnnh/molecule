'use client'

import React, {useState} from 'react'
import styles from './page.module.scss' 
import Link from '~/next/link'
import queryString from 'query-string'  
import { WebauthnForm } from './webauthn/form'
import { PasswordForm } from './password/form'
export default function Home ({searchParams}: {
  searchParams: Record<string, string>
}) {
  if (!searchParams.source) {
    searchParams.source = '/'
  }
  let rawQuery = queryString.stringify(searchParams)
  console.debug('rawQuery', rawQuery)   
  // todo 测试目的，验证是否release构建下，rawQuery参数丢失
  rawQuery = rawQuery + '&xxxx=yyyy'

  const [loginMethod, setLoginMethod] = useState<'webauthn'|'password'>('password')

  return <div>  
  <div className={styles.loginContainer}>
        <div className={styles.mainBox}>
            <div className={styles.boxTitle}>
                <div className={styles.titleLeft}>
                  登录
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
                还没有账号?
                <Link href={'/account/signup'}>立即注册</Link>
            </div>
        </div>
    </div> 
        </div>
}
