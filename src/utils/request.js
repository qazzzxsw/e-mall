import axios from "axios";
import store from "@/store";
import qs from "qs";

/******
 * axios请求封装
 */
//取消请求
const CancelToken = axios.CancelToken;

//创建一个axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, //api的base_url
  timeout: 5000000, //请求超时时间
  withCredentials: true //运行跨域带上cookies
})

export default ({
  url,
  method = 'GET',
  params,
  formEncoded = false,
  multipart = false
}) => {
  //判断登录状态
  if (
    localStorage.getItem('access_token') &&
    localStorage.getItem('USER_INFO') &&
    localStorage.getItem('access_token') === 'null' &&
    !!localStorage.getItem('USER_INFO')
  ) {
    console.log('从后台已退出,刷新也页面');
    store.dispatch('logout')
    return
  }

  //请求方法handler
  method = method.toUpperCase()
  const userInfo = store.state.app.userInfo

  //handle headers
  const headers = {}
  if (userInfo) {
    headers['userId'] = userInfo['userId']
    headers['access_token'] = userInfo['access_token']
    headers['expires_in'] = userInfo['expires_in']
    headers['refresh_token'] = userInfo['refresh_token']
    headers['token_type'] = userInfo['token_type']
    headers['scope'] = userInfo['scope']
    headers['jti'] = userInfo['jti']
    headers['login_time'] = new Date().getTime()
  }

  //设置请求content-type类型
  if (formEncoded) {
    //form表单数据被编码为key/value格式发送到服务器
    headers['content-type'] = 'application/x-www-form-urlencoded'
    params = qs.stringify(params) //序列化请求参数
  }
  if (multipart) {
    //在表单中进行文件上传时，就需要使用该格式
    headers['content-type'] = 'multipart/form-data'
  }

  const options = {
    method,
    url,
    headers
  }
  method === 'GET' ? options.params = params : options.data = params
  options.CancelToken = new CancelToken(function executor(c) {
    store.commit('SET_HTTP_REQUEST_LIST', c)
  })
  return service(options)
}

//请求拦截器
service.interceptors.request.use(
  config => {
    const hours = Number()
  }
)
