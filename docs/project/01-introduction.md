---
title: 项目介绍
nav:
  order: 0
group:
  title: 项目框架
  order: 2
---

# 项目介绍

## 1、技术栈

`react17、react-redux、react-saga、react-router、dva、hooks、typescript4、umi17、dumi、antd-design-pro5、antd、pro-component、qiankun、xlxs、charts、g2、L7、less、eslint、prettier 、stylelint......`

## 2、参考文档

[react](https://react.docschina.org/docs/getting-started.html)：React 是一个用于构建用户界面的 JavaScript 库。

[hooks](https://react.docschina.org/docs/hooks-intro.html)：Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

[typescript](https://www.tslang.cn/docs/home.html)：TypeScript 是 JavaScript 的一个超集;TypeScript 设计目标是开发大型应用，它可以编译成纯 JavaScript，编译出来的 JavaScript 可以运行在任何浏览器上。

[umijs](https://umijs.org/zh-CN/docs)：Umi 是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。

[antd-pro](https://beta-pro.ant.design/docs/getting-started-cn)：Ant Design Pro 基于 umi 来构架脚手架，我们可以通过简单的操作来初始化和启动脚手架。

[antd](https://ant.design/docs/react/introduce-cn)：antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

[less](https://less.bootcss.com/)：Less 是一门向后兼容的 CSS 扩展语言。

[eslint](https://eslint.bootcss.com/)：统一编码的规范。

[prettier](https://www.kancloud.cn/luponu/prettierjs/872222)：统一编码的规范。

[stylelint](https://stylelint.io/)：css 检测工具。

[react-redux](https://www.redux.org.cn/docs/react-redux/)：Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

[react-saga](https://redux-saga-in-chinese.js.org/docs/api/index.html)：redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。

## 3、项目目录结构

```json
|-- config // 项目配置文件
|   |-- config.dev.ts
|   |-- config.ts
|   |-- defaultSettings.ts
|   |-- oneapi.json
|   |-- proxy.ts
|   `-- routes.ts
|-- dist
|-- docs   // 项目使用说明文档
|   |-- index.md
|   `-- vscode
|       |-- 1-vs-config.md
|       `-- 2-npm-yarn.md
|-- jest.config.js
|-- jsconfig.json
|-- mock  // 本地模拟数据
|   `-- user.ts
|-- package.json
|-- public
|-- src
|   |-- assets // 存放字体，图片等资源目录
|   |-- access.ts // 权限定义
|   |-- app.tsx // 动态配置文件
|   |-- basic-comps // 存放基础组件（n个项目都可以用的组件）
|   |   `-- index.md
|   |-- components // 存放业务组件（只有该项目多个页面可用的组件）
|   |   |-- Footer
|   |   |   |-- index.md // 编写组件使用的文档
|   |   |   `-- index.tsx
|   |   `-- index.md
|   |-- e2e  // 集成测试用例
|   |   `-- baseLayout.e2e.js
|   |-- enum  // 项目用到的枚举
|   |   `-- index.ts
|   |-- styles  // 项目用到的样式
|   |   |-- base.less // 定义全局样式变量（ less版本 ）。注意：base.less的变量最好和base.ts定义的一样
|   |   `-- base.ts // 定义全局样式变量（ ts 版本 ）
|   |-- global.less // 全局样式
|   |-- global.tsx
|   |-- regular // 定义全局的正则
|   |   `-- index.ts
|   |-- locales  // 国际化资源
|   |   |-- en-US
|   |   |   |-- component.ts
|   |   |   |-- globalHeader.ts
|   |   |   |-- menu.ts
|   |   |   |-- pages.ts
|   |   |   |-- pwa.ts
|   |   |   |-- settingDrawer.ts
|   |   |   `-- settings.ts
|   |-- manifest.json
|   |-- pages  // 业务页面入口和常用模板
|   |   |-- 404.tsx
|   |   |-- Admin.tsx
|   |   |-- tableList
|   |   |   |-- components //每个路由文件都有一个components文件，用来存放当前页面的组件 ( 只能该页面用 )
|   |   |   |   `-- UpdateForm.tsx
|   |   |   `-- index.tsx
|   |   |-- user
|   |   |   `-- login
|   |   |       |-- index.less
|   |   |       `-- index.tsx
|   |   |-- Welcome.less
|   |   |-- Welcome.tsx
|   |   `-- document.ejs
|   |-- service-worker.js // pwa 应用的配置
|   |-- models  // 全局 dva 存储 层  （文件目录结构与pages文件目录保持一致）
|   |   `-- base.ts // 全局共享的 base model 层（可以被其它的 dva model 层 继承）
|   |-- services  // 全局 接口服务 层 （文件目录结构与pages文件目录保持一致）
|   |   `-- ant-design-pro
|   |       |-- api.ts
|   |       |-- index.ts
|   |       |-- login.ts
|   |       |-- rule.ts
|   |       `-- typings.d.ts
|   |-- typings.d.ts
|   `-- utils  // 工具库
|       |-- utils.less
|       |-- utils.test.ts
|       `-- utils.ts
|-- tests //测试工具
|   |-- PuppeteerEnvironment.js
|   |-- beforeTest.js
|   |-- getBrowser.js
|   |-- run-tests.js
|   `-- setupTests.js
|-- tsconfig.json
|-- README.md
|-- yarn-error.log
`-- yarn.lock
```

## 4、浏览器的兼容

1.现代浏览器和 IE11（需要 polyfills）。

2.支持服务端渲染

| IE/Edge | Firefox | Chrome | Safari | Opera | Electron |
| :-- | :-- | :-- | :-- | :-- | :-- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

对于 IE 系列浏览器，需要提供相应的 Polyfill 支持，建议使用 @babel/preset-env 来解决浏览器兼容问题。如果你在使用 umi，可以直接使用 targets 配置。
