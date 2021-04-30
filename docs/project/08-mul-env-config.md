---
title: 多环境配置
nav:
  order: 3
group:
  title: 项目框架
  order: 2
---

# 多环境配置

## 1.环境变量

在开发中我们可能需要区分多种情况，比如`开发环境，测试环境，生产环境`，在 `Ant-Design-Pro` 项目中我们可以通过环境变量来实现这个需求。

### 1.1 默认全局环境变量

`Pro` 脚手架默认环境变量：`REACT_APP_ENV`。`REACT_APP_ENV` 全局变量不需要导入就可以直接在代码中引用

> 也可以自定义环境变量, 例如, 下文中提到的`API_URL`。

### 1.2 环境变量的命名

**一律`大写`且采用`下划线`分割单词**

> 在添加变量后，需要在`src/tying.d.ts`中添加该变量的申明，否则在使用变量时会报错

### 1.3 多环境配置案例:

在不同环境添加不同的 `API` 请求地址

(本地)开发环境的配置：

```ts
// config/config.dev.ts
import {defineConfig} from umi;
export default defineConfig {
  // 自定义全局环境变量
  define: {
    API_URL: 'http://localhost:8000',
    ....
    ....
    ....
  },
  ....
  ....
  ....
}
```

> API_URL 这个变量会直接挂载到全局。在代码中不需要任何的导入,就可以直接使用该变量

开发测试环境的配置（没有打包部署）：

```ts
// config/config.test.ts
import {defineConfig} from umi;
export default defineConfig {
  // 自定义全局环境变量
  define: {
    API_URL: 'http://localhost:3000',
    ....
    ....
    ....
  },
  ....
  ....
  ....
}
```

> 注意：define() 函数中自定义的变量 都是全局环境变量

生产环境的配置：

```ts
// config/config.ts
import {defineConfig} from umi;
export default defineConfig {
  // 自定义全局环境变量
  define: {
    API_URL: 'http://localhost:9000',
    ....
    ....
    ....
  },
  ....
  ....
  ....
}
```

> 注：在`src/tying.d.ts` 声明`API_URL`

编写使用各个环境的脚本：

```json
// package.json
{
  "scripts": {
    // umi build 是不支持使用cross-env注入：UMI_ENV=xxx 变量。REACT_APP_ENV等其他环境变量默认为 undefined
    "build": "umi build", // 使用 生产环境

    "start": "cross-env UMI_ENV=dev umi dev",

    // REACT_APP_ENV=dev 指定 app 所处的环境为 dev
    // UMI_ENV=dev 指定使用 src/config/config.dev.ts 和 src/config/config.ts 合并的配置
    // MOCK=none 是禁用 mock
    "start:dev": "cross-env REACT_APP_ENV=dev MOCK=none UMI_ENV=dev umi dev", // 使用 开发环境 运行

    // REACT_APP_ENV=test 指定 app 所处的环境 test
    // UMI_ENV=test 指定使用 src/config/config.test.ts 和 src/config/config.ts 合并的配置
    // MOCK=none 是禁用 mock
    "start:test": "cross-env REACT_APP_ENV=test MOCK=none UMI_ENV=test umi dev" // 使用 测试环境 运行
  }
}
```

> `UMI_ENV=xxx` 只要在执行 `umi dev` 命令时才会起作用

使用不同的环境：

> 根据不同环境获取不同的 api

```bash
// 1.使用开发环境的配置

`yarn start:dev` => API_URL 的值：`http://localhost:8000`

// 2.使用开发测试环境的配置

`yarn start:test` => API_URL 的值：`http://localhost:3000`

// 3.使用生产环境的配置

`yarn build` => API_URL的值 ：`http://localhost:9000`

// 4.配置其他环境...

