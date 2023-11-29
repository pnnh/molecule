import React from 'react'
import {useRouter} from '~/next/navigation'
import {Button, Form, Input, Modal} from '~/antd'
import {TaskModel} from '@/models/task'
import {TaskClient} from '@/services/client/task'

export function EditButton (props: { model: TaskModel }) {
  const model = props.model
  const [show, setShow] = React.useState(false)
  const router = useRouter()


  const onFormFinish = async (values: TaskModel) => {
    console.log('Success:', values)
    const result = await TaskClient.updateModel(values)
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
        name={'form_' + model.id}
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
          <Input value={model.id} disabled={true}/>
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

