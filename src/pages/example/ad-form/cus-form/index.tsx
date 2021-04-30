import React from 'react';
// 动态添加class
// import classnames from 'classnames';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Form, DatePicker } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';

// import styles from './index.less';
const CusForm: React.FC = () => {
  const onFinish = async (values: any) => {
    console.log('Success:', values);
  };
  return (
    <PageContainer fixedHeader>
      <Card>
        <p></p>
        <Typography.Title level={4}>1.自定义富文本表单</Typography.Title>
        <ProForm
          // horizontal vertical  inline; 默认是：vertical
          layout={'horizontal'}
          onFinish={onFinish}
        >
          <ProFormText
            name="name1"
            label="名称"
            tooltip="最长为 24 位"
            rules={[
              {
                required: true,
                message: '请输入名称!',
              },
            ]}
          />
          <ProFormSelect
            name="firend1"
            label="朋友"
            options={[
              {
                value: 'liujun',
                label: '小军',
              },
              {
                value: 'shuijun',
                label: '水军',
              },
            ]}
          />
          {/* 使用ant design 的组件 */}
          <Form.Item name="data1" label="日期">
            <DatePicker />
          </Form.Item>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CusForm;
