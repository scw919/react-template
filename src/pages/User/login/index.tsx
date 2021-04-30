import {
  // AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  // TaobaoCircleOutlined,
  UserOutlined,
  // WeiboCircleOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { connect } from 'dva';
import { queryMenuData } from '../../../../mock/userData';

import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
    // location.reload();
    // history.push('/welcome');
  }, 10);
};

const Login: React.FC | any = (props: any) => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState }: any = useModel('@@initialState');
  const { setTokenVal, setMenuVal } = props;

  // 刷新验证码(演示用)
  const [codeNumb, setCodeNumb] = useState(2);

  // const intl = useIntl();

  const fetchUserInfo = async (val: any) => {
    // console.log(initialState);

    const userInfo = await initialState?.fetchUserInfo;
    // console.log(userInfo);

    if (!userInfo) {
      setInitialState({
        ...initialState,
        fetchUserInfo: { ...val, ...{ token: 'test123' } },
        // menuData: queryMenuData(),
      });
    }
  };

  // const handleSubmit = async (values: API.LoginParams) => {
  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // 登录
      // const msg = await login({ ...values, type });
      const msg = { status: 'ok' };
      if (msg.status === 'ok') {
        message.success('登录成功！');
        setTokenVal('666888');
        setMenuVal(queryMenuData());
        await fetchUserInfo(values);
        goto();
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      {/* <div className={styles.lang}>{SelectLang && <SelectLang />}</div> */}
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              {/* <img alt="logo" className={styles.logo} src="/logo.png" /> */}
              <span className={styles.title}>统一业务系统</span>
            </Link>
          </div>
          <div className={styles.desc}>基于Pro架构的统一业务系统</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              // onFinish={async (values) => {
              handleSubmit(values);
              // console.log(values);

              // handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane key="account" tab={'账户密码登录'} />
              <Tabs.TabPane key="mobile" tab={'手机号登录'} />
              <Tabs.TabPane key="account-code" tab={'账户密码验证码登录'} />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage content={'账户或密码错误（admin/ant.design)'} />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'用户名: admin or user'}
                  initialValue={'admin'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'密码: ant.design'}
                  initialValue={'ant.design'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
              </>
            )}

            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="mobile"
                  placeholder={'手机号'}
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={'请输入验证码'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} 获取验证码`;
                    }
                    return '获取验证码';
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={async (phone) => {
                    const result = await getFakeCaptcha({
                      phone,
                    });
                    if (result === false) {
                      return;
                    }
                    message.success('获取验证码成功！验证码为：1234');
                  }}
                />
              </>
            )}
            {status === 'error' && loginType === 'account-code' && (
              <LoginMessage content={'账户、密码或验证码错误（admin/ant.design)'} />
            )}
            {type === 'account-code' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'用户名: admin or user'}
                  initialValue={'admin'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'密码: ant.design'}
                  initialValue={'ant.design'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
                <ProForm.Group>
                  <ProFormText
                    width={'sm'}
                    name="verificationCode"
                    fieldProps={{
                      size: 'large',
                      prefix: <MailOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder={'请输入验证码'}
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码!',
                      },
                    ]}
                  />
                  <div
                    className={styles.codeBox}
                    onClick={() => {
                      setCodeNumb(new Date().getTime());
                    }}
                  >
                    <img
                      src={`https://apply.jtys.sz.gov.cn/apply/app/validCodeImage?ee=${codeNumb}`}
                      className={styles.codeImg}
                    />
                  </div>
                </ProForm.Group>
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                {'自动登录'}
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                {'忘记密码'}
              </a>
            </div>
          </ProForm>
          <Space className={styles.other}>
            {/* {'其他登录方式 '} */}
            {/* <AlipayCircleOutlined className={styles.icon} />
            <TaobaoCircleOutlined className={styles.icon} />
            <WeiboCircleOutlined className={styles.icon} /> */}
          </Space>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateProps = (state: any) => {
  // console.log(state);
  return {
    token: state.base && state.base.token,
  };
};
const mapAction = {
  setTokenVal: (token: any) => ({ type: 'come/setTokenVal', token }),
  setMenuVal: (menu: any) => ({ type: 'come/setMenuVal', menu }),
};
export default connect(mapStateProps, mapAction)(Login);
