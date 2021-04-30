---
title: WangEditor
nav:
  order: 0
group:
  path: /basic-comps
  title: 基础组件
  order: 3
---

## WangEditor 组件简单使用

> `WangEditor` 是一个标准的自定义表单组件

#### 1、这个组件是一个 `WangEditor` 使用案例

```tsx
/**
 * 组件模板
 */
import React, { useRef, useState } from 'react';
import { WangEditor } from '@/basic-comps';
export default () => {
  const editRef = useRef(null);
  const [content, setContent] = useState('');
  const getHtml1 = () => {
    setContent(editRef.current.getHtml1());
  };
  const getHtml2 = () => {
    setContent(editRef.current.getHtml2());
  };
  const getText = () => {
    setContent(editRef.current.getText());
  };
  return (
    <div>
      <WangEditor ref={editRef} editorId="liujunEdit" value={'test'}></WangEditor>
      内容:{content}
      <div></div>
      <button onClick={getHtml1}>获取html方式一</button>
      <button onClick={getHtml2}>获取html方式二</button>
      <button onClick={getText}>获取text</button>
    </div>
  );
};
```

#### 2、禁用编辑器

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { WangEditor } from '@/basic-comps';
export default () => {
  const config: any = {
    height: 60, //配置高度
  };
  return (
    <div>
      <WangEditor editorId="liujunEdit2" value={'test'} disable={true} config={config}></WangEditor>
    </div>
  );
};
```

#### 3、限制文本的长度

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { WangEditor } from '@/basic-comps';
export default () => {
  const config: any = {
    height: 60, //配置高度
  };
  return (
    <div>
      <WangEditor editorId="liujunEdit3" value={'test'} txtLength={10} config={config}></WangEditor>
    </div>
  );
};
```

#### 4、编辑器各种配置

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { WangEditor } from '@/basic-comps';
export default () => {
  const config: any = {
    height: 60, //配置高度
    menus: ['bold', 'head', 'link', 'italic', 'underline', 'foreColor', 'backColor'], //配置菜单
    colors: ['#000000', '#eeece0', '#1c487f', '#4d80bf'], //配置字体颜色
    uploadImgServer: '/upload-img', // 上传图片配置 server 接口地址
    //....其它配置
  };
  return (
    <div>
      <WangEditor editorId="liujunEdit4" value={'test'} config={config}></WangEditor>
    </div>
  );
};
```

#### 5、自定义上传图片和视屏

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { WangEditor } from '@/basic-comps';
export default () => {
  const config: any = {
    menus: ['image', 'video'], //配置菜单
    //showLinkImg: false,//隐藏插入网络图片
    customUploadImg: (resultFiles, insertImgFn) => {
      // resultFiles 是 input 中选中的文件列表
      console.log(resultFiles);
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      // 上传图片，返回结果，将图片插入到编辑器中
      //insertImgFn(imgUrl)
    },
    //showLinkVideo: false, //隐藏插入网络视频，保留上传本地视频
    customUploadVideo: (resultFiles, insertVideoFn) => {
      // resultFiles 是 input 中选中的文件列表
      console.log(resultFiles);
      // insertVideoFn 是获取视频 url 后，插入到编辑器的方法
      // 上传视频，返回结果，将视频地址插入到编辑器中
      //insertVideoFn(videoUrl)
    },
  };
  return (
    <div>
      <WangEditor editorId="liujunEdit5" value={'test'} config={config}></WangEditor>
    </div>
  );
};
```

#### 6、自定义菜单

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { WangEditor } from '@/basic-comps';
// import type { CustomMenu } from './data.d';
export default () => {
  const config: any = {
    height: 60,
    menus: ['bold', 'head', 'link', 'italic', 'underline'], //配置菜单
  };
  const customMenu = (E, editor) => {
    console.log(E, editor);
    // 获取必要的变量，这些在下文中都会用到
    const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;
    // 第一，菜单 class ，Button 菜单继承 BtnMenu class
    class AlertMenu extends BtnMenu {
      constructor(editor) {
        // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
        const $elem = E.$(
          `<div class="w-e-menu" data-title="Alert">
                    <button>alert</button>
                </div>`,
        );
        super($elem, editor);
      }
      // 菜单点击事件
      clickHandler() {
        // 做任何你想做的事情
        // 可参考【常用 API】文档，来操作编辑器
        alert('hello world');
      }
      // 菜单是否被激活（如果不需要，这个函数可以空着）
      // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
      // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
      tryChangeActive() {
        // 激活菜单
        // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
        // 2. this.this.isActive === true
        this.active();
        // // 取消激活菜单
        // // 1. 菜单 DOM 节点会删掉 .w-e-active
        // // 2. this.this.isActive === false
        // this.unActive()
      }
    }
    // 菜单 key ，各个菜单不能重复
    const menuKey = 'alertMenuKey';

    //注册菜单
    // 全局注册
    // E.registerMenu(menuKey, AlertMenu);

    // 示例注册
    editor.menus.extend(menuKey, AlertMenu);
    editor.config.menus = editor.config.menus.concat(menuKey);
  };
  return (
    <div>
      <WangEditor
        editorId="liujunEdit6"
        value={'test'}
        config={config}
        customMenu={customMenu}
      ></WangEditor>
    </div>
  );
};
```

## Example API

| 参数       | 说明                                                      | 类型       | 默认值 |
| ---------- | --------------------------------------------------------- | ---------- | ------ |
| editorId   | id                                                        | `string`   | 时间戳 |
| disable    | 禁用编辑器                                                | `boolean`  | false  |
| txtLength  | 文本内容长度                                              | `number`   | -      |
| config     | 参数配置，更多参数配置请参考(https://doc.wangeditor.com/) | `any`      | -      |
| customMenu | 自定义菜单                                                | `fucntion` | -      |

> 更多参数请参考(https://doc.wangeditor.com/)
