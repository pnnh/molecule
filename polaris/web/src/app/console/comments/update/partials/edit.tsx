'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CommentModel } from '@/models/comment'
import { CommentClientPresenter } from '@/presenters/comment/client'
import { Input, Textarea } from '@fluentui/react-components'

export default function EditPartial (props: { model: CommentModel }) {
  const model = props.model
  const [title, setTitle] = useState<string>(model.title)
  const [content, setContent] = useState<string>(model.content)
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
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }
          }
        />
      </div>
      <div className={'mt-3'}>
        <button className={'btn'} onClick={async () => {
          console.log('editorValue', content)
          if (!content) {
            return
          }
          model.title = title
          model.content = content
          const result = await CommentClientPresenter.updateModel(model)
          console.debug('result', result)
          if (result && result.pk) {
            router.push('/console/comments')
          }
        }}>保存
        </button>
      </div>
    </div>
  </div>
}
