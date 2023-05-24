'use client'

import React, {useState} from 'react'
import styles from './form.module.scss'

export function FormEdit (props: { server: string }) {
  const [username, setUsername] = useState('larry')
  const [password, setPassword] = useState('f3434#dgd}[f;Oho')
  const [errorMsg, setErrorMsg] = useState('')

  return <form method={'POST'} action={props.server}>
        <div className={styles.boxTitle}>登陆页面</div>
        <div className={styles.fieldRow}>
            <input className={'input input-bordered w-full'} name={'username'} type={'text'}
                   placeholder={'请输入用户名'} value={username} onChange={(event) => {
                     setUsername(event.target.value)
                   }}/>
        </div>
        <div className={styles.fieldRow}>
            <input className={'input input-bordered w-full'} name={'password'} type={'password'}
                   placeholder={'请输入密码'} value={password} onChange={(event) => {
                     setPassword(event.target.value)
                   }
            }/>
        </div>
        {
            errorMsg && <div className={styles.messageRow}>
                <span>{errorMsg}</span>
            </div>
        }
        <div className={styles.actionRow}>
            <button className={'btn'}>登陆</button>
        </div>
    </form>
}
