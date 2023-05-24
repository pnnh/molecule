'use client'

import React, {useState} from 'react'
import {signupByMailFinish} from '@/services/client/account'
import {useRouter} from 'next/navigation'
import styles from './page.module.scss'

export default function Home ({params}: { params: { session: string } }) {
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  if (!params.session) {
    return <div>无效会话</div>
  }
  return <div className={styles.signupPage}>

        <div className={styles.mainContainer}>
            <div className={styles.mainBox}>
                <h1 className={styles.signupTitle}>输入注册邮箱验证码</h1>
                <div className={styles.formBox}>
                    <div className={styles.fieldRow}>
                        <input className="input input-bordered w-full" type="text"
                               value={code} onChange={(event) => {
                                 setCode(event.target.value)
                               }}/>
                    </div>
                    {errorMessage &&
                        <div className={styles.messageRow}>
                            <span>{errorMessage}</span>
                        </div>
                    }

                    <div className={styles.actionRow}>
                        <button className="btn" onClick={async () => {
                          if (code) {
                            const result = await signupByMailFinish(params.session, code)
                            console.log('register result', result)
                            if (result && result.code === 200) {
                              router.replace('/account/signin')
                            }
                          } else {
                            setErrorMessage('请输入正确的验证码')
                          }
                        }}>邮箱注册
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}
