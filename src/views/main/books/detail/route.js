// import Detail from './detail.vue'
const Detail = () => import('./detail.vue')
export default {
  path: 'booksdetail',
  name: 'booksdetail',
  pname: 'main',
  level: 2, // 二级路由
  component: Detail,
  children: [
  ]
}
