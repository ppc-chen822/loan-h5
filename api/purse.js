const http = uni.$u.http
const baseURL = 'http://api.huokexinxi.com' /* 根域名 */

// 查询用户收支记录
export const getCustAccountApi = (params) => http.get(
  `${baseURL}/api/custAccountbase/list`, { params }
)
//查询用户佣金
export const getCommissionApi = (params) => http.get(
  `${baseURL}/api/custAccountbase/commission`, params
)
// 查询用户钱包
export const getPurseApi = (params) => http.get(
  `${baseURL}/api/custAccountbase/getCustAccountbaseById`, { params }
)
// 查询账户
export const selectAccountApi = (params) => http.get(
  `${baseURL}/api/custAccountbase/getBankCard`, { params }
)
// 添加账户
export const addAccountApi = (params) => http.get(
  `${baseURL}/api/custAccountbase/addBankCard`, { params }
)
// 解除绑定
export const delAccountApi = (params) => http.get(
  `${baseURL}/api/custAccountbase/delBankCard`, { params }
)
// 提现
export const pullMoneyApi = (params) => http.get(
  `${baseURL}/api/alipay/cash`, { params }
)
