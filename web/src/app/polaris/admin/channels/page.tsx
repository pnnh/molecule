import styles from './page.module.scss'
import React from 'react'
import {Toolbar} from './partials/toolbar'
import {Table} from './partials/table'
import {PLSelectResult} from '@/models/common-result'
import {clientMakeHttpGet} from '@/services/client/http'
import {PSChannelModel} from "@/models/polaris/channel";

export default async function Page() {
    const url = '/polaris/admin/channels/?' + 'page=1&size=20'
    const result = await clientMakeHttpGet<PLSelectResult<PSChannelModel>>(url)

    return <div>
        <div className={styles.titleBar}>
            <Toolbar/>
        </div>
        <div>
            <Table data={result}/>
        </div>
    </div>
}
