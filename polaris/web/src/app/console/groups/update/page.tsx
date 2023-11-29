import React from 'react'
import EditPartial from './partials/edit'
import { GroupServerPresenter } from '@/presenters/group/server'

interface IReadRequest {
    searchParams: { pk: string }
}

export default async function Page (request: IReadRequest) {
  const pk = request.searchParams.pk
  const result = await GroupServerPresenter.getModel(pk)
  if (result == null) {
    return <div>遇到错误</div>
  }
  const model = result
  if (!model) {
    return <div>无效文章</div>
  }

  return <div>
    <div>
      <EditPartial model={model}/>
    </div>
  </div>
}
