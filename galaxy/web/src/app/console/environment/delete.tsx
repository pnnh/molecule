import React from 'react'
import {useRouter} from '~/next/navigation'
import {Button, Modal} from '~/antd' 
import { EnvironmentClientService } from '@/services/client/environment'
import { EnvironmentModel } from '@/models/environment'

export function DeleteButton (props: { model: EnvironmentModel }) {
  const model = props.model

  const [show, setShow] = React.useState(false)
  const router = useRouter()

  return <>
    <Button type={'link'} danger={true} size={'small'} onClick={() => setShow(!show)}>
      删除
    </Button>
    <Modal title="删除仓库" open={show} onOk={async () => {
      setShow(false)
      const service = new EnvironmentClientService()
      const result = await service.deleteModel(model.pk)
      console.debug('result', result)
      if (result && result.id && result.changes > 0) {
        setShow(false)
        router.refresh()
      }
    }} onCancel={() => {
      setShow(false)
    }}>
      确定要删除仓库 [{model.name}] 吗？
    </Modal>
  </>
}

