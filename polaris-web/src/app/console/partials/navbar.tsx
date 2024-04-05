'use client'

import styles from './navbar.module.scss'
import Link from 'next/link'
import { getLoginSession } from '@/services/client/account'
import { useEffect } from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { sessionAtom } from '@/app/console/state/session'
import { SessionModel } from '@/models/session'

export function ConsoleNavbar () { 
  const setSession= useSetRecoilState<SessionModel>(sessionAtom)

  useEffect(() => {
    const loadSession = async () => {
      const response = await getLoginSession() 
      if (response.data) {
        setSession(response.data)
      }
    }
    loadSession()
  }, [setSession])

  return <div className={styles.navHeader}>
    <div className={styles.leftNav}>
      <Link className={styles.brandLink} href={'/'}>
        <Image src='/images/logo.png' alt='logo' fill={false} width={28} height={28} sizes={'32px,32px'} />
        <span>北极星笔记</span>
      </Link>
    </div>
    <div className={styles.rightNav}>
      <UserAction/>
    </div>
  </div>
}

function UserAction(props: { account?: string }) {
  const session = useRecoilValue(sessionAtom)
  if (!session) {
    return <div>...</div>
  }
  return <div>{props.account}</div>
}
