'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CategoryModel } from '@/models/category'
import { CategoryClientPresenter } from '@/presenters/category/client'
import { Input, Textarea } from '@fluentui/react-components'

export default function Page () {
  const [title, setTitle] = useState<string>('标题')
  const [description, setDescription] = useState<string>('新分类')
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
          placeholder="描述"
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
          const model = new CategoryModel()
          model.title = title
          model.description = description
          const result = await CategoryClientPresenter.createModel(model)
          if (result && result.pk) {
            router.push('/console/categories')
          }
        }}>保存
        </button>
      </div>
    </div>
  </div>
}
