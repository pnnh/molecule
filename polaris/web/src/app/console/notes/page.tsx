'use client'

import styles from './page.module.scss'
import React, { useEffect, useState } from 'react'
import { Toolbar } from './partials/toolbar'
import { Table } from './partials/table'
import { NoteModel } from '@/models/personal/note'
import { NoteService } from '@/services/personal/notes'
import { PLSelectResult } from '@/models/common-result'

export default function Page () {
  const [resources, setResources] = useState<PLSelectResult<NoteModel>>()

  useEffect(() => {
    const loadResources = async () => {
      const service = NoteService.Instance()
      const response = await service.selectNotes('')
      setResources(response)
    }
    loadResources()
  }, [])

  return <div className={styles.pageList}>
    <div className={styles.titleBar}>
      <Toolbar/>
    </div>
    <div>
      {
        resources && <Table result={resources}/>
      }
    </div>
  </div>
}
