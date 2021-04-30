/**
 * 生成环境
 * 把 define 定义的变量抽取到这里
 */
export default {
  // 测试版
  pro: {
    API_URL: 'http://localhost:9000',
  },
  // 线上第一版
  real1: {
    API_URL: 'http://localhost:9001',
  },
  // 线上第二版
  real2: {
    API_URL: 'http://localhost:9002',
  },
};
