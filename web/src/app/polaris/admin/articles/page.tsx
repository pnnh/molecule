import styles from './page.module.scss'
import React from 'react'
import {Toolbar} from './partials/toolbar'
import {ArticleTable} from './partials/table'
import {PLSelectResult} from '@/models/common-result'
import {PSArticleModel} from "@/models/polaris/article";
import {serverMakeHttpGetV2} from "@/services/server/fetch";

export default async function Page({searchParams}: {
    searchParams: Record<string, string>
}) {
    console.debug('searchParams', searchParams)
    const url = '/polaris/admin/articles?' + 'page=1&size=20'
    const result = await serverMakeHttpGetV2<PLSelectResult<PSArticleModel>>(url)

    return <div>
        <div className={styles.titleBar}>
            <Toolbar/>
        </div>
        <div className={styles.pageBody}>
            <ArticleTable result={result} search={searchParams}/>
        </div>
    </div>
}
