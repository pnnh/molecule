'use client'

import styles from './page.module.scss'
import React from 'react'
import { MarkdownViewer } from './partials/view'
import { DirectoryBar } from './sidebar'
import { ConsoleNotebar } from './notebar'

export default function Page ({ params }: {
  params: {profile: string}
}) {
  return <div className={styles.notesPage}>
    <div className={styles.directoryBar}>
      <DirectoryBar profile={params.profile}></DirectoryBar>
    </div>
    <div className={styles.notebarContainer}>
      <ConsoleNotebar></ConsoleNotebar>
    </div>
    <div className={styles.noteViewer}>
      <MarkdownViewer></MarkdownViewer>
    </div>
  </div>
}
