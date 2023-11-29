'use client'

import React, {useEffect, useState} from 'react'
import {useRouter} from '~/next/navigation'
import {Button, Form, Input, Modal, Select} from '~/antd'
import {UserClient} from '@/services/client/user'
import {RepositoryDto} from '@/models/repository'
import {RepositoryClient} from '@/services/client/repository'

export function AddButton () {
  const [show, setShow] = React.useState(false)
  const router = useRouter()

  const onFormFinish = async (values: RepositoryDto) => {
    console.log('Success:', values)
    const result = await RepositoryClient.insertModel(values)
    console.debug('result', result)
    if (result && result.id && result.changes > 0) {
      setShow(false)
      router.refresh()
    }
  }

  return <>
    <Button type={'primary'} onClick={() => setShow(!show)}>
      新增仓库
    </Button>
    <Modal title="新增仓库" footer={null} open={show} onOk={async () => {
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
          label="仓库名称"
          name="name"
          rules={[{
            required: true,
          }]}
        >
          <Input required={true} placeholder={'仓库名称'}/>
        </Form.Item>

        <Form.Item
          label={'调用地址'}
          name={'runner_url'}
          rules={[{type: 'url'}]}>
          <Input/>
        </Form.Item>
        <Form.Item
          label="仓库描述"
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

