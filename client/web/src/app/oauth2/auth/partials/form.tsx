'use client'

import {ServerAuthParams} from '@/models/common/oauth2/auth'
import React, {useEffect, useState} from 'react'
import queryString from 'query-string'
import styles from './form.module.scss'
import Image from '~/next/image'
import {Button, message} from 'antd'
import {clientConfig} from '@/services/client/config'
import Qs from 'qs'
import Axios from 'axios'
import Lodash from 'lodash'
import GoCaptchaBtn from './captcha_button'

export function FormEdit (props: {params: ServerAuthParams, scopes: string[], server: string}) {
  const searchParams = props.params
  const scopes = props.scopes
  const [checked, setChecked] = useState<string[]>(['openid'])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [captBase64, setCaptBase64] = useState('')
  const [captThumbBase64, setCaptThumbBase64] = useState('')
  const [captKey, setCaptKey] = useState('')
  const [captStatus, setCaptStatus] = useState('default')
  const [captAutoRefreshCount, setCaptAutoRefreshCount] = useState(0)
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



  const handleRequestCaptCode = () => {
    setCaptBase64('')
    setCaptThumbBase64('')
    setCaptKey('')

    Axios({
      method: 'get',
      url: `${clientConfig.SERVER}/api/go_captcha_data`,
    }).then((response)=>{
      const {data = {}} = response
      if ((data.code || 0) === 0) {
        if (Lodash.isEmpty(data)) {
          return
        }
        setCaptBase64(data.image_base64 || '')
        setCaptThumbBase64(data.thumb_base64 || '')
        setCaptKey(data.captcha_key || '')
      } else {
        message.warning('获取人机验证数据失败').then(r => r)
      }
    })
  }

  const handleConfirm = (dots: {x:number, y:number}[]) => {
    if (Lodash.size(dots) <= 0) {
      message.warning('请进行人机验证再操作')
      return
    }

    const dotArr: number[] = []
    Lodash.forEach(dots, (dot) => {
      dotArr.push(dot.x, dot.y)
    })

    Axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: `${clientConfig.SERVER}/api/go_captcha_check_data`,
      data: Qs.stringify({
        dots: dotArr.join(','),
        key: captKey || ''
      })
    }).then((response)=>{
      const {data = {}} = response

      if ((data.code || 0) === 0) {
        message.success('人机验证成功').then(r => r)

        setCaptStatus('success')
        setCaptAutoRefreshCount(0)
        const form = document.getElementById('loginForm') as HTMLFormElement
        if (form) {
          form.submit()
        }
      } else {
        message.warning('人机验证失败', 0.5).then(r => r)

        if (captAutoRefreshCount > 5) {
          setCaptStatus('overing')
          setCaptAutoRefreshCount(0)

          return
        }

        handleRequestCaptCode()
        setCaptStatus('error')
        setCaptAutoRefreshCount(captAutoRefreshCount + 1)
      }
    })
  }


  return <form id={'loginForm'} method={'POST'} action={postUrl} onSubmit={(event) => {

    if (checked.length < 1) {
      event.preventDefault()
      message.warning('请选择授权范围').then(r => r)
    }
    if (!searchParams.authed && (!username || !password)) {
      event.preventDefault()
      message.warning('用户名或密码不可为空').then(r => r)
    }
  }}>

    <input type={'hidden'} name={'captcha_key'} value={captKey}/>
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
          <div className={styles.captchaRow}>
              <div className={styles.fieldsRowContent}>

                  <div className={styles.loginFields + ' w-80'}>
                      <GoCaptchaBtn
                          class="go-captcha-btn"
                          value={captStatus}
                          width="100%"
                          height="50px"
                          imageBase64={captBase64}
                          thumbBase64={captThumbBase64}
                          changeValue={(val: string) => setCaptStatus(val)}
                          confirm={handleConfirm}
                          refresh={handleRequestCaptCode}
                      />
                  </div>

              </div>
          </div>
        {error && <div className={styles.errorRow}>
          <div>{error}</div>
        </div>}



                    {/*<div className={styles.submitRow}>*/}
                    {/*  <div className={styles.buttons + ' w-80'}>*/}
                    {/*    <div>*/}
                    {/*      <Button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type={'primary'}>*/}
                    {/*          登录*/}
                    {/*      </Button>*/}
                    {/*    </div>*/}
                    {/*    <ErrorElement/>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
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
                      message.warning('请选择授权范围').then(r => r)
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

    </form>
}
