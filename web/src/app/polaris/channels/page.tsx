import React from 'react'
import styles from './page.module.scss'
import Link from 'next/link'
import {PSCard} from '@/components/client/controls'
import {PSImage} from '@/components/client/image'
import {serverMakeHttpGet} from '@/services/server/http'
import {PLSelectResult} from '@/models/common-result'
import {PSChannelModel} from "@/models/polaris/channel";

export default async function Page() {
    return <ArticlesChannelsPage/>
}

function Item(props: { model: PSChannelModel }) {
    const readUrl = `/polaris/channels/${props.model.urn}`
    return <PSCard className={styles.item}>
        <div className={styles.itemCover}>
            <PSImage src={props.model.image} alt='star' width={256} height={256}/>
        </div>
        <div className={styles.content}>
            <div className={styles.title}>
                <Link className={styles.link} href={readUrl}>{props.model.name}</Link>
            </div>
            <div className={styles.description}>
                {props.model.description}
            </div>
        </div>
    </PSCard>
}

async function ArticlesChannelsPage() {
    const pageSize = 64
    const url = '/articles/channels/?' + `page=1&size=${pageSize}`
    const result = await serverMakeHttpGet<PLSelectResult<PSChannelModel>>(url)
    return <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <div className={styles.list}>
                        {result.range.map((model) => {
                            return <Item key={model.uid} model={model}/>
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}
