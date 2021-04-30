---
title: 富文本编辑器
nav:
  order: 0
group:
  title: 工具库
  order: 10
---

# wangEditor 介绍

English documentation

wangEditor —— 轻量级 web 富文本编辑器，配置方便，使用简单。

官网：[doc.wangEditor.com](www.wangEditor.com)

文档：[doc.wangEditor.com](doc.wangEditor.com)

源码：[github.com/wangeditor-team/wangEditor](github.com/wangeditor-team/wangEditor)

# 快速集成

```bash
npm i wangeditor --save
```

## wangEditor 快速使用

布局：

```html
<div id="div1">
  <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
</div>
```

快速创建编辑器：

```ts
import E from 'wangeditor';
const editor = new E('#div1');
// 或者 const editor = new E( document.getElementById('div1') )
editor.create();
```

## react 封装 wangEditor

```ts
/**
 * 组件模板
 */
import React, { memo, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
// 动态添加class
// import classnames from 'classnames';
import styles from './index.less';
import E from 'wangeditor';

// import type { CustomMenu } from './data.d';

// 组件接收的参数
export interface WangEditorProps {
  editorId: string;
  headerRender?: () => React.ReactDOM;
  footerRender?: () => React.ReactDOM;
  // 禁用编辑器
  disable?: boolean;
  // 内容长度
  txtLength?: number;
  // 默认回显的文件列表
  value?: string;
  // 配置参数
  config?: any;
  // 自定义菜单
  customMenu?: (e: any, ed: any) => void;
  // 每次上传完成都调用一次回调
  onChange?: (value: string) => void;
}
// 定义组件
const WangEditor: React.FC<WangEditorProps> = forwardRef((props, ref) => {
  // props 获取属性
  const {
    editorId = `${new Date().getTime()}`,
    value,
    headerRender,
    footerRender,
    onChange,
    disable = false,
    txtLength,
    config,
    customMenu,
  } = props;

  const [content, setContent] = useState<any>(value);
  const [editor, setEditor] = useState<any>(null);

  // 1.新建和销毁 editor 对象
  useEffect(() => {
    const e = new E(`#${editorId}`);
    setEditor(e);
    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor?.destroy();
    };
  }, []);

  // 2.初始化 editor 的配置
  useEffect(() => {
    if (!editor) return;
    // 1.导入编辑器配置参数
    if (config && Object.prototype.toString.call(config) === '[object Object]') {
      Object.keys(config).forEach((key) => {
        editor.config[key] = config[key];
      });
    }
    // 2.自定义菜单
    if (customMenu) customMenu(E, editor);
    // 3.禁止图片以base64保存
    editor.config.uploadImgShowBase64 = false;
    // 4.记录编辑器文本内容（单独抽取到下面的hooks中了）
    /** 5.一定要创建 */
    editor?.create();
    // 6.禁用编辑器
    if (disable) {
      editor.disable();
      // 添加遮罩层
      const editorEl = document.getElementById(editorId);
      if (editorEl) {
        const editorShade = document.createElement('div');
        // editorShade.className = 'editor-shade';
        editorShade.style.width = '100%';
        editorShade.style.height = '100%';
        editorShade.style.position = 'absolute';
        editorShade.style.left = '0';
        editorShade.style.top = '0';
        editorShade.style.backgroundColor = 'rgba(0,0,0,.3)';
        editorShade.style.zIndex = '10002';
        editorShade.style.cursor = 'no-drop';
        editorEl.appendChild(editorShade);
      }
    }
    // 7.初始化内容
    if (content) {
      editor.txt.html(content);
    }
  }, [editor]);

  // 3.专门处理富文本内容的变化
  useEffect(() => {
    if (!editor) return;

    // 实时显示文本长度
    let editorLen: HTMLDivElement;
    if (txtLength && txtLength !== 0) {
      const editorEl = document.getElementById(editorId);
      if (editorEl) {
        editorLen = document.createElement('div');
        editorLen.innerHTML = `<span>${editor?.txt.text().length}/${txtLength}</span>`;
        editorLen.style.position = 'absolute';
        editorLen.style.right = '6px';
        editorLen.style.bottom = '2px';
        editorLen.style.zIndex = '10002';
        editorEl.appendChild(editorLen);
      }
    }

    let recordHtml: string = '';
    editor.config.onchange = (newHtml: any) => {
      const newContent = editor?.txt.text();
      if (txtLength && txtLength !== 0) {
        editorLen.innerHTML = `<span>${editor?.txt.text().length}/${txtLength}</span>`;
      }
      // 限制文本长度
      if (txtLength && txtLength !== 0 && newContent?.length > txtLength) {
        editor.txt.clear();
        editor.txt.html(recordHtml);
      } else {
        recordHtml = newHtml;
      }

      setContent(recordHtml);
      if (onChange) {
        onChange(recordHtml);
      }
    };
  }, [editor]);

  /**
   * 4.专门暴露给外步的方法 hooks
   */
  useImperativeHandle(ref, () => ({
    getHtml1: () => {
      return content;
    },
    getHtml2: () => {
      return editor?.txt.html();
    },
    getText: () => {
      return editor?.txt.text();
    },
    // todo
  }));

  // =============== function 区域=============
  // =============== handle 区域===============
  // =============== render 区域===============
  return (
    <div className={styles['wang-editor']}>
      {headerRender?.()}
      <div id={editorId} className={styles['editor-main']}></div>
      {footerRender?.()}
    </div>
  );
});

// memo 是性能优化（浅层比较更新组件）
export default memo(WangEditor);
```

## wangEditor 实现自定义上传逻辑

```ts
import React from 'react';
import { WangEditor } from '@/basic-comps';
export default () => {
  const config: any = {
    menus: ['image', 'video'], //配置菜单
    customUploadImg: (resultFiles, insertImgFn) => {
      // 这里实现自定义上传图片逻辑
    },
    customUploadVideo: (resultFiles, insertVideoFn) => {
      // 这里实现自定义上传视频逻辑
    },
  };
  return (
    <div>
      <WangEditor editorId="liujunEdit" value={'test'} config={config}></WangEditor>
    </div>
  );
};
```

## wangEditor 实现图片上传

```ts
import React from 'react';
import { WangEditor } from '@/basic-comps';
export default () => {
  const config: any = {
    menus: ['image''], //配置菜单
    //showLinkImg: false,//隐藏插入网络图片
    customUploadImg: (resultFiles, insertImgFn) => {
      // resultFiles 是 input 中选中的文件列表
      console.log(resultFiles);
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      // 上传图片，返回结果，将图片插入到编辑器中
      //insertImgFn(imgUrl)
    },
  };
  return (
    <div>
      <WangEditor editorId="liujunEdit" value={'test'} config={config}></WangEditor>
    </div>
  );
};
```

## wangEditor 实现视频上传

```ts
import React from 'react';
import { WangEditor } from '@/basic-comps';
export default () => {
  const config: any = {
    menus: ['video'], //配置菜单
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

[wangEditor API 文档](http://localhost:8000/~docs/utils/5-wang-editor)
