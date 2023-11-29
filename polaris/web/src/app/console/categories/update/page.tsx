import React from 'react'
import { CategoryServerPresenter } from '@/presenters/category/server'
import EditPartial from '@/app/console/categories/update/partials/edit'

interface IReadRequest {
    searchParams: { pk: string }
}

export default async function Page (request: IReadRequest) {
  const pk = request.searchParams.pk
  const result = await CategoryServerPresenter.getModel(pk)
  if (result == null) {
    return <div>遇到错误</div>
  }
  const model = result
  if (!model) {
    return <div>无效分类</div>
  }

  return <div>
    <div>
      <EditPartial model={model}/>
    </div>
  </div>
}
