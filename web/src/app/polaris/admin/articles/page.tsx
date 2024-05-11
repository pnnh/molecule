import styles from './page.module.scss'
import React from 'react'
import {Toolbar} from './partials/toolbar'
import {Table} from './partials/table'
import {PLSelectResult} from '@/models/common-result'
import {clientMakeHttpGet} from "@/services/client/http";
import {PSArticleModel} from "@/models/polaris/article";

export default async function Page({searchParams}: {
    searchParams: Record<string, string>
}) {
    console.debug('searchParams', searchParams)
    const url = '/polaris/admin/channels/?' + 'page=1&size=20'
    const result = await clientMakeHttpGet<PLSelectResult<PSArticleModel>>(url)

    return <div>
        <div className={styles.titleBar}>
            <Toolbar/>
        </div>
        <div className={styles.pageBody}>
            <Table result={result} search={searchParams}/>
        </div>
    </div>
}
