import axios from 'axios';
// 创建axios实例
const service = axios.create({
	baseURL: process.env.API_ROOT,
	timeout: 60000, // 请求超时时间60秒
	headers: { 'X-Fast-Oss-Type': '1' }
});

// request拦截器
service.interceptors.request.use(config => {
	return config;
}, error => {
	Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
	response => {
		/*
		 * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
		 */
		 console.log(response)
		 if (response.status == 200) {
			const data = response.data;
			if (data.success) {
				console.log(data);
				return data;
			}
			return Promise.reject(data.message + ':' + data.subMessage);
		}
		console.log('Response ERROR', response);
		alert("系统繁忙,请稍后重试!");
		return Promise.reject(response);
	},
	error => {
		console.log('Response ERROR', error.response);
		alert("网络连接错误，请检查您的网络!");
		return Promise.reject(error.response);
	}
);

export default service