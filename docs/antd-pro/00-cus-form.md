---
title: 自定义表单
nav:
  order: 0
group:
  title: AntdPro组件案例
  order: 5
---

# 自定义表单控件

`Antd`提供的表单控件有:`Input、InputNumber、Checkbox、DatePick、Cascader、Radio`等等。

在实际开发中，根据产品或者需求的要求，`Antd`提供的表单控件往往是不能完全瞒住开发的需求，这个时候就需要进行`自定义表单控件`。

其实自定义或第三方的表单控件，也可以与 `Form` 组件一起使用。只要该组件遵循以下的约定：

- 1.提供受控属性 `value` 或其它与 valuePropName 的值同名的属性。

- 2.提供 `onChange` 事件或 trigger 的值同名的事件。

## 1.自定义价格输入表单控件

```tsx
import React from 'react';
import { InputPrice } from '@/basic-comps';
import { Typography, Form, Input } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

export default () => {
  const onFinish = (valuse) => {
    console.log(valuse);
  };
  return (
    <ProForm layout={'vertical'} onFinish={onFinish}>
      <Form.Item name="name" label="商品">
        <Input />
      </Form.Item>
      <Form.Item name="price" label="自定义价格表单组件">
        <InputPrice />
      </Form.Item>
    </ProForm>
  );
};
```

`InputPrice` 自定义表单组件实现方式：

> 与`Form` 组件一起使用，遵循以下的约定：

- 1.提供受控属性 `value` 或其它与 valuePropName 的值同名的属性。

- 2.提供 `onChange` 事件或 trigger 的值同名的事件。

```ts
/**
 * 自定义表单组件的案例
 */
import React, { memo, useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;
export type Currency = 'rmb' | 'dollar';
export interface PriceValue {
  number?: number;
  currency?: Currency;
}
/**
 * 自定义表单组件必须是这两个参数
 * value: { number:'',  currency:''}
 * onChange: ()=>{}
 */
export interface InputPriceProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

// 定义组件
const InputPrice: React.FC<InputPriceProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState<Currency>('rmb');

  const triggerChange = (changedValue: { number?: number; currency?: Currency }) => {
    onChange?.({ number, currency, ...value, ...changedValue });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  const onCurrencyChange = (newCurrency: Currency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };
  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: 100 }}
      />
      <Select
        value={value.currency || currency}
        style={{ width: 80, margin: '0 8px' }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};
export default memo(InputPrice);
```

## 2.自定义上传文件表单控件

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { Upload } from '@/basic-comps';
import { Typography, Form } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

export default () => {
  const onFinish = (valuse) => {
    console.log(valuse);
  };
  return (
    <ProForm layout={'vertical'} onFinish={onFinish}>
      <ProFormText name="name" label="名称" />
      <Form.Item name="uploadFile" label="自定义上传表单组件">
        <Upload
          // 发到后台的文件参数名
          name="file"
          isInFormItem={true}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          headers={{
            authorization: 'authorization-text',
          }}
          listType="picture"
        />
      </Form.Item>
    </ProForm>
  );
};
```

`Upload` 自定义表单组件实现方式：

> 与`Form` 组件一起使用，遵循以下的约定：

- 1.提供受控属性 `value` 或其它与 valuePropName 的值同名的属性。

- 2.提供 `onChange` 事件或 trigger 的值同名的事件。

```ts
import React, { memo, forwardRef } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/lib/upload';

export type BaseUploadProps = UploadProps & {
  className?: any;
  buttonName?: string;
  buttonIcon?: () => React.ReactNode;
  isUpload?: boolean; // 是否是可以上传
  isInFormItem?: boolean; // 是否在表单组件内,如果是，一定要设为 true，不然会报错，为true提交表单会自动拿到上传文件的数据。默认为false
  uploadButtonRender?: () => React.ReactNode;
  value?: UploadProps['fileList'];
  onChange?: (info: any | []) => void; // info 有可能是对象，也有可能是数组
};

// 定义组件
const UploadFile: React.FC<BaseUploadProps> = forwardRef((props, ref) => {
  const {
    className,
    buttonName,
    uploadButtonRender,
    isUpload = true,
    isInFormItem = false,
    // 定义 value 和 onChange props 就是 自定义表单组件的规范。
    value,
    onChange,
    ...rest // 剩余没有解构出来的参数
  } = props;

  const getUploadButtonRender = () => {
    return uploadButtonRender ? (
      uploadButtonRender()
    ) : (
      <Button icon={buttonIcon ? buttonIcon() : <UploadOutlined />}>
        {buttonName || 'Upload'}
      </Button>
    );
  };
  return (
    <>
      <Upload
        ref={ref}
        {...rest}
        fileList={value}
        onChange={(info) => {
          if (isInFormItem) {
            onChange?.(info.fileList);
          } else {
            onChange?.(info);
          }
        }}
        className={className}
      >
        {isUpload ? getUploadButtonRender() : ''}
      </Upload>
    </>
  );
});

export default memo(UploadFile);
```

## 3.自定义富文本表单控件

```tsx
/**
 * 组件模板
 */
import React from 'react';
import { WangEditor } from '@/basic-comps';
import { Form } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

export default () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <ProForm layout={'vertical'} onFinish={onFinish}>
      <ProFormText name="name" label="名称" />
      <Form.Item name="content" label="自定义富文本">
        <WangEditor editorId="liujunEdit"></WangEditor>
      </Form.Item>
    </ProForm>
  );
};
```

`WangEditor` 自定义表单组件实现方式：

> 与`Form` 组件一起使用，遵循以下的约定：

- 1.提供受控属性 `value` 或其它与 valuePropName 的值同名的属性。

- 2.提供 `onChange` 事件或 trigger 的值同名的事件。

```ts
import React, { memo, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import E from 'wangeditor';

export interface WangEditorProps {
  editorId: string;
  headerRender?: () => React.ReactDOM;
  footerRender?: () => React.ReactDOM;
  // 默认回显的文件列表
  value?: string;
  // 每次上传完成都调用一次回调
  onChange?: (value: string) => void;
}
let editor: any = null;

const WangEditor: React.FC<WangEditorProps> = forwardRef((props, ref) => {
  // props 获取属性
  const {
    editorId = `${new Date().getTime()}`,
    value,
    headerRender,
    footerRender,
    onChange,
  } = props;
  const [content, setContent] = useState<any>(value);

  useEffect(() => {
    // 注：class写法需要在componentDidMount 创建编辑器
    editor = new E(`#${editorId}`);
    editor.config.onchange = (newHtml: any) => {
      setContent(newHtml);
      if (onChange) {
        onChange(newHtml);
      }
    };
    /** 一定要创建 */
    editor?.create();
    if (content) {
      editor.txt.html(content);
    }
    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor?.destroy();
    };
  }, []);

  /**
   * 专门暴露给外步的方法 hooks
   */
  useImperativeHandle(ref, () => ({
    getHtml1: () => {
      return content;
    },
    getHtml2: () => {
      return editor.txt.html();
    },
    getText: () => {
      return editor.txt.text();
    },
  }));

  return (
    <div>
      {headerRender?.()}
      <div id={editorId}></div>
      {footerRender?.()}
    </div>
  );
});

export default memo(WangEditor);
```
