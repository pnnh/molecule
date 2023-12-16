'use client'

import styles from './navbar.module.scss'
import Link from 'next/link'
import { getLoginSession } from '@/services/client/account'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function ConsoleNavbar () {
  const [account, setAccount] = useState<string | undefined>(undefined)

  useEffect(() => {
    const loadSession = async () => {
      const response = await getLoginSession()
      if (response.status !== 200 || response.data == null) {
        throw new Error('session is null')
      }
      setAccount(response.data.account)
    }
    loadSession()
  }, [])

  return <div className={styles.navHeader}>
    <div className={styles.leftNav}>
      <Link className={styles.brandLink} href={'/'}>
        <Image src='/images/logo.png' alt='logo' fill={false} width={28} height={28} sizes={'32px,32px'} />
        <span>北极星笔记</span>
      </Link>
    </div>
    <div className={styles.rightNav}>
      <UserAction account={account}/>
    </div>
  </div>
}

function UserAction (props: { account?: string }) {
  return <div>{props.account}</div>
}
