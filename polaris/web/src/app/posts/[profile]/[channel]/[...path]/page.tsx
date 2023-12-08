import '~/prism-themes/themes/prism-one-light.min.css'
import styles from './page.module.scss'
import React from 'react'
import { TocItem } from '@/models/article'
import { BuildBodyHtml } from '@/components/common/article'
import { TocInfo } from '@/components/common/toc'
import { generatorRandomString } from '~/@pnnh/stele/esm/utils/string'
import { headers } from 'next/headers'
import { formatRfc3339 } from '@/utils/datetime'
import { loadServerConfig } from '@/services/server/config'
import { ArticleService, articleContentViewUrl } from '@/services/article'
import queryString from 'query-string'
import { Metadata } from 'next'

interface PageProps {
  profile: string
  channel: string
  partition: string[]
}

export const metadata: Metadata = {
  title: '北极星笔记'
}

export default async function Home ({ params }: { params: PageProps }) {
  const serverConfig = await loadServerConfig()
  const service = ArticleService.Instance(serverConfig.SERVER)
  const getQuery = queryString.stringify(params, { arrayFormat: 'comma' })
  const articleModel = await service.getArticle('+', getQuery)
  if (articleModel == null) {
    return <div>遇到错误</div>
  }
  metadata.title = articleModel.title + ' - 北极星笔记'
  const article = articleModel
  const tocList: TocItem[] = []
  const titleId = generatorRandomString(8)
  tocList.push({ title: article.title, header: 0, id: titleId })
  if (!article.body) {
    return <div>暂不支持的文章类型</div>
  }
  const headersList = headers()
  const clientIp = headersList.get('ps-ip') || 'unknown'
  console.log('clientIp', clientIp)
  // 更新文章阅读次数
  // await ViewerService.Instance(serverConfig.SERVER).newArticleViewer(params.channel, params.name, clientIp)
  const readUrl = articleContentViewUrl(articleModel.profile_name, articleModel.channel_name, articleModel.path, articleModel.name)
  return <div className={styles.articleContainer}>
    <div className={styles.leftArea}>
      <div className={styles.articleInfo}>
        <h1 className={styles.articleTitle} id={titleId}>{article.title}</h1>
        <div className={styles.action}>
          <span><i className="bi bi-eye"></i>&nbsp;{article.discover}</span>&nbsp;
          <span><i className="bi bi-clock"></i>&nbsp;{formatRfc3339(article.update_time)}</span>
        </div>
        <div className={styles.articleBody}>
          <BuildBodyHtml tocList={tocList} header={article.header} body={article.body} />
        </div>
      </div>
    </div>
    <div className={styles.rightArea}>
        <TocInfo channel={params.channel} readurl={readUrl} model={tocList} />
    </div>
  </div>
}
