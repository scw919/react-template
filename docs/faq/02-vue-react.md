---
title: VueVSReact
nav:
  order: 0
group:
  title: FAQ
  order: 11
---

# 1.编写 IU

## 插入变量

#### vue 版

```html
<div>{{msg}}</div>
```

#### react 版

```html
<div>{msg}</div>
```

## v-bind

#### vue 版

```html
<img :src="imgUrl" />
```

#### react 版

```html
<img src="{imgUrl}" />
```

## v-on

#### vue 版

```html
<div v-on="handleClick"></div>
```

#### react 版

class component

```tsx
// class component
import React from 'react';
import { Button } from 'antd';
export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  //添加click事件
  render() {
    const { count } = this.state;
    return (
      <Button
        type="primary"
        onClick={() => {
          this.handleClick(count);
        }}
      >
        事件点击次数 {count}
      </Button>
    );
  }
  //写事件handleClick
  handleClick = (count) => {
    // ...
    console.log('点击');
    this.setState({
      count: count + 1,
    });
  };
}
```

function component

```tsx
// function component
import React, { useState } from 'react';
import { Button } from 'antd';

// function component
const Test: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const handleClick = () => {
    // ...
    console.log('点击');
    setCount((c) => c + 1);
  };
  return (
    <Button
      type="primary"
      onClick={() => {
        handleClick();
      }}
    >
      事件点击次数 {count}
    </Button>
  );
};
export default Test;
```

## v-for

#### vue 版

```html
<div>
  <span v-for="(item, index) => {}" :key="item"> {{item}} </span>
</div>
```

#### react 版

```js
// ...
return (
  <div>
    {this.state.items.map((item, index) => {
      return <span key="{item}">{item}</span>;
    })}
  </div>
);
```

可以将遍历返回结果赋值给变量后调用

```js
// ...
let res = this.state.items.map((item, index) => {
  return;
  <span key="{item}">{item}</span>;
});
return <div>{res}</div>;
```

## v-if

#### vue 版

```html
<!-- 满足条件1 -->
<div v-if="条件1">满足条件1</div>
<!-- 满足条件2 -->
<div v-else-if="条件2">满足条件2</div>
<!-- 不满足条件1、2 -->
<div v-else>不满足条件1、2</div>
```

#### react 版

1.条件表达式渲染 （适用于两个组件二选一的渲染）

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';

interface Login {
  name?: string;
  [propName: string]: any;
}
// function component
const Test1: React.FC<Login> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = (val: string): void => {
    // ...
    console.log(val);
    setIsLoggedIn((prevStatus) => !prevStatus);
  };
  return (
    <div>
      <h1>
        Hello!
        {isLoggedIn && '您已登录'}
        {!isLoggedIn && '您已登出'}
      </h1>
      {isLoggedIn ? (
        <Button
          type="primary"
          onClick={() => {
            handleClick('登出');
          }}
        >
          登出
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            handleClick('登入');
          }}
        >
          登入
        </Button>
      )}
    </div>
  );
};

export default Test1;
```

2.&& 操作符渲染 (适用于一个组件有无的渲染)

```tsx
// 结合Test1组件
// ...
import React, { useState } from 'react';
import { Button } from 'antd';

interface Login {
  name?: string;
  [propName: string]: any;
}

const Test1: React.FC<Login> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClick = (val: string): void => {
    // ...
    console.log(val);
    setIsLoggedIn((prevStatus) => !prevStatus);
    props?.changeStatus();
  };
  return (
    <div>
      {isLoggedIn ? (
        <Button
          type="primary"
          onClick={() => {
            handleClick('登出');
          }}
        >
          登出
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            handleClick('登入');
          }}
        >
          登入
        </Button>
      )}
    </div>
  );
};

const Test2: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [desc, setDesc] = useState('登入');
  const handleClick = (val: string): void => {
    // ...
    console.log(val);
    setIsLoggedIn((prevStatus) => !prevStatus);
    setDesc((prevDesc) => (prevDesc === '登入' ? '登出' : '登入'));
  };
  return (
    <div>
      <h1>
        Hello!
        {isLoggedIn && '您已登录'}
        {!isLoggedIn && '您已登出'}
      </h1>
      <Test1
        changeStatus={() => {
          handleClick(desc);
        }}
      />
    </div>
  );
};
export default Test2;
```

3.利用变量输出组件渲染 （适用于有多个组件多种条件下的渲染）

```tsx
// ...
import React, { useState } from 'react';
import { Button } from 'antd';