```

### 1.4 cross-env 设置全局的环境变量

> `package.json` 内修改启动命令，通过 cross-env 添加对应环境变量

```js
{
  /** 省略配置项 */
  "scripts": {
    /** 省略配置项 */

    // cross-env REACT_APP_ENV=pro 的意思是给 node 注入全局的 REACT_APP_ENV 变量,REACT_APP_ENV的值为  pro
    "build:real": "cross-env REACT_APP_ENV=pro umi build",

    // 在start命令内添加 UMI_ENV 环境变量
    "start:dev": "cross-env REACT_APP_ENV=dev UMI_ENV=dev umi dev",
    "start:test": "cross-env REACT_APP_ENV=test UMI_ENV=dev MOCK=none umi dev"
    /** 省略配置项 */
  }
  /** 省略配置项 */
}
```

> `UMI_ENV=xxx` 变量只有在执行 `umi dev` 才会生效。

### 1.5 获取 cross-env 添加的全局环境变量

Pro 的默认环境变量`REACT_APP_ENV`代表当前系统所处环境的具体名称，如：dev、test 等

需要在 config 外的非 node 环境文件中使用该环境变量，则需要在 `config` 导出默认 `defineConfig()` 时配置 `define{}`。

**node 环境下直接获取**

```ts
// congig/config.ts
// 获取 REACT_APP_ENV, 并给 REACT_APP_ENV 默认值为 dev
const { REACT_APP_ENV = 'dev' } = process.env;
```

**非 node 环境，即具体的业务代码中**

```ts
// config/config.ts
const { REACT_APP_ENV, XX } = process.env; // 获取 cross-env 添加的全局环境变量

export default defineConfig({

  {/** 省略其他配置 */}

  define: {
    // 自定义两个全局变量（在业务代码中不需要导入就可以这两个变量）
    REACT_APP_ENV: REACT_APP_ENV , // REACT_APP_ENV 这个其实不需要再这里定义都行，因为这个变量比较特殊，默认定义过了
    XX:XX,
    // 可以继续自定义全局变量
    API_URL: 'http://localhost:9000',
    ....
    ....
    ....
  }

  {/** 省略其他配置 */}

});
```

### 1.6 再业务代码使用 define 中定义的全局环境变量

使用环境变量如下：

```ts
// src/pages/Welcome.tsx
export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card style={{ marginTop: 10 }}>
        <Typography.Text strong>
          当前App环境REACT_APP_ENV={REACT_APP_ENV}。 当前测试API Url前缀API_URL={API_URL} 。
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
```

> `REACT_APP_ENV` 变量可以是再： `cross-env` 注入，也可以是在 `define` 中定义。 `API_URL` 是再 `define` 中定义的

## 2.多文件多份配置文件（主要是针对开发环境）

> 注意：`UMI_ENV` 配置只支持 `umi dev` 环境下，不支持 `umi build` 环境

Pro 脚手架默认使用 Umi 作为底层框架，通过`UMI_ENV`环境变量来区分不同的配置文件，在`package.json`中配置即可，官方推荐方式，**项目优选采用这种方式**

配置 demo 如下：

```json
{
  {/** 省略... */}
  "scripts": {
    "start": "cross-env REACT_APP_ENV=dev UMI_ENV=dev umi dev",
    "start:dev": "cross-env REACT_APP_ENV=dev UMI_ENV=dev MOCK=none umi dev",
    "start:test": "cross-env REACT_APP_ENV=test UMI_ENV=test MOCK=none umi dev",
    "start:pro": "cross-env REACT_APP_ENV=pro UMI_ENV=pro UMI_UI=none umi dev",
    "start:pre": "cross-env REACT_APP_ENV=pre UMI_ENV=pre MOCK=none umi dev",
    {/** 省略... */}
  },
	{/** 省略... */}
}
```

**当`UMI_ENV`为 test 时，则必须在 config 目录下配置`config.test.ts`文件来管理 test 环境下的不同变量，** Umi 框架会在 deep merge 后形成最终配置。如果`config.test.ts` 和 `config.ts` 存在相同的配置，则用 `config.test.ts`的配置。

**约定：** `UMI_ENV`与`REACT_APP_ENV`尽量保持一致，避免在业务代码中产生歧义。

## 3.报错处理

由于环境变量是直接使用，不会通过 window 对象的方式来使用，在 `eslint` 和 `TypeScript` 中都会报错。

`eslint` 中可以通过增加 `globals` 的配置来处理报错。

```json
{
  "global": {
    "API_URL": true
  }
}
```

在 `TypeScript` 可以在 `typings.d.ts`中进行定义：

```ts
// src/typings.d.ts

declare const API_URL: string;
```

[更多详细信息请移步官方文档](https://beta-pro.ant.design/docs/environment-manage-cn)
