'use client'

import {formatRfc3339} from '@/utils/datetime'
import styles from './table.module.scss'
import React from 'react'
import Link from 'next/link'
import {PLSelectResult} from '@/models/common-result'
import {PaginationPartial} from '@/components/common/pagination'
import {replaceSearchParams} from '@/utils/query'
import {calcPagination} from "@/utils/helpers";
import {PSArticleModel} from "@/models/polaris/article";

export function Table(props: {
    result: PLSelectResult<PSArticleModel>,
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

function TableRow({model}: { model: PSArticleModel }) {

    const updateTimeString = formatRfc3339(model.update_time)
    return <tr className={styles.articleRow}>
        <th>
            <label>
                <input type="checkbox" className="checkbox"/>
            </label>
        </th>
        <td className={styles.channelTitle}>
            <Link href={'/'}>{model.channel}</Link>
        </td>
        <td>
            {updateTimeString}
        </td>
        <td className={styles.articleTitle}>
            {model.title}
        </td>
    </tr>
}
