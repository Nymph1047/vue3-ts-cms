// service统一出口
import YLRequest from '@/service/request'
import { BASE_URL, TIME_OUT } from './request/config'

const ylRequest = new YLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = ''
      if (token) {
        // 内置的并没有这个变量所以我们要告诉ts这个东西是一定存在的 就是在变量前加一个!
        config.headers!.Authorization = `Brarer ${token}`
      }
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    }
  }
})

export default ylRequest
