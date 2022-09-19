// service统一出口
import YLRequest from '@/service/request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const ylRequest = new YLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        // 内置的并没有这个变量所以我们要告诉ts这个东西是一定存在的 就是在变量前加一个!
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

// export default ylRequest

// export class ylRequest {}
export { ylRequest }
