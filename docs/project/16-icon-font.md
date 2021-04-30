---
title: 自定义字体图标
nav:
  order: 12
group:
  title: 项目框架
  order: 2
---

# 集成自定义的字体图标

`推荐使用方式二`，简单快捷且直观。

步骤为：将阿里图标库项目中下载下的文件替换`src/assets/iconfont`全部文件即可，在要使用的文件中放置一个标签，在该标签上修改对应 `class` 名即可显示如：

> 注意：`src/assets/iconfont/iconfont.css` 文件需要在 `src/global.less` 全局样式中引入。并且 src/assets/iconfont/iconfont.js 要拷贝一份到 public/iconfont/iconfont.js

```ts
<span class="iconfont icon-xianxingchun"></span>
```

显示为 <span class="iconfont icon-xianxingchun"></span>  
颜色大小等可通过 `css` 来设置。例如： <span class="iconfont icon-xianxingchun" style="color:red;font-size:30px"></span>

```ts
<span class="iconfont icon-xianxingchun" style="font-size:30px;color:red"></span>
```

当修改为不同图标时直接修改 `class` 为对应图标代码即可如上图标改成显示如 <span class="iconfont icon-1"></span>  
代码为

```ts
<span class="iconfont icon-1"></span>
```

# 使用方式一

unicode 引用

特点是：

兼容性最好，支持 ie6+，及所有现代浏览器  
支持按字体的方式去动态调整图标大小，颜色等等

但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色

第一步：拷贝项目下面生成的 font-face

```css
@font-face {
    font-family: 'iconfont';
    src: url('iconfont.eot');
    src: url('iconfont.eot?#iefix') format('embedded-opentype');
    url('iconfont.woff') format('woff');
    url('iconfont.ttf') format('truetype');
    url('iconfont.svg#iconfont') format('svg');
}
```

第二步：定义使用 iconfont 的样式

```css
.iconfont {
  font-size: 16px;
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
```

第三步：挑选相应图标并获取字体编码，应用于页面

```ts
<i class="iconfont">&#x33;</i>
```

# 使用方式二

font-class 引用

font-class 是 unicode 使用方式的一种变种，主要是解决 unicode 书写不直观，语意不明确的问题。

与 unicode 使用方式相比，具有如下特点：

兼容性良好，支持 ie8+，及所有现代浏览器。  
相比于 unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。  
因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 unicode 引用。  
不过因为本质上还是使用的字体，所以多色图标还是不支持的。

第一步：拷贝项目下面生成的 fontclass 代码：

```css
.icon-xxx::before {
  content: '\e639';
}
```

第二步：挑选相应图标并获取类名，应用于页面：

```ts
<i class="iconfont icon-xxx"></i>
```

# 使用方式三

symbol 引用

这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章 这种用法其实是做了一个 svg 的集合，与上面两种相比具有如下特点：

支持多色图标了，不再受单色限制。  
通过一些技巧，支持像字体那样，通过 font-size,color 来调整样式。  
兼容性较差，支持 ie9+,及现代浏览器。  
浏览器渲染 svg 的性能一般，还不如 png。

第一步：引入项目下面生成的 symbol 代码：

```ts
import './iconfont/iconfont.js';
```

第二步：加入通用 CSS 代码（引入一次就行）：

```ts
<i class="iconfont icon-xxx"></i>
```

第三步：挑选相应图标并获取类名，应用于页面：

```ts
  <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
  </svg>
```
