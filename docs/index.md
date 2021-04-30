---
title: 首页
nav:
  order: 0
group:
  order: 0
---

# Ant Design Pro Temp

这个项目是由 [Ant Design Pro](https://pro.ant.design) 项目初始化来的。在他的基础上进行部分的`定制`和`规范约束`。

## 克隆项目

```bash
# http://172.16.120.120/25759/ant-design-pro-temp.git
git clone git@172.16.120.120:25759/ant-design-pro-temp.git
cd ant-design-pro-temp
```

> 如果没有权限，请联系主程序员

## 构建项目

Install `node_modules`:

```bash
npm install
```

or

```bash
# npm install -g yarn
yarn
```

or ( 官方推荐使用 `tyarn`， `tyarn和yarn`用法一摸一样 )

```bash
# npm install -g yarn tyarn
tyarn
```

> 如果没有全局安装 `tyarn` 请先安装 `npm install -g yarn tyarn`

## 运行项目

Ant Design Pro 项目自身提供非常多的脚本，例如：快速启动，打包构建，代码样式检查和单元测试等等

这些脚本都是写在： `package.json`文件中，如果需要自行添加自定义的脚本，也是在改文件的 `scripts` 属性中添加。

### 启动脚本

```bash
npm start
# or
yarn start
#or (推荐)
tyarn start
```

> 执行完上面的命令，项目就会自动生成 ：`node_modules, src/.umi, src/.umi-production, yarn.lock or package-lock.json`。自动生成的这些文件都可以删除，然后重新安装运行

### 打包构建项目

```bash
npm run build
# or
yarn build
# or
tyarn build
```

### 检查代码风格

```bash
npm run lint
# or
yarn lint # yarn run lint
# or
tyarn lint # tyarn run lint

```

自动修复部分 错误的代码语法

```bash
npm run lint:fix
# or
yarn lint:fix
# or
tyarn lint:fix
```

### 执行测试用例

```bash
npm test
# or
yarn test
# or
tyarn test
```

## 本地部署预览

> 出现跨域问题需要后台处理

```bash
npm install -g serve
cd ant-design-pro-temp

serve -s dist -p 8888 # dist 是项目打包的结果
```

## 更多

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our

其他学习手册：

[Ant-Design](https://ant.design/components/overview-cn/)

[Ant-Design-Pro](https://beta-pro.ant.design/docs/introduction-cn)

[Pro-Component 手册](https://procomponents.ant.design/)

[umi 手册](https://umijs.org/zh-CN/docs)

[umi hooks 手册](https://hooks.umijs.org/zh-CN/hooks/async)

[AntdV 案例](https://store.antdv.com/pro/preview/workplace)
