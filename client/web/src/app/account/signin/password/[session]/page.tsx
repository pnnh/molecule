'use client'

import React, {useState} from 'react'
import {signinByPasswordFinish} from '@/services/client/account'
import {useRouter} from '~/next/navigation'
import styles from '@/app/account/signup/email/[session]/page.module.scss'
import { base64url } from 'rfc4648'
import { decodeBase64String } from '@/utils/base64'

export default function Home ({params,searchParams}: { params: { session: string, 
  searchParams: Record<string, string> } }) {
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  if (!params.session) {
    return <div>无效会话</div>
  }

  return <div className={styles.signupPage}>

        <div className={styles.mainContainer}>
            <div className={styles.mainBox}>
                <h1 className={styles.signupTitle}>输入密码</h1>
                <div className={styles.formBox}>
                    <div className={styles.fieldRow}>
                        <input className="input input-bordered w-full" type="text"
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
                        <button className="btn" onClick={async () => {
                          if (password) {
                            const result = await signinByPasswordFinish(params.session, password)
                            console.log('signin result', result, searchParams.source)
                            if (result && result.code === 200) {
                              const redirectUrl = decodeBase64String(searchParams.source)
                              console.log('redirectUrl', redirectUrl)
                              router.replace(redirectUrl)
                            }
                          } else {
                            setErrorMessage('请输入有效的密码')
                          }
                        }}>密码登陆
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}
