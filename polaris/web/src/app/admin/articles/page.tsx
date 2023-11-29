import styles from './page.module.scss'
import React from 'react'
import { Toolbar } from './partials/toolbar'
import { Table } from './partials/table'
import { getAccessToken } from '@/services/auth'
import { RelationFullModel } from '@/models/relation'
import { ChannelModel } from '@/models/channel'
import { ArticleModel } from '@/models/article'
import { RelationServerService } from '@/services/server/relation'
import { loadServerConfig } from '@/services/server/config'
import { CommonUrl } from '@/services/common/curd'
import { PLSelectResult } from '@/models/common-result'

export default async function Page ({ searchParams }: {
    searchParams: Record<string, string>
}) {
  console.debug('searchParams', searchParams)
  const accessToken = await getAccessToken()
  console.debug('accessToken', accessToken)
  if (!accessToken) {
    return <div>未登录2</div>
  }
  const servcie = new RelationServerService()
  const serverConfig = await loadServerConfig()
  const serverRelationUrl = new CommonUrl(serverConfig.SERVER, 'relation')
  const result = await servcie.commonSelect<PLSelectResult<RelationFullModel<ChannelModel, ArticleModel>>>(serverRelationUrl.adminSelectUrl,
    searchParams, accessToken)

  return <div>
        <div className={styles.titleBar}>
            <Toolbar/>
        </div>
        <div className={styles.pageBody}>
            <Table result={result} search={searchParams}/>
        </div>
    </div>
}
