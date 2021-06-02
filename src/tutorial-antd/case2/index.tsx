/*
 * @Author: lyf
 * @Date: 2021-04-26 19:54:27
 * @LastEditors: lyf
 * @LastEditTime: 2021-04-26 19:56:25
 * @Description: In User Settings Edit
 * @FilePath: /taro-cloud-demo/Users/a58/iworkspace/js-css-case/src/tutorial-antd/case2/index.tsx
 */
import React from 'react';
import { Button, Space, Select } from 'antd';

const Case2 = () => {
  return (
    <Space>
      <Button>测试</Button>
      <Select>
        <Select.Option value="2">111</Select.Option>
      </Select>
    </Space>
  );
};

export default Case2;
