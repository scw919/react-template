/**
 * 组件模板
 */
import React, { memo, forwardRef } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/lib/upload';
// import { UploadFile } from 'antd/lib/upload/interface';
// import type { UploadListType } from 'antd/lib/upload/interface';

// import styles from './index.less';

export type BaseUploadProps = UploadProps & {
  // icon?: React.ReactNode;
  // action?: UploadProps['action'];
  className?: any;
  buttonName?: string;
  buttonIcon?: () => React.ReactNode;
  isUpload?: boolean; // 是否是可以上传
  isInFormItem?: boolean; // 是否在表单组件内,如果是，一定要设为 true，不然会报错，为true提交表单会自动拿到上传文件的数据。默认为false

  uploadButtonRender?: () => React.ReactNode;

  // 默认回显的文件列表
  value?: UploadProps['fileList'];
  // 每次上传完成都调用一次回调
  // onChange?: UploadProps['onChange'];
  onChange?: (info: any | []) => void; // info 有可能是对象，也有可能是数组
};

// const beforeUploadFun = (file: any, fileList: any) => {
//   console.log(file, fileList);
// };

// 定义组件
const UploadFile: React.FC<BaseUploadProps> = forwardRef((props, ref) => {
  const {
    className, // 样式名
    buttonName, // 按钮名称
    buttonIcon, // 自定义图标
    uploadButtonRender, // 自定义按钮
    isUpload = true, // 使用状态
    isInFormItem = false,
    value,
    onChange,
    ...rest // 剩余没有解构出来的参数
  } = props;

  const getUploadButtonRender = () => {
    // 获取按钮显示的内容
    return uploadButtonRender ? (
      uploadButtonRender()
    ) : (
      <Button icon={buttonIcon ? buttonIcon() : <UploadOutlined />}>
        {buttonName || 'Upload'}
      </Button>
    );
  };
  // =============== render 区域===============
  return (
    <>
      <Upload
        ref={ref}
        //  如果rest 里面有fileList， 下面又定义了fileList ，会用下面定义的fileList
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

// memo 是性能优化（浅层比较更新组件）
export default memo(UploadFile);
