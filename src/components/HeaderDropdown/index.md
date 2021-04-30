---
title: HeaderDropdown
nav:
  order: 1
group:
  path: /components
  title: 业务组件
  order: 4
---

# HeaderDropdown 头部下拉列表

HeaderDropdown 是 antd Dropdown 的封装，但是增加了移动端的特殊处理，用法也是相同的。

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from 'antd';
import React from 'react';
import HeaderDropdown from '@/components/HeaderDropdown';

export default () => {
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="center">个人中心</Menu.Item>
      <Menu.Item key="settings">个人设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <Button>hover 展示菜单</Button>
    </HeaderDropdown>
  );
};
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| overlayClassName | 下拉根元素的类名称 | `string` | - |
| placement | 菜单弹出位置: bottomLeft bottomRight topLeft topCenter topRight bottomCenter | `string` | `bottomLeft` |
| overlay | 下拉展开的菜单 | `React.ReactNode 或 (() => React.ReactNode) 或 any` | - |
