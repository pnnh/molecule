import React from 'react'
import styles from './page.module.scss'
import RandomPasswordPage from './random-password'

export default async function Home () {
  return <div className={styles.indexPage}>
    <RandomPasswordPage/>
  </div>
}
