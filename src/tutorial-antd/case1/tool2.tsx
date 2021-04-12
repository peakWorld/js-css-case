import React from 'react';
import moment, { Moment } from 'moment';
import { Input, Select, DatePicker, Button, Space, Form, Row, Col } from 'antd';

export interface Params {
  page: number
  pageSize: number
  username: string
  condition: string
  nowTime: string
  rangeTime: string[]
}

export interface ModalInfo {
  visible: boolean /* 是否可见 */
  title: string /* 弹窗标题 */
  id: string /* 区分修改、新增 */
  mKey: number /* 区分多个弹窗, 互斥; 每次只能展示一个弹窗 */
}

const { RangePicker } = DatePicker

const dateFormat = 'YYYY-MM'
const defaultDate = moment().subtract(7, 'days')

const rangeFormat = 'YYYY-MM-DD HH:mm:ss'
const defaultRange = [defaultDate, moment()] as [Moment, Moment]

const SelectOptions = [
  { label: '用户ID', value: 'uid' },
  { label: '手机号', value: 'phone' },
  { label: '邮箱', value: 'mail' }
]

interface ToolProps {
  setParams: (params: Partial<Params>) => void
  handleModal: (infos: Partial<ModalInfo>) => void
}

const Tool = ({ setParams, handleModal }: ToolProps) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { nowTime, rangeTime, ...rest } = values;
    const params = { ...rest }
    params.nowTime = nowTime.format(dateFormat)
    params.rangeTime = rangeTime.map((item) => item.format(rangeFormat))
    console.log('params', params)
    setParams(params)
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        nowTime: defaultDate,
        rangeTime: defaultRange
      }}
    >
      <Row wrap>
        <Col xl={5}>
          <Form.Item name="username" label="用户名">
            <Input allowClear style={{ width: 250 }} />
          </Form.Item>
        </Col>
        <Col xl={4}>
          <Form.Item name="condition" label="条件">
            <Select allowClear options={SelectOptions} style={{ width: 200 }} />
          </Form.Item>
        </Col>
        <Col xl={3}>
          <Form.Item name="nowTime" label="日期">
            <DatePicker
              format={dateFormat}
              allowClear
              showTime
            />
          </Form.Item>
        </Col>
        <Col xl={7}>
          <Form.Item name="rangeTime" label="时间段">
            <RangePicker
              format={rangeFormat}
              allowClear
              showTime
            />
          </Form.Item>
        </Col>
        <Col style={{ marginLeft: 'auto' }}>
          <Space>
            <Button type="primary" htmlType="submit">确定</Button>
            <Button type="primary" onClick={() => handleModal({ mKey: 0, title: '用户新增', visible: true, id: '' })}>新增</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

export  default Tool