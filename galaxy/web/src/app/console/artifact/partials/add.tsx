'use client'

import React, {useEffect, useState} from 'react'
import {useRouter} from '~/next/navigation'
import {Button, Form, Input, Modal, Select} from '~/antd'
import {UserClient} from '@/services/client/user'
import {ArtifactDto} from '@/models/artifact'
import {ArtifactClient} from '@/services/client/artifact'

export function AddButton () {
  const [moduleData, setModuleData] = useState<{ label: string, value: number }[]>([])
  const [userData, setUserData] = useState<{ label: string, value: number }[]>([])
  const [show, setShow] = React.useState(false)
  const router = useRouter()

  const onFormFinish = async (values: ArtifactDto) => {
    console.log('Success:', values)
    const result = await ArtifactClient.insertModel(values)
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
    <Modal title="创建仓库" footer={null} open={show} onOk={async () => {
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
        <Form.Item label={'所属模块'} name={'module_id'}>
          <Select
            showSearch
            placeholder="选择模块"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={moduleData}
          />
        </Form.Item>
        <Form.Item label={'经办人'} name={'operator'}>
          <Select
            showSearch
            placeholder={'输入以搜索用户'}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={async (newValue: string) => {
              const userData = await UserClient.handleUserSearch(newValue)
              setUserData(userData)
            }}
            notFoundContent={null}
            options={(userData || []).map((d: { label: string, value: number }) => ({
              value: d.value,
              label: d.label,
            }))}
          />
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

