import styles from './page.module.scss'
import React from 'react'
import { Toolbar } from './partials/toolbar'
import { Table } from './partials/table'
import { CategoryServerPresenter } from '@/presenters/category/server'

export default async function Page () {
  const result = await CategoryServerPresenter.selectModels(1, 28)

  return <div>
    <div className={styles.titleBar}>
      <Toolbar/>
    </div>
    <div>
      <Table data={result}/>
    </div>
  </div>
}