const Test3: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [desc, setDesc] = useState('登出');
  const handleClick = (val: string): void => {
    // ...
    console.log(val);
    setIsLoggedIn((prevStatus) => !prevStatus);
    setDesc((prevDesc) => (prevDesc === '登入' ? '登出' : '登入'));
  };
  const logButton = isLoggedIn ? (
    <Button
      type="primary"
      onClick={() => {
        handleClick('登出');
      }}
    >
      登出
    </Button>
  ) : (
    <Button
      type="primary"
      onClick={() => {
        handleClick('登入');
      }}
    >
      登入
    </Button>
  );

  return (
    <div>
      <h1>Hello!您已{desc}</h1>
      {logButton}
    </div>
  );
};

export default Test3;
```

4.利用函数方法输出组件或者利用函数式组件进行渲染 （适用于多个子组件需要根据复杂的条件输出的情况）

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';

const Test4: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [desc, setDesc] = useState('登出');
  const handleClick = (val: string): void => {
    // ...
    console.log(val);
    setIsLoggedIn((prevStatus) => !prevStatus);
    setDesc((prevDesc) => (prevDesc === '登入' ? '登出' : '登入'));
  };
  const renderBtn = () => {
    if (isLoggedIn) {
      return (
        <Button
          type="primary"
          onClick={() => {
            handleClick('登出');
          }}
        >
          登出
        </Button>
      );
    }
    return (
      <Button
        type="primary"
        onClick={() => {
          handleClick('登入');
        }}
      >
        登入
      </Button>
    );
  };

  return (
    <div>
      <h1>Hello!您已{desc}</h1>
      {renderBtn()}
    </div>
  );
};

export default Test4;
```

## v-show

#### vue 版

```html
<div v-show="isShow"></div>
```

#### react 版

```tsx
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import user from 'mock/user';

interface Sub {
  name: string;
  count?: number;
}

interface Counter {
  name?: string;
  [propName: string]: any;
}
const Sub1: FunctionComponent<Sub> = React.memo(({ name, count }) => {
  console.log('sub1 渲染 count为', count);
  const [subName] = useState('count计算值');

  return (
    <div>
      <h5>{name}</h5>
      {subName}
      {count}
    </div>
  );
});

const Test1: React.FC<Counter> = () => {
  const [count, setCount] = useState(0);
  const handleCountPlus = () => {
    // ...
    setCount((prevCount) => prevCount + 1);
  };
  const handleResetCount = () => {
    setCount(99);
  };
  const showSub1 = count < 50;
  return (
    <div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            handleCountPlus();
          }}
        >
          count+1
        </Button>
        <Button
          type="primary"
          onClick={() => {
            handleResetCount();
          }}
        >
          设置count为99
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setCount(0);
          }}
        >
          设置count为0
        </Button>
      </Space>
      {/*视为sub1-1组件*/}
      <div style={{ display: showSub1 ? '' : 'none' }}>
        <Sub1 name={'sub1-1'} count={count} />
      </div>
      {/*视为sub1-2组件*/}
      <div style={{ display: !showSub1 ? '' : 'none' }}>
        <Sub1 name={'sub1-2'} count={count} />
      </div>
    </div>
  );
};
export default Test1;
```

> 通过 count 值控制 sub1-1 和 sub1-2 组件的展示， count<50 即 showSub1 为 true 显示 sub1-1 组件， count<50 范围内变化 都会使 sub1-1 组件重新渲染  
> count 设置为 99 时， 即 showSub1 为 false 展示 sub1-2 组件，但是重复设置 count=99 并不会触发 sub1-2 组件的刷新（等同 sub1-1 显示，重复设置 count=0）

## v-html

#### vue 版

```html
<div v-html="content"></div>
```

#### react 版

```js
render(){
  const {content} = this.state
  return (
    <div dangerouslySetInnerHTML={{__html: content}}></div>
  )
}
```

## v-model

#### vue 版

```html
<el-input v-model="count" @change="handleChangeCount"> </el-input>
```

#### react 版

react 是单向数据流，可以通过监听 change 事件实现

```tsx
import React from 'react';
import { useState } from 'react';
import { Input } from 'antd';

export default () => {
  const [val, setVal] = useState('');
  const onChange = (e: any) => {
    const { value } = e.target;
    console.log(value);
    setVal(value);
  };
  return (
    <div>
      输入框内容：{val}
      <Input
        defaultValue={val}
        placeholder="请输入"
        onChange={(value) => {
          onChange(value);
        }}
      />
    </div>
  );
};
```

# 2.定义变量

