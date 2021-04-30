---
title: 代理配置
nav:
  order: 3
group:
  title: 项目框架
  order: 2
---

# 代理配置

**跨域是每一个前端工程师都需要了解的基本知识，可以从以下几方面了解并解决他**

## 同源策略

> 定义：同源策略是一种安全机制，全称叫《浏览器的同源策略》，它限制了从同一个源加载的文档如何与来自另一个源的资源进行交互，用于隔离潜在的恶意文件的重要安全机制。

这个机制的本身出发点是很好的，但是同源的限制非常严格，`url`、`端口`任意不同就会造成跨域错误。<br>

**解决方式：** `node.js代理`

## 在开发中使用

现在`Vue`和`React`的脚手架都提供了[proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)能力,底层基于[ http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware),这个包可以把所有的符合正则匹配的请求转发到某个地址，demo 如下：

```bash
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('api', proxy({target: 'http://test', changeOrigin: true}));

app.listen(1000);

```

这个配置可以将所有的`/api`开头的请求转到`http://test`,并且附带所有参数，包括信息和 cookie。代理转化是在 node.js 中完成的，浏览器控制台看到的仍然是`本地地址或是本地IP`

**ant design Pro 中 proxy 在`config/config.ts`中或者`.umirc.ts/poxy`配置即可，demo 如下**

```bash
export default {
  proxy: {
    '/api': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
}
```

> 访问`/api/users`就能访问到`http://jsonplaceholder.typicode.com/`的数据，注意：**proxy 紧在配置为 dev 时生效**

> 注意的是 config.ts 的环境为 node.js 的环境, 无法使用 dom 和浏览器相关行为。[更多详细信息请移步官方文档](https://beta-pro.ant.design/docs/proxy-cn)
