---
title: npm-yarn
nav:
  order: 0
group:
  title: 开发工具
  order: 1
---

# npm 和 yarn 配置镜像

```bash
npm config set registry https://registry.npm.taobao.org
#npm查看当前地址源：npm get registry

npm i yarn tyarn -g
#推荐使用 tyarn 来进行包管理，可以极大地减少 install 的时间和失败的概率，并且完全兼容 npm。

yarn config set registry https://registry.npm.taobao.org -g
#yarn查看当前地址源：yarn config get registry
```

# npm 常用命令

```bash
# 启动：
npm run start

# 安装需要的依赖包:npm install [package]
npm install [package] --save-dev 或 --D # 安装所需的依赖包，并将该包的记录写到package.json文件的 # devDependencies 选项中。
npm install [package] --global # 全局安装依赖包

# 卸载已经安装的依赖包：
npm uninstall [package] # npm 可以指定 --save | --save-dev

npm cache clean #运行此命令将清除全局缓存依赖包。当再次npm install运行，进行下载依赖包

# 查看安装的模块：npm ls
```

# yarn 常用命令

```bash
#启动：
yarn run start

# 安装需要的依赖包:yarn add [package]
yarn add [package] --dev 或 -D #安装所需的依赖包，并将该包的记录写到package.json文件的 devDependencies 选项中。
yarn global add [package] #全局安装依赖包

#卸载已经安装的依赖包：
yarn remove [package]

yarn cache clean [package] #运行此命令将清除全局缓存依赖包。当再次yarn或yarn install运行，进行下载依赖包
```
