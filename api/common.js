const http = uni.$u.http

// 授权页面
export const getAuthorizeUrlApi = (deviceId, userId, params) => http.post(
	`/system/company/auth/${deviceId}/${userId}`,
	params
)
// 获取企业信息数据
export const getFirmDataApi = (deviceId) => http.get(
	`/system/company/taxdatainfo/${deviceId}`
)
// 查询产品信息接口
export const getProductApi = (deviceId) => http.get(
	`/system/company/productaccessinfo/${deviceId}`
)