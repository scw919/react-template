---
title: 打印
nav:
  order: 0
group:
  title: 工具库
  order: 10
---

# 打印

在对应的需要打印的文件 tsx 引入@/utils/print/index 下的打印功能函数如

```ts
import { printPartialHtml } from '@/utils/print/index';
```

该函数需要传入需要打印的 dom 对象（document.querySelector()及打印标题{title:'标题'}）如

```ts
printPartialHtml(document.querySelector('#print'), { title: '标题' });
```

注意点：当需要打印的 dom 里面有如果 antd 组件库的组件时，由于打印函数创建的 iframe 里面没有对应的样式表，所以需要自己加上对应的类名及样式(注：打印内容是没办法有背景色的，所以设置也没用)。如

```less
:global(.ant-alert-message) {
  color: red;
}
```
