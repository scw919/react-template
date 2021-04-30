import React from 'react';
import LineChart from './components/LineChart';
import ColumnChart from './components/ColumnChart';
import { pageNames, breadcrumb } from './page-config';
import { PageContainer } from '@ant-design/pro-layout';
// import Map from './components/Map';

const ChartList: React.FC = () => {
  return (
    <PageContainer
      fixedHeader
      // 自定义页面的头部
      header={{
        title: pageNames[0],
        breadcrumb: breadcrumb(0),
      }}
    >
      <div style={{ width: '100%', background: '#fff', padding: '30px' }}>
        <p>折线图</p>
        <LineChart />
        <br />

        <p>柱状图</p>
        <ColumnChart />

        <br />
        {/* <p>地图</p>
      <Map /> */}
      </div>
    </PageContainer>
  );
};
export default ChartList;
