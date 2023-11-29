import Link from 'next/link'
import styles from './navbar.module.scss'
import { fullAuthUrl } from '@/services/common/const'
import { serverConfig } from '@/services/server/config'

export function PublicNavbar (props: { account?: string }) {
  return <div className={styles.navHeader}>
    <div className={styles.leftNav}>
      <Link className={styles.brandLink} href={'/'}>首页</Link>
      <Link className={styles.brandLink} href={'/content/channels'}>频道</Link>
    </div>
    <div className={styles.rightNav}>
      <UserAction account={props.account} />
    </div>
  </div>
}

function UserAction (props: { account?: string }) {
  if (!props.account) {
    const clientAuthUrl = fullAuthUrl(serverConfig.AUTH_SERVER, serverConfig.SELF_URL, '/')
    return <Link
      href={clientAuthUrl} className={styles.loginLink}>登录</Link>
  }
  return <div>
    <Link className={styles.loginLink} href={'/admin'}>{props.account}</Link>
  </div>
}
