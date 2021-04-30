// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  console.log('==========参数============');
  console.log('params=', params);
  console.log('options=', options);
  let promiseResult = request<API.RuleList>('/api/rule2', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  // const result = {
  //   data: dataSource,
  //   total: tableListDataSource.length,
  //   success: true,

  //   pageSize,
  //   current: parseInt(`${params.current}`, 10) || 1,
  // };
  promiseResult.then((res) => {
    console.log(res);
    console.log('==========结果============');
  });
  return promiseResult;
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule2', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule2', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule2', {
    method: 'DELETE',
    ...(options || {}),
  });
}
