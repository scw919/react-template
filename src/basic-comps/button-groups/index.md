---
title: ButtonGroups
nav:
  order: 0
group:
  path: /basic-comps
  title: 基础组件
  order: 3
---

## ButtonGroups 组件

#### ButtonGroups 的基本使用 1

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { ButtonGroups } from '@/basic-comps';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
export default () => {
  const btnsConfig = [
    {
      btnType: 'button',
      isShow: true,
      name: '详情1',
      style: {
        margin: '0 5px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'default',
        onClick: (e) => {
          console.log('点击了详情1');
        },
      },
    },
    {
      btnType: 'button',
      isShow: false,
      name: '编辑2',
      style: {
        margin: '0 5px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'primary',
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '删除3',
      style: {
        margin: '0 5px',
      },
      // 下面是 button的属性
      fieldProps: {
        // type: 'primary',
        danger: true,
        onClick: (e) => {
          console.log('点击了删除3');
        },
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '新建4',
      style: {
        margin: '0 5px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'primary',
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '导出5',
      style: {
        margin: '0 5px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'primary',
        icon: <DownloadOutlined />,
      },
    },
  ];
  return <ButtonGroups btnsConfig={btnsConfig}></ButtonGroups>;
};
```

#### ButtonGroups 的基本使用 2

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { ButtonGroups } from '@/basic-comps';
import { HeartTwoTone } from '@ant-design/icons';
export default () => {
  const btnsConfig = [
    {
      btnType: 'button',
      isShow: true,
      name: '详情1',
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'text',
        onClick: (e) => {
          console.log('点击了详情1');
        },
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '编辑2',
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'link',
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '删除3',
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'text',
        danger: true,
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '收藏',
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'text',
        icon: <HeartTwoTone twoToneColor="#eb2f96" />,
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '收藏',
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'text',
        icon: <HeartTwoTone />,
      },
    },
    {
      btnType: 'button',
      isShow: true,
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'text',
        icon: <HeartTwoTone />,
      },
    },
  ];
  return (
    <div style={{ width: '250px' }}>
      <ButtonGroups btnsConfig={btnsConfig}></ButtonGroups>
    </div>
  );
};
```

#### ButtonGroups 的基本使用 3

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { ButtonGroups } from '@/basic-comps';
import { DownOutlined } from '@ant-design/icons';
export default () => {
  const btnsConfig = [
    {
      btnType: 'button',
      isShow: true,
      name: '详情1',
      // 下面是 button的属性
      fieldProps: {
        onClick: (e) => {
          console.log('点击了详情1');
        },
      },
    },
    {
      btnType: 'dropdown',
      isShow: true,
      name: '下载1',
      style: {
        margin: '0 10px',
      },
      dropdownType: 'button',
      fieldProps: {
        type: 'primary',
      },
      menuItems: [
        {
          name: '下载pdf',
          isShow: true,
          style: {},
          // 可以最加 Menu.Item 的属性
          onClick: (e) => {
            console.log('下载pdf=', e);
          },
        },
        {
          name: '下载word',
          isShow: true,
          style: {},
          // 可以最加 Menu.Item 的属性
          onClick: (e) => {
            console.log('下载word=', e);
          },
        },
      ],
    },
    {
      btnType: 'dropdown',
      isShow: true,
      name: '下载2',
      dropdownType: 'text',
      // 按钮的样式
      style: {
        margin: '0 10px',
        color: 'red',
      },
      menuItems: [
        {
          name: '下载pdf2',
          isShow: true,
          style: {}, // 下拉menuitem中a 标签的样式
          // 可以最加 Menu.Item 的属性
          onClick: (e) => {
            console.log('下载pdf2=', e);
          },
        },
        {
          name: '下载excel2',
          isShow: false,
          style: {},
          // 可以最加 Menu.Item 的属性
          onClick: (e) => {
            console.log('下载excel2=', e);
          },
        },
        {
          name: '下载word2',
          isShow: true,
          style: {},
          // 可以最加 Menu.Item 的属性
          onClick: (e) => {
            console.log('下载word2=', e);
          },
        },
      ],
    },
  ];
  return <ButtonGroups btnsConfig={btnsConfig}></ButtonGroups>;
};
```

#### ButtonGroups 的基本使用 4

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { ButtonGroups } from '@/basic-comps';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const { Option } = Select;

export default () => {
  const btnsConfig = [
    {
      btnType: 'button',
      isShow: true,
      name: '新建1',
    },
    {
      btnType: 'custom',
      isShow: true,
      customRender: () => {
        return (
          <>
            <Select defaultValue="lucy" style={{ width: 120, margin: '0 6px' }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </>
        );
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '新建2',
    },
  ];
  return <ButtonGroups btnsConfig={btnsConfig}></ButtonGroups>;
};
```

## Example API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| btnType | 名称 | `button、dropdown` | button |
| isShow | 年龄 | `boolean` | false |
| name | 朋友 | `string` | '' |
| style | 信息 | `object` | null |
| fieldProps | 标签 | `Button的属性` | null |
| dropdownType | 下拉按钮类型（ 只有 btnType === dropdown 才有用） | `button 、text` | 'button' |
| menuItems | 下拉菜单 MenItem 的属性（ 只有 btnType === dropdown 才有用） | `MenItem[]` | [] |
