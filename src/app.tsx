import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, getDvaApp } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import * as ajax from '@/http';

// import { persistEnhancer } from 'dva-model-persist';
// localstorage
// import storage from 'dva-model-persist/lib/storage';
// sessionStorage
// import storage from 'dva-model-persist/lib/storage/session';

// import { createLogger } from 'redux-logger';
import { fixMenuItemIcon } from '@/utils/utils';
import { queryMenuData } from '../mock/userData';

// 请求统一方式
// @ts-ignore
React.request = ajax;
const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// 初始化 整个项目的 数据
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>; // LayoutSettings
  currentUser?: API.CurrentUser | any; // user info
  menuData: MenuDataItem[]; // menu list data
  fetchUserInfo?: any; // get user info func
}> {
  // 获取全局异步数据
  const fetchUserInfo = async () => {
    return { username: 'admin', password: 'ant.design', token: '123' };
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    // let info = getDvaApp()._store.getState();

    const menuData = await queryMenuData();
    return {
      fetchUserInfo: currentUser,
      menuData,
      settings: {},
    };
  }
  return {
    fetchUserInfo: null,
    menuData: [],
    settings: {},
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  // eslint-disable-next-line no-underscore-dangle
  const info = getDvaApp()._store.getState();
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    // 监听路由的改变
    onPageChange: () => {
      const { location } = history;
      console.log('=====onPageChange=======', location.pathname);
      // console.log(initialState);
      // console.log(info);
      // 如果没有登录，重定向到 login, 根据token决定是否登录
      if (!info?.come?.token && location.pathname !== '/user/login') {
        history.push('/user/login');
        return;
      }
      // 如果已经登陆，并且请求的是 / 转发到指定的页面
      if (location.pathname === '/') {
        history.push('/list');
      }
    },
    // breadcrumbRender: (routes: any) => {
    //   const newR = [
    //     {
    //       path: '/',
    //       breadcrumbName: '主页',
    //     },
    //     ...(routes || []),
    //   ];
    //   console.log('routes=', newR);
    //   return newR;
    // },
    links: isDev
      ? [
          <>
            <LinkOutlined />
            <span
              onClick={() => {
                window.open('/umi/plugin/openapi');
              }}
            >
              openAPI 文档
            </span>
          </>,
          <>
            <BookOutlined />
            <span
              onClick={() => {
                window.open('/~docs');
              }}
            >
              项目使用说明
            </span>
          </>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    menuDataRender: (menuData: any) => {
      console.log('menuData=', menuData);
      return (info?.come?.menu && fixMenuItemIcon(info.come.menu)) || menuData;
      // return menuData;
    },
    ...initialState?.settings,
    // settings: {
    //   loading: false,
    // },
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  1000: '接口异常, 服务器内部错误',
};

/** http异常处理程序 !== 200
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

// export const dva = {
//   config: {
//     onAction: [],
//     extraEnhancers: [
//       // 详细配置 https://github.com/fattypanda/dva-model-persist/blob/master/src/utils/dva-model-persist/enhancer.js
//       persistEnhancer({
//         key: 'project_model_root',
//         // keyPrefix: Math.random(),
//         whitelist: ['base', 'come'], // 白名单
//         storage,
//       }),
//     ],
//     onError(e: Error) {
//       console.log(e);
//       //  message.error(e.message, 3);
//     },
//   },
// };

// console.log(useStore);

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
    // token: 'token',
  },
  middlewares: [],
  requestInterceptors: [
    // global Interceptor
    (url: any, options: any) => {
      console.log(getDvaApp());
      // eslint-disable-next-line no-underscore-dangle
      const info = getDvaApp()._store.getState();
      console.log(info);
      return {
        url,
        options: { ...options, headers: { token: info.come?.token } },
      };
    },
  ],
  responseInterceptors: [
    async (response: any, options: any) => {
      // console.log('options=', options);
      const data = await response.clone().json();
      // http === 200
      if (response.status === 200) {
        if (data?.code === 200) {
          // console.log('请求成功');
        } else if (data?.code === 401) {
          // console.log('跳转到登录');
          // history.push('/user/login');
        } else {
          // 其他处理
          const { url } = response;
          const errorText = codeMessage['1000'];
          notification.error({
            message: `接口异常 ${data?.code}: ${url}`,
            description: errorText,
          });
        }
        // 返回分页的数据格式
        const { current, pageSize } = options.params as any;
        if (current !== undefined && pageSize !== undefined) {
          return new Promise((resolve) => {
            resolve({
              // @ts-ignore
              data: data?.data?.data || [],
              total: data?.data?.total,
              success: true,
              pageSize: data?.data.limit,
              current: parseInt(`${data?.data?.current}`, 10) || 1,
            });
          });
        }
        // 返回其他数据
        return response;
      }
      return response;
    },
  ],
  // 请求异常处理
  errorHandler,
};
