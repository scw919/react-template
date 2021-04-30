---
title: InputPrice
nav:
  order: 0
group:
  path: /basic-comps
  title: 基础组件
  order: 3
---

## InputPrice 自定义表单组件-案例模板

> `InputPrice`自定义表单组件的案例

```tsx
import React from 'react';
import { InputPrice } from '@/basic-comps';
import { Typography, Form, Input } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

export default () => {
  const onFinish = (valuse) => {
    console.log(valuse);
  };
  return (
    <ProForm layout={'vertical'} onFinish={onFinish}>
      <Form.Item name="name" label="商品">
        <Input />
      </Form.Item>
      <Form.Item name="price" label="自定义价格表单组件">
        <InputPrice />
      </Form.Item>
    </ProForm>
  );
};
```

## InputPrice API

| 参数     | 说明 | 类型         | 默认值                      |
| -------- | ---- | ------------ | --------------------------- |
| number   | 值   | `PriceValue` | `{number:0,currency:'rmb'}` |
| currency | 单位 | `string`     | rmb                         |
