module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    API_URL: true,
  },
  rules: {
    'global-require': 0, // 关闭全局引用 require
    'no-new': 0,
  },
};
