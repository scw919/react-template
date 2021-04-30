export default function (initialState: any) {
  const { fetchUserInfo } = initialState || {};
  // console.log('access=', initialState);
  return {
    // 权限管理的测试
    canAdmin: fetchUserInfo?.username === 'admin',
    canBoss: () => true,
    canUser: () => false,
    normalRouteFilter: false,
    delUserBtn: fetchUserInfo?.username === 'admin',
    // 按钮权限管理
  };
}
