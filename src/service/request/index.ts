import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance } from 'axios'
import type { YLRequsetInterceptors, YLRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEAFULT_LOADING = true
class YLRequest {
  // axios的实例
  instance: AxiosInstance
  interceptors: YLRequsetInterceptors
  showLoading: boolean
  loading?: LoadingInstance
  constructor(config: YLRequestConfig) {
    // 每次都会创建新的instance
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    // 从config中取出的拦截器是对应的实例的拦截器
    this.interceptors = config.interceptors || {}
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 添加所有的实例都有的拦截器
    // 请求是后添加的先执行，响应是后添加的后执行
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    ),
      this.instance.interceptors.response.use(
        (res) => {
          this.loading?.close()
          const data = res.data
          if (data.returnCode === '-1001') {
          } else {
            return data
          }
        },
        (err) => {
          this.loading?.close()
          // 可用switch
          if (err.response.status === 404) {
            console.log('404错误')
          }
          return err
        }
      )
  }
  // 封装一个request函数
  requset<T>(config: YLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对请求config的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将showLoading设置为true 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.requset<T>({ ...config, method: 'GET' })
  }
  post<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.requset<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.requset<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.requset<T>({ ...config, method: 'PATCH' })
  }
}

export default YLRequest
