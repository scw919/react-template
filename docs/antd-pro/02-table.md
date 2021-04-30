---
title: 高级表格
nav:
  order: 0
group:
  title: AntdPro组件案例
  order: 5
---

## 1.默认的使用

高级检索中包含：一个基本输入框，一个下拉选着框，一个 `radio` 选择框，一个 `checkbox` 选择框，一个时间范围选择框

```tsx
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

// 标签复选框选项
const tagEnum = {
  bug: { text: 'bug', status: 'error' },
  question: { text: 'question', status: 'Processing' },
};

// locked筛选条件枚举
const lockedEnum = {
  true: { text: 'true', status: 'Success' },
  false: { text: 'false', status: 'Processing' },
};

// 状态筛选条件枚举
const stausEnum = {
  all: { text: '全部', status: 'Default' },
  running: { text: '运行中', status: 'Processing' },
  online: { text: '已上线', status: 'Success' },
  error: { text: '异常', status: 'Error' },
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: stausEnum,
  },
  {
    title: '标签',
    dataIndex: 'labels',
    valueType: 'checkbox',
    valueEnum: tagEnum,
    search: {
      transform: (value) => {
        console.log(value, 'labels');
        return {
          labels: value?.join(','),
        };
      },
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'locked',
    dataIndex: 'locked',
    valueType: 'radio',
    // width: 100,
    valueEnum: lockedEnum,
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}) => {
        console.log(params);
        return request('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          console.log(values);
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
              labels: values.labels?.split(','),
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
};
```

## 2.高级检索数据的回填（不能重置）

