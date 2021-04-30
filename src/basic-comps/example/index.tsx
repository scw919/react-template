/**
 * 组件模板
 */
import React, { memo, useEffect } from 'react';
// 动态添加class
import classnames from 'classnames';
import styles from './index.less';
import type { Info } from './data';

// 组件接收的参数
export interface ExampleProps {
  name?: string;
  age?: number;
  friends?: string[]; // 数组 ['liu', 'jun']
  info?: Info; // 对象
  labels?: {
    name: string;
    color: string;
  }[]; // 数组 [ {name:'xx', color:'xx'}, {name:'xx', color:'xx'} ]
  onBtnClick?: (event: any, name: string | undefined) => void; // 函数 (event, name)=> {}
}

// 定义组件
const Example: React.FC<ExampleProps> = (props) => {
  // props 获取属性
  const { onBtnClick } = props;
  const { name, age } = props;
  // state 定义变量
  // const [value, setValue] = useState(false);

  // =============== hooks 区域===============
  useEffect(() => {
    // 页面挂载完触发（该hooks可以写多个）
    console.log('页面挂载完成会触发 ( 第二参数是空[] 代表只调用一次)');
  }, []);

  // =============== function 区域===============

  // =============== handle 区域===============
  const handleBtnClick = (event: any) => {
    if (onBtnClick) {
      onBtnClick(event, name);
    }
  };

  // =============== render 区域===============
  return (
    <div className={styles.example}>
      {/* 用 classnames 添加样式更加灵活 */}
      <h2 className={classnames(styles.example)}>
        example comps name:{name}, age:{age}
      </h2>
      <button onClick={(e) => handleBtnClick(e)}>getName</button>
    </div>
  );
};

// memo 是性能优化（浅层比较更新组件）
export default memo(Example);
