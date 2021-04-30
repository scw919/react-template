import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';

// import { createLogger } from 'redux-logger';

const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

interface UserInfo {
  password: string;
  username: string;
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser | any;
  // fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchUserInfo?: UserInfo | any;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = { username: 'admin', password: 'ant.design' };
      return currentUser;
    } catch (error) {
      history.push('/user/login');
      // history.push('/welcome');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo: {
      username: 'admin',
      password: 'ant.design',
    },
    // currentUser,
    settings: {},
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.fetchUserInfo?.username && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
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
    ...initialState?.settings,
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
//     // onAction: createLogger(),
//     onError(e: Error) {
//       message.error(e.message, 3);
//     },
//   },
// };

// console.log(useStore);

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
    token: 'token',
  },
  middlewares: [],
  requestInterceptors: [
    // global Interceptor
    (url, options) => {
      return {
        url,
        options: { ...options },
      };
    },
  ],
  responseInterceptors: [
    async (response, options) => {
      // console.log('options=', options);
      const data = await response.clone().json();
      // http === 200
      if (response.status === 200) {
        if (data?.code === 200) {
          // console.log('请求成功');
        } else if (data?.code === 401) {
          // console.log('跳转到登录');
          history.push('/user/login');
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
