'use client'

import {AddButton} from './add'
import React from 'react'
import styles from './toolbar.module.scss'

export function Toolbar (props: { rawQuery: string }) {

  return <div className={styles.toolbar}>
    <div className={styles.actionBar}>
      <AddButton/>
    </div>
    <div className={styles.searchBar}>
    </div>
  </div>
}
