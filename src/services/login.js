import request from '@/utils/request';


// 执行登录，获取token
export async function fakeAccountLogin(params) {
  // 修改成我们的api
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}


/**
 *退出登录
 *
 * @export
 * @return {*} 
 */
export async function logout(){
  return request.post('/auth/logout');
}
