import styles from './page.module.scss'
import React from 'react'
import { calcPagination } from '~/@pnnh/stele/esm/utils/helpers'
import Link from 'next/link'
import { ArticleModel } from '@/models/article'
import { NoData } from '@/components/common/empty'
import queryString from 'query-string'
import { PaginationPartial } from '@/components/common/pagination'
import { replaceQueryStringNew, replaceSearchParams } from '@/utils/query'

import { ChannelInfo } from '@/components/common/channel'
import { ArticleService, articleContentViewUrl } from '@/services/article'
import { loadServerConfig } from '@/services/server/config'
import { PLSelectResult } from '@/models/common-result'
import { ChannelService } from '@/services/channel'

const pageSize = 10
export default async function Home ({ params, searchParams }: {
  params: {channel: string},
  searchParams: Record<string, string>
}) {
  const serviceConfig = await loadServerConfig()
  const channelService = ChannelService.Instance(serviceConfig.SERVER)
  const channelInfo = await channelService.getChannel(params.channel)
  const articlesQuery = replaceQueryStringNew(queryString.stringify(searchParams), 'channel', params.channel)

  const service = ArticleService.Instance(serviceConfig.SERVER)
  const result = await service.selectArticles(articlesQuery)

  return <div className={styles.articleContainer}>
    <div className={styles.leftArea}>
      <ArticleList channel={params.channel} result={result} searchParams={searchParams}/>
    </div>
    <div className={styles.rightArea}>
        <ChannelInfo model={channelInfo}/>
    </div>
  </div>
}

function ArticleList (props: {channel: string, result: PLSelectResult<ArticleModel>, searchParams: Record<string, string>}) {
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
        return <ArticleItem key={model.pk} model={model}/>
      })
      }
    </div>
    <div className={styles.pageList}>
    <PaginationPartial pagination={pagination} calcUrl={(page) => replaceSearchParams(props.searchParams, 'page', page.toString())} />
    </div>
  </>
}

function ArticleItem ({ model }: { model: ArticleModel }) {
  return <div className={styles.articleItem}>
    <article className={styles.articleContent}>
      <div className={styles.articleTitle}>
        <Link className={styles.articleLink} href={articleContentViewUrl(model.profile_name, model.channel_name, model.path, model.name)}>{model.title}</Link>
      </div>
      <div className={styles.articleDescription}>
        {model.description}
      </div>
      <div>
        <Link className='btn btn-outline-secondary btn-sm' href={articleContentViewUrl(model.profile_name, model.channel_name, model.path, model.name)}>阅读更多</Link>
      </div>
    </article>
  </div>
}
