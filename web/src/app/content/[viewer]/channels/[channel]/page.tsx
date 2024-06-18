import React from 'react'
import styles from './page.module.scss'
import Link from 'next/link'
import {PaginationPartial} from '@/components/common/pagination'
import {replaceSearchParams} from '@/utils/query'
import queryString from 'query-string'
import {NoData} from '@/components/common/empty'
import {PSImage} from '@/components/client/image'
import {formatRfc3339} from '@/utils/datetime'
import {PLSelectResult} from '@/models/common-result'
import {calcPagination} from "@/utils/helpers";
import {STSubString} from "@/utils/string";
import {PSArticleModel} from "@/models/polaris/article";
import RemoveRedEyeIcon from "~/@mui/icons-material/RemoveRedEye";
import AccessAlarmIcon from "~/@mui/icons-material/AccessAlarm";
import {signinDomain} from "@/services/server/domain/domain";

export default async function Page({params, searchParams}: {
    params: { viewer: string, channel: string },
    searchParams: Record<string, string>
}) {
    let page = Number(searchParams.page)
    if (isNaN(page)) {
        page = 1
    }
    const pageSize = 10
    const channelPk = searchParams.channel

    const selectQuery = {
        sort: searchParams.sort,
        filter: searchParams.filter,
        page,
        size: pageSize,
        channel: channelPk
    }
    const rawQuery = queryString.stringify(selectQuery)
    const url = `/articles/channels/${params.channel}/posts?${rawQuery}`

    const domain = signinDomain(params.viewer)
    const selectResult = await domain.makeGet<PLSelectResult<PSArticleModel>>(url)

    const pagination = calcPagination(page, selectResult.count, pageSize)
    const sortClass = (sort: string) => {
        const querySort = (searchParams.sort ?? 'latest')
        return ' ' + (querySort === sort ? styles.activeLink : '')
    }
    const filterClass = (filter: string) => {
        const queryFilter = (searchParams.filter ?? 'all')
        return ' ' + (queryFilter === filter ? styles.activeLink : '')
    }

    const rankQuery = queryString.stringify({
        sort: 'read',
        filter: 'year',
        page: '1',
        direction: 'cta',
        size: 10
    })
    const rankUrl = `/articles/channels/${params.channel}/posts?${rankQuery}`
    const rankSelectResult = await domain.makeGet<PLSelectResult<PSArticleModel>>(rankUrl)

    return <div className={styles.fullPage}>
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.conMiddle}>
                    <div className={styles.middleTop}>
                        <div className={styles.topLeft}>
                            <Link className={styles.sortLink + sortClass('latest')}
                                  href={replaceSearchParams(searchParams, 'sort', 'latest')}>最新</Link>
                            <Link className={styles.sortLink + sortClass('read')}
                                  href={replaceSearchParams(searchParams, 'sort', 'read')}>阅读数</Link>
                        </div>
                        <div className={styles.topRight}>
                            <Link className={styles.filterLink + filterClass('month')}
                                  href={replaceSearchParams(searchParams, 'filter', 'month')}>一月内</Link>
                            <Link className={styles.filterLink + filterClass('year')}
                                  href={replaceSearchParams(searchParams, 'filter', 'year')}>一年内</Link>
                            <Link className={styles.filterLink + filterClass('all')}
                                  href={replaceSearchParams(searchParams, 'filter', 'all')}>所有</Link>
                        </div>
                    </div>
                    <div className={styles.middleBody}>
                        <MiddleBody viewer={params.viewer} selectResult={selectResult}/>
                    </div>
                    <div className={styles.middlePagination}>
                        <PaginationPartial pagination={pagination}
                                           calcUrl={(page) => replaceSearchParams(searchParams, 'page', page.toString())}/>
                    </div>
                </div>
                <div className={styles.conRight}>
                    <div className={styles.rankCard}>
                        <div className={styles.rankHeader}>
                            年度阅读排行
                        </div>
                        <div className={styles.rankBody}>
                            {
                                rankSelectResult.range && rankSelectResult.range.length > 0
                                    ? rankSelectResult.range.map((model, index) => {
                                        return <div key={model.urn} className={styles.rankItem}>
                                            <div
                                                className={styles.rankIndex + (index <= 2 ? ' ' + styles.rankTop : '')}>{index + 1}</div>
                                            <div className={styles.rankTitle}>
                                                <Link
                                                    href={`/polaris/channels/${params.channel}/articles/${model.urn}`}
                                                    title={model.title}>{model.title}</Link>
                                            </div>
                                        </div>
                                    })
                                    : '暂无'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function MiddleBody({viewer, selectResult}: { viewer: string, selectResult: PLSelectResult<PSArticleModel> }) {
    if (!selectResult || !selectResult.range || selectResult.range.length === 0) {
        return <NoData size='large'/>
    }
    return selectResult.range.map((model) => {
        const readUrl = `/content/${viewer}/channels/${model.channel_urn}/articles/${model.urn}`
        return <div className={styles.middleItem} key={model.urn}>
            <div className={styles.itemDetail}>
                <div className={styles.title}>
                    <Link href={readUrl}>{model.title}</Link></div>
                <div className={styles.description} title={model.description}>
                    {STSubString(model.description, 100)}
                </div>
                <div className={styles.action}>
                    <RemoveRedEyeIcon fontSize={'small'}/><span>{model.discover}</span>
                    <AccessAlarmIcon fontSize={'small'}/><span>{formatRfc3339(model.update_time)}</span>
                </div>
            </div>
            <div className={styles.itemCover}>
                <PSImage src={model.cover} alt={model.title} fill={true}/>
            </div>

        </div>
    })
}

