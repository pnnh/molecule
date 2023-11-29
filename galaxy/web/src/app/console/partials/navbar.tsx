'use client'

import Link from 'next/link'
import Image from '~/next/image'
import React from 'react'
import styles from './navbar.module.scss'

export function ConsoleNavbar (props: { account: string }) {
  return <div
    className={styles.navHeader}
  >
    <div className={styles.brand}>
      <Link href={'/'}>
        {/* <Image
          src="/galaxy.png"
          alt="Logo"
          height={32}
          width={32}
          priority={true}
        /> */}
        GALAXY
      </Link>
    </div>
    <div className={styles.navMenu}>
      {props.account}
    </div>
  </div>
}


