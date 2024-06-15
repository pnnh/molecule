import React from 'react'
import styles from './page.module.scss'
import Link from 'next/link'
import {PSImage} from '@/components/client/image'
import {PLSelectResult} from '@/models/common-result'
import {PSChannelModel} from "@/models/polaris/channel"
import {signinDomain} from "@/services/server/domain/domain";
import {stringToBase58} from "@/utils/basex";

export default async function Page({params, searchParams}: {
    params: { viewer: string },
    searchParams: Record<string, string> & { query: string | undefined }
}) {
    const domain = signinDomain(params.viewer)
    const pageSize = 64
    const url = '/articles/channels?' + `page=1&size=${pageSize}`
    const result = await domain.makeGet<PLSelectResult<PSChannelModel>>(url)
    return <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <div className={styles.list}>
                        {result.range.map((model) => {
                            return <Item key={model.uid} model={model} viewer={params.viewer}/>
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function Item(props: { model: PSChannelModel, viewer: string }) {
    const readUrl = `/polaris/channels/${props.model.urn}`
    const imageUrl = `/content/${props.viewer}/channels/${props.model.urn}/${props.model.image}`

    return < div className={styles.item}>
        <div className={styles.itemCover}>
            <PSImage src={imageUrl} alt='star' width={256} height={256}/>
        </div>
        <div className={styles.content}>
            <div className={styles.title}>
                <Link className={styles.link} href={readUrl}>{props.model.name}</Link>
            </div>
            <div className={styles.description}>
                {props.model.description}
            </div>
        </div>
    </div>
}
