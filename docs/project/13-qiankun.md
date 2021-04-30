---
title: qiankun
nav:
  order: 12
group:
  title: 项目框架
  order: 2
---

# qiankun

## 1、安装依赖

```bash
yarn add @umijs/plugin-qiankun -D
```

## 2、主应用配置

#### 1)、第一步注册子应用 （子应用注册有两种方式）

a、插件构建期配置子应用 （在 config.ts 添加 qiankun 配置项）

```ts
export default {
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app1', // 唯一 id
          entry: '//localhost:7001', // html entry
        },
        {
          name: 'app2', // 唯一 id
          entry: '//localhost:7002', // html entry
        },
      ],
    },
  },
};
```

b、运行时动态配置子应用（src/app.ts 里开启）

```ts
// 从接口中获取子应用配置，export 出的 qiankun 变量是一个 promise
export const qiankun = fetch('/config').then(({ apps }) => ({
  // 注册子应用信息
  apps,
  // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
  lifeCycles: {
    afterMount: (props) => {
      console.log(props);
    },
  },
  // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
}));
```

#### 2)、第二步：装载子应用 （子应用的装载有两种方式）

a、使用路由绑定的方式 （建议使用这种方式来引入自带路由的子应用。）

假设我们的系统之前有这样的一些路由：

```ts
export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index.js',
      routes: [
        {
          path: '/app1',
          component: './app1/index.js',
          routes: [
            {
              path: '/app1/user',
              component: './app1/user/index.js',
            },
          ],
        },
        {
          path: '/',
          component: './index.js',
        },
      ],
    },
  ],
};
```

我们现在想在 /app1/project 和 /app2 这两个路径时分别加载微应用 app1 和 app2，只需要增加这样一些配置即可：

```ts
export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index.js',
      routes: [
        {
          path: '/app1',
          component: './app1/index.js',
          routes: [
            {
              path: '/app1/user',
              component: './app1/user/index.js',
            },
            // 配置微应用 app1 关联的路由
            {
              path: '/app1/project',
              microApp: 'app1',
            },
          ],
        },
        // 配置 app2 关联的路由
        {
          path: '/app2',
          microApp: 'app2',
        },
        {
          path: '/',
          component: './index.js',
        },
      ],
    },
  ],
};
```

微应用路由也可以配置在运行时，通过 src/app.ts 添加：

```ts
export const qiankun = fetch('/config').then(({ apps }) => {
  return {
    apps,
    routes: [
      {
        path: '/app1',
        microApp: 'app1',
      },
    ],
  };
});
```

运行时注册的路由会自动关联到你配置的根路由下面，比如你的路由是这样的：

```ts
export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index.js',
      routes: [
        {
          path: '/test',
          component: './test.js',
        },
      ],
    },
  ],
};
```

完成了上面的运行时微应用路由配置后，你的路由结构会合自动并成这样的：

```ts
export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index.js',
      routes: [
        {
          path: '/app1',
          microApp: 'app1',
        },
        {
          path: '/test',
          component: './test.js',
        },
      ],
    },
  ],
};
```

b、使用(MicroApp)组件的方式 （建议使用这种方式来引入不带路由的子应用。 否则请自行关注微应用依赖的路由跟当前浏览器 url 是否能正确匹配上，否则很容易出现微应用加载了，但是页面没有渲染出来的情况。）

我们可以直接使用 React 标签的方式加载我们已注册过的子应用：

```ts
import { MicroApp } from 'umi';

export function MyPage() {
  return (
    <div>
      <div>
        <MicroApp name="app1" />
      </div>
    </div>
  );
}
```

## 3、父子应用通讯 （两种实现方式）

a、配合[userModel](https://umijs.org/zh-CN/plugins/plugin-model)使用（推荐）

> 需确保已安装 `@umijs/plugin-model` 或 `@umijs/preset-react`

#### 1)、主应用使用下面任一方式透传数据：

1.如果你用的 MicroApp 组件模式消费微应用，那么数据传递的方式就跟普通的 react 组件通信是一样的，直接通过 props 传递即可：

```ts
function MyPage() {
  const [name, setName] = useState(null);
  return <MicroApp name={name} onNameChange={(newName) => setName(newName)} />;
}
```

2.如果你用的 路由绑定式 消费微应用，那么你需要在 `src/app.ts` 里导出一个 `useQiankunStateForSlave` 函数，函数的返回值将作为 props 传递给微应用，如：

```ts
// src/app.ts
export function useQiankunStateForSlave() {
  const [masterState, setMasterState] = useState({});

  return {
    masterState,
    setMasterState,
  };
}
```

#### 2)、微应用中会自动生成一个全局 model，可以在任意组件中获取主应用透传的 props 的值。

```ts
import { useModel } from 'umi';

function MyPage() {
  const masterProps = useModel('@@qiankunStateFromMaster');
  return <div>{JSON.strigify(masterProps)}</div>;
}
```

或者可以通过高阶组件 connectMaster 来获取主应用透传的 props

```ts
import { connectMaster } from 'umi';

function MyPage(props) {
  return <div>{JSON.strigify(props)}</div>;
}

export default connectMaster(MyPage);
```

#### 3)、和 `<MicroApp />` 的方式一同使用时，会额外向子应用传递一个 setLoading 的属性，在子应用中合适的时机执行 masterProps.setLoading(false)，可以标记微模块的整体 loading 为完成状态。

b、 基于 props 传递 （类似 react 中组件间通信的方案）

1.主应用中配置 apps 时以 props 将数据传递下去（参考主应用运行时配置一节）

```ts
// src/app.js

export const qiankun = fetch('/config').then((config) => {
  return {
    apps: [
      {
        name: 'app1',
        entry: '//localhost:2222',
        props: {
          onClick: (event) => console.log(event),
          name: 'xx',
          age: 1,
        },
      },
    ],
  };
});
```

2.子应用在生命周期钩子中获取 props 消费数据（参考子应用运行时配置一节）

> 详细说明和配置操作请参考：

> > https://umijs.org/zh-CN/plugins/plugin-qiankun#基于-props-传递

> > https://github.com/umijs/plugins/issues/64

> > https://www.jianshu.com/p/d0f87e1dcacf
