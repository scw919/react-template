// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

import ProGlobalVariable from './config.pro';
let defineGlobalVariable = {};
const { REACT_APP_ENV, MOCK, UMI_ENV } = process.env;

// 获取package.json 脚本使用 cross-env 打入的变量
console.log('REACT_APP_ENV=', REACT_APP_ENV, 'MOCK=', MOCK, 'UMI_ENV=', UMI_ENV);
if (ProGlobalVariable[REACT_APP_ENV || '']) {
  defineGlobalVariable = { ...ProGlobalVariable[REACT_APP_ENV || ''] };
}

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: false,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   antd: true,
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   baseNavigator: true,
  // },
  locale: {
    //antd组件需要改成中文
    antd: true,
    default: 'zh-CN',
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || 'dev',

    // API_URL: 'http://localhost:9000', // 抽取到 对应的配置文件中
    // 定义全局变量 （ c抽取 到外部去了）
    ...defineGlobalVariable,
  },
  // 配置别名
  alias: {
    images: '@/assets/images',
    utils: '@/utils',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    // 'link-color': 'red',
    // 'success-color': 'red',
    // 'border-color-base': 'blue',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  openAPI: {
    requestLibPath: "import { request } from 'umi'",
    // 或者使用在线的版本
    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
    schemaPath: join(__dirname, 'oneapi.json'),
    mock: false,
  },
  resolve: {
    includes: ['docs', 'src'],
  },
  // qiankun: { //注册子应用
  //   master: {
  //     // 注册子应用信息
  //     apps: [
  //       {
  //         name: 'vue-app', // 唯一 id
  //         entry: '//172.18.0.59:10000/main/introduce', // html entry
  //       },
  //     ],
  //   },
  // },
  scripts: [
    { src: '/scripts/react.production.min.js' },
    { src: '/scripts/react-dom.production.min.js' },
    { src: '/scripts/charts.min.js' },
    //使用 组织架构图、流程图、资金流向图、缩进树图 才需要使用
    { src: '/scripts/charts_g6.min.js' },
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@ant-design/charts': 'charts',
  },
});
