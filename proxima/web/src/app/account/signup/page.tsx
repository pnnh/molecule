'use client'

import React, {useState} from 'react'
import validator from 'validator'
import {handleRegisterSubmit} from '@/services/client/webauthn'
import {signupByMailBegin, signupByPasswordBegin} from '@/services/client/account'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.scss'

export default function Home () {
  const [username, setUsername] = useState('xspanni@gmail.com')
  const [displayName, setDisplayName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  return <div className={styles.signupPage}>
        <div className={styles.navBar}>
            <div className={styles.navLeft}>Multiverse</div>
            <div className={styles.navRight}>是否已有账号?
                <Link href={'/account/signin'}>登陆</Link>
            </div>
        </div>
        <div className={styles.mainContainer}>
            <div className={styles.mainBox}>
                <h1 className={styles.signupTitle}>立即注册，免费使用</h1>
                <div className={styles.formBox}>
                    <div className={styles.fieldRow}>
                        <input className="input input-bordered w-full" type="text" placeholder="用户名"
                               value={username} onChange={(event) => {
                                 setUsername(event.target.value)
                               }}/>
                    </div>
                    <div className={styles.fieldRow}>
                        <input className="input input-bordered w-full" type="text" placeholder="昵称"
                               value={displayName} onChange={(event) => {
                                 setDisplayName(event.target.value)
                               }}/>
                    </div>

                    {errorMessage &&
                        <div className={styles.messageRow}>
                            <span>{errorMessage}</span>
                        </div>
                    }

                    <div className={styles.actionRow}>
                        <button className="btn" onClick={() => {
                          handleRegisterSubmit(username, displayName).then(() => {
                            console.debug('注册成功')
                          })
                        }}>Webauthn注册
                        </button>
                        <button className="btn" onClick={async () => {
                          console.log('你点击了邮箱注册', username)
                          if (validator.isEmail(username)) {
                            const result = await signupByMailBegin(username, displayName)
                            console.log('register result', result)
                            if (result && result.code === 200) {
                              router.replace('/account/signup/email/' + result.data.session)
                            }
                          } else {
                            setErrorMessage('请输入正确的邮箱地址')
                          }
                        }}>邮箱验证码注册
                        </button>
                        <button className="btn" onClick={async () => {

                          console.log('你点击了账号密码注册')
                          const result = await signupByPasswordBegin(username, displayName)
                          console.log('register result', result)
                          if (result && result.code === 200) {
                            router.replace('/account/signup/password/' + result.data.session)
                          }
                        }}>账号密码注册
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}
