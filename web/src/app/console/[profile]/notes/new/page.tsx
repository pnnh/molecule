'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MarkdownEditorForm } from '../partials/edit' 
import { clientMakeHttpPut } from '@/services/client/http'
import { ArticleModel } from '@/models/article'

export default function Page () {
  const router = useRouter()
 
  return <MarkdownEditorForm onSubmit={async (newModel) => {
    const result = await clientMakeHttpPut<ArticleModel>('/restful/article', newModel)
    console.debug('result', result)
    if (result && result.uid) {
      router.replace('/console/articles')
      router.refresh()
    }
  }} />
}
