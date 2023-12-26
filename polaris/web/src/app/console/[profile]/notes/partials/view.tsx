'use client'

import React, { useEffect, useState } from 'react'
import styles from './view.module.scss'
import MarkdownIt from 'markdown-it'
import { useRecoilValue } from 'recoil'
import { noteAtom } from '@/app/console/providers/notebook'
import { getNoteByKey } from '@/services/personal/notes_server'
import { NoteModel } from '@/models/personal/note'

export function MarkdownViewer () {
  const note = useRecoilValue(noteAtom)
  const markdown = new MarkdownIt()
  const [model, setModel] = useState<NoteModel>()

  useEffect(() => {
    const loadResources = async () => {
      const response = await getNoteByKey(note)
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
