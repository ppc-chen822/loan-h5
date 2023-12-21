import { CLIENT_ID, CLIENT_SECRET } from '@/constant';
// import { logOutApi, refresTokenApi } from '@/api/my.js'

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	uni.$u.http.setConfig((config) => {
		config.baseURL = 'http://web.huokexinxi.com' /* 根域名 */
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		config.data = config.data || {}
		if (uni.getStorageSync('token')) {
			config.header.Authorization = 'Bearer ' + uni.getStorageSync('token')
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data

		if (!data.code) {
			return response.data === undefined ? {} : response.data
		}

		// 自定义参数
		const custom = response.config?.custom
		if (data.code !== 200) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.msg)
			}

			// 如果需要catch返回，则进行reject
			if (custom?.catch || true) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => { })
			}
		}
		return data.data === undefined ? {} : data.data
	}, (response) => {
		// 通用了错误处理
		const code = response?.status || response?.data?.code;
		const message = response?.data?.msg || response?.statusText || message;
		const ERROR_MESSAGE = {
			url: response.config.url,
			code: response?.data?.code || code,
			message
		};

		switch (code) {
			case 400: {
				uni.$u.toast('错误(400): 程序错误，请联系管理员。');
				console.error('参数错误:', ERROR_MESSAGE);
				break;
			}
			case 401: {
				uni.$u.toast('错误(401): 未认证');
				console.error('没有权限:', ERROR_MESSAGE);
				break;
			}
			case 403: {
				uni.$u.toast('错误(403): 您没有访问权限。');
				console.error('没有权限:', ERROR_MESSAGE);
				break;
			}
			case 404: {
				uni.$u.toast('错误(404):' + ERROR_MESSAGE.message);
				console.error('错误(404):', ERROR_MESSAGE);
				break;
			}
			// refresh token 过期
			case 426: {
				console.error('错误(426):', '登录已过期，请重新登录。');
				break;
			}
			case 500: {
				uni.$u.toast(`错误(500):${ERROR_MESSAGE.message}[${ERROR_MESSAGE.code}]`);
				console.error('服务器异常:', ERROR_MESSAGE);
				break;
			}
			case 504: {
				uni.$u.toast('错误(504):数据请求超时，请稍后重试。');
				console.error('请求超时:', ERROR_MESSAGE);
				break;
			}
			default: {
				uni.$u.toast(`错误(${ERROR_MESSAGE.code}):${ERROR_MESSAGE.message}`);
				console.error('未定义错误:', ERROR_MESSAGE);
			}
		}
		return Promise.reject(response)
	})
}