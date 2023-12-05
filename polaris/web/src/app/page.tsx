import React from 'react'
import { PublicNavbar } from './partials/navbar'
import styles from './page.module.scss'
import Link from 'next/link'
import queryString from 'query-string'
import { ArticleModel } from '@/models/article'
import { NoData } from '@/components/common/empty'
import { PSImage } from '@/components/client/image'
import { getIdentity } from '@/services/auth'
import { formatRfc3339 } from '@/utils/datetime'
import { subString } from '~/@pnnh/stele/esm/utils/string'
import { loadServerConfig } from '@/services/server/config'
import { ArticleService, articleContentViewUrl } from '@/services/article'

export default async function Home ({ searchParams }: {
  searchParams: Record<string, string>
}) {
  let page = Number(searchParams.page)
  if (isNaN(page)) {
    page = 1
  }
  const serverConfig = await loadServerConfig()
  const rawQuery = queryString.stringify(searchParams)
  const articleService = ArticleService.Instance(serverConfig.SERVER)
  const articles = await articleService.selectArticles(rawQuery)

  const identity = await getIdentity()
  return <div className={styles.indexPage}>
    <div>
      <PublicNavbar authServer={serverConfig.AUTH_SERVER} selfUrl={serverConfig.SELF_URL} account={identity}/>
    </div>
    <div className={styles.container}>
      <div className={styles.conMiddle}>
        <div className={styles.middleBody}>
          <MiddleBody articles={articles} />
        </div>
      </div>
    </div>
  </div>
}

function MiddleBody (props: { articles: { range: ArticleModel[], count: number } }) {
  if (!props.articles || !props.articles.range || props.articles.range.length === 0) {
    return <NoData size='large' />
  }
  return props.articles.range.map((model) => {
    return <div className={styles.middleItem} key={model.pk}>
      <div className={styles.itemDetail}>
        <div className={styles.title}>
          <Link href={articleContentViewUrl(model.profile_name, model.channel_name, model.partition_name, model.name)}>{model.title}</Link></div>
        <div className={styles.description} title={model.description}>
          {subString(model.description, 100)}
        </div>
        <div className={styles.action}>
          <span><i className="bi bi-eye"></i>&nbsp;{model.discover}</span>&nbsp;
          <span><i className="bi bi-clock"></i>&nbsp;{formatRfc3339(model.update_time)}</span>
        </div>
      </div>
      <div className={styles.itemCover}>
        <PSImage src={model.cover} alt={model.title} fill={true}/>
      </div>

    </div>
  })
}
