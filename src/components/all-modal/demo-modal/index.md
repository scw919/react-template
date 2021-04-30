---
title: DemoModal
nav:
  order: 0
group:
  path: /basic-comps
  title: 基础组件
  order: 3
---

## DemoModal 组件

DemoModal 组件默认使用

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { DemoModal } from '@/components';
export default () => {
  // 监听点击
  const onModalChange = (type: string, values: any) => {
    console.log(type, values);
  };

  // DemoModal 是一个带有弹窗的  按钮
  return <DemoModal onModalChange={onModalChange}></DemoModal>;
};
```

## DemoModal API

| 参数          | 说明     | 类型                                 | 默认值 |
| ------------- | -------- | ------------------------------------ | ------ |
| title         | 名称     | `string`                             | -      |
| width         | 对话的宽 | `number`                             | 800    |
| modalData     | 表单数据 | `any`                                | -      |
| onModalChange | 回调事件 | `(type: string, values: any) =>void` | -      |
