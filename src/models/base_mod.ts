export default {
  namespace: 'base',
  state: {
    token: 66,
  },
  reducers: {
    saveToken(state: any, action: string): any {
      return { ...state, token: action };
    },
  },
};
