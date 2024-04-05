'use client'

import { useEffect, useState } from 'react'
import styles from './notebar.module.scss'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { PLSelectResult } from '@/models/common-result'
import { NoteModel } from '@/models/personal/note' 
import { formatRfc3339 } from '@/utils/datetime'  
import { noteAtom, directoryAtom} from '@/app/console/providers/notebook'
import { STSubString } from "@/utils/string";
import { NoteService } from '@/services/personal/notes'

export function PSNotesList(props: { result: PLSelectResult<NoteModel> }) {

  const setNote = useSetRecoilState(noteAtom)
  return <div className={styles.articleTable + ' table w-full'}>
    {
      props.result.range.map((item) => {
        return <div key={item.uid} className={styles.articleRow} onClick={() => {
          setNote(item.uid)
        }}>
          <div className={styles.articleTitle} title={item.title}>
            {item.title}
          </div>
          <div className={styles.noteDesc}>
            {STSubString(item.description, 60)}
          </div>
          <div className={styles.noteTime}>
            {formatRfc3339(item.update_time)}
          </div>
        </div>
      })
    }
  </div>
}


export function ConsoleNotebar () {
  const directory = useRecoilValue(directoryAtom)
  const [resources, setResources] = useState<PLSelectResult<NoteModel>>()

  useEffect(() => {
    const loadResources = async () => {
      if (!directory) {
        return
      }
      const queryString = `notebook=dotnet&directory=${directory}`
      const response = await NoteService.selectNotes(queryString)
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
