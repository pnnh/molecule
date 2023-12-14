'use client'

import React from 'react'
import styles from './layout.module.scss'
import { ConsoleSidebar } from '@/app/console/partials/sidebar'
import { ConsoleNavbar } from './partials/navbar'
import { FluentProviders } from '@/components/client/providers'
import { ConsoleReduxProvider } from './state/provider'
import { ConsoleFeature } from './partials/feature'

export default function ConsoleLayout ({
  children
}: {
    children: React.ReactNode
}) {
  return (
    <ConsoleReduxProvider>
      <FluentProviders>
      <div className={styles.childrenContainer}>
        <div className={styles.navbar}>
          <ConsoleNavbar></ConsoleNavbar>
        </div>
        <div className={styles.mainContainer}>
          <ConsoleFeature/>
          <div className={styles.leftNav}>
            <ConsoleSidebar></ConsoleSidebar>
          </div>
          <div className={styles.rightBody}>
            {children}
          </div>
        </div>
      </div>
      </FluentProviders>
    </ConsoleReduxProvider>
  )
}
