---
title: G2Plot图表可视化
nav:
  order: 12
group:
  title: 项目框架
  order: 2
---

# G2Plot 图表

很多时候我们都需要一个美观大方的图表页来充当首页，在快速展示大盘信息的同时还能吸引眼球，提升系统的质感。所以我们也做了一个图表库 `Ant Design Charts。`

`Ant Design Charts` 是 `G2Plot` 的 `React` 版本，基于 `React、TypeScript` 封装了所有的 `G2Plot` 图表，继承了 `G2Plot` 的所有配置，对 `React` 技术栈的同学更加友好，同一团队开发。

- 开箱即用：默认呈现高质量图表，将对开发体验及用户体验的研究沉淀入图表的默认配置项
- 易于配置：用户能够根据具体业务需要较为轻松的调整图表细节
- 体验良好：视觉和交互体验聚焦于如何能够展示和发现信息"这一图表本源的职能上

参考文章：

[Ant Design Charts](https://beta-pro.ant.design/docs/graph-cn)

[Ant Design Charts Gallery](https://charts.ant.design/demos/line)

<!-- [Antv-L7](https://antv-l7.gitee.io/zh/examples/gallery#category-%E5%A1%AB%E5%85%85%E5%9B%BE)

[Antv-L7 Quickstart](https://antv-l7.gitee.io/zh/docs/tutorial/quickstart) -->

![](https://gw.alipayobjects.com/zos/antfincdn/0TC3%26Qgh5c/1586836312040-340d7971-1ac7-4ee6-af81-e2cae2b05963.png)

# 1.集成 G2Plot 可视化方法

快速上手

(1) 如果使用`yarn`或者`npm`可以直接安装：

```ts
 npm install @ant-design/charts --save
 // yarn
 yarn add @ant-design/charts
```

(2) 有些时候图表体积比较大就需要通过 CDN 的方式来加快加载。 CDN 模式下由于底层依赖不一样，为了降低包体积，从 1.0.5 版本开始，组织架构图、流程图、资金流向图、缩进树图被打包到 `charts_g6.min.js` 里，其它图表打包到 `charts.min.js` 里，使用时按需引入即可。

我们首先需要在 `config/config.ts` 中的 `scripts` 中配置:

```ts
scripts: [
  'https://unpkg.com/react@17/umd/react.production.min.js',
  'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
  'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts.min.js',
  //使用 组织架构图、流程图、资金流向图、缩进树图 才需要使用
  'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts_g6.min.js',
];
```

同时在 `config/config.ts` 中的 `externals` 中配置:

```ts
externals: {
  react: 'React',
  'react-dom': 'ReactDOM',
  "@ant-design/charts": "charts"
};
```

(3) 重新下载依赖包`npm/yarn install`,重启服务

简单使用

接下来我们就可以在代码中使用了

```ts
import React from 'react';
import { Line } from '@ant-design/charts';

const Page: React.FC = () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  return <Line {...config} />;
};
export default Page;
```

# 2.常见可视化图表

## 折线图可视化[API](https://charts.ant.design/zh-CN/demos/line?type=api)

```tsx
import React, { useRef } from 'react';
import { Line } from '@ant-design/charts';

const DemoLine: React.FC = () => {
  const data = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
  ];

  const config = {
    data,
    height: 300,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
  };
  const ref = useRef();

  // 导出图片
  const downloadImage = () => {
    ref.current?.downloadImage();
  };

  // 获取图表 base64 数据
  const toDataURL = () => {
    console.log(ref.current?.toDataURL());
  };

  return (
    <div style={{ height: '200px', width: '60%' }}>
      <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
        导出图片
      </button>
      <button type="button" onClick={toDataURL}>
        获取图表信息
      </button>
      <Line {...config} chartRef={ref} />
    </div>
  );
};

export default DemoLine;
```

## 条形图可视化[API](https://charts.ant.design/zh-CN/demos/bar?type=api)

```tsx
import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/charts';

const DemoBar: React.FC = () => {
  var data = [
    {
      year: '1951 年',
      value: 38,
    },
    {
      year: '1952 年',
      value: 52,
    },
    {
      year: '1956 年',
      value: 61,
    },
    {
      year: '1957 年',
      value: 145,
    },
    {
      year: '1958 年',
      value: 48,
    },
  ];
  var config = {
    data: data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: { position: 'top-left' },
  };
  return (
    <div style={{ height: '200px', width: '60%' }}>
      <Bar {...config} />
    </div>
  );
};

export default DemoBar;
```

## 饼图可视化[API](https://charts.ant.design/zh-CN/demos/pie?type=api)

```tsx
import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const DemoPie: React.FC = () => {
  var data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };
  return (
    <div style={{ height: '200px', width: '60%' }}>
      <Pie {...config} />
    </div>
  );
};

export default DemoPie;
```

## 空心圆可视化[API](https://charts.ant.design/zh-CN/demos/pie?type=api)

```tsx
import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const DemoPie: React.FC = () => {
  var data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: function formatter(v) {
          return ''.concat(v, ' \xA5');
        },
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      content: '{value}',
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ],
  };
  return (
    <div style={{ height: '200px', width: '60%' }}>
      <Pie {...config} />
    </div>
  );
};

export default DemoPie;
```

## 地图可视化

# 3.可视化图表的事件

## 监听点击事件

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { Line } from '@ant-design/charts';

const DemoLine: React.FC = () => {
  const data = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
  };

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      // 点击 point
      ref.current.on('element:click', (...args) => {
        console.log('参数：', ...args);
        alert('请打开控制台查看数据！');
      });
    }
  }, []);

  return (
    <div style={{ height: '200px', width: '60%' }}>
      <Line {...config} chartRef={ref} />
    </div>
  );
};

export default DemoLine;
```

##
