'use client'

import styles from './page.module.scss'
import React, { useEffect, useState } from 'react'
import { Toolbar } from './partials/toolbar'
import { Table } from './partials/table'
import { ArticleModel } from '@/models/article'
import { ArticleService } from '@/services/article'
import { PLSelectResult } from '@/models/common-result'

export default function Page () {
  const [resources, setResources] = useState<PLSelectResult<ArticleModel>>()

  useEffect(() => {
    const loadResources = async () => {
      const service = ArticleService.Instance()
      const response = await service.selectArticles('')
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
