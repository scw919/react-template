---
title: 新建页面(路由组件)
nav:
  order: 10
group:
  title: 项目框架
  order: 2
---

# 新建页面(路由组件)

## 1、新建页面组件的规范

1）页面组件存放到 `pages` 目录下

2）页面组件必须存放到一个单独的目录中,目录是`小写`

3）页面组件路由在 `config/routes.ts` 配置

4）页面组件对应一个 `page-config` 配置文件夹

5）当前页面的`样式`存放到当前目录下

6）当前页面的非路由组件存放到对应的 `components` 文件夹下面

例如：

```json
|--pages
  |--user //文件夹命名都以小写字母开头，具体请参照文件命名规范
      |--login
          |--page-config //配置文件
              |--index.ts
          |--components //组件文件
              |--head
                |--index.less
                |--index.tsx
          |--service.ts // 推荐写到 src/services 目录下
          |--model.ts // 推荐写到 src/models 目录下
          |--data.d.ts // 定义类型
          |--index.tsx // 入口
          |--index.less
  |--example // example 页面
      |--page-config //配置文件
          |--index.ts
      |--components //组件文件
          |--head
            |--index.less
            |--index.tsx
      |--index.tsx
      |--index.less
      |--detail // example 页面的 详情页
          |--page-config
              |--index.ts
          |--components
              |--head
                |--index.less
                |--index.tsx
          |--index.tsx
          |--index.less
      |--create // example 页面的 新建 和 编辑页面
          |--page-config
              |--index.ts
          |--components
              |--head
                |--index.less
                |--index.tsx
          |--index.tsx
          |--index.less
```

## 2、新建页面组件的案例

下面以新建一个 demo 的页面为例：

demo 页面的目录结构

```json
|-- pages
  |-- example
    |-- demo // 新建 demo 页面
      |-- components
      |-- data.d.ts
      |-- index.less
      |-- index.tsx
      `-- page-config
          |-- btn-list.ts
          `-- index.ts
```

1.新建 demo 页面组件

index.tsx

```ts
import React, { useEffect } from 'react';
// 动态添加class
import classnames from 'classnames';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import styles from './index.less';
import { pageNames, breadcrumb } from './page-config';
import type { Info } from './data';

const demoInfo: Info = {
  title: 'Demo',
  content: '更多使用请查看 ProComponents 组件库',
};

// console.log(`=======${REACT_APP_ENV}`);
/**
 * Demo 页面
 */
const Demo: React.FC = () => {
  // props 获取属性
  //  const {  } = props;

  // state 定义变量

  // =============== hooks 区域===============
  useEffect(() => {
    // 页面挂载完触发（该hooks可以写多个）
    console.log('Demo页面挂载完成会触发 ( 第二参数是空[] 代表只调用一次)');
  }, []);

  // =============== function 区域===============

  // =============== handle 区域===============

  // =============== render 区域===============
  return (
    <PageContainer
      fixedHeader
      // 自定义页面的头部
      header={{
        title: pageNames[0],
        breadcrumb: breadcrumb(0),
      }}
    >
      <Card>
        <Typography.Text strong>
          {demoInfo.title}
          <span className={classnames(styles.demo)}>{'页面。  '}</span>
          <a
            href="https://procomponents.ant.design/components/page-container"
            rel="noopener noreferrer"
            target="__blank"
          >
            {demoInfo.content}
          </a>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};

export default Demo;
```

page-config/breadcrumb.ts

```ts
import { breadcrumbItemRender } from '@/utils/c-render';

// 下面是自定义头部信息的配置
export const pageNames: string[] = ['Demo页面', 'xx']; // 页面标题
export const breadcrumb = (index: number) => {
  // 页面的面包屑配置
  return {
    itemRender: breadcrumbItemRender,
    routes: [
      {
        path: '', // 为空代表不能点击
        breadcrumbName: '案例模板模块',
      },
      {
        path: '', // 需要点击可以配置路由
        breadcrumbName: pageNames[index],
      },
    ],
  };
};
```

page-config/index.ts

```ts
// 默认将btn-list文件导出的直接导出
export * from './breadcrumb';
```

2.添加样式 index.less

```less
@import '~antd/es/style/themes/default.less';

.demo {
  color: green;
}
```

3.类型配置文件 data.d.ts

```ts
// 定义类型
export interface Info {
  title: string;
  content: string;
}
```

4.配置 demo 页面的路由

```ts
// config/routes.ts
export default [
  ....
  ....
  ....

  // 使用案例模块( 提供标准的使用案例模板代码 )
  {
    path: '/example',
    name: '案例模板模块',
    icon: 'table',
    // access: 'canAdmin',
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
      ....
      ....
      ....
      ....
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

Demo 页面的路由：[http://127.0.0.1/example/demo](http://127.0.0.1/example/demo)

5.菜单会根据刚才的路由配置`config/routes.ts`自动生成。

6.新建一个页面完毕

7.Demo 页面如果需要编写配置，可以新建一个`page-config`文件夹存放所有的配置 ( src/pages/example/demo/page-config/index.ts )

路由和菜单具体配置参考:[https://beta-pro.ant.design/docs/router-and-nav-cn](https://beta-pro.ant.design/docs/router-and-nav-cn)
