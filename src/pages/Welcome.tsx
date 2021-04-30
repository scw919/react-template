import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import styles from './Welcome.less';
import { connect } from 'dva';
import { useModel } from 'umi';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

// console.log(`=======${REACT_APP_ENV}`);
const WelcomeCom = (props: any): React.ReactNode | any => {
  const { title, setVal, resetVal } = props;
  // console.log(getDvaApp());
  const { setTokenVal, token, resetTokenVal } = useModel('welcome_hook' as any, (model: any) => ({
    setTokenVal: model.setTokenVal,
    token: model.token,
    resetTokenVal: model.resetTokenVal,
  }));
  // console.log('89564123');
  useEffect(() => {
    // console.log('ajax');
    // React.request.httpGet('/api/currentUser').then((res: any) => {
    //   // console.log(res);
    // });
  }, []);

  return (
    <PageContainer>
      <Card>
        <Alert
          message={'更快更强的重型组件，已经发布。welcome'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          {' 高级表格'}
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            {'欢迎使用'}
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-table</CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          {' 高级布局'}
          <a
            href="https://procomponents.ant.design/components/layout"
            rel="noopener noreferrer"
            target="__blank"
          >
            {'欢迎使用'}
          </a>
        </Typography.Text>

        <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Typography.Text strong>
          当前App环境REACT_APP_ENV={REACT_APP_ENV}。 当前测试API Url前缀API_URL={API_URL} 。
        </Typography.Text>
        <div>{`来自dva的state==${title}`}</div>
        <Button
          type="primary"
          onClick={() => {
            setVal(10);
          }}
        >
          dva点击2s后异步更新state
        </Button>
        <Button style={{ marginLeft: 10 }} type="dashed" onClick={() => resetVal()}>
          重置
        </Button>
        <div style={{ marginTop: 20 }}>
          <Typography.Text>
            hooks获取当前token====={token}
            <Button type="primary" style={{ marginLeft: 10 }} onClick={() => setTokenVal()}>
              点击1s后更新hooks值
            </Button>
            <Button style={{ marginLeft: 10 }} onClick={() => resetTokenVal()}>
              重置hook值
            </Button>
          </Typography.Text>
        </div>
      </Card>
    </PageContainer>
  );
};

const mapStateProps = (state: any) => {
  return {
    title: state.come?.title,
    token: state.token,
  };
};

const mapActionDispatch = {
  setTokenVal: (token: any) => ({ type: 'come/setTokenVal', token }),
  setVal: (payload: any) => ({ type: 'come/init', payload }),
  resetVal: (payload?: any) => ({ type: 'come/resetVal', payload }),
};

export default connect(mapStateProps, mapActionDispatch)(WelcomeCom);
