export const queryMenuData = () => {
  let menuArr = [
    // 欢迎页面
    {
      path: '/welcome',
      name: '欢迎页面1',
      icon: 'icon-xianxingchun',
    },
    // 表格页面
    {
      name: '表格页面1',
      icon: 'table',
      path: '/list',
      access: 'canUser',
    },
    // 权限管理模块
    {
      path: '/admin',
      name: '权限管理',
      icon: 'crown',
      access: 'canAdmin', // 只有admin才有权限管理tab
      routes: [
        // 测试
        {
          path: '/admin/test',
          name: '权限测试',
          access: 'canBoss', // boss 随意折腾权限，高兴就好
        },
        // 任务
        {
          path: '/admin/task',
          name: '任务测试',
          access: 'canUser', // 用户只能测试额
        },
      ],
    },
    // 使用案例模块( 提供标准的使用案例模板代码 )
    {
      path: '/example',
      name: '案例模板模块1',
      icon: 'table',
      access: 'canAdmin', // 只有admin才有模板tab
      routes: [
        {
          path: '/example/demo',
          name: 'Demo页面',
          icon: 'smile',
          hideInMenu: false,
        },
        {
          path: '/example/table-list',
          name: '表格页面',
          icon: 'smile',
          hideInMenu: false,
        },
        {
          path: '/example/panel-list',
          name: '面板列表',
          icon: 'smile',
        },
        {
          path: '/example/chart-list',
          name: '图表页面',
          icon: 'smile',
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
            },
            {
              path: '/example/ad-form/cus-form',
              name: '自定表单',
              icon: 'smile',
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
  ];

  return menuArr;
};
