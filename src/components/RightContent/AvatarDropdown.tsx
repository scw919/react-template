import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import { history, useModel, connect } from 'umi';
// import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { Avatar } from 'antd';
// import { outLogin } from '@/services/ant-design-pro/login';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
// const loginOut = async () => {
//   // await outLogin();
//   // const { query = {}, pathname } = history.location;
//   // const { redirect } = query;
//   // // Note: There may be security issues, please note
//   // if (window.location.pathname !== '/user/login' && !redirect) {
//   //   history.replace({
//   //     pathname: '/user/login',
//   //     search: stringify({
//   //       redirect: pathname,
//   //     }),
//   //   });
//   // }
//   history.push('/user/login');
// };

const AvatarDropdown: React.FC<GlobalHeaderRightProps | any> = ({
  menu,
  setTokenVal,
  setMenuVal,
}) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        setInitialState({ ...initialState, fetchUserInfo: null });
        setTokenVal(null);
        setMenuVal(null);
        history.push('/user/login');
        // loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [initialState, setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
  if (!initialState) {
    return loading;
  }

  const { fetchUserInfo } = initialState;

  if (!fetchUserInfo || !fetchUserInfo.username) {
    return loading;
  }

  console.log(menu);

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={require('images/user.png')}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{fetchUserInfo.username}</span>
      </span>
    </HeaderDropdown>
  );
};

const mapStateProps = (state: any) => {
  console.log(state);

  return {
    token: state.base && state.base.token,
  };
};
const mapAction = {
  setTokenVal: (token: any) => ({ type: 'come/setTokenVal', token }),
  setMenuVal: (menu: any) => ({ type: 'come/setMenuVal', menu }),
};
export default connect(mapStateProps, mapAction)(AvatarDropdown);
