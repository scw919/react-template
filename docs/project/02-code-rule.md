---
title: 编码规范
nav:
  order: 2
group:
  title: 项目框架
  order: 2
---

# 编码规范

## 1、命名规范

1.项目中的`文件夹、非组件文件`统一使用小写命名。 如果有多个单词则使用（-）中划线来连接。建议命名不要超过 3 个单词

1）文件夹、css 文件、ts(js)和其它普通文件命名

// 推荐命名

`button` `button-group` `asider-menu.ts` `theme-chalk.less` `introduction.md` `data.json`

// 不推荐命名

`Button` `ButtonGroup` `AsiderMenu.ts` `asiderMenu.ts` `asider_menu.ts` `ThemeChalk.less` `themeChalk.less` `Introduction.md` `Data.json`

2）`组件文件`命名

// 推荐命名

`Button.tsx` `ButtonGroup.tsx` `AsiderMenu.tsx`

// 不推荐命名

`findModal.tsx` `asider-menu.tsx` `asider_menu.tsx`

# 注：index.tsx 文件除外，首字母必须小写

1.`组件`命名示例：

```json
|--basic-comps // 多个项目可以复用的组件写到这里（非业务组件）
  |-- upload-file
    |-- data.d.ts // 组件的类型定义
    |-- index.md // 组件的使用文档
    |-- index.tsx // 组件入口
    `-- index.less // 组件样式
  |-- index.ts // 统一导出 all basic-comps 组件
|--components // 多个页面可以复用的组件写到这里（业务组件）
  |-- collapse
    |-- Collapse.tsx
    |-- CollapsePanel.tsx
    |-- data.d.ts
    |-- index.md // 组件的使用文档
    |-- index.tsx
    `-- index.less
  |-- index.ts // 统一导出 all components 组件
```

2.`组件名称`的命名使用单词首字母大写。 如果有多个单词也是每个单词首字母大写。建议命名不要超过 3 个单词

`Button.tsx` `ButtonGroup.tsx` `FindProModal.tsx`

3.新建`路由组件`应放到一个目录里面 例如：

```bash
|--pages
  |--welcome
    |--index.tsx // 页面组件
    |--index.less // 页面组件样式
  |--login
    |--data.d.ts // 路由组件的类型定义
    |--service.ts // 路由组件的服务层（建议统一写到：src/services目录下）
    |--model.ts // 路由组件 dva 层（建议统一写到：src/models目录下）
    |--index.tsx // 路由组件入口
    |--index.less // 路由组件样式
```

4、当前`页面的组件`在当前文件夹中创建一个 components 存放

```bash
|--pages
  |--login
    |--components // 这里的组件只能在这个 页面使用,其它页面不能复用（页面内组件）
        |--Sub.tsx
    |--data.d.ts
    |--index.less
    |--index.tsx
```

## 2、模块定义规范

```bash
1.basic-comps 独立组件模块，该模块编写的独立组件，该模块的组件不能引用components
  模块的组件,反过来则可以，并且编写的组件统一在index.ts中导出。

  |--basic-comps
    |--upload-file
       |--data.d.ts
       |-- index.md // 组件的使用文档
       |--index.less
       |--index.tsx
    |--index.ts // 统一导出组件


2.components 非独立组件模块，该模块编写非独立的组件（组合组件和业务组件）。

  1）该模块的组件之间能互相引用，引用时直接指定要引用的单个组件
    import Icon from "./icon/icon.tsx" // 正确
    import { Icon } from "components/index.ts" // 错误
  2）该模块的组件可以引用basic-comps模块的组件，反过来则不行


3.enum 枚举 推荐的定义方式 ( 待定 )

  // ant-design-pro 定义枚举的格式
  export const TableStatus = {
    // 0 后台返回的数据
    0: {
      // 显示的文本
      text: '关闭',
      // 文本的颜色
      status: 'Default',
    },
    1: {
      text: '运行中',
      status: 'Processing',
    },
    2: {
      text: '已上线',
      status: 'Success',
    },
    3: {
      text: '异常',
      status: 'Error',
    },
  }

  // 其它定义 定义枚举的格式
  export const Sex = {
    Man: {
      value: "男",
      text: "男",
      color: BaseStyle.$themeColor,
    },
    Woman: {
      value: "女",
      text: "女",
      color: BaseStyle.$successColor,
    }
  }
```

