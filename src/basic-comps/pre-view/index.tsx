import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal } from 'antd';
import styles from './index.less';

interface Params {
  picture: string;
}
const PreviewCom: React.FC<Params> = forwardRef((props, comRef) => {
  const [visible, setVisible] = useState(false);
  const getFileType = (name: string) => {
    // console.log(name, '文件名字', typeof name)
    let fileType = '';
    // if (!Array.isArray(name)) {
    fileType = name.split('.')[name.split('.').length - 1].toLowerCase();
    // } else {

    // }
    return fileType;
  };
  const handleCancel = () => {
    setVisible(!visible);
  };
  const { picture } = props;
  // 父调用子方法
  useImperativeHandle(comRef, () => ({
    // showModal 就是暴露给父组件的方法
    showModal: handleCancel,
  }));
  return (
    <div className={styles['preview-protion']}>
      <Modal
        wrapClassName={'diy-preview'}
        title="预览文件"
        footer={null}
        visible={visible}
        width={893}
        bodyStyle={{
          height: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        onCancel={handleCancel}
      >
        {
          (['png', 'jpg', 'jpeg', 'svg'].indexOf(getFileType(picture)) > -1 && (
            // {
            // picture.map((item: string, index: number) => {
            //     return
            <img src={picture}></img>
          )) ||
            // <Image
            //     width={500}
            //     src={picture}
            // />
            // })
            // }
            (['pdf'].indexOf(getFileType(picture)) > -1 && (
              <embed src={picture} type="application/pdf" />
            )) ||
            // https://wjxm.hua-cloud.com.cn:5440/group1/M00/00/27/rBB5El4O53WAe5MBAEHDDVN8TKg510.pdf
            (['mp4'].indexOf(getFileType(picture)) > -1 && (
              <video src={picture} controls>
                您的浏览器不支持 video 标签。
              </video>
            ))
          // https://media.w3.org/2010/05/sintel/trailer.mp4
        }
      </Modal>
    </div>
  );
});

export default PreviewCom;
