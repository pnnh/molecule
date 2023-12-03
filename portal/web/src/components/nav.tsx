import Link from 'next/link'
import React from 'react' 
import styles from './nav.module.css' 
import { fullAuthUrl } from '@/services/common/const'
import { encodeBase64String } from '@/utils/base64'

export function HeaderNav (props: {session: string|undefined,
  selfUrl: string, serverUrl: string}) {
  let helloElement: JSX.Element
  if (props.session) {
    helloElement = <NavConsole session={props.session}/>
  } else { 
    const state = encodeBase64String(`${props.selfUrl}/`)
  
    const clientAuthUrl = fullAuthUrl(props.serverUrl, props.selfUrl, state)
    helloElement = <Link
      href={clientAuthUrl} rel="nofollow" className={styles.loginLink}>登录</Link>
  }
  return <nav className={styles.navHeader}>
        <div className={styles.headerRow}>
            <div className={styles.headerMenu}>
                <div className={styles.headerLeft}>
                    <Link className={styles.navLink} href='/'>首页</Link>&nbsp;
                    <Link className={styles.navLink} href='/account'>用户</Link>
                </div>
                <div className={styles.headerRight}>
                    {helloElement}
                </div>
            </div>
        </div>
    </nav>
}

function NavConsole (props: { session: string }) {
  return <div>
        <Link href={'/admin'}>{props.session}</Link></div>
}
