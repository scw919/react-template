---
title: vscode
nav:
  order: 0
group:
  title: 开发工具
  order: 1
---

# 推荐 VSCode 安装的插件

1. **Auto Close Tag**:：自动合并标签插件
2. **Auto Rename Tag**:标签自动补全插件
3. **Bracket Pair Colorizer**：高亮选中代码块插件
4. **Color Highlight**：颜色高亮插件
5. **ESLint**：代码语法检查插件
6. **Prettier - Code formatter**：代码格式化插件
7. **stylelint**：样式格式化插件
8. **Path Intellisense**：路径智能提示插件
9. **Vetur**：vscode 识别 vue 文件插件
10. **vscode-icons**: 给 vscode 打开的项目的文件夹和文件添加对应的 icon 的插件
11. **Atom One Dark Theme**: vscode 主题插件

# VSCode 自动格式化代码

1.vscode 需要安装的插件

5. **ESLint**：代码语法检查插件
6. **Prettier - Code formatter**：代码格式化插件
7. **stylelint**：样式格式化插件

2.编辑 vscode 的 settings 文件 （注意不是替换 settings 文件）

```json

{

    .....
    .....
    .....
    .....
    // 上面省略了,其他配置

    // "eslint.autoFixOnSave": false,
    "eslint.options": {
        "extensions": [
            ".js",
            ".jsx",
            ".tsx",
            ".vue"
        ]
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "eslint.format.enable": true,
    "eslint.run": "onSave",
    "editor.codeActionsOnSave": {
        // eslint
        "source.fixAll.eslint": true,
        // stylelint
        "source.fixAll.stylelint": true,
        // stylelint
    },
    // eslint

    // perttier format ( editor.formatOnSave:true 使用perttier格式化；为 false 使用 eslint 格式化 )
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "SimonSiefke.prettier-vscode",
    // perttier

    // 下面省略了, 其他配置
    .....
    .....
    .....
}

```

3.修改代码，然后按保存，就可以验证是否会自动格式化。

> 格式化代码一般是不能格式化工作区的代码

> 有的编辑器可能因为配置不同写法未能生效，可以加 "[typescriptreact]": { "editor.defaultFormatter": "vscode.typescript-language-features" }  
> 或者 "editor.defaultFormatter": "esbenp.prettier-vscode"  
> 尝试

4.如遇到文件无法检测 jsx 或者格式报错的情况，可能是 typescript 的本地版本和你当前项目的版本不一致的问题

> 请将本地的 ts 版本更新至项目需要的版本

```
npm i typescript -g
```

> vscode 的 setting.json 文件添加：

```
"typescript.tsdk": "node_modules\\typescript\\lib"
```
