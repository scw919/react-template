/**
 * 组件模板
 */
import React, { memo, useEffect, useRef } from 'react';
// 动态添加class
// import classnames from 'classnames';
// import styles from './index.less';

import { Button, message } from 'antd';
import type { FormInstance } from 'antd';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

// 组件接收的参数
export interface DemoModalProps {
  title?: string;
  width?: number;
  modalData?: any;
  onModalChange?: (type: string | 'ok' | 'cancel' | 'reset', values: any) => void;
}

/**
 * 这个是一个对话框的案例
 */
const DemoModal: React.FC<DemoModalProps> = ({
  title = '新建对话框-案例',
  width = 800,
  modalData = {
    name: 'liujun',
  },
  onModalChange = () => {},
}) => {
  // props 获取属性

  // state 定义变量
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    initModalData(modalData);
  }, [modalData]);

  function initModalData(values: any) {
    // console.log('对话框数据的初始化=', values)
    formRef?.current?.setFieldsValue(values);
  }
  // =============== handle 区域===============

  // =============== render 区域===============
  return (
    <ModalForm
      formRef={formRef}
      title={title}
      width={width}
      // visible={modalVisible} // 可以手动控制对话的显示和隐藏
      // 触发对话框显示的按钮
      trigger={
        // <Button type="primary">
        //   <PlusOutlined />
        //   新建表单
        // </Button>
        <a key="item1">
          <PlusOutlined />
          新建表单
        </a>
      }
      modalProps={{
        onCancel: () => {
          console.log('监听点击取消 run');
          onModalChange('cancel', null);
        },
      }}
      // 监听点击确认
      onFinish={async (values) => {
        console.log('提交成功=', values);
        message.success('提交成功');
        onModalChange('ok', values);
        return true;
      }}
      // 可以自定义底部的按钮
      submitter={{
        render: (props, defaultDoms) => {
          return [
            ...defaultDoms,
            <Button
              key="ok"
              onClick={() => {
                props.submit();
              }}
            >
              ok
            </Button>,
            <Button
              key="extra-reset"
              onClick={() => {
                props.reset();
              }}
            >
              reset
            </Button>,
          ];
        },
      }}
    >
      {/* 两列 */}
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
      </ProForm.Group>
      {/* 一列 */}
      <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
    </ModalForm>
  );
};

// memo 是性能优化（浅层比较更新组件）
export default memo(DemoModal);
