/**
 * （本地）开发环境
 */
import { defineConfig } from 'umi';

export default defineConfig({
  // plugins: [
  //   // https://github.com/zthxxx/react-dev-inspector
  //   'react-dev-inspector/plugins/umi/react-inspector',
  // ],
  // // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  // inspectorConfig: {
  //   exclude: [],
  //   babelPlugins: [],
  //   babelOptions: {},
  // },
  define: {
    API_URL: 'http://localhost:8000',
  },
  logo: '/logo.png',
  title: 'Ant Design Pro',
});
