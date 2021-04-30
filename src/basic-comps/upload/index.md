---
title: Upload
nav:
  order: 0
group:
  path: /basic-comps
  title: 基础组件
  order: 3
---

## 上传文件组件

> `Upload` 是一个标准的自定义表单组件

1.上传文件（有上传按钮）

写个上传文件的案例 例如:如何统一添加请求头：token

2.回显上传文件（没有上传按钮，没有删除按钮）

3.修改上传按钮的文字和图标

4.预览列表支持文件预览，下载，删除（列表的 icon 根据扩展名自动识别） 预览可以使用一个对话框专门来实现 点击删除最后是可以取消网络请求，做不到也无所谓

5.预览列表可以控制显示的列表数

6.支持自定义上传按钮

7.支持自定义上传的逻辑

8.支持自定义预览列表

9.上传完成的监听（需要拿到上传的所有图片数组）

默认还支持 [antd upload](https://ant.design/components/upload-cn/#API) 组件所有的属性 .....

#### 1.默认上传案例

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { Upload } from '@/basic-comps';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export default () => {
  return (
    <>
      <Upload
        name="file"
        accept=".jpg,.zip,.doc,.wps"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        headers={{
          authorization: 'authorization-text',
        }}
        onChange={(info) => {
          console.log(info);
        }}
        listType="picture"
        className="upload-list-inline"
      />
    </>
  );
};
```

#### 2.重写自定义上传逻辑案例

```tsx
/**
 * 组件模板
 */
import React, { useState, useRef } from 'react';
import { Upload } from '@/basic-comps';
import { Button } from 'antd';
import { UpOutlined, DownloadOutlined } from '@ant-design/icons';
import PreviewCom from '../pre-view/index.tsx';
import { httpPost } from '@/http';

const fileList = [
  {
    uid: '-1',
    name: 'antd专属模特.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

const customRequest = async (file) => {
  // 自定义上传逻辑
  console.log(file);
  const formData = new FormData();
  formData.append('file', file);
  const res = await httpGet('https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
      token: 'asdfsf', // token 不能有中文
    },
  });
  console.log(res);
};

export default () => {
  const [picture, setPicture] = useState('');
  const comRef = useRef();
  const onPreview = (data: string) => {
    setPicture(data);
    comRef.current.showModal();
  };
  return (
    <>
      <Upload
        listType="picture"
        value={fileList}
        customRequest={customRequest}
        onChange={(info) => {
          console.log(info);
        }}
        onPreview={(file) => {
          console.log('预览', file);
          onPreview(file.url);
        }}
        onRemove={(file) => {
          console.log('刪除', file);
          //return false;
        }}
      />
      <PreviewCom picture={picture} ref={comRef} />
    </>
  );
};
```

#### 3.查看回显代码演示

```tsx
/**
 * 组件模板
 */
import React, { useState, useRef } from 'react';
import { Upload } from '@/basic-comps';
import PreviewCom from '../pre-view/index.tsx';

import './index.less';

const fileList = [
  {
    uid: '-1',
    name: 'antd专属模特.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'antd专属模特2.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

export default () => {
  const [picture, setPicture] = useState('');
  const comRef = useRef();
  const onPreview = (data: string) => {
    setPicture(data);
    comRef.current.showModal();
  };

  return (
    <>
      <p>
        <b>演示一</b>
      </p>
      <>
        <Upload
          isUpload={false}
          listType="picture"
          value={fileList}
          showUploadList={{
            showRemoveIcon: false, // 控制删除图标
            showDownloadIcon: true, // 控制下载图标
          }}
          onChange={(info) => {
            console.log(info);
          }}
          onDownload={(file) => {
            console.log('下载', file);
          }}
          onPreview={(file) => {
            console.log('预览', file);
            onPreview(file.url);
          }}
        />
      </>
      <br />
      <br />
      <p>
        <b>演示二</b>
      </p>
      <>
        <Upload
          isUpload={false}
          listType="picture"
          value={fileList}
          showUploadList={{
            showRemoveIcon: false, // 控制删除图标
            showDownloadIcon: true, // 控制下载图标
          }}
          onChange={(info) => {
            console.log(info);
          }}
          onDownload={(file) => {
            console.log('下载', file);
          }}
          onPreview={(file) => {
            console.log('预览', file);
            onPreview(file.url);
          }}
          className="upload-list-inline"
        />
      </>
      <PreviewCom picture={picture} ref={comRef} />
    </>
  );
};
```

#### 4.自定义上传按钮

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { Upload } from '@/basic-comps';
import { Button } from 'antd';
import { UpOutlined, ArrowUpOutlined } from '@ant-design/icons';

export default () => {
  return (
    <>
      <Upload
        buttonName="上传"
        buttonIcon={() => {
          return <UpOutlined />;
        }}
        listType="picture"
      />
      <br />
      <Upload
        uploadButtonRender={() => {
          return (
            <Button type="primary" icon={<ArrowUpOutlined />}>
              上传文件
            </Button>
          );
        }}
        listType="picture"
      />
    </>
  );
};
```

#### 5.自定义预览列表

```tsx
/**
 * 组件模板
 */
import React, { useState, useRef } from 'react';
import { Upload } from '@/basic-comps';
import { Card } from 'antd';
import { DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import PreviewCom from '../pre-view/index.tsx';
const fileList = [
  {
    uid: '-1',
    name: 'antd专属模特.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'antd专属模特2.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'antd专属模特3.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-4',
    name: 'antd专属模特4.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

export default () => {
  const [picture, setPicture] = useState('');
  const comRef = useRef();
  const onPreview = (data: string) => {
    setPicture(data);
    comRef.current.showModal();
  };
  return (
    <>
      <Upload
        isUpload={false}
        listType="picture"
        value={fileList}
        itemRender={(originNode, file, fileList) => {
          console.log(originNode, file, fileList);
          return (
            <Card
              size="small"
              title={file.name}
              extra={
                <CloseOutlined
                  onClick={() => {
                    console.log('刪除', file);
                    alert('刪除' + file);
                  }}
                />
              }
              style={{ width: 300, marginTop: 20, cursor: 'pointer' }}
            >
              <img
                src={file.url}
                width="100%"
                onClick={() => {
                  onPreview(file.url);
                }}
              />
            </Card>
          );
        }}
        className="upload-item-render"
      />
      <PreviewCom picture={picture} ref={comRef} />
    </>
  );
};
```

## Upload API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isUpload | 使用状态,上传状态：true,查看状态：false,查看状态不显示上传按钮 | `boolean` | true |
| buttonName | 按钮名称 | `string` | - |
| buttonIcon | 按钮图标,返回自定义图标覆盖默认的图标 | `function` | - |
| uploadButtonRender | 自定义按钮，覆盖默认按钮，设置自定义按钮 buttonName、buttonIcon 失效 ， | `function` | - |
| className | 样式，可添加类名，也可添加导入的类名参数 | `any` | - |

> 更多参数参考[ant.desigin](https://ant.design/components/upload-cn/#API)API 文档
