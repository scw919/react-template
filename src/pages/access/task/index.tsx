import { Card, Typography } from 'antd';
import { useAccess, Access } from 'umi';

const TaskDemo = () => {
  const access = useAccess();
  // console.log(access);

  return (
    <Card>
      <Typography.Text>测试task任务页面</Typography.Text>
      <h6>admin 权限页面</h6>
      <Access accessible={access.delUserBtn} fallback={<span>暂无权限，admin才有权限查看的</span>}>
        admin 权限内容，哈哈哈
      </Access>
      {/* <h6>普通用户 权限页面</h6>
      <Access accessible={access.canUser()} fallback={<span>普通用户查看的内容</span>}>
        普通用户 权限内容
      </Access> */}
    </Card>
  );
};

export default TaskDemo;
