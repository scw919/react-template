import { Link } from 'umi';

export const breadcrumbItemRender = (route: any, params: any, routes: any) => {
  const last = routes.indexOf(route) === routes.length - 1;
  // 最后一个
  if (last || !route.path) {
    return <span>{route.breadcrumbName}</span>;
  }
  return <Link to={route.path}>{route.breadcrumbName}</Link>;
};
