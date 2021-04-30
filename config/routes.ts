export default [
  // 登录页面
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  // 欢迎页面
  {
    path: '/welcome',
    name: '欢迎页面',
    icon: 'icon-xianxingchun',
    component: './Welcome',
  },
  // 表格页面
  {
    name: '表格页面',
    icon: 'table',
    path: '/list',
    // access: 'canUser',
    component: './TableList',
  },

  // 权限管理模块
  {
    path: '/admin',
    name: '权限管理',
    icon: 'crown',
    // access: 'canAdmin', // 只有admin才有权限管理tab
    component: './Admin',
    routes: [
      // 测试
      {
        path: '/admin/test',
        name: '权限测试',
        component: './access/test',
        // access: 'canBoss', // boss 随意折腾权限，高兴就好
      },
      // 任务
      {
        path: '/admin/task',
        name: '任务测试',
        // access: 'canUser', // 用户只能测试额
        component: './access/task',
      },
    ],
  },
  // 使用案例模块( 提供标准的使用案例模板代码 )
  {
    path: '/example',
    name: '案例模板模块',
    icon: 'table',
    // access: 'canAdmin', // 只有admin才有模板tab
    routes: [
      {
        path: '/example/demo',
        name: 'Demo页面',
        icon: 'smile',
        hideInMenu: false,
        component: './example/demo',
      },
      {
        path: '/example/table-list',
        name: '表格页面',
        icon: 'smile',
        hideInMenu: false,
        component: './example/table-list',
      },
      {
        path: '/example/panel-list',
        name: '面板列表',
        icon: 'smile',
        component: './example/panel-list',
      },
      {
        path: '/example/chart-list',
        name: '图表页面',
        icon: 'smile',
        component: './example/chart-list',
      },
      {
        path: '/example/ad-form',
        name: '表单模块',
        icon: 'smile',
        // component: './example/custom-form',
        routes: [
          {
            path: '/example/ad-form/easy-form',
            name: '默认表单',
            icon: 'smile',
            component: './example/ad-form/easy-form',
          },
          {
            path: '/example/ad-form/cus-form',
            name: '自定表单',
            icon: 'smile',
            component: './example/ad-form/cus-form',
          },
        ],
      },
      // {
      //   path: '/vue-app',
      //   name: 'qiankun-进入子系统',
      //   microApp: 'vue-app'
      // },
    ],
  },

  // 这个重定向不能在这里写死，因为 welcome 这个页面很可能是不存在的
  // {
  //   path: '/',
  //   redirect: '/welcome',
  // },
  {
    component: './404',
  },
];
