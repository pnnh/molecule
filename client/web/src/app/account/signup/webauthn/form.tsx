'use client'

import React, {useState} from 'react'
import styles from './form.module.scss'
import {handleSignInSubmit} from '@/services/client/webauthn' 
import {
  Button,
  Input
} from '@fluentui/react-components' 
import { clientConfig } from '@/services/client/config'
import { ArrowCircleRightRegular } from '@fluentui/react-icons'

export 
function WebauthnForm ({rawQuery}: {rawQuery: string}) {
  const [username, setUsername] = useState('')
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
                       <ArrowCircleRightRegular className={styles.verifyButton} title='认证秘钥' onClick={async () => {
                        
                         setVerifyData('')
                         handleSignInSubmit(username).then((verifyData:string|undefined) => {
                    
                           if (!verifyData) {
                             console.log('登陆失败')
                             return
                           }
                           console.log('登陆成功')
                      
                           setVerifyData(verifyData)
                           // formRef.current?.submit()
                         })
                       }}/> 
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
