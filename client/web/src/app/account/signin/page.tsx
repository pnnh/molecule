'use client'

import React, {useState} from 'react'
import styles from './page.module.scss'
import {handleSignInSubmit} from '@/services/client/webauthn'
import Link from '~/next/link'
import queryString from 'query-string'
import {useRouter} from 'next/navigation'
import {signinByPasswordBegin} from '@/services/client/account'
import {
  Button,
  Input
} from '@fluentui/react-components' 
import { clientConfig } from '@/services/client/config'
export default function Home ({searchParams}: {
  searchParams: Record<string, string>
}) {
  const rawQuery = queryString.stringify(searchParams)
  console.debug('rawQuery', rawQuery)   

  const [loginMethod, setLoginMethod] = useState<'webauthn'|'password'>('webauthn')

  return <div>  
  <div className={styles.loginContainer}>
        <div className={styles.mainBox}>
            <div className={styles.boxTitle}>
                <div className={styles.titleLeft}>
                  登录
                </div>
                <div className={styles.titleRight}>
                  <Link href={''} className={loginMethod === 'webauthn'?'active':''} onClick={() => {
                    setLoginMethod('webauthn') 
                  }}>Webauthn</Link>
                  <div>|</div>
                  <Link href={''} className={loginMethod === 'password'?'active':''} onClick={()=> {
                    setLoginMethod('password') 
                  }}>账号密码</Link>
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

function WebauthnForm ({rawQuery}: {rawQuery: string}) {
  const [username, setUsername] = useState('xspanni@gmail.com')
  const [errorMessage] = useState('')
  const webauthnFormUrl = `${clientConfig.AUTH_SERVER}/account/signin/webauthn/finish/${username}?`+rawQuery
                    
  const [verifyData, setVerifyData] = useState('')
  const formRef = React.useRef<HTMLFormElement>(null)
  return <form method={'POST'} action={webauthnFormUrl} ref={formRef}>
  
  
  <input type="hidden" name="verifyData" value={verifyData} />
  <div className={styles.fieldRow}>
                <Input className="input input-bordered w-full" type="text" placeholder="输入用户名"
                       value={username} onChange={(event) => {
                         setUsername(event.target.value)
                       }}/>
            </div>


            <div className={styles.actionRow}>
                <Button className="btn" onClick={() => {
                  setVerifyData('')
                  handleSignInSubmit(username, rawQuery).then((verifyData:string|undefined) => {
                    
                    if (!verifyData) {
                      console.log('登陆失败')
                      return
                    }
                    console.log('登陆成功')
                      
                    setVerifyData(verifyData)
                    // formRef.current?.submit()
                  })
                }}>认证秘钥
                </Button> 
            </div> 
            {
              verifyData && <div className={styles.actionRow}>
              <Button type={'submit'}>认证成功确认登录</Button>
          </div>
            }
            
            {errorMessage &&
                <div className={styles.messageRow}>
                    <span>{errorMessage}</span>
                </div>
            }
  </form>
}

function PasswordForm ({rawQuery}: {rawQuery: string}) {
  const [username, setUsername] = useState('xspanni@gmail.com')
  const [errorMessage] = useState('')
  const passwordFormUrl = `${clientConfig.AUTH_SERVER}/account/signin/password/finish?`+rawQuery
                    
  const formRef = React.useRef<HTMLFormElement>(null)
  return <form method={'POST'} action={passwordFormUrl} ref={formRef}>
  
  <div className={styles.fieldRow}>
                <Input className="input input-bordered w-full" type="text" placeholder="输入用户名"
                       value={username} onChange={(event) => {
                         setUsername(event.target.value)
                       }}/>
            </div>
 
            {errorMessage &&
                <div className={styles.messageRow}>
                    <span>{errorMessage}</span>
                </div>
            }

            <div className={styles.actionRow}>
                {/* <Button className="btn" onClick={async () => {
                  console.log('你点击了邮箱登陆', username)
                  if (validator.isEmail(username)) {
                    const result = await signinByMailBegin(username)
                    console.log('register result', result)
                    if (result && result.code === 200) {
                      router.replace('/account/signin/email/' + result.data.session + '?' + rawQuery)
                    }
                  } else {
                    setErrorMessage('请输入正确的邮箱地址')
                  }
                }}>邮箱验证码登陆
                </Button> */}
                <Button className="btn" onClick={async () => {
                  console.log('你点击了账号密码登陆')
                  const result = await signinByPasswordBegin(username)
                  console.log('register result', result)
                  if (result && result.code === 200) {
                    window.location.href='/account/signin/password/' + result.data.session + '?' + rawQuery
                  }
                }}>账号密码登陆
                </Button>
            </div>
  </form>
}
