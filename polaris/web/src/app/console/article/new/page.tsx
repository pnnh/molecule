'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MarkdownEditorForm } from '../partials/edit'
import { ArticleService } from '@/services/article'

export default function Page () {
  const router = useRouter()

  const service = ArticleService.Instance()
  return <MarkdownEditorForm onSubmit={async (newModel) => {
    const result = await service.updateArticle(newModel)
    console.debug('result', result)
    if (result && result.pk) {
      router.replace('/console/articles')
      router.refresh()
    }
  }} />
}