## 3、组件编写规范

1.渲染相关的函数使用 `xxxRender` 结尾

2.编写的代码分好区域

例如：

渲染相关的写到一起，事件的写到一起 ...

```ts
// =============== 1.props 获取属性===============
// =============== 2.state 定义变量===============
// =============== 3.hooks 区域===============
// =============== 4.function 区域===============
// =============== 5.handle 区域===============
// =============== 6.render 区域===============
```

3.事件函数推荐使用 `handleXXX` 开头, `handle`开头可以和其它三方的 `on` 开头有个区分。使用 `on` 也是可以的

```ts
const handleBtnClick = (event: any) => {};
```

4.props 获取属性时可以对属性进行分类

```ts
const {
  // 普通属性
  name,
  age,

  // render函数
  itemRender,
  btnRender,

  // 事件函数
  onBtnClick,

  // 剩余属性
  ...rest
} = props;
```

4.props 默认使用?作为可选属性

```ts
export interface ExampleProps {
  name?: string;
  age?: number;
  onBtnClick?: (event: any, name: string | undefined) => void; // 函数 (event, name)=> {}
}
```

5.组件导出时可以使用`memo()`高阶函数优化

```ts
export default memo(Example);
```

下面是编写一个组件的案例：

```ts
/**
 * 组件模板
 */
import React, { memo, useEffect } from 'react';
// 动态添加class
import classnames from 'classnames';
import styles from './index.less';
import type { Info } from './data';

// 组件接收的参数
export interface ExampleProps {
  name?: string;
  age?: number;
  friends?: string[]; // 数组 ['liu', 'jun']
  info?: Info; // 对象
  labels?: {
    name: string;
    color: string;
  }[]; // 数组 [ {name:'xx', color:'xx'}, {name:'xx', color:'xx'} ]
  onBtnClick?: (event: any, name: string | undefined) => void; // 函数 (event, name)=> {}
}

// 定义组件
const Example: React.FC<ExampleProps> = (props) => {
  // props 获取属性
  const { onBtnClick } = props;
  const { name, age } = props;
  // state 定义变量
  // const [value, setValue] = useState(false);

  // =============== hooks 区域===============
  useEffect(() => {
    // 页面挂载完触发（该hooks可以写多个）
    console.log('页面挂载完成会触发 ( 第二参数是空[] 代表只调用一次)');
  }, []);

  // =============== function 区域===============

  // =============== handle 区域===============
  const handleBtnClick = (event: any) => {
    if (onBtnClick) {
      onBtnClick(event, name);
    }
  };

  // =============== render 区域===============
  return (
    <div className={styles.example}>
      {/* 用 classnames 添加样式更加灵活 */}
      <h2 className={classnames(styles.example)}>
        example comps name:{name}, age:{age}
      </h2>
      <button onClick={(e) => handleBtnClick(e)}>getName</button>
    </div>
  );
};

// memo 是性能优化（浅层比较更新组件）
export default memo(Example);
```

## 4、定义变量的规范

```ts
// 1、定义一个变量尽量需要写上它的类型：
const userName: string = '';

// 2、一些有默认值的变量可以不需要写类型，因为ts会根据默认值判断它的类型
const numb = 7;
```

## 5、类型的规范

```ts
// 1、定义一个类型使用interface或者type来定义，自定义的类型使用驼峰命名首字母大写
interface UserType {
  username: string;
  password: string;
}

// 2、使用any类型的时候尽量用unknown，因为unknown是‘严格’版的any

// 3、公共类型需要放到公共类型的文件中统一管理

// 4.如果出现类型搞不定的时候推荐使用：any 或者 //@ts-ignore
```

## 6、路由规范

文件夹命名：`小写`

下面是新建一个 login 页面的案例：

1.新建 login 路由组件

```ts
|--pages
  |--login
    |--components  //每个路由文件都有一个components文件，用来存放当前页面的组件
        |--Sub.tsx
    |--index.tsx
```

2.手动配置路由

```ts
// config/route.ts
export default [
  {
    name: 'login',
    path: '/login',
    component: './login',
  },
];
```
