import React from 'react'
import styles from './page.module.scss'

export default async function Home () {
  return <div className={styles.indexPage}>
    <div className={styles.container}>
      用户身份主页
    </div>
  </div>
}
