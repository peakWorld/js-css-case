import React, { useMemo, useState } from 'react';
import { Divider, Button, Space, Table, Popconfirm, Modal, TablePaginationConfig } from 'antd';
import useFetchData from '@hooks/use-fetch-data';
// import { RangeValue } from 'rc-picker/lib/interface';
import { ColumnsType } from 'antd/es/table';
import User from './add-user';
import Tool, { Params, ModalInfo } from './tool';
import { getTableData } from './api';

interface TableItemData {
  id: string;
  showName: string;
  platform: string;
  dataType: string;
  scene: string;
  createTime: string;
  updateTime: string;
}

const Case1 = () => {
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ visible: false, title: '', id: '', mKey: 0 });

  const [state, { reload, setParams }] = useFetchData<Partial<Params>>({
    url: getTableData,
    params: { page: 1, pageSize: 50 },
    data: [],
    transforms(state, result) {
      const data = result.records || [];
      return { ...state, data: [...state.data, ...data], total: 100 };
    },
  });

  const columns: ColumnsType<TableItemData> = useMemo(
    () => [
      {
        title: '名称',
        dataIndex: 'showName',
        align: 'center',
        fixed: 'left',
      },
      {
        title: '平台',
        dataIndex: 'platform',
        align: 'center',
      },
      {
        title: '类型',
        dataIndex: 'dataType',
        align: 'center',
      },
      {
        title: '场景',
        dataIndex: 'scene',
        align: 'center',
      },
      {
        title: '开始时间',
        dataIndex: 'createTime',
        align: 'center',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        align: 'center',
      },
      {
        title: '开始时间',
        dataIndex: 'createTime',
        align: 'center',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        align: 'center',
        width: 150,
        render(_, record) {
          return (
            <Space direction="vertical">
              <Button type="primary" onClick={() => handleModal({ mKey: 0, title: '用户修改', visible: true, id: record.id })}>
                修改
              </Button>
              <Popconfirm title="确定删除吗?">
                <Button danger>删除</Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ],
    [],
  );

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current, pageSize } = pagination;
    setParams({ page: current, pageSize });
  };

  // const handelTableRowSelection = (selectedRowKeys) => {
  //   console.log(selectedRowKeys)
  // }

  const handleModal = (modalInfo: Partial<ModalInfo>) => {
    setModalInfo((info) => ({ ...info, ...modalInfo }));
  };

  const handleModalCancel = () => {
    setModalInfo((info) => ({ ...info, visible: false, id: '' }));
  };

  const { loading, data, total, params } = state;
  const { title, visible, id, mKey } = modalInfo;

  return (
    <>
      <Tool setParams={setParams} handleModal={handleModal} />
      <Divider orientation="left" />
      <Table<TableItemData>
        bordered
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        onChange={handleTableChange}
        // pagination={false} // 隐藏分页
        pagination={{
          // hideOnSinglePage: true, // 单页数据隐藏分页
          total, // 总条数
          pageSize: params?.pageSize, // 每页条数
          current: params?.page, // 当前页

          // showSizeChanger: false, // 页数切换器

          // 使用table的onChange事件即可
          // onChange: (...rest) => handlePageChange('onChange', ...rest),
          // onShowSizeChange: (...rest) => handlePageChange('onShowSizeChange', ...rest)
        }}
        // 一般批量删除
        // rowSelection={{
        //   fixed: true,
        //   onChange: handelTableRowSelection
        // }}
      />
      <Modal title={title} visible={visible} footer={null} destroyOnClose onCancel={handleModalCancel}>
        {mKey === 0 && <User id={id} onCancel={handleModalCancel} reload={reload} />}
      </Modal>
    </>
  );
};

export default Case1;
