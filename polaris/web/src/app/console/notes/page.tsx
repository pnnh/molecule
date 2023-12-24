'use client'

import styles from './page.module.scss'
import React from 'react'
import { MarkdownViewer } from './partials/view'

export default function Page () {
  return <div className={styles.pageList}>
    <div>
      文章正文
    </div>
    <div>
      <MarkdownViewer></MarkdownViewer>
    </div>
  </div>
}
