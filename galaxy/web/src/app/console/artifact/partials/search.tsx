'use client'

import React, {useEffect, useState} from 'react'
import {useRouter} from '~/next/navigation'
import {Button, Form, Input, Popover, Select} from '~/antd'
import {UserClient} from '@/services/client/user'
import styles from './search.module.scss'
import {Col, ConfigProvider, Row} from 'antd'
import queryString from 'query-string'
// eslint-disable-next-line camelcase
import zh_CN from '~/antd/es/locale/zh_CN'
import {ArtifactSearchModel} from '@/models/artifact'

export function AdvancedSearchForm (props: { queryObject: ArtifactSearchModel }) {
  const router = useRouter()
  const [form] = Form.useForm()

  console.debug('props.searchParams2', props.queryObject)

  useEffect(() => {
    form.setFieldsValue(props.queryObject)
  }, [props.queryObject, form])

  const onFormFinish = async (values: ArtifactSearchModel) => {
    console.log('Success:', values)
    const queryDto = ArtifactSearchModel.toDto(values)
    const query = queryString.stringify(queryDto, {arrayFormat: 'bracket'})
    console.log('Success query:', query)

    const redirectUrl = '/console/artifact?' + query
    console.log('redirectUrl', redirectUrl)
    router.push(redirectUrl)
  }

  return <div className={styles.formContainer}>
    <Form
      name={'form_search'}
      colon={false}
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
      //initialValues={props.queryObject}
      form={form}
      onFinish={onFormFinish}
      onFinishFailed={(errorInfo) => {
        console.log('Failed:', errorInfo)
      }}
      autoComplete="off"
    >
      {/* eslint-disable-next-line camelcase */}
      <ConfigProvider locale={zh_CN}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="关键词"
              name="complex_keyword"
              labelCol={{
                span: 3,
                offset: 0
              }}
              wrapperCol={{
                span: 21,
              }}
            >
              <Input placeholder={'输入关键词'}/>
            </Form.Item></Col>
        </Row>
        <Row>
          <Button className={'ml-20'} type="primary" htmlType="submit">提交</Button>
          <Button className={'ml-8'} danger onClick={() => {
            form.resetFields()
          }}>清除</Button>
        </Row>
      </ConfigProvider>
    </Form>
  </div>
}

export function AdvancedSearchPopover (props: { searchParams: ArtifactSearchModel }) {
  const [open, setOpen] = useState(false)
  const hasSearch = !props.searchParams.isEmpty()
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  return <Popover content={<AdvancedSearchForm queryObject={props.searchParams}/>} title="高级搜索"
    trigger="click"
    placement="bottomRight"
    open={open}
    onOpenChange={handleOpenChange}>
    <Button type="primary" className={hasSearch ? 'bg-amber-400' : ''}>高级搜索</Button>
  </Popover>
}
