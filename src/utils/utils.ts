/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import React from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
import * as allIcons from '@ant-design/icons';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

// 修复从接口获取菜单icon为 string类型
export const fixMenuItemIcon = (menus: MenuDataItem[], iconType = 'Outlined'): MenuDataItem[] => {
  menus.forEach((item) => {
    const { icon, children = [] } = item;
    if (typeof icon === 'string') {
      const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
      if (allIcons[fixIconName] || allIcons[icon]) {
        // 支持 ant-design-icon
        // eslint-disable-next-line no-param-reassign
        item.icon = React.createElement(allIcons[fixIconName] || allIcons[icon]);
      }
    }
    // eslint-disable-next-line no-param-reassign
    (children?.length > 0 ? (item.children = fixMenuItemIcon(children)) : null) as any;
  });
  return menus;
};
