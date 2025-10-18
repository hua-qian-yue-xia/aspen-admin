import { Api } from "../gen/gen-api"

const API = new Api()

const API_INSTANCE = API.instance

API_INSTANCE.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
API_INSTANCE.defaults.timeout = 10_000

// 请求拦截器
API_INSTANCE.interceptors.request.use((config) => {
	return config
})

// 响应拦截器
API_INSTANCE.interceptors.response.use((response) => {
	console.log(response, "response")

	return response
})

export { API }
