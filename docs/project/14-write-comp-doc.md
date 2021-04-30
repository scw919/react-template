---
title: 编写组件文档
nav:
  order: 12
group:
  title: 项目框架
  order: 2
---

# 什么是组件文档？

组件文档：就是编写组件的使用文档。该项目主要是给 `basic-comps` 基础组件和 `components`页面组件编写文档

# 编写 example 组件文档

### 1.新建 `example` 组件

```ts
// src/basic-comps/example/index.tsx
import React, { memo, useEffect } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import type { Info } from './data';

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
  const { onBtnClick } = props;
  const { name, age } = props;
  useEffect(() => {
    console.log('页面挂载完成会触发 ( 第二参数是空[] 代表只调用一次)');
  }, []);

  const handleBtnClick = (event: any) => {
    if (onBtnClick) {
      onBtnClick(event, name);
    }
  };
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

export default memo(Example);
```

### 2.编写`example`组件的使用文档

1)指定 `组件文档` 的基本信息

```
// src/basic-comps/example/index.md
---
title: Example  // 菜单的名称
nav:
  order: 0 // 菜单的排序（测试无效，菜单排序可以使用文件命名来排）
group: // 文档所在的组
  path: /basic-comps  // 该组 路由名称：/basic-comps
  title: 基础组件 // 改组 的名称
  order: 3 // 组的排序（目录菜单的排序）
---
```

2)编写组件使用案例文档

```ts
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

3)编写组件 API 文档

```json
| 参数         | 说明               | 类型                                 | 默认值 |
| ------------ | ------------------ | ------------------------------------ | ------ |
| name        | 名称     | `string`                             | -      |
| age        | 年龄    | `number`                          | -      |
| friends    | 朋友       | `string[]`                            | - |
| info        | 信息         | `Info`                            | - |
| labels       | 标签     | `{name: string;color: string;}`  | -      |
| onBtnClick      | 点击事件     | `(event: any, name: string \| undefined) => void` | -  |
| x               | xx                 | `xxx`                   | xxxx                    |
```

4）完整的组件文档

````
---
title: Example
nav:
  order: 0
group:
  path: /basic-comps
  title: 基础组件
  order: 3
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

...
...
...
...
````

```

```
