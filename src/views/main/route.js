import Main from './main.vue'
// const Main = () => import(/* webpackChunkName: "main" */ './main.vue')
export default {
  path: '/main',
  name: 'main',
  pname: '',
  level: 1, // 一级路由
  component: Main,
  children: [
  ]
}
