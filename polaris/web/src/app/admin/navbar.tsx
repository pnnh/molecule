'use client'

import styles from './navbar.module.scss'
import Link from 'next/link'

export function ConsoleNavbar (props: { account?: string }) {
  return <div className={styles.navHeader}>
    <div className={styles.leftNav}>
      <Link className={styles.brandLink} href='/'>POLARIS</Link>
    </div>
    <div className={styles.rightNav}>
      <UserAction account={props.account}/>
    </div>
  </div>
}

function UserAction (props: { account?: string }) {
  return <div>{props.account}</div>
}
