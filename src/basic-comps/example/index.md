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
```

## Example API

| 参数       | 说明     | 类型                                              | 默认值 |
| ---------- | -------- | ------------------------------------------------- | ------ |
| name       | 名称     | `string`                                          | -      |
| age        | 年龄     | `number`                                          | -      |
| friends    | 朋友     | `string[]`                                        | -      |
| info       | 信息     | `Info`                                            | -      |
| labels     | 标签     | `{name: string;color: string;}`                   | -      |
| onBtnClick | 点击事件 | `(event: any, name: string \| undefined) => void` | -      |
| x          | xx       | `xxx`                                             | xxxx   |
