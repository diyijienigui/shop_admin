import { history } from 'umi';
import { fakeAccountLogin, logout } from '@/services/login';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
  },
  effects: {
    *login({ payload }, { call, put }) {
      // 发送请求执行登录
      const response = yield call(fakeAccountLogin, payload);
      // console.log(response)
      // 拿到token
      // console.log(response.status)
      // 判断是否登录成功
      if(response.status === undefined){
        message.success('登录成功');
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully

        // 跳转到首页
        history.replace('/');
      }
    },

    // 退出登录
    *logout(_,{call}) {
      // loading
      const load = message.loading('退出中...');

      // 请求api 退出登录
      const response = yield call(logout)
      if(response.status === undefined){

      // 删除本地存储token和userinfo
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');
        // 重定向
        message.success('退出成功');

        history.replace('/login');       
      }
      load();
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.access_token);
      // 将token存入localStora
      localStorage.setItem('access_token',payload.access_token)
      return { ...state };
    },
  },
};
export default Model;
