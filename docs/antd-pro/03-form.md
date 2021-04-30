---
title: 高级表单
nav:
  order: 0
group:
  title: AntdPro组件案例
  order: 5
---

# 默认的表单(一列)

默认的表单中包含：一个基本输入框，一个下拉选着框，一个 radio 选择框，一个 checkbox 选择框，一个时间选择框，一个 textarea 输入框

```tsx
import React from 'react';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormCheckbox,
  ProFormRadio,
  ProFormTextArea,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';

const Form1: React.FC = () => {
  return (
    <ProForm
      onFinish={async (values): Promise<void> => {
        // console.log(values);
      }}
      initialValues={{}}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true, message: '请输入名称 ' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: '6',
              label: '6%',
            },
            {
              value: '12',
              label: '12%',
            },
          ]}
          initialValue="6"
          width="xs"
          name="taxRate"
          label="税率"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormRadio.Group
          label="发票类型"
          name="invoiceType"
          initialValue="发票"
          options={['发票', '普票', '无票']}
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="Checkbox.Group"
          options={['A', 'B', 'C', 'D', 'E', 'F']}
          rules={[{ required: true, message: '请选择!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea width="xl" label="合同备注说明" name="remark" />
      </ProForm.Group>
    </ProForm>
  );
};
export default Form1;
```

# 默认的表单(二列)

```tsx
import React from 'react';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormCheckbox,
  ProFormRadio,
  ProFormTextArea,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';

const Form2: React.FC = () => {
  return (
    <ProForm
      onFinish={async (values): Promise<void> => {
        // console.log(values);
      }}
      initialValues={{}}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true, message: '请输入名称' }]}
        />
        <ProFormText
          width="md"
          name="company"
          label="签约客户公司"
          placeholder="请输入签约客户公司"
          rules={[{ required: true, message: '请输入签约客户公司' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="select"
          label="支持远程搜索查询的 Select"
          width="md"
          showSearch
          // request 是一个 promise,需要返回一个 options 相同的数据
          // 相当于去请求返回数据，然后在返回数据中匹配出value
          request={async ({ keyWords }) => {
            console.log('keyWords=', keyWords);
            const waitTime = (time: number = 100) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(keyWords);
                }, time);
              });
            };
            return await waitTime(1000).then((val) => {
              // console.log(val)
              return [
                { label: '全部', value: '全部+all' },
                { label: '未解决', value: '未解决+open' },
                { label: '已解决', value: '已解决+closed' },
                { label: '解决中', value: '解决中+processing' },
              ];
            });
          }}
          placeholder="Please select a country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormSelect.SearchSelect
          // 指定 width 可以保证每个item的宽一样
          width="md"
          name="userQuery"
          label="本地查询选择器"
          options={[
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormRadio.Group
          width="md"
          label="发票类型"
          name="invoiceType"
          initialValue="发票"
          options={['发票', '普票', '无票']}
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormRadio.Group
          width="md"
          name="radio-button1"
          label="Radio.Button"
          radioType="button"
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormCheckbox.Group
          width="md"
          name="radio-checkbox1"
          label="Radio.Button"
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
          rules={[{ required: true, message: '请选择!' }]}
        />
        <ProFormCheckbox.Group
          width="md"
          name="radio-checkbox2"
          label="Radio.Button"
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
          rules={[{ required: true, message: '请选择!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDateRangePicker width="md" name="dateRange" label="日期区间" />
        <ProFormDateTimeRangePicker width="md" name="dateTimeRange" label="日期时间区间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea width="xl" label="合同备注说明" name="remark" />
      </ProForm.Group>
    </ProForm>
  );
};
export default Form2;
```

# 表单数据的回显

