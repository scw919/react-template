---
title: PreView
nav:
  order: 0
group:
  path: /basic-comps
  title: 基础组件
  order: 3
---

# PreView 弹框预览组件

目前只支持格式：pdf, jpg, jpeg, png,svg, mp4

```tsx
/**
 * background: '#f0f2f5'
 */
import React, { useState, useRef } from 'react';
import PreviewCom from './index.tsx';

const img = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
const pdf =
  'https://wjxm.hua-cloud.com.cn:5440/group1/M00/00/27/rBB5El4O53WAe5MBAEHDDVN8TKg510.pdf';
const mp4 = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

export default () => {
  const [picture, setPicture] = useState('');
  const comRef = useRef();
  const click = (data: string) => {
    setPicture(data);
    comRef.current.showModal();
  };
  return (
    <>
      <button onClick={() => click(img)}>预览图片</button>
      <button onClick={() => click(pdf)}>预览pdf</button>
      <button onClick={() => click(mp4)}>预览MP4</button>
      <PreviewCom picture={picture} ref={comRef} />
    </>
  );
};
```

### API

| 参数    | 说明         | 类型       | 默认值   |
| ------- | ------------ | ---------- | -------- |
| picture | 预览文件的值 | `string`   | -        |
| ref     | 绑定组件对象 | `useRef()` | useRef() |
