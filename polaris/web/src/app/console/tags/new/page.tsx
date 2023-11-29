'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TagModel } from '@/models/tag'
import { TagClientPresenter } from '@/presenters/tag/client'
import { Input, Textarea } from '@fluentui/react-components'

export default function Page () {
  const [title, setTitle] = useState<string>('标题')
  const [description, setDescription] = useState<string>('新内容')
  const router = useRouter()
  return <div>
    <div>
      <div>
        <Input
          placeholder="标题"
          required={true}
          value={title}
          color="gray" onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
      </div>
      <div className={'mt-4'}>
        <Textarea
          placeholder="内容"
          required={true}
          rows={4}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }
          }
        />
      </div>
      <div className={'mt-3'}>
        <button className={'btn'} onClick={async () => {
          if (!title) {
            return
          }
          const model = new TagModel()
          model.title = title
          model.description = description
          const result = await TagClientPresenter.createModel(model)
          console.debug('result', result)
          if (result && result.pk) {
            router.push('/console/tags')
          }
        }}>保存
        </button>
      </div>
    </div>
  </div>
}
