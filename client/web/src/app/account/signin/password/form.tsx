'use client'

import React, {useState} from 'react'
import styles from './form.module.scss' 
import {signinByPasswordBegin} from '@/services/client/account'
import {
  Button,
  Input
} from '@fluentui/react-components' 
import { clientConfig } from '@/services/client/config'
import { ArrowCircleRightRegular } from '@fluentui/react-icons'


export function PasswordForm ({rawQuery}: {rawQuery: string}) {
  const [username, setUsername] = useState('xspanni@gmail.com')
  const [errorMessage] = useState('')
  // todo 测试目的，验证是否release构建下，rawQuery参数丢失
  rawQuery = rawQuery + '&aaaa=bbbb&cccc'
  const passwordFormUrl = `${clientConfig.AUTH_SERVER}/account/signin/password/finish?`+rawQuery
                      
  const [password, setPassword] = useState('')
  const [verifyData, setVerifyData] = useState('')
  const formRef = React.useRef<HTMLFormElement>(null)
  return <form method={'POST'} action={passwordFormUrl} ref={formRef}>
    
    <input type="hidden" name="session" value={verifyData} />
    <div className={styles.fieldRow}>
    <Input className="input input-bordered w-full" type="text" placeholder="输入用户名"
            value={username} onChange={(event) => {
              setUsername(event.target.value)
            }}/> 
                <ArrowCircleRightRegular className={styles.verifyButton} width={64} onClick={async () => {
                  console.log('你点击了账号密码登陆')
                  const result = await signinByPasswordBegin(username)
                  if (result && result.code === 200) {
                    setVerifyData(result.data.session)
                  } 
                }}/> 
            </div>
   
              {
                verifyData && <div className={styles.actionRow}>
                 <Input name='password' className="input input-bordered w-full" type="password" placeholder="输入密码"
                                 value={password} onChange={(event) => {
                                   setPassword(event.target.value)
                                 }}/>
            </div>
              }
              {
                verifyData && <div className={styles.actionRow}>
                <Button type={'submit'}>确认登录</Button>
            </div>
              }
              {errorMessage &&
                  <div className={styles.messageRow}>
                      <span>{errorMessage}</span>
                  </div>
              }
    </form>
}
  
