// 定义一个请求拦截接口
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YLRequsetInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 继承，变成自己的类型
export interface YLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YLRequsetInterceptors<T>
  showLoading?: boolean
}
