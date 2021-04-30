---
title: 路由配置
nav:
  order: 3
group:
  title: 项目框架
  order: 2
---

# 路由

路由和菜单是组织起一个应用的关键骨架，pro 中的路由为了方便管理，使用了中心化的方式，在 [`config.ts`](https://github.com/ant-design/ant-design-pro/blob/33f562974d1c72e077652223bd816a57933fe242/config/config.ts) 统一配置和管理。

本项目的路由统一使用`手动配置路由`，不使用约定式路由。当新建一个页面的时候就需要手动去配置该页面的路由。路由统一在 `config/routes.ts` 文件中配置

### 路由配置

目前脚手架中所有的路由都通过 [`config.ts`](https://github.com/ant-design/ant-design-pro/blob/33f562974d1c72e077652223bd816a57933fe242/config/config.ts) 来统一管理。

在 umi 的配置中我们增加了一些参数，如 `name`，`icon`，`hideChildrenInMenu`，`authority`，来辅助生成菜单。其中：

- `name` 和 `icon`分别代表生成菜单项的文本和图标。项目使用[Ant Design 图标](https://ant.design/components/icon-cn/)，填入对应的图标名称即可使用。

- `hideChildrenInMenu` 用于隐藏不需要在菜单中展示的子路由。用法可以查看 `分步表单` 的配置。

- `hideInMenu` 可以在菜单中不展示这个路由，包括子路由。

- `authority` 用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示。

  > 你可能注意到配置中的 `name` 和菜单实际展示的不同，这是因为我们使用了全球化组件的原因，具体参见 [i18n](https://beta-pro.ant.design/docs/i18n)

路由其它的支持的参数还有：

- `path` 用于配置可以被 path-to-regexp@^1.7.0(https://github.com/pillarjs/path-to-regexp/tree/v1.7.0) 理解的路径通配符。

- `component` 用于配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起 。

  > 如果指向 src 目录的文件，可以用 @，也可以用 ../。比如 component: '@/layouts/basic'，或者 component: '../layouts/basic'，推荐用前者。

- `redirect` 配置路由跳转。

- `layout` 配置是否需要 ProLayout 布局,默认为 true 。

- `access` 如果 access = "canAdmin" 会调用 src/access.ts 中返回的 canAdmin 进行鉴权。比如 canAdmin 为 false，该条路由将会被禁用，并且从左侧 layout 菜单中移除，如果直接从 URL 访问对应路由，将看到一个 403 页面。

- `exact` 表示是否严格匹配，即 location 是否和 path 完全对应上。

- `wrappers` 配置路由的高阶组件封装。 比如，可以用于路由级别的权限校验。

- `routes` 可以配置子路由，通常在需要为多个路径增加 layout 组件时使用。

[路由的配置文档](https://umijs.org/zh-CN/docs/routing)

[路由的鉴权文档](https://beta-pro.ant.design/docs/authority-management-cn)

配置路由的格式：

```ts
// config/routes.ts
export default [
  {
    // 辅助生成菜单 的配置
    name: '欢迎页面',
    icon: 'smile',
    hideInMenu: false,
    // 路由的配置
    path: '/welcome',
    component: './Welcome', // 该组件是 相对于 pages 目录
  },
  {
    // 辅助生成菜单 的配置
    name: '案例模板模块',
    icon: 'table',
    // 路由的配置
    path: '/example',
    // component: '', // 该 /example 路径也可以配置一个路由组件
    // 嵌套子路由
    routes: [
      {
        path: '/example/table-list',
        name: '表格页面',
        hideInMenu: false,
        icon: 'smile',
        component: './example/table-list', // 该组件是 相对于 pages 目录
      },
    ],
  },
];
```

> 建议 `path`的路径和组件的 `component` 路径基本一样

### 该项目的路由配置：

```ts
// config/routes.ts
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
            name: 'login',
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
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // 表格页面
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
    // 路由的配置 可以扩展自己的属性吗？
  },

  // 权限管理模块
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      // 管理页面
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  // 使用案例模块( 提供标准的使用案例模板代码 )
  {
    path: '/example',
    name: '案例模板模块',
    icon: 'table',
    // access: 'canAdmin',
    routes: [
      {
        path: '/example/table-list',
        name: '表格页面',
        icon: 'smile',
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
    ],
  },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
```
