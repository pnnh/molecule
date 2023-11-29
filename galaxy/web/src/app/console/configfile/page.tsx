import React from 'react'
import {Table} from './partials/table'
import {getAccessToken} from '@/services/auth'
import {Toolbar} from './partials/toolbar'
import queryString from 'query-string'
import styles from './page.module.scss'
import {CodeOk, SelectResult} from '@/models/common_result'
import {SiteNav} from './partials/sitenav'
import {ConfigFileServer} from '@/services/server/configfile'
import {ConfigFileModel, ConfigFileSearchModel} from '@/models/configfile'

export default async function Page ({searchParams}: {
  searchParams: Record<string, string>
}) {
  const rawQuery = queryString.stringify(searchParams)
  const parsedQuery = queryString.parse(rawQuery, {arrayFormat: 'bracket'})
  const selectDto = ConfigFileSearchModel.toDto(parsedQuery)
  const accessToken = await getAccessToken()
  console.debug('accessToken', accessToken)
  if (!accessToken) {
    return <div>未登录</div>
  }
  const result = await ConfigFileServer.selectModels(accessToken, selectDto)
  if (!result || ('status' in result && result.status !== CodeOk)) {
    return <div>未知错误</div>
  }

  return <div>
    <div className={styles.breadcrumbNav}>
      <SiteNav/>
    </div>
    <div className={styles.toolbarContainer}>
      <Toolbar rawQuery={rawQuery}/>
    </div>
    <div className={styles.tableContainer}>
      <Table data={result as SelectResult<ConfigFileModel>} rawQuery={rawQuery}/>
    </div>
  </div>
}

