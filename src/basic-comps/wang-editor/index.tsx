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
