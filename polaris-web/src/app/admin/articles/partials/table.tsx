'use client'

import {formatRfc3339} from '@/utils/datetime'
import styles from './table.module.scss'
import React from 'react'
import Link from 'next/link'
import {RelationFullModel} from '@/models/relation'
import {PLSelectResult} from '@/models/common-result'
import {ChannelModel} from '@/models/channel'
import {ArticleModel} from '@/models/article'
import {PaginationPartial} from '@/components/common/pagination'
import {replaceSearchParams} from '@/utils/query'
import {ArticleService} from '@/services/article'
import {calcPagination} from "@/utils/helpers";

export function Table(props: {
    result: PLSelectResult<RelationFullModel<ChannelModel, ArticleModel>>,
    search: Record<string, string>
}) {
    const result = props.result
    const pagination = calcPagination(result.page, result.count, result.size)
    return <>
        <div className={styles.tableContainer}>

            <table className={styles.articleTable + ' table'}>

                <thead>
                <tr>
                    <th className={styles.columnCheck}>
                        <label>
                            <input type="checkbox" className="checkbox"/>
                        </label>
                    </th>
                    <th>频道</th>
                    <th className={styles.columnTime}>修改时间</th>
                    <th>文章</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.result.range.map((item, index) => {
                        return <TableRow key={index} model={item}/>
                    })
                }

                </tbody>
                <tfoot>
                </tfoot>

            </table>
        </div>
        <PaginationPartial pagination={pagination}
                           calcUrl={(page) => replaceSearchParams(props.search, 'page', page.toString())}/>

    </>
}

function TableRow(props: { model: RelationFullModel<ChannelModel, ArticleModel> }) {
    const model = props.model
    const channelModel = model.source_model
    const targetModel = model.target_model
    if (!channelModel || !targetModel) {
        return null
    }
    const updateTimeString = formatRfc3339(props.model.update_time)
    const service = ArticleService.Instance()
    return <tr className={styles.articleRow}>
        <th>
            <label>
                <input type="checkbox" className="checkbox"/>
            </label>
        </th>
        <td className={styles.channelTitle}>
            <Link href={service.consoleViewUrl(props.model.pk)}
                  title={channelModel.name}>{channelModel.name}</Link>
        </td>
        <td>
            {updateTimeString}
        </td>
        <td className={styles.articleTitle}>
            {targetModel.title}
        </td>
    </tr>
}
