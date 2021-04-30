import React, { useEffect, useRef } from 'react';
// 动态添加class
// import classnames from 'classnames';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Input, DatePicker } from 'antd';
import styles from './index.less';
import { pageNames, breadcrumb } from './page-config';
import { rule } from '@/services/ant-design-pro/rule';
import { TableStatus } from '@/enum';
import { ButtonGroups } from '@/basic-comps';
import type { BtnProps } from '@/basic-comps/button-groups';
import { DemoModal } from '@/components';

const { RangePicker } = DatePicker;

// console.log(`=======${REACT_APP_ENV}`);
/**
 * TableList 页面
 */
const TableList: React.FC = () => {
  // props 获取属性
  //  const {  } = props;
  // Table action 的引用，便于自定义触发 表格的 reload 等操作
  const actionRef = useRef<ActionType>(); // actionRef.current?.reloadAndRest?.();  actionRef.current?.reload();
  // state 定义变量
  const canShow = false;

  // =============== hooks 区域===============
  useEffect(() => {
    // 页面挂载完触发（该hooks可以写多个）
    console.log('TableList页面挂载完成会触发 ( 第二参数是空[] 代表只调用一次)');
  }, []);

  // =============== function 区域===============

  // =============== handle 区域===============

  // =============== render 区域===============
  // 1.配置表格中的操作按钮( 在 columns 使用)
  const operationConfig: (_: any, record: any) => BtnProps[] = (_: any, record: any) => [
    {
      btnType: 'button',
      isShow: true,
      name: '配置1',
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'link',
        onClick: (e: any) => {
          console.log('点击了配置1', e);
          console.log(_, record);
        },
      },
    },
    {
      btnType: 'button',
      isShow: canShow,
      name: '配置2',
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'text',
        onClick: (e: any) => {
          console.log('点击了配置2', e);
        },
      },
    },
    {
      btnType: 'custom',
      isShow: true,
      customRender: () => {
        return <DemoModal></DemoModal>;
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '订阅警报1',
      style: {
        margin: '0 3px',
        padding: '0 3px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'text',
        onClick: (e: any) => {
          console.log('点击了订阅警报1', e);
        },
      },
    },
  ];

  // 2.配置表格的列和高级检索（ 在 ProTable 使用）
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
      // 自定义表格item的内容
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              // setCurrentRow(entity);
              // setShowDetail(true);
              console.log('规则名称click', dom, entity);
            }}
          >
            {dom} 使用render自定义布局
          </a>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      // valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val} 万(使用renderText自定义布局)`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      // 状态的枚举
      valueEnum: TableStatus,
      // valueEnum: {
      //   0: {
      //     text: '关闭',
      //     status: 'Default',
      //   },
      //   1: {
      //     text: '运行中',
      //     status: 'Processing',
      //   },
      //   2: {
      //     text: '已上线',
      //     status: 'Success',
      //   },
      //   3: {
      //     text: '异常',
      //     status: 'Error',
      //   },
      // },
    },
    {
      title: '上次调度时间',
      sorter: true,
      dataIndex: 'updatedAt',
      // valueType: 'dateTime',

      // 自定义高级检索的布局
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        // { label: "上次调度时间",params: undefined,request: undefined,type: "table" }
        console.log('上次调度时间=', rest);
        // console.log()
        // 隐藏（关闭）
        if (`${status}` === '0') {
          return false;
        }
        // 自定义(以上线)
        if (`${status}` === '2') {
          return <RangePicker />;
        }
        // 自定义（异常）
        if (`${status}` === '3') {
          return <Input {...rest} placeholder={'请输入异常原因！'} />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => <ButtonGroups btnsConfig={operationConfig(_, record)} />,
    },
  ];

  // 3.配置表格头部的按钮组 （ 在ProTable 使用）
  const toolBarConfig: (action: any) => BtnProps[] = (action: any) => [
    {
      btnType: 'button',
      isShow: true,
      name: '新建1',
      style: {
        margin: '0 4px',
      },
      // 下面是 button的属性
      fieldProps: {
        icon: <PlusOutlined />,
        onClick: (e: any) => {
          console.log('点击了新建1', e);
          console.log(action);
        },
      },
    },
    // 有权限的按钮
    {
      btnType: 'button',
      isShow: canShow,
      name: '新建2',
      style: {
        margin: '0 4px',
      },
      // 下面是 button的属性
      fieldProps: {
        icon: <PlusOutlined />,
        onClick: (e: any) => {
          console.log('点击了新建2', e);
        },
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '新建3',
      style: {
        margin: '0 4px',
      },
      // 下面是 button的属性
      fieldProps: {
        onClick: (e: any) => {
          console.log('点击了新建3', e);
        },
      },
    },
    {
      btnType: 'button',
      isShow: true,
      name: '新建4',
      style: {
        margin: '0 4px',
      },
      // 下面是 button的属性
      fieldProps: {
        type: 'primary',
        onClick: (e: any) => {
          console.log('点击了新建4', e);
        },
      },
    },
  ];

  // 4.渲染表格页面
  return (
    <PageContainer
      className={styles['table-list']}
      fixedHeader
      // 自定义页面的头部
      header={{
        title: pageNames[0],
        breadcrumb: breadcrumb(0),
      }}
    >
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={(action) => (<ButtonGroups btnsConfig={toolBarConfig(action)} />) as any}
        // request={rule}  // 简写, 下面是完整写法
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log('==========触发高级搜索=============');
          console.log(params, sorter, filter);
          const config = {};
          // 调用 rule 服务获取数据，返回一个 Promise的对象 {data:[], success:x, total:x, pageSize:x, current:x }
          return rule(
            {
              ...params, // 检索条件
            },
            config, // axios 的配置
          );
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log('selectedRows=', selectedRows);
          },
        }}
      />
    </PageContainer>
  );
};

export default TableList;
