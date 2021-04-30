---
title: 新建service层
nav:
  order: 12
group:
  title: 项目框架
  order: 2
---

# 新建 service 层

## 1、新建页面 service 层

1.页面组件请求后台接口的代码写在 service 层。

2.src/services/ 下的目录 和 src/pages/ 下的目录, 文件夹结构基本一样。

3.菜单列表页面+列表的详情/新建/编辑页面都公用一个 model 层和一个 service 层。

4.servce 层是负责从网路获取数据的。

#### service 层的目录结构如下

```json
|--src
    |--services
        |--load_services.ts
        |--user
        |   |--login
        |      |--index.ts
        |      |--data.d.ts  //类型定义
        |--example  // example页面以及其detail页面对应的服务层
            |--index.ts
            |--data.d.ts  //类型定义
```

#### 示例：新建一个 example 页面的 service

1.在 example 下面创建一个 index.ts 文件( src/services/example/index.ts )

```ts
import { httpPost, httpGet } from "http";
import type from './data.d';

export const getData<type.dataType> = (params:type.dataParams,config:type.config)=>{
  return httpPost('http://127.0.0.1', params, config);
};

export const getList<type.listType> =(params:type.listParams) => {
  return httpPost('http://127.0.0.1', params, config);
};

export const getDetail<type.detailType> = (params:type.detParams,) => {
  return httpPost('http://127.0.0.1', params);
};
```

## 2、http 请求参数说明

#### 在 src 文件下创建一个 http 文件用来封装各种类型的请求函数

```bash
|--src
    |--http
        |--index.ts
```

## index.ts

```ts
import { request } from 'umi';

//发起一个post请求
export const httpPost = async (url: string, params?: any, options?: { [key: string]: any }) => {
  return request<any>(url, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
};

//发起一个get请求
export const httpGet = async (url: string, params?: any, options?: { [key: string]: any }) => {
  return request<any>(url, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
};
```

`url`：请求地址(/login)

`params`：请求携带的参数({name:"xiaoming",password:'123' })

`config`：其它配置参数({baseURL:'http://xxxx',timeout: 5000,headers: {'X-Requested-With': 'XMLHttpRequest'}, ... })