```tsx
import React, { useEffect } from 'react';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormCheckbox,
  ProFormRadio,
  ProFormTextArea,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';

const Form3: React.FC = () => {
  const [form] = ProForm.useForm();
  // Form.useForm 创建表单数据域进行控制。如果是在 class component 下，则可以通过 ref 获取数据域。
  // 如 import { FormInstance } from 'antd/lib/form';  formRef = React.createRef<FormInstance>(); <Form ref={this.formRef}
  useEffect(() => {
    // 通过该表单数据域中的setFieldsValue方法传入对应表单项name属性的对象赋值
    form.setFieldsValue({
      name: 'giao',
      taxRate: '12',
      invoiceType: '无票',
      'checkbox-group': 'E',
      dateRange: ['2021-03-10', '2021-04-07'],
      dateTimeRange: ['2021-03-11 14:15:21', '2021-03-31 14:15:25'],
      remark: '一giao我里giaogiao',
    });
    // console.log(form.getFieldsValue(), '回显数据');
  }, []);

  return (
    <ProForm
      onFinish={async (values): Promise<void> => {
        // console.log(values);
      }}
      initialValues={{}}
      form={form} // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true, message: '请输入名称' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: '6',
              label: '6%',
            },
            {
              value: '12',
              label: '12%',
            },
          ]}
          width="xs"
          name="taxRate"
          label="税率"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormRadio.Group
          label="发票类型"
          name="invoiceType"
          options={['发票', '普票', '无票']}
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
        <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="Checkbox.Group"
          options={['A', 'B', 'C', 'D', 'E', 'F']}
          rules={[{ required: true, message: '请选择!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea width="xl" label="合同备注说明" name="remark" />
      </ProForm.Group>
    </ProForm>
  );
};
export default Form3;
```

# 表单数据的联动

```tsx
import React, { useEffect } from 'react';
import ProForm, {
  ProFormText,
  ProFormDependency,
  ProFormSelect,
  ProFormCheckbox,
  ProFormRadio,
  ProFormTextArea,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';

const Form4: React.FC = () => {
  const [form] = ProForm.useForm();
  useEffect(() => {
    // console.log('ProFormProForm',form)
  }, []);
  const onValuesChange = (changeValues: any) => {
    form.setFieldsValue({
      remark: Object.values(changeValues),
    });
    // console.log(changeValues);
  };

  return (
    <ProForm
      onFinish={async (values): Promise<void> => {
        // console.log(values);
      }}
      initialValues={{}}
      onValuesChange={onValuesChange}
      form={form}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true, message: '请输入名称' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: '6',
              label: '6%',
            },
            {
              value: '12',
              label: '12%',
            },
          ]}
          initialValue="6"
          width="xs"
          name="taxRate"
          label="税率"
        />
      </ProForm.Group>
      <ProForm.Group title="无票则出现时间区间选择表单" noStyle>
        <ProFormRadio.Group
          label="发票类型"
          name={['invoiceType']}
          initialValue="发票"
          options={['发票', '普票', '无票']}
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
      </ProForm.Group>

      {/*
       ProFormDependency 是一个简化版本的 Form.Item，配置 name 来确定我们依赖哪个数据（其他表单项的name），name 参数必须要是一个数组，如果是嵌套的结构可以这样配置 name={['name', ['name2', 'text']]}，传入的 values 的值 为 { name: string,name2: { text:string } }，而后在该组件包裹的函数中依赖决定生成哪些dom元素
      */}
      <ProFormDependency name={['invoiceType']}>
        {({ invoiceType }) => {
          if (invoiceType === '无票') {
            return <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />;
          }
          return null;
        }}
      </ProFormDependency>
      <ProForm.Group>
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="Checkbox.Group"
          options={['A', 'B', 'C', 'D', 'E', 'F']}
          rules={[{ required: true, message: '请选择!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea width="xl" label="合同备注说明" name="remark" />
      </ProForm.Group>
    </ProForm>
  );
};
export default Form4;
```

# 动态表单

