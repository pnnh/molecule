'use client'

import React, { useEffect, useState } from 'react'
import { ArticleModel, TocItem } from '@/models/article'
import styles from './page.module.scss'
import { BuildBodyHtml } from '@/components/common/article'
import { generatorRandomString } from '~/@pnnh/stele/esm/utils/string'
import { TWButton } from '@/components/client/controls'
import { ArticleService } from '@/services/article'

interface IReadRequest {
    params: { pk: string }
}

export default function Page (request: IReadRequest) {
  const pk = request.params.pk
  const [model, setModel] = useState<ArticleModel>()

  useEffect(() => {
    const service = ArticleService.Instance()
    service.getArticle(pk).then((result) => {
      if (result) {
        setModel(result)
      }
    })
  }, [pk])
  if (!model || !model.body) {
    return null
  }

  const tocList: TocItem[] = []
  const titleId = generatorRandomString(8)
  tocList.push({ title: model.title, header: 0, id: titleId })
  return <div className={styles.viewPage}>
    <div className={styles.toolbar}>
      <TWButton>编辑</TWButton>
      <TWButton>分享</TWButton>
      <TWButton>删除</TWButton>
    </div>
      <div className={styles.content}>
        <BuildBodyHtml tocList={tocList} header={model.header} body={model.body} />
      </div>
  </div>
}
