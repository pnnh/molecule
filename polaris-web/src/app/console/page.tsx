'use client'

import styles from './page.module.scss'  
import { NotebookBar } from './sidebar'
import { ConsoleNotebar } from './notebar'

import React, { useEffect, useState } from 'react' 
import MarkdownIt from 'markdown-it'
import { useRecoilValue } from 'recoil'
import { noteAtom } from '@/app/console/providers/notebook' 
import { NoteModel } from '@/models/personal/note'
import { NoteService } from '@/services/personal/notes'

function MarkdownViewer() {
  const note = useRecoilValue(noteAtom)
  const markdown = new MarkdownIt()
  const [model, setModel] = useState<NoteModel>()

  useEffect(() => {
    const loadResources = async () => {
      const response = await NoteService.getNoteByKey(note)
      setModel(response)
    }
    loadResources()
  }, [note])

  if (!model || !model.body) {
    return <div>Loading</div>
  }

  const createMarkup = () => {
    return {
      __html: markdown.render(model.body)
    }
  }

  return <div className={styles.editorForm}>
    <div className={styles.noteTitle}>
      {model.title}
    </div>
    <div className={styles.editorRow}>
      <div className={styles.previewCol}>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  </div>
}

export default function Page() {
  return <div className={styles.notesPage}>
    <div className={styles.directoryBar}>
      <NotebookBar></NotebookBar>
    </div>
    <div className={styles.notebarContainer}>
      <ConsoleNotebar></ConsoleNotebar>
    </div>
    <div className={styles.noteViewer}>
      <MarkdownViewer></MarkdownViewer>
    </div>
  </div>
}
