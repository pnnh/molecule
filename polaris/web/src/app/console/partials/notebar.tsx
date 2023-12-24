'use client'

import { useEffect, useState } from 'react'
import { directoryAtom } from '../providers/notebook'
import styles from './notebar.module.scss'
import { useRecoilValue } from 'recoil'
import { PLSelectResult } from '@/models/common-result'
import { NoteModel } from '@/models/personal/note'
import { selectNotes } from '@/services/personal/notes_server'
import { PSNotesList } from '@/app/console/notes/partials/table'

export function ConsoleNotebar () {
  const directory = useRecoilValue(directoryAtom)
  const [resources, setResources] = useState<PLSelectResult<NoteModel>>()

  useEffect(() => {
    const loadResources = async () => {
      const queryString = `notebook=dotnet&directory=${directory}`
      const response = await selectNotes(queryString)
      setResources(response)
    }
    loadResources()
  }, [directory])

  return <div className={styles.notebar}>
    <div>
      {
        resources && <PSNotesList result={resources}/>
      }
    </div>
  </div>
}
