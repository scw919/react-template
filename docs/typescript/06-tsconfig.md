---
title: TS编译选项
nav:
  order: 1
group:
  title: TypeScript知识
  order: 8
---

# 编译选项

可以在`tsconfig.json` 中的 `compilerOptions` 来定制你的编译选项:

```json
{
  "compilerOptions": {
    "outDir": "build/dist", // 指定输出目录
    // 指定编译后 文件 输出的格式规范
    "module": "esnext", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' , 'es2015' or 'esnext'
    // 指定编译的目标代码
    "target": "esnext", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "lib": ["esnext", "dom"], // 指定要包含在编译中的库文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "baseUrl": ".", // 用于解析非相对模块名称的基目录
    "jsx": "react-jsx", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "allowJs": true, // 允许编译 javascript 文件
    "skipLibCheck": true,
    "experimentalDecorators": true, // 启用装饰器
    "strict": true, // 启用所有严格类型检查选项
    "paths": {
      // 模块名到基于 baseUrl 的路径映射的列表
      "@/*": ["./src/*"],
      "@@/*": ["./src/.umi/*"]
    }
  },
  "include": [
    // 需要包含的文件
    "mock/**/*",
    "src/**/*",
    "tests/**/*",
    "test/**/*",
    "__test__/**/*",
    "typings/**/*",
    "config/**/*",
    ".eslintrc.js",
    ".stylelintrc.js",
    ".prettierrc.js",
    "jest.config.js",
    "mock/*"
  ],
  // 需要排除的文件
  "exclude": ["node_modules", "build", "dist", "scripts", "src/.umi/*", "webpack", "jest"]
}
```
