/**
 * 组件模板
 */
import { Button, Dropdown, Menu } from 'antd';
import type { ButtonProps, MenuItemProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import { memo } from 'react';
// 动态添加class
// import classnames from 'classnames';
// import styles from './index.less';

export type BtnType = 'button' | 'dropdown' | 'custom';
export type dropdownType = 'button' | 'text';
export type MenItemProps = MenuItemProps & {
  name?: string; // 下拉菜单的名称
  style?: any; // 下拉菜单的样式（a标签）
};
export type BtnProps = {
  btnType: BtnType; // 按钮类型
  isShow: boolean; // 是否显示和隐藏按钮
  name?: string; // 按钮的名称
  style?: any; // 按钮的样式
  fieldProps?: ButtonProps; // 按钮的属性
  dropdownType?: dropdownType; // 下拉按钮类型（ 只有 btnType === dropdown 才有用）
  menuItems?: MenItemProps[]; // 下拉菜单的属性（ 只有 btnType === dropdown 才有用）
  customRender?: () => React.ReactNode; // 自定义渲染组件 (  只有 btnType === custom 才有用） )
};

export interface ButtonGroupsProps {
  btnsConfig: BtnProps[];
}

// 定义组件
const ButtonGroups: React.FC<ButtonGroupsProps> = ({ btnsConfig = [] }) => {
  const btnsRender: any = btnsConfig
    ?.filter((item: BtnProps) => item.isShow)
    .map((btnConf: BtnProps) => {
      // dropdown
      if (btnConf.btnType === 'dropdown') {
        const menu = (
          <Menu>
            {btnConf?.menuItems
              ?.filter((item: any) => item.isShow)
              ?.map((menuItem: any) => {
                return (
                  <Menu.Item key={menuItem.name} {...menuItem}>
                    <a onClick={(e) => e.preventDefault()} style={menuItem.style}>
                      {menuItem.name}
                    </a>
                  </Menu.Item>
                );
              })}
          </Menu>
        );
        return (
          <Dropdown {...btnConf.fieldProps} overlay={menu} key={btnConf.name}>
            {btnConf.dropdownType === 'text' ? (
              <a onClick={(e) => e.preventDefault()} style={btnConf.style}>
                {btnConf.name} <DownOutlined />
              </a>
            ) : (
              <Button {...btnConf.fieldProps} style={btnConf.style}>
                {btnConf.name} <DownOutlined />
              </Button>
            )}
          </Dropdown>
        );
      }
      // custom
      if (btnConf.btnType === 'custom') {
        return btnConf?.customRender?.();
      }

      // button
      return (
        <Button {...btnConf.fieldProps} style={btnConf.style} key={btnConf.name}>
          {btnConf.name}
        </Button>
      );

      // end for
    });
  return btnsRender;
};

// memo 是性能优化（浅层比较更新组件）
export default memo(ButtonGroups);
