---
title: 新建组件
nav:
  order: 12
group:
  title: 项目框架
  order: 2
---

# 新建组件

## 1、新建独立（基础）组件

1、独立组件全部创建在（src/basic-comps）目录下。

2、独立组件中不能引入外部组件，如（src/components）中的组件。

3、独立组件统一在 index.ts 中导出。

```josn
|--src
    |--basic-comps
        |--example
            |--data.d.ts // 类型定义
            |--index.md // 组件的使用文档
            |--index.tsx
            |--index.less
    |--index.ts  // 统一导出组件
```

## 2、新建非独立（业务）组件

1、非独立组件创建在（src/components）目录下。

2、非独立组件之间可以互相引用，也可以引用外部组件，如（src/basic-comps）中的组件。

3、非独立组件直接在页面引用。

```josn
|--src
    |--components
        |--example
            |--data.d.ts
            |--index.md
            |--index.tsx
            |--index.less
    |--index.ts  // 统一导出组件
```

引入示例：

```ts
import { Example } from '@/components/index';
```

## 3、新建辅助（当前页面）组件

1、辅助组件创建在当前页面目录下 components 中。

2、辅助组件只属于当前页面，不能在外部使用。

```json
|--example //示例页面
    |--components //辅助组件
        |--head.tsx
    |--index.tsx
    |--index.less
```

引入示例：

```ts
import { Head } from './components/head';
```

## 4、新建一个 Example 组件的模板

组件的目录结构如下：

```bash
|--basic-comps // 多个项目可以复用的组件写到这里（非业务组件）
  |-- example
    |-- data.d.ts // 组件的类型定义(注意：组件props属性的类型不要定义在这里,定在这不好阅读，应定在index.tsx中)
    |-- index.md // 组件的使用文档
    |-- index.tsx // 组件入口
    `-- index.less // 组件样式
```

index.tsx

```ts
// src/basic-comps/example/index.tsx
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
  info: Info; // 对象
  labels: {
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

data.ts

```ts
// src/basic-comps/example/data.ts
// 定义其它类型
export interface Info {
  title: string;
  content: string;
}
```

index.less

```css
/* src/basic-comps/example/index.less */
@import '~antd/es/style/themes/default.less';
.example {
  color: green;
}
```

index.md

````ts
// src/basic-comps/example/index.md
---
title: Example // 组件的名称
nav:
  order: 2  // 排序（好像没起作用,只能通过文件命名来排序）
group:
  path: /basic-comps // 组件所在组的 路由名称
  title: 基础组件 // 组件所在的组的名称
  order: 3 // 这个是组目录的排序
---

## Example 组件

这个组件是一个模板

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { Example } from '@/basic-comps';
export default () => {
  const onBtnClick = (event, name) => {
    console.log(event, name);
  };
  return (
    <Example
      name="liujun"
      age={100}
      onBtnClick={(event, name) => onBtnClick(event, name)}
    ></Example>
  );
};
```

````
