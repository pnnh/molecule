'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './toolbar.module.scss'
import { TWButton } from '@/components/client/controls'

export function Toolbar () {
  const router = useRouter()
  return <div className={styles.toolbar}>
    <div></div>
    <div>

      <TWButton onClick={() => {
        router.replace('/console/groups/new')
      }}
      >
                    New
      </TWButton>
    </div>
  </div>
}
