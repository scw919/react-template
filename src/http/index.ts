// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
// const headers = {
//     'Content-Type': 'application/json',
// }

/**
 * @param url     // /login
 * @param params  // {name:"xiaoming",password:'123' } //
 * @param config  //  {baseURL:'http://xxxx',timeout: 5000,headers: {'X-Requested-With': 'XMLHttpRequest'}, ... }
 * @return promise
 */
//发起一个 post 请求
export const httpPost = async (url: string, params?: any, config?: { [key: string]: any }) => {
  return request<any>(url, {
    method: 'POST',
    /**
      // 'data' is the data to be sent as the request body
      // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
      // Must be of one of the following types:
      // 1. string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // 2. Browser only: FormData, File, Blob
      // 3. Node only: Stream
     */
    data: params,
    ...(config || {}),
  });
};

//发起一个 put 请求
export async function httpPut(url: string, params?: any, config?: { [key: string]: any }) {
  return request<any>(url, {
    method: 'PUT',
    data: { ...params },
    ...(config || {}),
  });
}

//发起一个 patch 请求
export async function httpPatch(url: string, params?: any, config?: { [key: string]: any }) {
  return request<any>(url, {
    method: 'PATCH',
    data: { ...params },
    ...(config || {}),
  });
}

//发起一个 get 请求
export const httpGet = async (url: string, params?: any, config?: { [key: string]: any }) => {
  return request<any>(url, {
    method: 'GET',
    /*
      // 'params' are the URL parameters to be sent with request
      // Must be a plain object or a URLSearchParams object
    */
    params: { ...params },
    ...(config || {}),
  });
};

//发起一个 delete 请求
export async function httpDelete(url: string, params?: any, config?: { [key: string]: any }) {
  return request<any>(url, {
    method: 'DELETE',
    params: { ...params },
    ...(config || {}),
  });
}
