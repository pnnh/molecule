import React from 'react'
import {useRouter} from '~/next/navigation'
import {Button, Form, Input, Modal} from '~/antd'
import {ConfigFileModel} from '@/models/configfile'
import {ConfigFileClient} from '@/services/client/configfile'

export function EditButton (props: { model: ConfigFileModel }) {
  const model = props.model
  const [show, setShow] = React.useState(false)
  const router = useRouter()


  const onFormFinish = async (values: ConfigFileModel) => {
    console.log('Success:', values)
    const result = await ConfigFileClient.updateModel(values)
    console.debug('result', result)
    if (result && result.id && result.changes > 0) {
      setShow(false)
      router.refresh()
    }
  }

  return <>
    <Button type={'link'} size={'small'} onClick={() => setShow(!show)}>
      编辑
    </Button>
    <Modal title="编辑仓库" footer={null} open={show} onOk={async () => {
      setShow(false)
    }} onCancel={() => {
      console.debug('click cancel')
      setShow(false)
    }}>
      <Form
        name={'form_' + model.pk}
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
        initialValues={model}
        onFinish={onFormFinish}
        onFinishFailed={(errorInfo) => {
          console.log('Failed:', errorInfo)
        }}
        autoComplete="off"
      >
        <Form.Item
          label={'仓库ID'}
          name={'id'}>
          <Input value={model.pk} disabled={true}/>
        </Form.Item>
        <Form.Item
          label="仓库名称"
          name="name"
          rules={[{
            required: true,
          }]}
        >
          <Input required={true} value={model.name} placeholder={'仓库名称'}/>
        </Form.Item>
        <Form.Item
          label="仓库描述"
          name="description"
        >
          <Input.TextArea rows={4} value={model.description}/>
        </Form.Item>
        <Form.Item>
          <Button className={'ml-20'} type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
}

