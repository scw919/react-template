import { Button, Tag } from 'antd';
import ProList from '@ant-design/pro-list';
import type { ReactText } from 'react';
import { useState, useEffect } from 'react';
import { DeleteOutlined, LikeOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { breadcrumb, pageNames } from './page-config';

// 标题部分
const titleView = (title: string) => {
  return (
    <div>
      <span> {title} </span>
      <Tag color="#5BD8A6">标签一</Tag>
      <Tag color="#0000ff">标签二</Tag>
      <Tag color="#ff00ff">标签三</Tag>
    </div>
  );
};
// 副标题
// const subTitleView = () => {
//   return (
//     <div>

//     </div>
//   );
// };
// 描述
const descriptionView = () => {
  return (
    <div>
      <Tag>描述一</Tag>
      <Tag>描述二</Tag>
      <Tag>描述三</Tag>
    </div>
  );
};
// 操作
const actionsView = () => {
  return (
    <div style={{ width: '100%' }}>
      <Button type="text" icon={<LikeOutlined />}>
        喜欢(1233)
      </Button>
      <Button type="text" icon={<MessageOutlined />}>
        评论(99)
      </Button>
    </div>
  );
};
// 附加额外部分内容
// const extraView = () => {
//   return (
//     <img
//     width={272}
//     alt="logo"
//     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//   />
//   )
// }

// 主体内容
const contentView = () => {
  return (
    <div className="content">
      段落示意：蚂蚁金服设计平台
      design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
      design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    </div>
  );
};
// 数据
const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
].map((item) => ({
  // extra: extraView(),
  title: titleView(item),
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  // subTitle: subTitleView(),
  description: descriptionView(),
  content: contentView(),
  actions: [actionsView()],
}));

const PanelList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => {
      setSelectedRowKeys(keys);
    },
  };
  useEffect(() => {
    // console.log(selectedRowKeys);
  }, [selectedRowKeys]);

  return (
    <PageContainer
      className={styles['panel-list']}
      fixedHeader
      // 自定义页面的头部
      header={{
        title: pageNames[0],
        breadcrumb: breadcrumb(0),
      }}
    >
      <ProList<any>
        rowSelection={rowSelection}
        rowKey="key"
        itemLayout="vertical"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        metas={{
          extra: {},
          title: {},
          avatar: {},
          subTitle: {},
          description: {},
          content: {},
          actions: {},
        }}
        dataSource={data}
        toolBarRender={() => [
          <Button key="button" type="default" icon={<PlusOutlined />}>
            新建
          </Button>,
          <Button key="button" type="primary" icon={<DeleteOutlined />}>
            删除
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default PanelList;
