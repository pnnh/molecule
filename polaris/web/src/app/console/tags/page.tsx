import styles from './page.module.scss'
import React from 'react'
import { Toolbar } from './partials/toolbar'
import { Table } from './partials/table'
import { TagServerService } from '@/services/server/tag'

export default async function Page () {
  const tagService = new TagServerService()

  const result = await tagService.selectModels(1, 28)

  return <div>
    <div className={styles.titleBar}>
      <Toolbar/>
    </div>
    <div>
      <Table data={result}/>
    </div>
  </div>
}
