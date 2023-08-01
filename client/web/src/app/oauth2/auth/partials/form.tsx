'use client'

import {ServerAuthParams} from '@/models/common/oauth2/auth'
import React, {useEffect, useState} from 'react'
import queryString from 'query-string'
import styles from './form.module.scss'
import Image from '~/next/image'
import { Button } from '@fluentui/react-components'

export function FormEdit (props: {params: ServerAuthParams, scopes: string[], server: string}) {
  const searchParams = props.params
  const scopes = props.scopes
  const [checked, setChecked] = useState<string[]>(['openid'])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(searchParams.error)

  const isChecked = (item: string) => checked.includes(item)
  const isDisable = (item: string) => item === 'openid'

  const query = queryString.stringify(searchParams)

  const postUrl = props.server + '/oauth2/auth?' + query
  console.log('Home', postUrl)

  const loginForm = <div>
      <div className={styles.fieldRow + ' form-outline mb-4'}>
        <input className="input input-bordered w-full form-control" name={'username'} type="text" placeholder="输入用户名"
               value={username} onChange={(event) => {
                 setUsername(event.target.value)
               }}/>
      </div>
      <div className={styles.fieldRow}>
        <input className="input input-bordered w-full form-control" name={'password'} type="password" placeholder="输入密码"
               value={password} onChange={(event) => {
                 setPassword(event.target.value)
               }}/>
      </div>
    </div>

  const welcomeForm = <div>
    <input type={'hidden'} name={'username'} value={searchParams.authed} />
    您好，<span>{searchParams.authed}</span>
  </div>


  return <form id={'loginForm'} method={'POST'} action={postUrl} onSubmit={(event) => {

    if (checked.length < 1) {
      event.preventDefault()
      setError('请选择授权范围') 
    }
    if (!searchParams.authed && (!username || !password)) {
      event.preventDefault()
      setError('用户名或密码不可为空') 
    }
  }}>

    <div className={styles.loginContainer + ' row'}>
    <div className={styles.loginSection + ' h-100 gradient-form'}>
      <div className={styles.sectionLeft}>

                    <div className={styles.logoRow + ' text-center'}>
                      <Image
                          src="/images/star.jpeg"
                          alt="Star"
                          height={32}
                          width={96}
                          priority={true}
                      />
                    </div>


                    <div className={styles.fieldsRow}>
                        <div className={styles.fieldsRowContent}>

                          <div className={styles.loginFields + ' w-80'}>
                            {searchParams.authed ? welcomeForm : loginForm }
                          </div>

                        </div>
                    </div> 
        {error && <div className={styles.errorRow}>
          <div>{error}</div>
        </div>}
 
      </div>
      <div className={styles.sectionRight}>

        <div className={styles.scopeFields + ' w-64'}>
          <div className={styles.scopeTitle}>
              选择授权范围
          </div>
          {scopes.map((item, index) => (
              <div key={index}>
                {isDisable(item) ? <input type={'hidden'} name={'scopes'} value={item} /> : ''}
                <label>
                  <input value={item} type="checkbox" name={'scopes'} disabled={isDisable(item)} checked={isChecked(item)} onChange={(event) => {
                    let updatedList = [...checked]
                    if (event.target.checked) {
                      updatedList = [...checked, event.target.value]
                    } else {
                      updatedList.splice(checked.indexOf(event.target.value), 1)
                    }
                    setChecked(updatedList)
                    if (updatedList.length < 1) {
                      setError('请选择授权范围') 
                    }
                  }} />
                  <span>{item}</span>
                </label>
              </div>
          ))}
        </div>
      </div>

    </div>
    </div>
      <Button className="btn" type={'submit'}>提交</Button>
    </form>
}