#### vue 版

```js
// 通过data函数返回
export default {
  data(){
    return {
      // ...
      data: 'data'
    }
  },
  ....
}
// 通过计算属性computed定义
export default {
  ...,
  computed:{
    data2(){
      return 'data2'
    }
  }
}
// 通过this.$set()方法定义
export default {
  ...,
  created(){
    this.$set('data3','data3')
  }
}
```

#### react 版

1.放在全局变量

```js
// 首先新建一个config.js文件，其中，“constants”表示名称，可以随意自己定义名称
global.constants = {
  website: 'http://www.baidu.com/',
  name: '百度',
};

// 在需要用到这个变量的页面声明config.js文件
import './config';

export default () => <div>名称：{global.constants.name}</div>;
```

2.组件内定义

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';

// 子组件
const Sub = (props: any) => {
  const { title } = props;
  return <h1>{title}</h1>;
};
// 父组件
export default () => {
  const [title, setTitle] = useState('title');
  const handleChange = (data: any) => {
    // 处理
    setTitle(data);
  };
  return (
    <div>
      <Sub title={title} />
      <Button
        type="primary"
        onClick={() => {
          handleChange('new title');
        }}
      >
        传参
      </Button>
    </div>
  );
};
```

# 3.计算属性

#### vue 版

```js
export default {
  data() {
    return {
      count: 1,
    };
  },
  computed: {
    // double依赖于count，当count改变时，double重新计算
    double() {
      return this.count + 1;
    },
  },
};
```

#### react 版

1.当 count 和 step 改变,，double 都会重新计算

```tsx
import React, { useState } from 'react';
import { Button, Space } from 'antd';

export default () => {
  const [count, setCount] = useState(0);
  const [step] = useState(1);
  const double = count * 2 + step;
  return (
    <div>
      <div>double：{double}</div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
          }}
        >
          修改count
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
          }}
        >
          修改step
        </Button>
      </Space>
    </div>
  );
};
```

2.使用 Hook useMemo，只有依赖改变时才会重新计算

```tsx
import React, { useState, useMemo } from 'react';
import { Button, Space } from 'antd';

const Test2 = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const counter = (count2: number, step2: number) => {
    return count2 + step2;
  };
  const nextCount = useMemo(() => {
    return counter(count, step);
  }, [count]);

  return (
    <div>
      <div>
        <span>count: {count}</span> <br />
        <span>step: {step}</span> <br />
        <span>nextCount: {nextCount}</span>
      </div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setCount((prevCount) => prevCount + step);
          }}
        >
          修改count
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setStep((prevStep) => prevStep + 1);
          }}
        >
          修改step
        </Button>
      </Space>
    </div>
  );
};

export default Test2;
```

> useMemo 返回一个 memoized（记忆值） 值。  
> 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。  
> 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。 useMemo 在渲染期间执行，不可进行 dom 操作。  
> 详细资料可查阅[官网文档](https://react.docschina.org/docs/hooks-reference.html)

# 4.监听属性的变化

#### vue 版

```js
watch:{
  // 当count值发生改变时
  count(oldValue, newValue){
    // ...
  }
}
```

#### react 版

##### **利用生命周期**

如果单纯 react 的话 如果状态发生变化，会触发组件生命周期中的如下方法：

```js
// class component
{
  // ...
  componentWillUpdate(object nextProps, object nextState)
  componentDidUpdate(object prevProps, object prevState)
}

// function component hook 模拟
// 模拟componentDidMount：
useEffect(()=>{console.log('首次渲染页面')},[])

// 模拟componentDidUpdate：
useEffect(()=>{console.log('任意属性变更')})
useEffect(()=>{console.log('指定元素n变更')},n)

// 模拟componentWillUnmount：
useEffect(()=>{console.log('首次渲染')
  return()=>{
    console.log('即将卸载')
  }
})
```

##### **利用 react hook 自定义实现**

1.实现雏形首先分析一下 Vue 中 watch 的功能，就是一个响应式的值发生改变以后，会触发一个回调函数，那么在 React 中自然而然的就想到了 useEffect 这个 hook，我们先来打造一个基础的代码雏形，把我们想要观察的值作为 useEffect 的依赖传入。

```js
// 定义useWatch
type Callback<T> = (prev: T | undefined) => void;

function useWatch<T>(dep: T, callback: Callback<T>) {
  useEffect(() => {
    callback();
  }, [dep]);
}