```tsx
import React, { useEffect } from 'react';
import ProForm, { ProFormList, ProFormDependency, ProFormText } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { PlusOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';

const Form5: React.FC = () => {
  const stateValue = {
    copyIconProps: {
      // 复制操作配置
      show: true,
      Icon: CopyOutlined,
      tooltipText: '复制',
    },
    deleteIconProps: {
      // 删除操作配置
      show: true,
      Icon: DeleteOutlined,
      tooltipText: '删除此行',
    },
    // deleteIconProps:false,
    creatorButtonProps: {
      // 新建操作配置
      show: true,
      creatorButtonText: '新建一行',
      position: 'bottom',
      type: 'dashed',
      Icon: PlusOutlined,
    },
  };
  const [form] = ProForm.useForm();
  // <ProCard colSpan="calc(100% - 400px)">
  useEffect(() => {
    //  回显ProFormList数据
    form.setFieldsValue({
      allUsers: [
        { ProCardName: '小卡片', school: '7大学', users: [{ name: '', nickName: '11188' }] },
        { ProCardName: '', users: [{ name: '', nickName: '88' }] },
      ],
    });
  }, [form]);
  return (
    <ProForm
      onFinish={async (values): Promise<void> => {
        // console.log(values);
      }}
      form={form}
    >
      <ProFormList
        name="allUsers"
        label="大卡片"
        initialValue={[
          {
            ProCardName: '小卡片',
            school: '大学',
          },
          {
            ProCardName: '',
          },
        ]}
        itemRender={({ listDom, action }, { record }) => {
          //   console.log({ listDom, action }, { record }, '{ listDom, action }, { record }');
          return (
            <ProCard
              bordered
              extra={action}
              title={record?.ProCardName}
              style={{
                marginBottom: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        {/* @ts-ignore */}
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '',
            },
          ]}
          {...stateValue}
        >
          <ProForm.Group>
            <ProFormText name="name" label="姓名" />
            <ProFormText name="nickName" label="别名" />
          </ProForm.Group>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormDependency name={['name']}>
              {({ name }) => {
                if (!name) {
                  return null;
                }
                return <ProFormText name="name-1" label="" />;
              }}
            </ProFormDependency>
            <ProFormDependency name={['nickName']}>
              {({ nickName }) => {
                if (!nickName) {
                  return null;
                }
                return <ProFormText name="nickName-1" label="" />;
              }}
            </ProFormDependency>
          </div>
        </ProFormList>
        <ProForm.Group>
          <ProFormText name="school" label="学校" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDependency name={['school']}>
            {({ school }) => {
              if (!school) {
                return null;
              }
              return <ProFormText name="school-1" label="学校详情" />;
            }}
          </ProFormDependency>
        </ProForm.Group>
      </ProFormList>
    </ProForm>
    // </ProCard>
  );
};
export default Form5;
```

# 表单正则 n 种写法

Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据： type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);

```tsx
import React from 'react';
import {} from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const Form6: React.FC = () => {
  const tooltip =
    '1.字符长度【8,24】 2.字符类型：大写字母，小写字母，数字，特殊符号，不能为空格 3.密码强度（至少包含两种字符类型） 4.重复字元不超过三个 比如：111, AAA 可以用，1111、AAAA四个以上重复就不行 5.连续数字字元不超过三个 比如：123 可以用, 1234 四个以上连续就不行 6.不能为空 7.不能输入中文';
  // 3.密文展示
  // 9.请求过程中和数据库存储需要加密处理
  // 11.密码填写错误时，友好提示账号或密码输入错误
  const passwordValidator = (_: any, value: string) => {
    // const special = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
    if (value) {
      if (!new RegExp(/^.{6,24}$/, 'g').test(value)) {
        return Promise.reject(new Error('长度需为6到24位'));
      }
      if (new RegExp(/(.)*(.)\2{3}(.)*/, 'g').test(value)) {
        return Promise.reject(new Error('重复的字母/数字/符号不能出现超过3个'));
      }
      if (new RegExp(/(0123|1234|2345|3456|4567|5678|6789)/, 'g').test(value)) {
        return Promise.reject(new Error('正序连续不能出现超过3个'));
      }
      if (new RegExp(/(9876|8765|7654|6543|5432|4321|3210)/, 'g').test(value)) {
        return Promise.reject(new Error('倒序连续不能出现超过3个'));
      }
      if (/\s+/g.test(value)) {
        return Promise.reject(new Error('不能输入空格'));
      }
      if (new RegExp(/[\u4E00-\u9FA5]/, 'g').test(value)) {
        return Promise.reject(new Error('不能输入中文'));
      }
      if (/^\d*$/.test(value) || /^[A-Za-z]+$/.test(value)) {
        // 如果只是数字或者英文类型，特殊字符还没加
        return Promise.reject(new Error('至少包含两种字符类型'));
      }
    }
    return Promise.resolve();
  };
  return (
    <ProForm
      onFinish={async (values): Promise<void> => {
        // console.log(values);
      }}
      initialValues={{}}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="user"
          label="用户名"
          tooltip="包含字母、数字、中文(不能为纯数字)"
          rules={[
            {
              required: true,
              message: '包含字母、数字、中文(不能为纯数字)',
              pattern: new RegExp(/^(?!^\d*$)[\u4e00-\u9fa5a-zA-Z0-9]{2,20}$/, 'g'),
            },
          ]}
          placeholder="请输入用户名"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              validator: passwordValidator,
            },
          ]}
          tooltip={tooltip}
          placeholder="请输入密码"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText.Password
          width="md"
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请确认密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                // 未输入或密码一致放行
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('您输入的两个密码不匹配!'));
              },
            }),
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="sex"
          label="性别"
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
          placeholder="请输入"
        />
      </ProForm.Group>
    </ProForm>
  );
};
export default Form6;
```