表单查询的回填使用 `ProTable` 组件的 `form` 属性，通过设置 `initialValues` 回填默认查询参数, 参考 [antd form](https://ant.design/components/form-cn/#API) 的配置

```ts
<ProTable
  // ...
  form={{
    initialValues: {
      title: '标题回填',
      state: 'online',
      labels: ['question'],
      locked: false,
      created_at: ['2020-05-26', '2020-05-27'],
    },
  }}
  // ...
/>
```

```tsx
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

// 标签复选框选项
const tagEnum = {
  bug: { text: 'bug', status: 'error' },
  question: { text: 'question', status: 'Processing' },
};

// locked筛选条件枚举
const lockedOptions = [
  {
    label: 'true',
    value: true,
  },
  {
    label: 'false',
    value: false,
  },
];

// 状态筛选条件枚举
const stausEnum = {
  all: { text: '全部', status: 'Default' },
  running: { text: '运行中', status: 'Processing' },
  online: { text: '已上线', status: 'Success' },
  error: { text: '异常', status: 'Error' },
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    // initialValue: '标题回填',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: stausEnum,
  },
  {
    title: '标签',
    dataIndex: 'labels',
    valueType: 'checkbox',
    valueEnum: tagEnum,
    search: {
      transform: (value) => {
        console.log(value, 'labels');
        return {
          labels: value?.join(','),
        };
      },
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'locked',
    dataIndex: 'locked',
    valueType: 'radio',
    // width: 100,
    // valueEnum: lockedEnum,
    fieldProps: {
      options: lockedOptions,
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}) => {
        console.log(params);
        return request('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        defaultCollapsed: false,
        labelWidth: 'auto',
      }}
      form={{
        initialValues: {
          title: '标题回填',
          state: 'online',
          labels: ['question'],
          locked: false,
          created_at: ['2020-05-26', '2020-05-27'],
        },
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          console.log(values);
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
              labels: values.labels?.split(','),
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
};
```

## 2.高级检索数据的回填（能重置）

## 3.高级检索下拉框支持远程/本地搜索

下拉框的远程搜索需要使用自定义 `valueType` 去实现, 详情查阅[文档](https://procomponents.ant.design/components/table#%E8%87%AA%E5%AE%9A%E4%B9%89-valuetype)  
`ProFormSelect` 组件的使用请查看[文档](https://procomponents.ant.design/components/field-set#proformselect)

```ts
<ProProvider.Provider
  value={{
    ...values,
    valueTypeMap: {
      // 自定义valueType
      link: {
        render: (text) => text, // 列表数据渲染
        renderFormItem: (
          text,
          props, // 查询表单项自定义
        ) => (
          <ProFormSelect
            name="creator"
            {...props?.fieldProps}
            showSearch
            filterOption={false}
            request={requestOptions}
            placeholder="Please select a name"
          />
        ),
      },
    },
  }}
>
  <ProTable<GithubIssueItem, Record<string, any>, 'link'>
  // ...
  />
</ProProvider.Provider>
```

配置完成后查看示例中查询表单项 **创建者** 即可支持远程搜索，效果如下：

```tsx
import React, { useRef, useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormSelect } from '@ant-design/pro-form';
import ProProvider from '@ant-design/pro-provider';
import Mock from 'mockjs';

type GithubIssueItem = {
  key: number;
  name: string;
  labels: string[];
  containers: number;
  status: string;
  creator: string;
  createdAt: number;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const requestOptions = async ({ keyWords }: any) => {
  console.log(keyWords);
  await waitTime(1000);
  const data = [
    { label: '付小小', value: '付小小' },
    { label: '曲丽丽', value: '曲丽丽' },
    { label: '林东东', value: '林东东' },
    { label: '陈帅帅', value: '陈帅帅' },
    { label: '兼某某', value: '兼某某' },
  ];
  return Mock.mock({
    'data|1-10': [
      {
        value: '@id',
        label: '@name',
      },
    ],
  }).data.concat(data);
};

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const tableListDataSource: GithubIssueItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    labels: creators.slice(Math.floor(Math.random() * creators.length)),
    containers: Math.floor(Math.random() * 20),
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<GithubIssueItem, 'link'>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueType: 'link',
  },
  {
    title: '成员',
    dataIndex: 'labels',
    valueType: 'checkbox',
    valueEnum: {
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
    render: (_, record) => (
      <Space>
        {record.labels.map((name) => (
          <Tag key={name}>{name}</Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    hideInSearch: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '待发布', status: 'Default' },
      running: { text: '发布中', status: 'Processing' },
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInTable: true,
    valueType: 'radio',
    valueEnum: {
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, record) => [
      record.status === 'close' && <a key="link">发布</a>,
      (record.status === 'running' || record.status === 'online') && <a key="warn">停用</a>,
      record.status === 'error' && <a key="republish">重新发布</a>,
      <a
        key="republish"
        style={
          record.status === 'running'
            ? {
                color: 'rgba(0,0,0,.25)',
                cursor: 'not-allowed',
              }
            : {}
        }
      >
        监控
      </a>,
    ],
  },
];

export default () => {
  const values = useContext(ProProvider);
  const actionRef = useRef<ActionType>();
  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: {
          // 自定义valueType
          link: {
            render: (text) => text, // 列表数据渲染
            renderFormItem: (
              text,
              props, // 查询表单项自定义
            ) => (
              <ProFormSelect
                name="creator"
                {...props?.fieldProps}
                showSearch
                filterOption={false}
                request={requestOptions}
                placeholder="Please select a name"
              />
            ),
          },
        },
      }}
    >
      <ProTable<GithubIssueItem, Record<string, any>, 'link'>
        columns={columns}
        actionRef={actionRef}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (searchValues, type) => {
            console.log(searchValues);
            if (type === 'get') {
              return {
                ...searchValues,
                created_at: [searchValues.startTime, searchValues.endTime],
              };
            }
            return searchValues;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </ProProvider.Provider>
  );
};
```

## 4.自定义-高级检索的 item

当内置的表单项无法满足我们的基本需求，这时候我们就需要来自定义一下默认的组件，我们可以通过 `fieldProps` 和 `renderFormItem` 配合来使用。  
`fieldProps` 可以把 `props` 透传，可以设置 `select` 的样式和多选等问题。  
`renderFormItem` 可以完成重写渲染逻辑，传入 `item` 和 `props` 来进行渲染，需要注意的是我们必须要将 `props` 中的 `value` 和 `onChange` 必须要被赋值，否则 `form` 无法拿到参数。

> 也可通过自定义 `valueType` 实现， 如示例 [3. 高级检索下拉框支持远程搜索](#3高级检索下拉框支持远程搜索)

```ts
renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return <Input {...fieldProps} placeholder="请输入test" />;
  }
  return defaultRender(_);
};
```

`renderFormItem` 的定义, 具体的值可以打开控制台查看。

```ts
renderFormItem?: (
    item: ProColumns<T>,
    config: {
      value?: any;
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;
```

## 5.自定义-表格头某一列布局

自定义表格头可通过修改 `columns` 配置中的 `title` 属性实现， 详细配置查阅 [Columns 列定义](https://procomponents.ant.design/components/table#columns-%E5%88%97%E5%AE%9A%E4%B9%89)

```ts
[
  {
    title: (
      <>
        应用名称
        <Tooltip placement="top" title="这是一段自定义描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    // ...
  },
];
```

> 只设置一个当前列的 `title` 表单项和表头都会展示自定义 `title`  
> 如果做区分需要单独设置查询表单和表格头的 `title`  
> 表单项和表格头区分：

```ts
  {
    title: (
      <>
        创建者
        <Tooltip placement="top" title="这是一段自定义描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    dataIndex: 'creator',
    valueType: 'link',
    hideInSearch: true,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueType: 'link',
    hideInTable: true
  },
```

```tsx
import React, { useRef, useContext } from 'react';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Tooltip } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormSelect } from '@ant-design/pro-form';
import ProProvider from '@ant-design/pro-provider';
import Mock from 'mockjs';

type GithubIssueItem = {
  key: number;
  name: string;
  labels: string[];
  containers: number;
  status: string;
  creator: string;
  createdAt: number;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const requestOptions = async ({ keyWords }: any) => {
  console.log(keyWords);
  await waitTime(1000);
  const data = [
    { label: '付小小', value: '付小小' },
    { label: '曲丽丽', value: '曲丽丽' },
    { label: '林东东', value: '林东东' },
    { label: '陈帅帅', value: '陈帅帅' },
    { label: '兼某某', value: '兼某某' },
  ];
  return Mock.mock({
    'data|1-10': [
      {
        value: '@id',
        label: '@name',
      },
    ],
  }).data.concat(data);
};

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const tableListDataSource: GithubIssueItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    labels: creators.slice(Math.floor(Math.random() * creators.length)),
    containers: Math.floor(Math.random() * 20),
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<GithubIssueItem, 'link'>[] = [
  {
    title: (
      <>
        应用名称
        <Tooltip placement="top" title="这是一段自定义描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: (
      <>
        创建者
        <Tooltip placement="top" title="这是一段自定义描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    dataIndex: 'creator',
    valueType: 'link',
    hideInSearch: true,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueType: 'link',
    hideInTable: true,
  },
  {
    title: '成员',
    dataIndex: 'labels',
    valueType: 'checkbox',
    valueEnum: {
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
    render: (_, record) => (
      <Space>
        {record.labels.map((name) => (
          <Tag key={name}>{name}</Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    hideInSearch: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '待发布', status: 'Default' },
      running: { text: '发布中', status: 'Processing' },
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInTable: true,
    valueType: 'radio',
    valueEnum: {
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, record) => [
      record.status === 'close' && <a key="link">发布</a>,
      (record.status === 'running' || record.status === 'online') && <a key="warn">停用</a>,
      record.status === 'error' && <a key="republish">重新发布</a>,
      <a
        key="republish"
        style={
          record.status === 'running'
            ? {
                color: 'rgba(0,0,0,.25)',
                cursor: 'not-allowed',
              }
            : {}
        }
      >
        监控
      </a>,
    ],
  },
];

export default () => {
  const values = useContext(ProProvider);
  const actionRef = useRef<ActionType>();
  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: {
          // 自定义valueType
          link: {
            render: (text) => text, // 列表数据渲染
            renderFormItem: (
              text,
              props, // 查询表单项自定义
            ) => (
              <ProFormSelect
                name="creator"
                {...props?.fieldProps}
                showSearch
                filterOption={false}
                request={requestOptions}
                placeholder="Please select a name"
              />
            ),
          },
        },
      }}
    >
      <ProTable<GithubIssueItem, Record<string, any>, 'link'>
        columns={columns}
        actionRef={actionRef}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (searchValues, type) => {
            console.log(searchValues);
            if (type === 'get') {
              return {
                ...searchValues,
                created_at: [searchValues.startTime, searchValues.endTime],
              };
            }
            return searchValues;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </ProProvider.Provider>
  );
};
```

## 6.自定义-表格某一列布局

自定义表格头可通过修改 `columns` 配置中的 `render` 属性实现， 详细定义查阅 [Columns 列定义](https://procomponents.ant.design/components/table#columns-%E5%88%97%E5%AE%9A%E4%B9%89)

```ts
render: (_, record) => (
  <Space>
    {record.labels.map((name) => (
      <Tag key={name}>
        {name}
      </Tag>
    ))}
  </Space>
),
```

示例可查看 [5.自定义-表格头某一列布局](#5自定义-表格头某一列布局)示例中的 **创建者** 列

## 7.显示和隐藏表格右边的工具栏 & 表格顶部的按钮浮动到左边

通过 `ProTable` 自带属性 `toolbar` 配置实现，详情查阅[ProComponents 文档](https://procomponents.ant.design/components/table#listtoolbarprops)

```tsx
import type { ReactNode } from 'react';
import React, { useRef, useContext, useState } from 'react';
import {
  PlusOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import { Button, Tag, Space, Tooltip } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ProFormSelect, ProFormSwitch } from '@ant-design/pro-form';
import { useDebounceFn } from '@ant-design/pro-utils';
import ProCard from '@ant-design/pro-card';
import ProProvider from '@ant-design/pro-provider';
import Mock from 'mockjs';

type GithubIssueItem = {
  key: number;
  name: string;
  labels: string[];
  containers: number;
  status: string;
  creator: string;
  createdAt: number;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const requestOptions = async ({ keyWords }: any) => {
  console.log(keyWords);
  await waitTime(1000);
  const data = [
    { label: '付小小', value: '付小小' },
    { label: '曲丽丽', value: '曲丽丽' },
    { label: '林东东', value: '林东东' },
    { label: '陈帅帅', value: '陈帅帅' },
    { label: '兼某某', value: '兼某某' },
  ];
  return Mock.mock({
    'data|1-10': [
      {
        value: '@id',
        label: '@name',
      },
    ],
  }).data.concat(data);
};

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const tableListDataSource: GithubIssueItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    labels: creators.slice(Math.floor(Math.random() * creators.length)),
    containers: Math.floor(Math.random() * 20),
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

// 配置表单初始值
const initData = {
  settings: true, // 顶部工具栏显示/隐藏
  search: true, // 顶部左边按钮
  filter: true, // 顶部右边按钮
};
const toolbarSettings = {
  settings: [
    // 不设置则展示默认工具
    {
      icon: <SettingOutlined />,
      tooltip: '设置',
    },
    {
      icon: <FullscreenOutlined />,
      tooltip: '全屏',
    },
  ],
  search: (
    <Button key="button" icon={<PlusOutlined />} type="primary">
      新建
    </Button>
  ),
  filter: (
    <Button key="button" icon={<PlusOutlined />} type="primary">
      导出
    </Button>
  ),
};
const SettingsEnum = {
  settings: `
    settings: [  // 不设置则展示默认工具 
      {
        icon: <SettingOutlined />,
        tooltip: '设置',
      },
      {
        icon: <FullscreenOutlined />,
        tooltip: '全屏',
      },
    ],
  `,
  search: `
    search: (
      <Button key="button" icon={<PlusOutlined />} type="primary">
        新建
      </Button>
    ),
  `,
  filter: `
    filter: (
      <Button key="button" icon={<PlusOutlined />} type="primary">
        导出
      </Button>
    ),
  `,
};

const columns: ProColumns<GithubIssueItem, 'link'>[] = [
  {
    title: (
      <>
        应用名称
        <Tooltip placement="top" title="这是一段自定义描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: (
      <>
        创建者
        <Tooltip placement="top" title="这是一段自定义描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    dataIndex: 'creator',
    valueType: 'link',
    hideInSearch: true,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueType: 'link',
    hideInTable: true,
  },
  {
    title: '成员',
    dataIndex: 'labels',
    valueType: 'checkbox',
    valueEnum: {
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
    render: (_, record) => (
      <Space>
        {record.labels.map((name) => (
          <Tag key={name}>{name}</Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    hideInSearch: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '待发布', status: 'Default' },
      running: { text: '发布中', status: 'Processing' },
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInTable: true,
    valueType: 'radio',
    valueEnum: {
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, record) => [
      record.status === 'close' && <a key="link">发布</a>,
      (record.status === 'running' || record.status === 'online') && <a key="warn">停用</a>,
      record.status === 'error' && <a key="republish">重新发布</a>,
      <a
        key="republish"
        style={
          record.status === 'running'
            ? {
                color: 'rgba(0,0,0,.25)',
                cursor: 'not-allowed',
              }
            : {}
        }
      >
        监控
      </a>,
    ],
  },
];

export default () => {
  const values = useContext(ProProvider);
  const actionRef = useRef<ActionType>();
  const [toolbarOptions, setToolbarOptions] = useState<any>(toolbarSettings);
  const [stringToolbarOptions, setStringToolbarOptions] = useState<any>(SettingsEnum);
  /** 去抖配置 */
  const updateConfig = useDebounceFn(async (state) => {
    const newToolbarSettings = {};
    const newSetStringToolbarOptions = {};
    Object.entries(state).forEach(([key, value]) => {
      if (value) {
        newToolbarSettings[key] = toolbarSettings[key];
        newSetStringToolbarOptions[key] = SettingsEnum[key];
      } else if (key === 'settings') {
        newToolbarSettings[key] = [];
        newSetStringToolbarOptions[key] = `settings: [],`;
      }
    });
    setToolbarOptions(newToolbarSettings);
    setStringToolbarOptions(newSetStringToolbarOptions);
  }, 20);

  return (
    <ProCard
      split="vertical"
      bordered
      headerBordered
      style={{
        overflow: 'hidden',
      }}
    >
      <ProCard
        style={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        <ProProvider.Provider
          value={{
            ...values,
            valueTypeMap: {
              // 自定义valueType
              link: {
                render: (text) => text, // 列表数据渲染
                renderFormItem: (
                  text,
                  props, // 查询表单项自定义
                ) => (
                  <ProFormSelect
                    name="creator"
                    {...props?.fieldProps}
                    showSearch
                    filterOption={false}
                    request={requestOptions}
                    placeholder="Please select a name"
                  />
                ),
              },
            },
          }}
        >
          <ProTable<GithubIssueItem, Record<string, any>, 'link'>
            columns={columns}
            actionRef={actionRef}
            request={(params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log(params, sorter, filter);
              return Promise.resolve({
                data: tableListDataSource,
                success: true,
              });
            }}
            editable={{
              type: 'multiple',
            }}
            rowKey="key"
            search={{
              labelWidth: 'auto',
            }}
            form={{
              // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
              syncToUrl: (searchValues, type) => {
                console.log(searchValues);
                if (type === 'get') {
                  return {
                    ...searchValues,
                    created_at: [searchValues.startTime, searchValues.endTime],
                  };
                }
                return searchValues;
              },
            }}
            pagination={{
              pageSize: 5,
            }}
            dateFormatter="string"
            // toolBarRender={() => [
            //   <Button key="button" icon={<PlusOutlined />} type="primary">
            //     新建
            //   </Button>
            // ]}
            toolbar={toolbarOptions}
          />
        </ProProvider.Provider>
      </ProCard>
      <ProCard
        direction="column"
        colSpan="500px"
        style={{
          boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
          padding: '10px',
        }}
      >
        <ProCard
          title="表格顶部工具配置"
          style={{
            height: '300px',
            overflow: 'auto',
          }}
        >
          <ProForm
            layout="inline"
            initialValues={initData}
            submitter={false}
            colon={false}
            onValuesChange={(_, formValues) => updateConfig.run(formValues)}
          >
            <ProFormSwitch
              label="表格右边的工具栏"
              tooltip="控制展示表格右边的工具栏"
              name="settings"
            />
            <ProFormSwitch
              label="表格顶部的左侧按钮"
              tooltip="控制表格顶部的左侧按钮"
              name="search"
            />
            <ProFormSwitch
              label="表格顶部的右侧按钮"
              tooltip="控制表格顶部的右侧按钮"
              name="filter"
            />
          </ProForm>
        </ProCard>
        <ProCard
          title="工具栏配置代码"
          style={{
            maxHeight: '400px',
            overflow: 'auto',
          }}
        >
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {`toolbar: {
            `}
            {Object.entries(stringToolbarOptions).map(([key, value]) => (
              <text key={key}>{value as ReactNode}</text>
            ))}
            {`
              // ...
            }
            `}
          </pre>
        </ProCard>
      </ProCard>
    </ProCard>
  );
};
```

## 8.树形表格
