'use client'

import React, {useState} from 'react'
import styles from './form.module.scss' 
import Lodash from 'lodash'

import { clientConfig } from '@/services/client/config'
import GoCaptchaBtn from '@/components/captcha/captcha_button'
import Axios from 'axios'
import Qs from 'qs'


export function PasswordForm ({rawQuery}: {rawQuery: string}) {
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const passwordFormUrl = `${clientConfig.AUTH_SERVER}/account/signup/password/finish?`+rawQuery                      
  const [password, setPassword] = useState('')
  const [captBase64, setCaptBase64] = useState('')
  const [captThumbBase64, setCaptThumbBase64] = useState('')
  const [captKey, setCaptKey] = useState('')
  const [captStatus, setCaptStatus] = useState('default')
  const [captAutoRefreshCount, setCaptAutoRefreshCount] = useState(0)
  const formRef = React.useRef<HTMLFormElement>(null)

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
        setErrorMessage('获取人机验证数据失败')
      }
    })
  }

  const handleConfirm = (dots: {x:number, y:number}[]) => {
    if (Lodash.size(dots) <= 0) {
      setErrorMessage('请进行人机验证再操作')
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
        setErrorMessage('人机验证成功')

        setCaptStatus('success')
        setCaptAutoRefreshCount(0)


        if (!username || !password) { 
          setErrorMessage('用户名或密码不可为空')
        } else {
          formRef.current?.submit()
        }
        
      } else {
        setErrorMessage('人机验证失败')

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


  return <form method={'POST'} action={passwordFormUrl} onSubmit={(event) => {

    if (!username || !password) {
      event.preventDefault()
      setErrorMessage('用户名或密码不可为空')
    }
  }} ref={formRef}>
  <input type={'hidden'} name={'captcha_key'} value={captKey}/>
          <div className={styles.fieldRow}>
          <input name='username' className="input input-bordered w-full" type="text" placeholder="输入用户名"
                  value={username} onChange={(event) => {
                    setUsername(event.target.value)
                  }}/> 
                      <span className={styles.verifyButton} onClick={async () => {
                        console.log('你点击了账号密码登陆')
                        // const result = await signinByPasswordBegin(username)
                        // if (result && result.code === 200) {
                        //   setVerifyData(result.data.session)
                        // } 
                      }}>-</span>
          </div>
            <div className={styles.actionRow}>
              <input name='password' className="input input-bordered w-full" type="password" placeholder="输入密码"
                              value={password} onChange={(event) => {
                                setPassword(event.target.value)
                              }}/>
            </div>
          <div className={styles.actionRow}> 
            <GoCaptchaBtn
                          class="go-captcha-btn"
                          value={captStatus}
                          width="100%"
                          height="50px"
                          title="验证并注册"
                          imageBase64={captBase64}
                          thumbBase64={captThumbBase64}
                          changeValue={(val: string) => setCaptStatus(val)}
                          confirm={handleConfirm}
                          refresh={handleRequestCaptCode}
                      />
            </div>
          {errorMessage &&
              <div className={styles.messageRow}>
                  <span>{errorMessage}</span>
              </div>
          }
    </form>
}
  
