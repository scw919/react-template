import storage from 'good-storage';

// 异步接口，真实项目替换ajax
function asyncInit(val: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(` 【我是更新后的值：${val.payload}】`);
    }, 2000);
  });
}

export default {
  namespace: 'come', // 可省略 省略取文件名
  state: {
    // 初始化状态
    title: 'Hi Welcome',
    text: '我是一段默认的描述文字',
    token: storage.session.get('token', null),
    menu: storage.session.get('menu', []), // 菜单
  },
  effects: {
    // 异步操作 基于Generator函数
    *init(payload: any, { call, put }: any): any {
      const res = yield call(asyncInit, payload);
      // const current = yield select(({come}:any) => come.text)
      // const data = yield select(({ base }: any) => base.token);
      // console.log(data);

      yield put({ type: 'changeVal', res });
    },
  },
  reducers: {
    // 同步操作 reducer 改变state
    changeVal(state: any, action: any) {
      // return Object.assign(state, { title: state.title + action.res });
      return { ...state, title: state.title + action.res };
    },
    addTextDesc(state: any, action: any) {
      return { ...state, text: action.txt };
    },
    resetVal(state: any): any {
      return { ...state, title: '' };
    },
    setTokenVal(state: any, action: any) {
      storage.session.set('token', action.token);
      return { ...state, token: action.token };
    },
    setMenuVal(state: any, action: any) {
      storage.session.set('menu', action.menu);
      return { ...state, menu: action.menu };
    },
  },
  subscriptions: {
    // 用来订阅数据 subscriptions函数参数有dispatch 和 history
    // 监听路由
    step({ dispatch, history }: any) {
      return history.listen(({ pathname }: any) => {
        let txt;
        if (pathname === '/welcome') {
          txt = '欢迎页面';
        } else {
          txt = '其他页面';
        }
        dispatch({ type: 'addTextDesc', txt });
      });
    },
  },
};
