import { queryCurrent, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // 获取当前登录用户数据
    *fetchCurrent(_, { call, put }) {
      // 看本地localStorage是否有用户信息，没有再请求
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));

      // console.log("user",userInfo)
      if(!userInfo){
        // 如果没有再用queryCurrent请求数据
        userInfo = yield call(queryCurrent);
      // 把用户信息存入localStorage
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
      } 
      // console.log('res',response)
      yield put({
        type: 'saveCurrentUser',
        payload: userInfo,
      });
    },
  },
  reducers: {
    // 存储用户信息
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;
