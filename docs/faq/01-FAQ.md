---
title: FAQ
nav:
  order: 0
group:
  title: FAQ
  order: 11
---

# FAQ

## 1.导包报错

**Error1**

Cannot find module '@ant-design/icons' or its corresponding type declarations.

Cannot find module 'antd' or its corresponding type declarations

Cannot find module 'umi' or its corresponding type declarations

Cannot find module '@ant-design/pro-layout' or its corresponding type declarations

解决方案：

```bash
 tyarn add @types/antd -D
 tyarn add @umijs/types -D

 tyarn
 tyarn start
```

**Error2**

解决方案：

```bash
 xxxx
```

## 2.重复注册服务异常

**Error1**

Error: plugin ./node_modules/react-dev-inspector/plugins/umi/react-inspector is already registered

解决方案：

```bash
 在config/config.xx.js中的配置文件中， 不能出现重复配置 node_module 包下的（react-dev-inspector）插件
```
