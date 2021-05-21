/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { message } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '成功处理了请求。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */

const errorHandler = async (error) => {
  const { response } = error;

  if (response && response.status) {
    let errorText = codeMessage[response.status] || response.statusText;
    const { status} = response;
    // 获取服务器返回信息，json返回是一个promise
    // response.json().then((res) => {
    //   console.log(res)
    // })
    // console.log(status);

    const result = await response.json();
    // console.log(result)

    // 处理422未验证通过的情况
    if(status === 422){
      let errs = '';
      // 取error各个字段的值
      // for(const key in result.errors){
      //   if (result.errors.hasOwnProperty(key) === true){
      //   errs += result.errors[key][0];
      //   }
      // }

      Object.keys(result.errors).forEach(key => {
        errs += result.errors[key][0];
       })
      // console.log(errs)
      errorText += `[${errs}]`
    }

    // 处理400的情况
    if(status === 400){
      errorText += `[${result.message}]`
    }
    message.error(errorText)
  } else if (!response) {
    message.error('Your network is abnormal and cannot connect to the server');
  }

  return response;
};
/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // default error handling
  credentials: 'include', // Does the default request bring cookies
  prefix: '/api'
});

// 请求拦截器，在请求之前添加拦截头
request.interceptors.request.use((url, options) => {

  // 获取token
  const token = 'hello';

  // 设置header头
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return {
    url,
    options: { ...options, headers },
  };
});
export default request;
