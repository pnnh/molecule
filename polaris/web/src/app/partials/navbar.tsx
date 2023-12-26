import Link from 'next/link'
import styles from './navbar.module.scss'
import { fullAuthUrl } from '@/services/common/const'
import Image from 'next/image'

export function PublicNavbar (props: {authServer:string, selfUrl: string, account?: string }) {
  return <div className={styles.navHeader}>
    <div className={styles.leftNav}>
      <div>
        <Link className={styles.brandLink} href={'/'}>
          <Image src='/images/logo.png' alt='logo' fill={true} sizes={'48px,48px'} />
        </Link>
      </div>
      <Link className={styles.navLink} href={'/channels'}>频道</Link>
      <Link className={styles.navLink} href={'/posts'}>文章</Link>
    </div>
    <div className={styles.rightNav}>
      <UserAction authServer={props.authServer} selfUrl={props.selfUrl} account={props.account} />
    </div>
  </div>
}

function UserAction (props: {authServer:string, selfUrl: string, account?: string }) {
  if (!props.account) {
    const clientAuthUrl = fullAuthUrl(props.authServer, props.selfUrl, '/')
    return <Link
      href={clientAuthUrl} rel='nofollow' className={styles.loginLink}>登录</Link>
  }
  return <div>
    <Link className={styles.loginLink} href={'/console'}>{props.account}</Link>
  </div>
}
