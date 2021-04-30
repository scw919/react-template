---
title: 导出excel
nav:
  order: 0
group:
  title: 工具库
  order: 10
---

# 导出 excel

通过插件`xlsx`实现导出 xlsx 文件

> 导出复杂的 xlsx 文件，推荐使用后端导出（例如：导出需要包含图片等等）

### 安装插件

```js
npm install xlsx --save;
// or
yarn add xlsx -D
```

### 引入插件

`import XLSX from 'xlsx';`

### 封装导出方法

```ts
import XLSX from 'xlsx';

const getColumnName = (columns: any, key: string) => {
  let name: any = '';
  Object.entries(columns).forEach(([c_key, value]) => {
    if (key === c_key) {
      name = value;
    }
  });
  return name;
};

// const columns = {
//   age: '年龄',
//   address: '住址',
//   name: '姓名',
//   time: '时间',
//   key: 'key',
//   description: '描述',
// };

// const dataSource = [
//   {
//     key: 1,
//     name: 'John Brown',
//     age: 11,
//     time: 1615946753720,
//     address: 'New York',
//     description: 'My name is John Brown, I am 12 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 2,
//     name: 'John Brown',
//     age: 12,
//     time: 1615946753720,
//     address: 'london',
//     description: 'My name is John Brown, I am 22 years old, living in New York No. 2 Lake Park.',
//   },
//   // ...
// ];

/**
 * 创建一个表格
 * @param {*} columns 表格的第一行列的名称
 * @param  {*} dataSource 表格的其它行
 * @param {*} fileName 表格名称
 * 导出成功返回true,失败返回false
 */
export const exportExcel = <T>(dataSource: any = [], columns: T = <T>{}, fileName?: string) => {
  /** Converts an array of arrays of JS data to a worksheet. */
  // const ws = XLSX.utils.aoa_to_sheet([columns, ...dataSources])  //把array转成sheet
  let newFileName = fileName;
  if (!newFileName) newFileName = new Date().getTime().toString();
  const newDataSource = [];
  for (let i = 0; i < dataSource.length; i += 1) {
    const ds = dataSource[i];
    const newObj = {};
    Object.keys(ds).forEach((key) => {
      const newKey = getColumnName(columns, key);
      newObj[newKey] = ds[key];
    });
    newDataSource.push(newObj);
  }

  try {
    const ws = XLSX.utils.json_to_sheet(newDataSource); // 把json转成sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // 添加一页excel:Sheet1
    /* generate file and send to client */
    XLSX.writeFile(wb, `${newFileName}.xlsx`);
    return true;
  } catch (err) {
    return false;
  }
};
```

### 代码演示

```tsx
import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { exportExcel } from '@/utils/export/export-excel';

type DataType = {
  age: number;
  address: string;
  name: string;
  time: number;
  key: number;
  description: string;
};

interface TableKeyType {
  age: string;
  address: string;
  name: string;
  time: string;
  key: string;
  description: string;
  [propName: string]: any;
}

const tableKey: TableKeyType = {
  age: '年龄',
  address: '住址',
  name: '姓名',
  time: '时间',
  key: 'key',
  description: '描述',
};

const columns: ProColumnType<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'time',
    dataIndex: 'time',
    valueType: 'date',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    valueType: 'select',
    filters: true,
    onFilter: true,
    valueEnum: {
      london: {
        text: '伦敦',
      },
      'New York': {
        text: '纽约',
      },
    },
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    valueType: 'option',
    render: () => [
      <a key="delete">Delete</a>,
      <a key="link" className="ant-dropdown-link">
        More actions <DownOutlined />
      </a>,
    ],
  },
];

const genData = (total: number) => {
  if (total < 1) {
    return [];
  }
  const data: DataType[] = [];
  for (let i = 1; i <= total; i += 1) {
    data.push({
      key: i,
      name: 'John Brown',
      age: i + 10,
      time: Date.now(),
      address: i % 2 === 0 ? 'london' : 'New York',
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }
  return data;
};

const initData = {
  bordered: true,
  loading: false,
  columns,
  pagination: {
    show: false,
    pageSize: 5,
    current: 1,
    total: 100,
  },
  size: 'small',
  expandable: false,
  headerTitle: '高级表格',
  tooltip: '高级表格 tooltip',
  showHeader: true,
  footer: true,
  rowSelection: {},
  scroll: false,
  hasData: true,
  tableLayout: undefined,
  toolBarRender: true,
  search: {
    show: false,
    span: 12,
    collapseRender: true,
    labelWidth: 80,
    filterType: 'query',
    layout: 'horizontal',
  },
  options: {
    // show: true,
    // density: true,
    // fullScreen: true,
    // setting: true,
  },
  export: true,
};

const DynamicSettings = () => {
  const [config] = useState<any>(initData);

  const tableColumns = (config.columns || columns)?.map((item: any) => ({
    ...item,
    ellipsis: config.ellipsis,
  }));
  const title: string = 'excel';
  const handleExportExcel = (tableData: any) => {
    exportExcel<TableKeyType>(tableData, tableKey, title);
  };
  return (
    <ProTable
      {...config}
      pagination={
        config.pagination?.show
          ? config.pagination
          : {
              pageSize: 5,
            }
      }
      search={config.search?.show ? config.search : {}}
      expandable={
        config.expandable && {
          expandedRowRender: (record: DataType) => <p>{record.description}</p>,
        }
      }
      options={config.options?.show ? config.options : false}
      toolBarRender={() => [
        config?.export && (
          <Button
            type="primary"
            onClick={() => {
              handleExportExcel(genData(10));
            }}
          >
            导出excel
          </Button>
        ),
        // config?.toolBarRender && <Button type="primary">刷新</Button>,
      ]}
      footer={config.footer ? () => 'Here is footer' : false}
      headerTitle={config.headerTitle}
      columns={tableColumns}
      dataSource={genData(config.pagination?.total || 10)}
      scroll={config.scroll}
    />
  );
};

export default DynamicSettings;
```

### exportExcel 返回值

| 参数 | 说明                            | 类型    | 默认值 |
| :--- | :------------------------------ | :------ | :----- |
| res  | 导出状态 false-失败； true-成功 | boolean | false  |

### exportExcel 参数

| 参数       | 说明                | 类型                       | 默认值                |
| :--------- | :------------------ | :------------------------- | :-------------------- |
| dataSource | 导出的列表数据      | any                        | []                    |
| columns    | 导出的 excel 表头   | {[propName: string]: any;} | {}                    |
| fileName   | 导出的 excel 的名称 | string                     | new Date().toString() |
