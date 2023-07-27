import { loadHeaderNav } from '@/components/nav'
import React from 'react'
import styles from './page.module.scss'

export default async function Home () {
  const headerNav = await loadHeaderNav()
  return <div>

<header>
          {headerNav}
        </header>
        <main className={styles.layoutChildren}>
          统一的门户站点，认证中心
        </main>
        <footer></footer>
  </div>
}
