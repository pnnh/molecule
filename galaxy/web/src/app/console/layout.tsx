import {getIdentity} from '@/services/auth'
import styles from './layout.module.scss'
import {ConsoleNavbar} from '@/app/console/partials/navbar'
import {ConsoleSidebar} from '@/app/console/partials/sidebar'
import React from 'react'

export default async function ConsoleLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  const identity = await getIdentity()

  if (!identity) {
    // redirect(authUrl)
    return <div > 未登录
    </div>
  }

  return (
    <div className={styles.pageBody}>
      <ConsoleNavbar account={identity}></ConsoleNavbar>
      <div className={styles.pageContainer}>
        <div className={styles.leftNav}><ConsoleSidebar></ConsoleSidebar></div>

        <div className={styles.rightBody}>
          {children}
        </div>
      </div>
    </div>
  )
}
