import React, { useEffect } from 'react';
// 动态添加class
import classnames from 'classnames';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import styles from './index.less';
import { pageNames, breadcrumb } from './page-config';
import type { Info } from './data';

// import { addRule } from '@/services/example/demo';

const demoInfo: Info = {
  title: 'Demo',
  content: '更多使用请查看 ProComponents 组件库',
};

// 调用接口
// const addDemo = async (data: any) => {
//   const res = await addRule(data);
//   console.log(res);
// };

// console.log(`=======${REACT_APP_ENV}`);
/**
 * Demo 页面
 */
const Demo: React.FC = () => {
  // props 获取属性
  //  const {  } = props;

  // state 定义变量

  // =============== hooks 区域===============
  useEffect(() => {
    // 页面挂载完触发（该hooks可以写多个）
    console.log('Demo页面挂载完成会触发 ( 第二参数是空[] 代表只调用一次)');
  }, []);

  // =============== function 区域===============

  // =============== handle 区域===============

  // =============== render 区域===============
  return (
    <PageContainer
      fixedHeader
      // 自定义页面的头部
      header={{
        title: pageNames[0],
        breadcrumb: breadcrumb(0),
      }}
    >
      <Card>
        <Typography.Text strong>
          {demoInfo.title}
          <span className={classnames(styles.demo)}>{'页面。  '}</span>
          <a
            href="https://procomponents.ant.design/components/page-container"
            rel="noopener noreferrer"
            target="__blank"
          >
            {demoInfo.content}
          </a>
        </Typography.Text>
      </Card>
    </PageContainer>
  );
  // return (
  //   <div>
  //     <Card>
  //       <Typography.Text strong>
  //         {demoInfo.title}
  //         <span className={classnames(styles.demo)}>{'页面。  '}</span>
  //         <a
  //           href="https://procomponents.ant.design/components/page-container"
  //           rel="noopener noreferrer"
  //           target="__blank"
  //         >
  //           {demoInfo.content}
  //         </a>
  //       </Typography.Text>
  //     </Card>
  //   </div>
  // );
};

export default Demo;
