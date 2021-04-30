import { httpPost } from '@/http';

// 新建规则
export const addRule = (data: any) => {
  return httpPost('/api/rule', data);
};
