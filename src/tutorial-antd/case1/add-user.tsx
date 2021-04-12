import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Form, Input, Button, Select, DatePicker, Spin, message } from 'antd';
import { get, post, } from '@utils/fetch'
import { getTableDataById, addTabeData, editTabeData } from './api'

interface UserProps {
  id: string;
  onCancel: () => void
  reload: () => void
}

const SelectOptions = [
  { label: 'male', value: 'male' },
  { label: 'female', value: 'female' },
  { label: 'other', value: 'other' }
]

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const User = ({ id, onCancel, reload }: UserProps) => {
  const isEdit = !!id
  const [form] = Form.useForm()
  const [state, setState] = useState({ loading: isEdit, initialValues: {} })

  const onFinish = async (values) => {
    const { time, ...rest } = values
    const params = { ...rest }
    if (isEdit) {
      params.id = id
    }
    Object.keys(time).map((item) => { // 对时间变量需要格式化
      params[item] = time[item].format()
    })
    try {
      const result = await post(isEdit ? editTabeData : addTabeData, params)
      if (result.statusCode === 1) {
        message.info(`${isEdit ? '修改' : '新增'}成功`)
        onCancel()
        reload()
      } else {
        message.error(`${isEdit ? '修改' : '新增'}失败`)
      }
    } catch (err) {
      message.error(`${isEdit ? '修改' : '新增'}失败`)
      onCancel()
    }
  }

  const onFinishFailed = (errors) => {
    console.log('onFinishFailed', errors)
  }

  const onGenderChange = (gender: string) => {
    setState((state) => ({ ...state, gender }))
  }

  useEffect(() => {
    async function getData () {
      try {
        const result = await get(getTableDataById, { page: 1, pageSize: 50 })
        if (result.statusCode === 1) {
          const initialValues = {
            username: 'abc',
            gender: 'female',
            time: { year: moment().subtract(7, 'days'), month: moment() }
          }
          setState((state) => ({ ...state, loading: false, initialValues }))
        } else {
          onCancel()
          message.error('加载数据失败')
        }
      } catch (err) {
        onCancel()
        message.error('加载数据失败')
      }
    }

    isEdit && getData()
  }, [])

  const { loading, initialValues } = state

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin tip="数据加载中..."/>
      </div>
    )
  }

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input allowClear/>
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          onChange={onGenderChange}
          allowClear
          options={SelectOptions}
        />
      </Form.Item>
      <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
        <Form.Item
          name={['time', 'year']}
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 4px)', marginRight: 8 }}
        >
          <DatePicker style={{ width: '100%' }}/>
        </Form.Item>
        <Form.Item
          name={['time', 'month']}
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}
        >
          <DatePicker style={{ width: '100%' }}/>
        </Form.Item>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default User