import Link from 'next/link'
import React from 'react' 
import styles from './nav.module.css' 
import { fullAuthUrl } from '@/services/common/const'
import { clientConfig } from '@/services/client/config'
import { getIdentity } from '@/services/auth' 
import { encodeBase64String } from '@/utils/base64'

export async function loadHeaderNav () {
  const session = await getIdentity()
  console.log('auth:', session)
  let helloElement: JSX.Element
  if (session) {
    helloElement = <NavConsole session={session}/>
  } else { 
    const state = encodeBase64String(`${clientConfig.SELF_URL}/`)
  
    const clientAuthUrl = fullAuthUrl(clientConfig.SERVER, clientConfig.SELF_URL, state)
    helloElement = <Link
      href={clientAuthUrl} className={styles.loginLink}>登录</Link>
  }
  return <nav className={styles.navHeader}>
        <div className={styles.headerRow}>
            <div className={styles.headerMenu}>
                <div className={styles.headerLeft}>
                    <Link className={styles.navLink} href='/'>首页</Link>&nbsp;
                    <Link className={styles.navLink} href='/'>用户</Link>
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
        <Link href={'/console'}>控制台</Link>
        欢迎：
        <Link href={'/account'}>{props.session}</Link></div>
}
