'use client'

import React from 'react'
import {useRouter} from '~/next/navigation'
import {Button, Form, Input, Modal} from '~/antd' 
import { EnvironmentModel } from '@/models/environment'
import { EnvironmentClientService } from '@/services/client/environment'

export function AddButton () {
  const [show, setShow] = React.useState(false)
  const router = useRouter()

  const onFormFinish = async (values: EnvironmentModel) => {
    console.log('Success:', values)
    const service = new EnvironmentClientService()
    const result = await service.insertModel(values)
    console.debug('result', result)
    if (result && result.id && result.changes > 0) {
      setShow(false)
      router.refresh()
    }
  }

  return <>
    <Button type={'primary'} onClick={() => setShow(!show)}>
      新建环境
    </Button>
    <Modal title="新增配置" footer={null} open={show} onOk={async () => {
      setShow(false)
    }} onCancel={() => {
      console.debug('click cancel')
      setShow(false)
    }}>
      <Form
        name={'form_add'}
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
        onFinish={onFormFinish}
        onFinishFailed={(errorInfo) => {
          console.log('Failed:', errorInfo)
        }}
        autoComplete="off"
      >
        <Form.Item
          label="环境名称"
          name="name"
          rules={[{
            required: true,
          }]}
        >
          <Input required={true} placeholder={'环境名称'}/>
        </Form.Item>
        <Form.Item
          label="环境描述"
          name="description"
        >
          <Input.TextArea rows={4}/>
        </Form.Item>
        <Form.Item>
          <Button className={'ml-20'} type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
}

