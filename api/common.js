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


const baseURL = 'http://api.huokexinxi.com' /* 根域名 */

// 申请产品
export const applyProductApi = (deviceId, params) => http.post(
	`${baseURL}/api/productOrder/createOrder/${deviceId}`,
	params
)
// 产品列表
export const getProListApi = (type, userId, params) => http.get(
	`${baseURL}/api/productOrder/list/${type}/${userId}`, { params }
)
// 查询产品详情
export const getProDetailApi = (productOrderId) => http.get(
	`${baseURL}/api/productOrder/detail/${productOrderId}`
)
// 注册
export const registApi = (params) => http.post(
	`${baseURL}/api/user/register`,
	params
)
// 更新订单
export const updateOrderApi = (id, params) => http.put(
	`${baseURL}/api/productOrder/updateOrder/${id}`,
	params
)
// 发送短信
export const smsCodeApi = (params) => http.post(
	`${baseURL}/api/sms/getVerifyCode`, params,
	{
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
)
// 下载
export const downloadApi = (params) => http.get(
	`${baseURL}/api/appConfig/getAppConfig`,
	params
)
// 配单
export const matchOrderApi = (userId, params) => http.post(
	`${baseURL}/api/authCompany/matchOrder/${userId}`,
	params
)
// 企业信息查询
export const getCompanyApi = (params) => http.get(
	`${baseURL}/api/authCompany/matchCompanyName`,
	{params}
)