'use client'

import React, {useState} from 'react'
import {Input} from '~/antd'
import {useRouter} from 'next/navigation'
import {RepositoryDto} from '@/models/repository'
import {RepositoryClient} from '@/services/client/repository'

export default function Page () {
  const [title, setTitle] = useState<string>('标题')
  const [content, setContent] = useState<string>('新内容')
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
        <Input.TextArea
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
          const model = {
            title
          } as RepositoryDto
          const result = await RepositoryClient.insertModel(model)
          console.debug('result', result)
          if (result && result.id) {
            router.push('/console/repository')
          }
        }}>保存
        </button>
      </div>
    </div>
  </div>
}
