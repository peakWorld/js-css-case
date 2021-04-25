import React from 'react';
import moment, { Moment } from 'moment';
import { Input, Select, DatePicker, Button, Space } from 'antd';

export interface Params {
  page: number;
  pageSize: number;
  username: string;
  condition: string;
  nowTime: string;
  rangeTime: string[];
}

export interface ModalInfo {
  visible: boolean /* 是否可见 */;
  title: string /* 弹窗标题 */;
  id: string /* 区分修改、新增 */;
  mKey: number /* 区分多个弹窗, 互斥; 每次只能展示一个弹窗 */;
}

const { RangePicker } = DatePicker;
const { Search } = Input;

const dateFormat = 'YYYY-MM';
const defaultDate = moment().subtract(7, 'days');

const rangeFormat = 'YYYY-MM-DD HH:mm:ss';
const defaultRange = [defaultDate, moment()] as [Moment, Moment];

const SelectOptions = [
  { label: '用户ID', value: 'uid' },
  { label: '手机号', value: 'phone' },
  { label: '邮箱', value: 'mail' },
];

interface ToolProps {
  setParams: (params: Partial<Params>) => void;
  handleModal: (infos: Partial<ModalInfo>) => void;
}

const Tool = ({ setParams, handleModal }: ToolProps) => {
  const handleUserNameChange = (value: string) => {
    setParams({ username: value });
    console.log('handleUserNameChange', value);
  };

  const handleConditionChange = (value: any) => {
    setParams({ condition: value });
    console.log('handleConditionChange', value);
  };

  const handleNowTimeChange = (_, dateString: string) => {
    setParams({ nowTime: dateString });
    console.log('handleNowTimeChange', dateString);
  };

  const handleRangeChange = (_, dateString: string[]) => {
    setParams({ rangeTime: dateString });
    console.log('handleRangeChange', dateString);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Space wrap>
        <Search placeholder="输入用户名3" allowClear onSearch={handleUserNameChange} style={{ width: 250 }} />
        <Select placeholder="选择条件" allowClear onChange={handleConditionChange} options={SelectOptions} style={{ width: 200 }} />
        {/*
          1. 日期只使用onChange事件即可
          2. 确定按钮 只在showTime为true才展示, 相应的onOk函数不能满足所有情况
        */}
        <DatePicker
          defaultValue={defaultDate}
          format={dateFormat}
          allowClear
          showTime
          onChange={handleNowTimeChange}
          // onOk={handleNowTimeOk}
        />
        <RangePicker
          defaultValue={defaultRange}
          format={rangeFormat}
          showTime
          onChange={handleRangeChange}
          // onOk={handleRangeOk}
        />
      </Space>
      {/* 只有打开弹窗才有该部分代码 */}
      <Space style={{ marginLeft: 'auto' }}>
        <Button type="primary" onClick={() => handleModal({ mKey: 0, title: '用户新增', visible: true, id: '' })}>
          新增
        </Button>
      </Space>
    </div>
  );
};

export default Tool;
