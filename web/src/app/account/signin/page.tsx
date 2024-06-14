'use client'

import React, {useEffect, useState} from 'react'
import styles from './page.module.scss'
import Link from '~/next/link'
import {WebauthnForm} from './webauthn/form'
import {PasswordForm} from './password/form'
import queryString from 'query-string'
import {encodeBase64String} from '@/utils/basex'
import {serverConfig} from '@/services/server/config'
import {lerpBrowser} from '@/services/client/wasm-client'

interface ISignMethod {
    key: string,
    title: string,
    form: React.ReactElement
}

export default function Home({searchParams}: {
    searchParams: Record<string, string> & { source: string | undefined }
}) {

    useEffect(() => {

        lerpBrowser(1, 2, 0.5).then((result) => {
            console.debug('axxxx browser:', result)
        })

    }, [])

    const signMethods: ISignMethod[] = []
    if (!searchParams.source) {
        searchParams.source = encodeBase64String(serverConfig.NEXT_PUBLIC_SELF_URL)
    }
    const rawQuery = queryString.stringify(searchParams)

    if (serverConfig.NEXT_PUBLIC_SIGN_PASSWORD === 'ON') {
        signMethods.push({
            key: 'password',
            title: '账号密码',
            form:
                <PasswordForm serverUrl={serverConfig.NEXT_PUBLIC_PORTAL_SERVER}
                              authServer={serverConfig.NEXT_PUBLIC_PORTAL_SERVER} rawQuery={rawQuery}/>
        })
    }
    if (serverConfig.NEXT_PUBLIC_SIGN_WEBAUTHN === 'ON') {
        signMethods.push({
            key: 'webauthn',
            title: 'Webauthn',
            form:
                <WebauthnForm authServer={serverConfig.NEXT_PUBLIC_PORTAL_SERVER} rawQuery={rawQuery}/>
        })
    }
    if (signMethods.length === 0) {
        throw new Error('no sign method enabled')
    }
    const defaultSignMethod = signMethods[0]

    return <div>
        <div className={styles.loginContainer}>
            <MainBox signMethods={signMethods} initLoginMethod={defaultSignMethod.key} rawQuery={rawQuery}/>
        </div>
    </div>
}

function MainBox({signMethods, initLoginMethod, rawQuery}: {
    signMethods: ISignMethod[],
    initLoginMethod: string,
    rawQuery: string
}) {
    const [loginMethod, setLoginMethod] = useState<string>(initLoginMethod)
    return <div className={styles.mainBox}>
        <div className={styles.boxTitle}>
            <div className={styles.titleLeft}>
                登录
            </div>
            <div className={styles.titleRight}>
                {
                    signMethods.map((method) => {
                        return <React.Fragment key={method.key}>
                            <Link href={''} className={loginMethod === method.key ? 'active' : ''} onClick={() => {
                                setLoginMethod(method.key)
                            }}>{method.title}</Link>
                        </React.Fragment>
                    })
                }
            </div>
        </div>
        {
            signMethods.map((method) => {
                return <React.Fragment key={method.key}>
                    {loginMethod === method.key && method.form}
                </React.Fragment>
            })
        }
        <div className={styles.tipRow}>
            还没有账号?
            <Link href={'/account/signup?' + rawQuery}>立即注册</Link>
        </div>
    </div>
}
