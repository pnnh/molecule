'use client'

import { ArticleModel as NoteModel } from '@/models/article'
import { formatRfc3339 } from '@/utils/datetime'
import styles from './table.module.scss'
import React from 'react'
import { PLSelectResult } from '@/models/common-result'
import { psSubString } from '@/utils/string'
import { useSetRecoilState } from 'recoil'
import { noteAtom } from '@/app/console/providers/notebook'

export function PSNotesList (props: { result: PLSelectResult<NoteModel> }) {

  const setNote = useSetRecoilState(noteAtom)
  return <div className={styles.articleTable + ' table w-full'}>
      {
        props.result.range.map((item) => {
          return <div key={item.pk} className={styles.articleRow} onClick={() => {
            setNote(item.pk)
          }}>
            <div className={styles.articleTitle} title={item.title}>
              {item.title}
            </div>
            <div className={styles.noteDesc}>
              {psSubString(item.description, 60)}
            </div>
            <div className={styles.noteTime}>
              {formatRfc3339(item.update_time)}
            </div>
          </div>
        })
      }
  </div>
}
