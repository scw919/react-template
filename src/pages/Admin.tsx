import React from 'react';
import { SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Route, Switch } from 'react-router-dom';
// import { useIntl } from 'umi';
import TestDemo from './access/test';
import TaskDemo from './access/task';

export default (): React.ReactNode => {
  // const intl = useIntl();
  return (
    <PageHeaderWrapper
      content={'这个页面不同用户权限展示内容是不同的（admin与user）'}
      header={{ title: '公共title' }}
    >
      <Card style={{ marginBottom: 20 }}>
        <Alert
          message={'更快更强的重型组件，已经发布。Admin'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> 我是嵌套路由公共页面额\(^o^)/~
        </Typography.Title>
        <Typography.Text strong>{'这部分类容所有用户都是可见的，没有限制权限'}</Typography.Text>
      </Card>
      <Switch>
        <Route path="/admin/test" component={TestDemo}></Route>
        <Route path="/admin/task" component={TaskDemo}></Route>
      </Switch>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
        。
      </p>
    </PageHeaderWrapper>
  );
};
