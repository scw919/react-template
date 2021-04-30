---
title: 新建dva与hooks的Model
nav:
  order: 11
group:
  title: 项目框架
  order: 11
---

# dva 与 hooks 的 Model

> Pro 框架默认整合 dva 数据流， 同时也提供一种基于`hooks`的简易数据管理方案，通常用于全局共享数据，部分场景可以取代`dva`

> 参考文档： [redux-sage 文档](https://redux-saga-in-chinese.js.org/docs/introduction/BeginnerTutorial.html) > [Dva 官方文档](https://dvajs.com/guide/) > [plugin-dva 文档](https://umijs.org/zh-CN/plugins/plugin-dva) > [plugin-model 文档](https://umijs.org/zh-CN/plugins/plugin-model) > [阮一峰 es6 文档](https://es6.ruanyifeng.com/?search=Generators&x=11&y=10#docs/generator)

## 两种数据存储方式的定义

**1.dva 首先是一个基于`redux`和`redux-sage`的数据流方案**，然后为了简化开发体验，dva 还额外内置了 `react-router` 和 `fetch`，所以也可以理解为一个轻量级的应用框架。

**2.hooks** 是逻辑复用的利器，基于`@umijs/plugin-model`可以实现在多个组件之间逻辑和状态共享

## 介绍

- **内置 dva**，默认版本是 ^2.6.0-beta.20，如果项目中有依赖，会优先使用项目中依赖的版本。
- **约定式的 model 组织方式**，不用手动注册 model
- **文件名即 namespace**，model 内如果没有声明 namespace，会以文件名作为 namespace
- **内置 dva-loading**，直接 connect loading 字段使用即可
- **支持 immer**，通过配置 immer 开启

* **src/models**下有`hook model`时启用 **hooks**

## 约定的 Dva Model 组织方式

符合以下规则的文件会被认为是 model 文件，

- src/models 下的文件
- src/pages 下，子目录中 models 目录下的文件
- src/pages 下，所有 model.ts 文件

如下所示

```bash
+ src
  + model/test.ts
  + pages
    + foo/models/a.ts
    + bar/models/b.ts
```

其中 `a.ts`，`b.ts` 和 `test.ts` 如果其内容是有效 dva model 写法，则会被认为是 model 文件

### Model 的命名规则

### dva-model

- 所有 model 书写在外层，即`src/models`下，便于统一维护，不建议在 pages 下增加数据流逻辑。
- model 命名以`pages`下的`目录_文件名_mod`的方式, 例如：`welcome_mod.ts` ,全局基础 mod: `base_mod.ts`

* 每一个 model 默认导出一个对象

例如：

```bash
+ src
  + models
    + base_mod.ts
    + welcome_mod.ts
    + system
        + role_mod.ts
```

### hooks-model

- 所有 model 书写在外层，即`src/models`下，便于统一维护.

* model 命名以`pages`下的`目录_文件名_hook`的方式, 例如：`welcome_hook.ts` ,全局基础 mod: `base_hook.ts`

- 每一个 model 默认导出一个函数

例如：

```bash
+ src
  + models
    + base_mod.ts
    + welcome_mod.ts
    + common_hook.ts
    + system
        + role_mod.ts
        + menu_hook.ts
```

> 注意：建议 `models , services, pages ` 3 个文件夹的目录结构一样

## Dva 配置

**修改`config/config.ts`中的 dva 项**

```ts
export default {
  dva: {
    immer: true,
    hmr: false,
  },
};
```

#### immer

- Type: `boolean | object`
- Default: `false`
- 表示是否启用 immer 以方便修改 reducer, 注：如需兼容 IE11，需配置 `{ immer: { enableES5: true }}`

#### hmr

- Type: `boolean`
- Default: `false`
- 表示是否启用 dva model 的热更新。

#### skipModelValidate

- Type: `boolean`
- Default: `false`
- 是否跳过 model 验证

#### extraModels

- Type: `string[]`
- Default: `[]`
- 配置额外到 dva model

## dva 运行时配置

通过 `src/app.tsx` 文件配置 dva 创建时的参数。

Demo 如下,添加控制台日志

```ts
import { createLogger } from 'redux-logger';
import { message } from 'antd';

export default dva = {
  config: {
    onAction: createLogger(), // 配置多个中间件，以数组展示
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
```

## Dva-Model 用例

来源于 `models/welcome.ts`, demo 如下：

```ts
// 异步接口，真实项目替换ajax
function asyncInit(val: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(` 【我是更新后的值：${val.payload}】`);
    }, 2000);
  });
}

export default {
  namespace: 'come', // 可省略 省略取文件名，建议不要省略。
  state: {
    // 初始化状态
    title: 'Hi Welcome',
    text: '我是一段默认的描述文字',
  },
  effects: {
    //  基于Generator函数
    *init(payload: any, { call, put, select }: any): any {
      //异步操作
      const res = yield call(asyncInit, payload);
      // 可以获取不同Model下的state
      // const current = yield select(({come}:any) => come.text)
      const data = yield select(({ base }: any) => base.token);
      console.log(data);
      // 转发， 相当于 dispatch
      yield put({ type: 'changeVal', res });
    },
  },
  reducers: {
    // 同步操作 reducer 改变 state（ reducer里面都是存函数，不能修改 state，只能解构state ）
    changeVal(state: any, action: any) {
      // return Object.assign(state, { title: state.title + action.res });
      return { ...state, title: state.title + action.res };
    },
    addTextDesc(state: any, action: any) {
      return { ...state, text: action.txt };
    },
  },
  subscriptions: {
    // 用来订阅数据 subscriptions函数参数有dispatch 和 history
    // 监听路由
    step({ dispatch, history }: any) {
      console.log(89);

      history.listen(({ pathname }: any) => {
        let txt;
        if (pathname === '/welcome') {
          txt = '欢迎页面';
        } else {
          txt = '其他页面';
        }
        dispatch({ type: 'addTextDesc', txt });
      });
    },
  },
};
```

## dva-page 用例 1(使用 connect api)

来源于`pages/Welcome.tsx`, demo 如下：

```tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import styles from './Welcome.less';
// 组件是通过connect与数据流dva之间建立联系的
import { connect } from 'dva';

const WelcomeCom = (props: any): React.ReactNode | any => {
  const { title, token, setVal, resetVal } = props;
  return (
    <Card style={{ marginTop: 10 }}>
      <div>{`来自dva的state, title=${title}:token=${token}`}</div>
      <Button
        type="primary"
        onClick={() => {
          setVal(10);
        }}
      >
        点击2s后异步更新state
      </Button>
      <Button style={{ marginLeft: 10 }} type="dashed" onClick={() => resetVal()}>
        重置
      </Button>
    </Card>
  );
};

// state
const mapStateProps = (state: any) => {
  return {
    title: state.come?.title,
    token: state.base?.token,
  };
};

// action
const mapActionDispatch = {
  setVal: (payload: any) => ({ type: 'come/init', payload }),
  resetVal: (payload?: any) => ({ type: 'come/resetVal', payload }),
};

// 注意：type的值为：Model的namespace / 方法名，任何一项错误将导致action不执行
export default connect(mapStateProps, mapActionDispatch)(WelcomeCom);
```

## dva-page 用例 2（推荐使用 hooks api）

来源于`pages/Welcome.tsx`, demo 如下：

```tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import styles from './Welcome.less';

// 导入操作dva的 hooks
import { useDispatch, useSelector } from 'umi';

const WelcomeCom = (props: any): React.ReactNode | any => {
  // 1.获取 dva state 的数据
  const welcomePD = useSelector((state: any) => {
    // come 是 src/models/welcome_mod.ts 下 model 的 namespace 的值
    return {
      title: state.come?.title,
      token: state.base?.token,
    };
  });
  const { title, token } = welcomePD;

  // 2.拿到 dispatch 函数
  const dispatch = useDispatch();
  // 2.1发起 action
  const setVal = (payload: any) => {
    dispatch({ type: 'come/init', payload });
  };
  const resetVal = (payload: any) => {
    dispatch({ type: 'come/resetVal', payload });
  };

  return (
    <Card style={{ marginTop: 10 }}>
      <div>{`来自dva的state, title=${title}:token=${token}`}</div>
      <Button
        type="primary"
        onClick={() => {
          setVal(10);
        }}
      >
        点击2s后异步更新state
      </Button>
      <Button style={{ marginLeft: 10 }} type="dashed" onClick={() => resetVal()}>
        重置
      </Button>
    </Card>
  );
};
export default WelcomeCom;
```

## Hooks-Model 用例

来源于 `models/welcome_hook.ts`, demo 如下：

```js
import { useState, useCallback, useEffect } from 'react';

export default function welcome_hook(): any {
  const [token, setToken] = useState('test');
  // useEffect(() => {
  //     setTimeout(() => {
  //         setToken('123456')
  //     }, 1000)
  // }, [])
  const setTokenVal = useCallback(() => {
    setTimeout(() => {
      setToken('123456');
    }, 1000);
  }, []);

  const resetTokenVal = useCallback(() => {
    setToken('test');
  }, []);

  return { token, setTokenVal, resetTokenVal };
}
```

## Hooks-Page 用例

**hooks 是为了弥补函数组件的不足**,实现了复杂的收敛，并能做到 API 的简单。

来源于 `pages/Welcome.tsx`, demo 如下：

```tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import styles from './Welcome.less';
import { useModel } from 'umi';

const WelcomeCom = (): React.ReactNode | any => {
  // @ts-ignore
  const { setTokenVal, token, resetTokenVal } = useModel('welcome_hook', (model: any) => ({
    setTokenVal: model.setTokenVal,
    token: model.token,
    resetTokenVal: model.resetTokenVal,
  }));
  return (
    <PageContainer>
      <Card>
        <Typography.Text>
          hooks获取当前token====={token}
          <Button type="primary" style={{ marginLeft: 10 }} onClick={() => setTokenVal()}>
            点击1s后更新hooks值
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={() => resetTokenVal()}>
            重置hook值
          </Button>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};

export default WelcomeCom;
```

**以上 Model 可以在欢迎页面体验**

## 关于 Dva-Model 中的 Effects

- Effects 主要是完成 redux-saga 内触发的异步操作，具体由 yield 一些声明式的 effect 来完成
- 常见的 effect: call、put、fork、select、tack 等
- Effects 中涉及到 Generator 函数，不熟悉 Generator 函数的请移步[es6 文档](https://es6.ruanyifeng.com/?search=Generators&x=11&y=10#docs/generator)

## FAQ

### 怎么在组件外部获取 store，即在拦截器统一设置请求标识

1. 官方提供的 umi 接口`getDvaApp`,在组件中直接使用，在非组件中需要放在`异步回调`中使用，如： `Promise` 、`setTimeout`

2. 基于`hooks`的全局数据

3. 依赖本地存储，在本地存储中拿到 token 标识设置在请求头里

### umi-dva 与 umi-model(hooks) 异同

`**同**`

- 都是基于全局数据流的方案，实现数据共享与逻辑复用

`**异**`

- dva 是基于`redux/redux-saga`的封装，通过`conect`或者装饰器与`Component`联系,能够实现复杂的逻辑，`hooks`是对函数组件的 state 的扩展，实现复杂的收敛且 API 简单
- dva 写法上稍微复杂，hooks 写法简单
- 函数组件的性能比类组件性能要高，类组件使用时需要实例化，函数组件直接执行函数返回结果即可，因此优先使用函数组件，`即hooks方案优先考虑`
