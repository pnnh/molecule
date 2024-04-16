import styles from './page.module.scss'
import React from 'react'
import {Toolbar} from './partials/toolbar'
import {Table} from './partials/table'
import {RelationFullModel} from '@/models/relation'
import {ChannelModel} from '@/models/channel'
import {ArticleModel} from '@/models/article'
import {RelationServerService} from '@/services/server/relation'
import {serverConfig} from '@/services/server/config'
import {CommonUrl} from '@/services/common/curd'
import {PLSelectResult} from '@/models/common-result'

export default async function Page({searchParams}: {
    searchParams: Record<string, string>
}) {
    console.debug('searchParams', searchParams)
    const servcie = new RelationServerService()
    const serverRelationUrl = new CommonUrl(serverConfig.NEXT_PUBLIC_SERVER, 'relation')
    const result = await servcie.commonSelect<PLSelectResult<RelationFullModel<ChannelModel, ArticleModel>>>(serverRelationUrl.adminSelectUrl,
        searchParams, '')

    return <div>
        <div className={styles.titleBar}>
            <Toolbar/>
        </div>
        <div className={styles.pageBody}>
            <Table result={result} search={searchParams}/>
        </div>
    </div>
}
