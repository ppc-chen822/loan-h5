const http = uni.$u.http

// 获取产品列表
export const getFirmApi = (userId) => http.get(
  `/system/company/user/${userId}`
)
// 通过公司名称查询产品列表
export const getFirmByIdApi = (userId, companyName) => http.get(
  `/system/company/${userId}/${companyName}`
)