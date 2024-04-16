import styles from './page.module.scss'
import React from 'react'
import {Toolbar} from './partials/toolbar'
import {Table} from './partials/table'
import {serverConfig} from '@/services/server/config'
import {ChannelService} from '@/services/channel'

export default async function Page() {
    const service = ChannelService.Instance(serverConfig.NEXT_PUBLIC_SERVER)
    const result = await service.selectChannels('page=1&size=20')

    return <div>
        <div className={styles.titleBar}>
            <Toolbar/>
        </div>
        <div>
            <Table data={result}/>
        </div>
    </div>
}
