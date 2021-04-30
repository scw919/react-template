/**
 * 开发阶段的测试环境
 */
import { defineConfig } from 'umi';

export default defineConfig({
  // plugins: [
  //   // https://github.com/zthxxx/react-dev-inspector
  //   'react-dev-inspector/plugins/umi/react-inspector',
  // ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  // inspectorConfig: {
  //   exclude: [],
  //   babelPlugins: [],
  //   babelOptions: {},
  // },
  define: {
    API_URL: 'http://localhost:3000',
  },
});
