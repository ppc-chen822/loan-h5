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
// 申请产品
export const applyProductApi = (deviceId, params) => http.post(
	`/api/productOrder/createOrder/${deviceId}`,
	params
)
// 产品列表
export const getProListApi = (type, companyName, data) => http.get(
	`/api/productOrder/list/${type}?companyName=${companyName}`, data
)
// 查询产品详情
export const getProDetailApi = (productOrderId) => http.get(
	`/api/productOrder/detail/${productOrderId}`
)
// 注册
export const registApi = (params) => http.post(
	`/api/user/register`,
	params
)
// 更新订单
export const updateOrderApi = (id, params) => http.put(
	`/api/productOrder/updateOrder/${id}`,
	params
)
// 发送短信
export const smsCodeApi = (params) => http.post(
	`/api/sms/getVerifyCode`, params,
	{
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
)
// 下载
export const downloadApi = (params) => http.get(
	`/api/appConfig/getAppConfig`,
	params
)