import React from 'react'
import styles from './page.module.scss' 
import { getIdentity } from '@/services/auth' 
import { PublicNavbar } from './partials/navbar'

export default async function Home () {
  const session = await getIdentity()
  console.log('auth:', session)
  return <div className={styles.indexPage}>
    <PublicNavbar account={session}></PublicNavbar>
  </div>
}
