'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChannelModel } from '@/models/channel'
import { Input, Textarea } from '@fluentui/react-components'
import { ChannelService } from '@/services/channel'

export default function EditPartial (props: { model: ChannelModel }) {
  const model = props.model
  const [title, setTitle] = useState<string>(model.title)
  const [description, setDescription] = useState<string>(model.description)
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
          model.title = title
          model.description = description
          const service = ChannelService.Instance()
          const result = await service.updateChannel(model)
          console.debug('result', result)
          if (result && result.uid) {
            router.push('/console/channel')
          }
        }}>保存
        </button>
      </div>
    </div>
  </div>
}
