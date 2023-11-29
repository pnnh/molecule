import styles from './page.module.scss'
import React from 'react'
import { Toolbar } from './partials/toolbar'
import { Table } from './partials/table'
import { GroupServerPresenter } from '@/presenters/group/server'

export default async function Page () {
  const result = await GroupServerPresenter.selectModels(1, 28)

  return <div>
    <div className={styles.titleBar}>
      <Toolbar/>
    </div>
    <div>
      <Table data={result}/>
    </div>
  </div>
}
