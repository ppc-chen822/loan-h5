const http = uni.$u.http
const baseURL = 'http://api.huokexinxi.com' /* 根域名 */

// 获取产品列表
export const getProductApi = (type) => http.get(
  `${baseURL}/api/product/list/${type}`
)
// 登录
export const userInfoApi = (params) => http.post(
  `${baseURL}/api/user/mpLogin`, params
)
// 手机号注册
export const bindPhoneApi = (params) => http.post(
  `${baseURL}/api/user/register/bind`, params
)