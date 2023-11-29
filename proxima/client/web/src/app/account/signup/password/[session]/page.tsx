'use client'

import React, {useState} from 'react'
import {signupByPasswordFinish} from '@/services/client/account'
import {useRouter} from 'next/navigation'
import styles from './page.module.scss'

export default function Home ({params}: { params: { session: string } }) {
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
                            const result = await signupByPasswordFinish(params.session, password)
                            console.log('register result', result)
                            if (result && result.code === 200) {
                              router.replace('/account/signin')
                            }
                          } else {
                            setErrorMessage('请输入有效的密码')
                          }
                        }}>密码注册
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}
