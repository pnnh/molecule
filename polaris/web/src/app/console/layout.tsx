'use client'

import React from 'react'
import styles from './layout.module.scss'
import { ConsoleNavbar } from './partials/navbar'
import { ConsoleFeature } from './partials/feature'

import { RecoilRoot } from 'recoil'
export default function ConsoleLayout ({
  children
}: {
    children: React.ReactNode
}) {
  return (
        <RecoilRoot>
      <div className={styles.childrenContainer}>
        <div className={styles.navbar}>
          <ConsoleNavbar></ConsoleNavbar>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.leftNav}>
            <ConsoleFeature/>
          </div>
          <div className={styles.rightBody}>
            {children}
          </div>
        </div>
      </div>
      </RecoilRoot>
  )
}
