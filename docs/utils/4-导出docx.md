---
title: 导出docx
nav:
  order: 0
group:
  title: 工具库
  order: 10
---

# 导出 docx

通过插件`mhtml-to-word`实现导出 docx 文件

> 导出复杂的 docx 文件，推荐使用后端导出

### 安装插件

```js
npm install mhtml-to-word --save;
// or
yarn add mhtml-to-word -D
```

### 引入插件

`import { exportWord } from 'mhtml-to-word';`

### 封装导出方法

```ts
import { exportWord } from 'mhtml-to-word';

/**
 * 导出word
 * @param dom 选择的节点
 * @param fileName 导出文件的名称
 * @param styles 自定义样式（标签）
 * @returns
 */
export const exportWordFuc = (dom: HTMLElement | null, fileName: string, styles?: string) => {
  if (!dom) return;
  let copyDom: any = document.createElement('span');
  const cloneDom: any = dom.cloneNode(true);
  copyDom.appendChild(cloneDom);

  const htmlTemp = copyDom.innerHTML;
  copyDom = null;
  // console.log('htmlTemp=', htmlTemp)
  const iframeDom = document.createElement('iframe');
  const attrObj = {
    height: '0px',
    width: '0px',
    border: '0px',
    wmode: 'Opaque',
  };
  const styleObj = {
    position: 'absolute',
    top: '-999px',
    left: '-999px',
  };
  Object.entries(attrObj).forEach(([key, value]) => {
    iframeDom.setAttribute(key, value);
  });
  Object.entries(styleObj).forEach(([key, value]) => {
    iframeDom.style[key] = value;
  });
  document.body.insertBefore(iframeDom, document.body.children[0]);
  const iframeWin: any = iframeDom.contentWindow; // 1.获取iframe中的window
  const iframeDocs = iframeWin.document; // 2.获取iframe中的document
  iframeDocs.write(`<!doctype html>`);
  iframeDocs.write(htmlTemp);

  const htmlDoc = `
  <!DOCTYPE html>
  <html lang="en">
  ${iframeDocs.documentElement.innerHTML}
  </html>
  `;
  const exportOpts = {
    mhtml: htmlDoc, // 将转化好的内容放到mhtml这个参数中
    // data: { title: 'exportword' },
    filename: fileName,
    style: styles, // 标签样式
  };
  exportWord(exportOpts);
};
```

### 代码演示

```tsx
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import TableList from '@/pages/example/table-list';
import { exportWordFuc } from '@/utils/export/export-word';

export default () => {
  // 测试mhtml-to-word
  const handleExportWord = () => {
    const exportDom = document.getElementById('export');
    exportWordFuc(exportDom, '测试导出word', 'h4{color: red;} table{width: 100%;}');
  };

  return (
    <>
      <div id="export">
        <h4>导出测试</h4>
        <p>小标题</p>
        <p>
          3.直接使用（浏览器环境下的使用，node环境下请点击方法一详情）
          这里我们给出百度模板的使用演示 （1）引入我们在详情链接中的百度模板的文件
        </p>
        <TableList />
      </div>
      <Space>
        {/* 测试mhtml-to-word */}
        <Button type="primary" onClick={handleExportWord}>
          导出word
        </Button>
      </Space>
    </>
  );
};
```

### exportExcel 参数

| 参数     | 说明                | 类型        | 是否必传 | 示例                                |
| :------- | :------------------ | :---------- | :------- | ----------------------------------- |
| dom      | dom 容器            | HTMLElement | 必选     | 'document.querySelector('.export')' |
| fileName | 导出的 excel 表头   | string      | 必选     | 'exportWord'                        |
| styles   | 导出的 excel 的名称 | string      | 可选     | '{a {color: red;}}'                 |
