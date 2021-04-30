import { breadcrumbItemRender } from '@/utils/c-render';

// 下面是自定义头部信息的配置
export const pageNames: string[] = ['Demo页面', 'xx']; // 页面标题
export const breadcrumb = (index: number) => {
  // 页面的面包屑配置
  return {
    itemRender: breadcrumbItemRender,
    routes: [
      {
        path: '', // 为空代表不能点击
        breadcrumbName: '案例模板模块',
      },
      {
        path: '', // 需要点击可以配置路由
        breadcrumbName: pageNames[index],
      },
    ],
  };
};
