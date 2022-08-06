import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    ElMessage.error('登录失败')
                    store.dispatch('user/resetToken').then(() => {
                    })
                    break

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    ElMessage.error('token 过期了')
                    // 清除token
                    store.dispatch('user/resetToken').then(() => {
                    })
                    break

                // 404请求不存在
                case 404:
                    ElMessage.error('网络请求不存在')

                    break
                // 其他错误，直接抛出错误提示
                default:
                    ElMessage.error(error.response.data.message ? error.response.data.message : error.response.data)
            }
            return Promise.reject(error.response)
        }
    }
)

export default service
