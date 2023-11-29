import React from 'react'
import styles from './page.module.scss' 
import { getIdentity } from '@/services/auth' 
import { PublicNavbar } from './partials/navbar'
import { loadServerConfig } from '@/services/server/config'

export default async function Home () {
  const session = await getIdentity()
  console.log('auth:', session)
  const serverConfig = await loadServerConfig()
  return <div className={styles.indexPage}>
    <PublicNavbar authServer={serverConfig.AUTH_SERVER} selfUrl={serverConfig.SELF_URL} account={session}></PublicNavbar>
  </div>
}