// 现在我们使用的时候就可以
const App: React.FC = () => {
  const [count, setCount] = useState(0);

  useWatch(count, () => {
    console.log('currentCount: ', count);
  });

  const add = () => setCount((prevCount) => prevCount + 1);

  return (
    <div>
      <p> 当前的count是{count}</p>
      {count}
      <button onClick={add} className="btn">
        +
      </button>
    </div>
  );
};
```

2.实现 oldValue  
在每次 count 发生变化的时候，会执行传入的回调函数。  
现在我们加入旧值的保存逻辑，以便于在每次调用传进去的回调函数的时候，可以在回调函数中拿到 count 上一次的值。

```js
function useWatch<T>(dep: T, callback: Callback<T>) {
  const prev = useRef<T>();

  useEffect(() => {
    callback(prev.current);
    prev.current = dep;
  }, [dep]);

  return () => {
    stop.current = true;
  };
}

// 这样就在每一次更新prev里保存的值为最新的值之前，先调用callback函数把上一次保留的值给到外部。
// 现在外部使用的时候 就可以
const Test: React.FC = () => {
  const [count, setCount] = useState(0);

  useWatch(count, (oldCount) => {
    console.log('oldCount: ', oldCount);
    console.log('currentCount: ', count);
  })

  const add = () => setCount(prevCount => prevCount + 1)

  return (
    <div>
      <p> 当前的count是{count}</p>
      {count}
      <button onClick={add} className="btn">+</button>
    </div>
  )
}
```

3.实现 immediate  
其实到此为止，已经实现了 Vue 中 watch 的主要功能了，  
现在还有一个问题是 useEffect 会在组件初始化的时候就默认调用一次，而 watch 的默认行为不应该这样。  
现在需要在组件初始化的时候不要调用这个 callback，还是利用 useRef 来做，利用一个标志位 inited 来保存组件是否初始化的标记。  
并且通过第三个参数 config 来允许用户改变这个默认行为。

```js
type Callback<T> = (prev: T | undefined) => void;
type Config = {
  immediate: boolean;
};

function useWatch<T>(dep: T, callback: Callback<T>, config: Config = { immediate: false }) {
  const { immediate } = config;

  const prev = useRef<T>();
  const inited = useRef(false);

  useEffect(() => {
    const execute = () => callback(prev.current);

    if (!inited.current) {
      inited.current = true;
      if (immediate) {
        execute();
      }
    } else {
      execute();
    }
    prev.current = dep;
  }, [dep]);
}
```

4.实现 stop  
还是通过 useRef 做，只是把控制 ref 标志的逻辑暴露给外部。

```js
type Callback<T> = (prev: T | undefined) => void;
type Config = {
  immediate: boolean;
};

function useWatch<T>(dep: T, callback: Callback<T>, config: Config = { immediate: false }) {
  const { immediate } = config;

  const prev = useRef<T>();
  const inited = useRef(false);
  const stop = useRef(false);

  useEffect(() => {
    const execute = () => callback(prev.current);

    if (!stop.current) {
      if (!inited.current) {
        inited.current = true;
        if (immediate) {
          execute();
        }
      } else {
        execute();
      }
      prev.current = dep;
    }
  }, [dep]);

  return () => {
    stop.current = true;
  };
}

// 这样在外部就可以这样去停止本次观察。
const Test: React.FC = () => {
  const [prev, setPrev] = useState()
  const [count, setCount] = useState(0);

  const stop = useWatch(count, (prevCount) => {
    console.log('prevCount: ', prevCount);
    console.log('currentCount: ', count);
    setPrev(prevCount)
  })

  const add = () => setCount(prevCount => prevCount + 1)

  return (
    <div>
      <p> 当前的count是{count}</p>
      <p> 前一次的count是{prev}</p>
      {count}
      <button onClick={add} className="btn">+</button>
      <button onClick={stop} className="btn">停止观察旧值</button>
    </div>
  )
}
```

> [参考文档](https://cloud.tencent.com/developer/article/1612870)

# 5.定义 slot

#### vue 版

```html
<!-- <base-layout>组件，具名插槽name定义以及默认插槽 -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- 引用<base-layout>组件 -->
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

#### react 版

###### **利用 pros 实现**

1.Layout 组件

```js
function Layout(props) {
  return (
    <div className="container">
      <header>{props.header}</header>
      <main>{props.children}</main>
      <footer>{props.footer}</footer>
    </div>
  );
}
```

2.传入 props

```js
function Home(params) {
  return (
    <div>
      <Layout header={<h1>Here might be a page title</h1>} footer={<p>Here's some contact info</p>}>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </Layout>
    </div>
  );
}
```
