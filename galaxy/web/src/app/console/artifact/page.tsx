import React from 'react'
import {Table} from './partials/table'
import {getAccessToken} from '@/services/auth'
import {Toolbar} from './partials/toolbar'
import queryString from 'query-string'
import styles from './page.module.scss'
import {CodeOk, SelectResult} from '@/models/common_result'
import {ArtifactDto, ArtifactSearchModel} from '@/models/artifact'
import {ArtifactServer} from '@/services/server/artifact'

export default async function Page ({searchParams}: {
  searchParams: Record<string, string>
}) {
  const rawQuery = queryString.stringify(searchParams)
  const parsedQuery = queryString.parse(rawQuery, {arrayFormat: 'bracket'})
  const selectDto = ArtifactSearchModel.toDto(parsedQuery)
  const accessToken = await getAccessToken()
  console.debug('accessToken', accessToken)
  if (!accessToken) {
    return <div>未登录</div>
  }
  const result = await ArtifactServer.selectModels(accessToken, selectDto)
  if (!result || ('status' in result && result.status !== CodeOk)) {
    return <div>未知错误</div>
  }

  return <div>
    <div className={styles.toolbarContainer}>
      <Toolbar rawQuery={rawQuery}/>
    </div>
    <div className={styles.tableContainer}>
      <Table data={result as SelectResult<ArtifactDto>} rawQuery={rawQuery}/>
    </div>
  </div>
}

