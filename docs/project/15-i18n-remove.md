---
title: 去除国际化
nav:
  order: 12
group:
  title: 项目框架
  order: 2
---

# 去除国际化

## 1、修改配置文件 `config/config.ts` 中默认配置对象 `defineConfig` 对象

```ts
export default defineConfig({
  ...
  layout: {
    locale: false,
    ...
  },
  locale: {},
  ...
});
```

## 2、修改应用国际化的组件

1）删除所有组件中引入的 `SelectLang` 组件,这个组件主要是基于 `umi@plugin-locale` 用来切换语言类型的组件

```ts
return (
  <div>
    ...
    {SelectLang && <SelectLang />}
  </div>
);
```

2）删除所有 `umi@plugin-locale` 引用,修改 `src` 目录下所有引用国际化 `formattedMessage` 对象为普通字符串

```ts
import { FormattedMessage, setLocale, getLocale, useIntl } from 'umi';
const intl = useIntl();
export default () => {
  return (
    <div>
      <p>
        <FormattedMessage id="navbar.lang" />
      </p>
      <button type="primary">
        {intl.formatMessage({
          id: 'name',
          defaultMessage: '你好，旅行者',
        })}
      </button>
    </div>
  );
};
```

改为

```ts
export default () => {
  return (
    <div>
      <p>内容</p>
      <button>你好，旅行者</button>
    </div>
  );
};
```

## 3、删除本地文件 `src/locale` 目录,执行`npm run i18n-remove`

## 4、重启项目

```bash
tyarn
tyarn start
```
