'use client'

import React, {useState} from 'react'
import styles from '@/app/account/signup/email/[session]/page.module.scss'
import { clientConfig } from '@/services/client/config'
import queryString from 'query-string'
import { Button, Input } from '@fluentui/react-components'

export default function Home ({params, searchParams}: { params: { session: string }, 
  searchParams: Record<string, string> }) { 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  if (!params.session) {
    return <div>无效会话</div>
  }
  const formUrl = `${clientConfig.AUTH_SERVER}/account/signin/password/finish?`+queryString.stringify(searchParams)

  return <div className={styles.signupPage}>
 <form method={'POST'} action={formUrl}>
  <input type="hidden" name="session" value={params.session} />
        <div className={styles.mainContainer}>
            <div className={styles.mainBox}>
                <h1 className={styles.signupTitle}>输入密码</h1>
                <div className={styles.formBox}>
                    <div className={styles.fieldRow}>
                        <Input name='password' className="input input-bordered w-full" type="password" placeholder="输入密码"
                               value={password} onChange={(event) => {
                                 setPassword(event.target.value)
                               }}/>
                    </div>
                    {errorMessage &&
                        <div className={styles.messageRow}>
                            <span>{errorMessage}</span>
                        </div>
                    }

                    <div className={styles.actionRow}>
                        <Button className="btn" type='submit'>密码登陆</Button>
                    </div>
                </div>
            </div>
 
        </div>
    </form>
    </div>
}
