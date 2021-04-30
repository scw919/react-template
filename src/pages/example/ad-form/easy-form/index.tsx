import React, { useEffect, useState } from 'react';
// 动态添加class
// import classnames from 'classnames';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Card, Typography, Form, DatePicker, Button, Input } from 'antd';
// import styles from './index.less';
import { pageNames, breadcrumb } from './page-config';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormDependency,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import moment from 'moment';
import { Upload, WangEditor } from '@/basic-comps';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import type { Info } from './data';

// import { addRule } from '@/services/example/EasyForm';

// 调用接口
// const addEasyForm = async (data: any) => {
//   const res = await addRule(data);
//   console.log(res);
// };

// console.log(`=======${REACT_APP_ENV}`);
/**
 * EasyForm 页面
 */
const EasyForm: React.FC = () => {
  // props 获取属性
  //  const {  } = props;
  const initFormData = {
    name1: '这种初始化的值,点击重置无效',
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  // const tailLayout = {
  //   wrapperCol: { offset: 8, span: 16 },
  // };

  const formItemWidth = '200px';

  const dateFormat = 'YYYY-MM-DD';
  // state 定义变量
  const [disabledAll] = useState<boolean>(true);
  const [form] = Form.useForm();
  // =============== hooks 区域===============
  useEffect(() => {
    // 页面挂载完触发（该hooks可以写多个）
    console.log('EasyForm页面挂载完成会触发 ( 第二参数是空[] 代表只调用一次)');
  }, []);

  // =============== function 区域===============

  // =============== handle 和 on 区域===============
  const handleInitFromData = () => {
    console.log('ProForm handleInitFromData');
    form.setFieldsValue({
      name4: 'Hello world!',
      selectTime4: [moment('2021-03-20', dateFormat), moment('2021-03-21', dateFormat)],
      data4: moment('2021-03-20', dateFormat),
    });
  };
  const handleChangeValues = (changeValues: any) => {
    console.log('ProForm changeValues=', changeValues);
  };
  const onFinish = async (values: any) => {
    console.log('Success:', values);
  };
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
        <Typography.Title level={4}>1.ProForm的基本使用</Typography.Title>
        <ProForm
          // horizontal vertical  inline; 默认是：vertical
          layout={'horizontal'}
          // labelCol={ {span: 2 }}
          // wrapperCol= { { span: 4 }}
          onFinish={onFinish}
          onValuesChange={(changeValues) => handleChangeValues(changeValues)}
          initialValues={initFormData}
        >
          {/* 使用 pro-component 组件 */}
          <ProFormText
            name="name1"
            label="名称"
            tooltip="最长为 24 位"
            rules={[
              {
                required: true,
                message: '请输入名称!',
              },
            ]}
          />
          <ProFormDateRangePicker name="selectTime1" label="时间" />
          <ProFormSelect
            name="firend1"
            label="朋友"
            options={[
              {
                value: 'liujun',
                label: '小军',
              },
              {
                value: 'shuijun',
                label: '水军',
              },
            ]}
          />
          {/* 使用ant design 的组件 */}
          <Form.Item name="data1" label="日期">
            <DatePicker />
          </Form.Item>
        </ProForm>

        <p></p>
        <Typography.Title level={4}>2.禁用ProForm表单</Typography.Title>
        <ProForm
          // horizontal vertical  inline; 默认是：vertical
          layout={'horizontal'}
          // labelCol={ {span: 2 }}
          // wrapperCol= { { span: 4 }}
          onFinish={onFinish}
          onValuesChange={(changeValues) => handleChangeValues(changeValues)}
          initialValues={initFormData}
        >
          {/* 使用 pro-component 组件 */}
          <ProFormText
            name="name2"
            label="名称"
            tooltip="最长为 24 位"
            rules={[
              {
                required: true,
                message: '请输入名称!',
              },
            ]}
            disabled={disabledAll}
          />
          <ProFormSelect
            name="firend2"
            label="朋友"
            options={[
              {
                value: 'liujun',
                label: '小军',
              },
              {
                value: 'shuijun',
                label: '水军',
              },
            ]}
            disabled={disabledAll}
          />
          {/* 使用ant design 的组件 */}
          <Form.Item name="data2" label="日期">
            <DatePicker disabled={disabledAll} />
          </Form.Item>
        </ProForm>

        <p></p>
        <Typography.Title level={4}>3.重新渲染ProForm底部按钮</Typography.Title>
        <ProForm
          // horizontal vertical  inline; 默认是：vertical
          layout={'horizontal'}
          // labelCol={ {span: 2 }}
          // wrapperCol= { { span: 4 }}
          onFinish={onFinish}
          onValuesChange={(changeValues) => handleChangeValues(changeValues)}
          // 完全自定义整个区域
          submitter={{
            // 完全自定义整个区域
            render: (props, doms) => {
              console.log(props, doms);
              return [
                <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                  保存
                </Button>,
                <Button type="default" key="drap" onClick={() => props.form?.submit?.()}>
                  草稿
                </Button>,
                <Button type="default" key="rest" onClick={() => props.form?.resetFields()}>
                  重置
                </Button>,
              ];
            },
          }}
        >
          {/* 使用 pro-component 组件 */}
          <ProFormText
            name="name3"
            label="名称"
            tooltip="最长为 24 位"
            rules={[
              {
                required: true,
                message: '请输入名称!',
              },
            ]}
          />
          {/* 使用ant design 的组件 */}
          <Form.Item name="data3" label="日期">
            <DatePicker />
          </Form.Item>
        </ProForm>

        <p></p>
        <Typography.Title level={4}>4.初始化ProForm表单(可以重置)</Typography.Title>
        <ProForm
          form={form}
          // horizontal vertical  inline; 默认是：vertical
          layout={'horizontal'}
          // labelCol={ {span: 2 }}
          // wrapperCol= { { span: 4 }}
          onFinish={onFinish}
          onValuesChange={(changeValues) => handleChangeValues(changeValues)}
          // 完全自定义整个区域
          submitter={{
            // 完全自定义整个区域
            render: (props) => {
              // console.log(props, doms);
              return [
                <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                  保存
                </Button>,
                <Button type="default" key="drap" onClick={() => handleInitFromData()}>
                  初始化
                </Button>,
                <Button type="default" key="rest" onClick={() => props.form?.resetFields()}>
                  重置
                </Button>,
              ];
            },
          }}
        >
          {/* 使用 pro-component 组件 */}
          <ProFormText
            name="name4"
            label="名称"
            tooltip="最长为 24 位"
            rules={[
              {
                required: false,
                message: '请输入名称!',
              },
            ]}
          />
          <ProFormDateRangePicker name="selectTime4" label="时间" />
          {/* 使用ant design 的组件 */}
          <Form.Item name="data4" label="日期">
            <DatePicker format={dateFormat} />
          </Form.Item>
        </ProForm>

        <p></p>
        <Typography.Title level={4}>5.ProForm表单错误回滚到第一个(测试无效)</Typography.Title>
        <ProForm
          scrollToFirstError
          // fieldProps={
          // }
          layout={'horizontal'}
          onFinish={onFinish}
        >
          {/* 使用 pro-component 组件 */}
          <ProFormText
            name="name5"
            label="名称"
            tooltip="最长为 24 位"
            rules={[
              {
                required: true,
                message: '请输入名称!',
              },
            ]}
          />
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          {/* 使用ant design 的组件 */}
          <Form.Item name="data5" label="日期">
            <DatePicker />
          </Form.Item>
        </ProForm>

        <p></p>
        <Typography.Title level={4}>6.修改ProForm表单的宽</Typography.Title>
        <ProForm layout={'horizontal'} {...layout} onFinish={onFinish}>
          <ProFormText name="name6" label="名称" />
          <ProFormDateRangePicker name="selectTime6" label="时间" />
          <Form.Item name="data6" label="日期">
            <DatePicker format={dateFormat} />
          </Form.Item>
        </ProForm>
        <p></p>
        <Typography.Title level={4}>7.修改ProForm表单的宽</Typography.Title>
        <div
          style={{
            width: '300px',
          }}
        >
          <ProForm layout={'horizontal'} onFinish={onFinish}>
            <ProFormText name="name7" label="名称" />
            <ProFormDateRangePicker name="selectTime7" label="时间" />
            <Form.Item name="data7" label="日期">
              <DatePicker format={dateFormat} />
            </Form.Item>
          </ProForm>
        </div>

        <p></p>
        <Typography.Title level={4}>8.修改ProForm表单项的宽</Typography.Title>
        <div style={{ width: '800px' }}>
          {/*  
            ProForm 是 form 组件
            labelCol={{ span: 6 }} label的宽（相对于：ant-form-item）
            wrapperCol={{ span: 18 }} wrapper的宽（相对于：ant-form-item）
          */}
          <ProForm
            layout={'inline'}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <ProFormText
              name="name8"
              label="名称"
              fieldProps={{ style: { width: formItemWidth } }}
            />
            <ProFormText
              name="name88"
              label="名称"
              fieldProps={{ style: { width: formItemWidth } }}
            />
            <ProFormText
              name="name888"
              label="名称"
              fieldProps={{ style: { width: formItemWidth } }}
            />
            <ProFormText
              name="name8888"
              label="名称"
              fieldProps={{ style: { width: formItemWidth } }}
            />
            <ProFormDateRangePicker
              name="selectTime8"
              label="时间"
              fieldProps={{ style: { width: formItemWidth } }}
            />
            <Form.Item name="data8" label="日期">
              <DatePicker format={dateFormat} style={{ width: formItemWidth }} />
            </Form.Item>
          </ProForm>
        </div>

        <p></p>
        <Typography.Title level={4}>9.联动表单</Typography.Title>
        <div style={{ width: '400px' }}>
          <ProForm layout={'inline'} onFinish={onFinish}>
            {/* value 绑定在： name9  */}
            <ProFormText name="name9" label="名称1" />
            {/* value 绑定在： name99.text  */}
            <ProFormText name={['name99', 'text']} label="名称2" />
            {/* antd 表单组件 */}
            {/* noStyle shouldUpdate 是必选的，写了 name 就会失效 */}
            <Form.Item noStyle shouldUpdate>
              {(formRef) => {
                return (
                  // 共用一个变量  name99.text
                  <ProFormText
                    name={['name99', 'text']}
                    label={`名称1的值：${formRef.getFieldValue('name9')}`}
                  />
                );
              }}
            </Form.Item>

            {/* 表单项监听：name9 和 name99.text 的值的变化 */}
            <ProFormDependency name={['name9', ['name99', 'text']]}>
              {/* name9, name99 这两个是解构出来的哈 */}
              {({ name9, name99 }) => {
                return (
                  <ProFormSelect
                    options={[
                      {
                        value: '1',
                        label: '小军',
                      },
                      {
                        value: '2',
                        label: '大军',
                      },
                    ]}
                    name="selectUser"
                    label={`《${name9 || ''}》 与 《${name99?.text || ''}》`}
                  />
                );
              }}
            </ProFormDependency>
          </ProForm>
        </div>

        <p></p>
        <Typography.Title level={4}>10.动态表单</Typography.Title>
        <div>
          <ProForm
            layout={'vertical'}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <ProFormText name="name10" label="名称1" />

            {/* names = [] 是一个数组 */}
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={index === 0 ? '案件数：' : ''}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: '输入案件名称',
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="输入案件名" style={{ width: '60%' }} />
                      </Form.Item>
                      {/* 减号 */}
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: '60%' }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add('The head item', 0);
                      }}
                      style={{ width: '60%', marginTop: '20px' }}
                      icon={<PlusOutlined />}
                    >
                      Add field at head
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </ProForm>
        </div>

        <p></p>
        <Typography.Title level={4}>11.包含上传文件的表单</Typography.Title>
        <div style={{ width: '800px' }}>
          <ProForm layout={'vertical'} onFinish={onFinish}>
            <ProFormText name="name11" label="名称" />
            <ProFormUploadButton
              extra="支持扩展名：.jpg .zip .doc .wps"
              label="倒签报备附件"
              name="file"
              title="上传文件"
            />

            <Form.Item name="uploadFile" label="使用自定义的组件">
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

            <ProFormDateRangePicker name="selectTime11" label="时间" />
          </ProForm>
        </div>

        <p></p>
        <Typography.Title level={4}>12.包含富文本的表单</Typography.Title>
        <div style={{ width: '800px' }}>
          <ProForm layout={'vertical'} onFinish={onFinish} initialValues={{ content: 'test' }}>
            <ProFormText name="name12" label="名称" />
            <Form.Item name="uploadFile12" label="使用自定义的组件">
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

            <Form.Item name="content" label="自定义富文本">
              <WangEditor editorId="liujunEdit"></WangEditor>
            </Form.Item>
          </ProForm>
        </div>

        <p></p>
        <Typography.Title level={4}>13.固定按钮到FooterToolbar底部</Typography.Title>
        <div style={{ width: '800px' }}>
          <ProForm
            layout={'inline'}
            onFinish={onFinish}
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            }}
          >
            <ProFormText name="name13" label="名称" />
            <ProFormDateRangePicker name="selectTime13" label="时间" />
          </ProForm>
        </div>
      </Card>
    </PageContainer>
  );
};

export default EasyForm;
