import styles from './page.module.scss'
import React from 'react'
import Link from 'next/link'
import {ArticleModel} from '@/models/article'
import {NoData} from '@/components/common/empty'
import {PaginationPartial} from '@/components/common/pagination'
import { replaceSearchParams} from '@/utils/query'
import {ChannelInfo} from '@/components/common/channel'
import {articleContentViewUrl2} from '@/services/article'
import {serverConfig} from '@/services/server/config'
import {PLSelectResult} from '@/models/common-result'
import {ChannelService} from '@/services/channel'
import {calcPagination} from "@/utils/helpers";

const pageSize = 10
export default async function Home({params, searchParams}: {
    params: { channel: string },
    searchParams: Record<string, string>
}) {
    const channelService = ChannelService.Instance(serverConfig.SERVER)
    const channelInfo = await channelService.selectPosts(params.channel)

    return <div className={styles.articleContainer}>
        <div className={styles.leftArea}>
            <ArticleList channel={params.channel} result={channelInfo.posts} searchParams={searchParams}/>
        </div>
        <div className={styles.rightArea}>
            <ChannelInfo model={channelInfo.channel}/>
        </div>
    </div>
}

function ArticleList(props: {
    channel: string,
    result: PLSelectResult<ArticleModel>,
    searchParams: Record<string, string>
}) {
    const result = props.result
    if (result == null || result.count === 0) {
        return <NoData size='large'/>
    }
    let page = Number(props.searchParams.page)
    if (isNaN(page)) {
        page = 1
    }
    const pagination = calcPagination(page, result.count, pageSize)

    return <>
        <div className={styles.articleList}>
            {result.range.map((model) => {
                return <ArticleItem key={model.uid} model={model}/>
            })
            }
        </div>
        <div className={styles.pageList}>
            <PaginationPartial pagination={pagination}
                               calcUrl={(page) => replaceSearchParams(props.searchParams, 'page', page.toString())}/>
        </div>
    </>
}

function ArticleItem({model}: { model: ArticleModel }) {
    return <div className={styles.articleItem}>
        <article className={styles.articleContent}>
            <div className={styles.articleTitle}>
                <Link className={styles.articleLink} href={articleContentViewUrl2(model)}>{model.title}</Link>
            </div>
            <div className={styles.articleDescription}>
                {model.description}
            </div>
            <div>
                <Link className='btn btn-outline-secondary btn-sm' href={articleContentViewUrl2(model)}>阅读更多</Link>
            </div>
        </article>
    </div>
}
