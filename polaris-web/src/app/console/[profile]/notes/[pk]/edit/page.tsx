'use client'

import React, { useEffect, useState } from 'react'
import { ArticleModel } from '@/models/article'
import { useRouter } from 'next/navigation'
import { MarkdownEditorForm } from '../../partials/edit'
import { ArticleService } from '@/services/article'

interface IReadRequest {
  params: { pk: string }
}

export default function Page (request: IReadRequest) {
  const pk = request.params.pk
  const [model, setModel] = useState<ArticleModel>()
  const router = useRouter()
  const service = ArticleService.Instance()

  useEffect(() => {
    service.getArticle(pk).then((result) => {
      if (result) {
        setModel(result)
      }
    })
  }, [service, pk])
  if (!model || !model.body) {
    return null
  }

  return <MarkdownEditorForm model={model} onSubmit={(newModel) => {
    if (!newModel) {
      return
    }
    service.updateArticle(newModel).then((result) => {
      console.debug('result', result)
      if (result && result.uid) {
        router.replace('/console/articles')
        router.refresh()
      }
    })
  }} />
}
