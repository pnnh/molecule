'use client'

import React from 'react'
import styles from './toolbar.module.css'
import { TWButton } from '@/components/client/controls'

export function Toolbar () {
  return <div className={styles.toolbar}>
    <div className={styles.toolbarLeft}>
      <TWButton>
审核通过
      </TWButton>
      <TWButton>
不通过
      </TWButton>
      <TWButton>
删除
      </TWButton>
    </div>
    <div>
    </div>
  </div>
}