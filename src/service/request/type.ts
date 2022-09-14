// 定义一个请求拦截接口
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YLRequsetInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptor?: (config: any) => any
  responseInterceptorCatch?: (error: any) => any
}

// 继承，变成自己的类型
export interface YLRequestConfig extends AxiosRequestConfig {
  interceptors?: YLRequsetInterceptors
  showLoading?: boolean
}
