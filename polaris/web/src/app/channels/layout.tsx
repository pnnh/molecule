import React from 'react'
import { PublicNavbar } from '../partials/navbar'
import styles from './layout.module.scss'
import { getIdentity } from '@/services/auth'
import { loadServerConfig } from '@/services/server/config'

export default async function ArticleLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const identity = await getIdentity()
  const serverConfig = await loadServerConfig()

  return <div className={styles.container}>
    <div>
      <PublicNavbar authServer={serverConfig.AUTH_SERVER} selfUrl={serverConfig.SELF_URL} account={identity}/>
    </div>
    <div className={styles.body}>
      {children}
    </div>
  </div>
}
