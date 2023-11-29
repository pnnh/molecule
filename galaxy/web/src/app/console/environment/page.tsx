'use client'

import React, { useEffect } from 'react'
import {Table} from './table' 
import {Toolbar} from './toolbar' 
import styles from './page.module.scss' 
import {SiteNav} from './sitenav' 

export default function Page () {

  return <div>
    <div className={styles.breadcrumbNav}>
      <SiteNav/>
    </div>
    <div className={styles.toolbarContainer}>
      <Toolbar/>
    </div>
    <div className={styles.tableContainer}>
      <Table/>
    </div>
  </div>
}

