import Link from 'next/link'
import React from 'react'
import {getSession} from '@/services/auth'
import styles from './nav.module.css'
import {PSLinkButton} from './client/controls'
import {SessionModel} from '@/models/session'

export async function loadHeaderNav () {
  const auth = await getSession()
  console.log('auth:', auth)
  let helloElement: JSX.Element
  if (auth) {
    helloElement = <NavConsole session={auth}/>
  } else {
    helloElement = <PSLinkButton href={'/account/signin'} className={styles.loginLink}>登录</PSLinkButton>
  }
  return <nav className={styles.navHeader}>
        <div className={styles.headerRow}>
            <div className={styles.headerMenu}>
                <div className={styles.headerLeft}>
                    <Link className={styles.navLink} href='/'>首页</Link>&nbsp;
                    <Link className={styles.navLink} href='/'>资源</Link>
                </div>
                <div className={styles.headerRight}>
                    {helloElement}
                </div>
            </div>
        </div>
    </nav>
}

function NavConsole (props: { session: SessionModel }) {
  return <div>
        <Link href={'/console'}>控制台</Link>
        欢迎：
        <Link href={'/account'}>{props.session.username}</Link></div>
}
