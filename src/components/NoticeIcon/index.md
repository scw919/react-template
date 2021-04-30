---
title: NoticeIcon
nav:
  order: 1
group:
  path: /components
  title: 业务组件
  order: 4
---

# NoticeIcon 通知工具

通知工具提供一个展示多种通知信息的界面。

```tsx
/**
 * background: '#f0f2f5'
 */
import { message } from 'antd';
import React from 'react';
import NoticeIcon from '@/components/NoticeIcon/NoticeIcon';

export default () => {
  const list = [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification',
    },
  ];
  return (
    <NoticeIcon
      count={10}
      onItemClick={(item) => {
        message.info(`${item.title} 被点击了`);
      }}
      onClear={(title: string, key: string) => message.info('点击了清空更多')}
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => message.info('点击了查看更多')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={2}
        list={list}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={2}
        list={list}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="待办"
        emptyText="你已完成所有待办"
        count={2}
        list={list}
        showViewMore
      />
    </NoticeIcon>
  );
};
```

### NoticeIcon API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 有多少未读通知 | `number` | - |
| bell | 铃铛的图表 | `ReactNode` | - |
| onClear | 点击清空数据按钮 | `(tabName: string, tabKey: string) => void` | - |
| onItemClick | 未读消息列被点击 | `(item: API.NoticeIconData, tabProps: NoticeIconTabProps) => void` | - |
| onViewMore | 查看更多的按钮点击 | `(tabProps: NoticeIconTabProps, e: MouseEvent) => void` | - |
| onTabChange | 通知 Tab 的切换 | `(tabTile: string) => void;` | - |
| popupVisible | 通知显示是否展示 | `boolean` | - |
| onPopupVisibleChange | 通知信息显示隐藏的回调函数 | `(visible: boolean) => void` | - |
| clearText | 清空按钮的文字 | `string` | - |
| viewMoreText | 查看更多的按钮文字 | `string` | - |
| clearClose | 展示清空按钮 | `boolean` | - |
| emptyImage | 列表为空时的兜底展示 | `ReactNode` | - |

### NoticeIcon.Tab API

| 参数         | 说明               | 类型                                 | 默认值 |
| ------------ | ------------------ | ------------------------------------ | ------ |
| count        | 有多少未读通知     | `number`                             | -      |
| title        | 通知 Tab 的标题    | `ReactNode`                          | -      |
| showClear    | 展示清除按钮       | `boolean`                            | `true` |
| showViewMore | 展示加载更         | `boolean`                            | `true` |
| tabKey       | Tab 的唯一 key     | `string`                             | -      |
| onClick      | 子项的单击事件     | `(item: API.NoticeIconData) => void` | -      |
| onClear      | 清楚按钮的点击     | `()=>void`                           | -      |
| emptyText    | 为空的时候测试     | `()=>void`                           | -      |
| viewMoreText | 查看更多的按钮文字 | `string`                             | -      |
| onViewMore   | 查看更多的按钮点击 | `( e: MouseEvent) => void`           | -      |
| list         | 通知信息的列表     | `API.NoticeIconData`                 | -      |

### NoticeIconData

```tsx | pure
export interface NoticeIconData {
  id: string;
  key: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra: any;
  status: string;
}
```
