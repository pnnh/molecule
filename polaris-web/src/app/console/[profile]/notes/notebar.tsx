'use client'

import { useEffect, useState } from 'react'
import { directoryAtom } from '@/app/console/providers/notebook'
import styles from './notebar.module.scss'
import { useRecoilValue } from 'recoil'
import { PLSelectResult } from '@/models/common-result'
import { NoteModel } from '@/models/personal/note'
import { selectNotes } from '@/services/personal/notes_server'
import { PSNotesList } from './partials/table'

export function ConsoleNotebar () {
  const directory = useRecoilValue(directoryAtom)
  const [resources, setResources] = useState<PLSelectResult<NoteModel>>()

  useEffect(() => {
    const loadResources = async () => {
      if (!directory) {
        return
      }
      const queryString = `notebook=dotnet&directory=${directory}`
      const response = await selectNotes(queryString)
      setResources(response)
    }
    loadResources()
  }, [directory])

  if (!resources) {
    return <div>暂无笔记，请从左侧选择目录</div>
  }

  return <div className={styles.notebar}>
    <div>
      {
        resources && <PSNotesList result={resources}/>
      }
    </div>
  </div>
}
