'use client'

import styles from './page.module.scss'
import React from 'react'
import { MarkdownViewer } from './partials/view'
import { ConsoleSidebar } from './sidebar'
import { ConsoleNotebar } from './notebar'

export default function Page () {
  return <div className={styles.notesPage}>
    <div className={styles.directoryBar}>
      <ConsoleSidebar></ConsoleSidebar>
    </div>
    <div className={styles.notebarContainer}>
      <ConsoleNotebar></ConsoleNotebar>
    </div>
    <div className={styles.noteViewer}>
      <MarkdownViewer></MarkdownViewer>
    </div>
  </div>
}
