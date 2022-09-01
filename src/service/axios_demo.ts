//配置请求数据
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
// // axios的实例方法
// 模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res: any) => {
  console.log(res.data)
})

// get请求并传递参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'coderwhy',
//       age: 18
//     }
//   })
//   .then((res: any) => {
//     console.log(res.data)
//   })
//
// // post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res: any) => {
//     console.log(res.data)
//   })

// 额外补充的promise中类型的使用
// Promise本身是可以有类型
// new Promise<string>((resolve) => {
//   resolve('abc')
// }).then((res) => {
//   console.log(res.length)
// })

// axios的配置选项
// 4.1全局的配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// 4.2 每一个请求单独的配置
// axios
//   .get('/get', {
//     params: {
//       name: 'coderwhy',
//       age: 18
//     },
//     timeout: 5000,
//     headers: {}
//   })
//   .then((res: any) => {
//     console.log(res.data)
//   })
//
// // post请求
// axios
//   .post('/post', {
//     data: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res: any) => {
//     console.log(res.data)
//   })

// axios.all 多个请求 一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'why', age: 18 } }),
    axios.post('/post', { data: { name: 'why', age: 18 } })
  ])
  .then((res: Array<object>) => {
    console.log(res[0])
    console.log(res[1])
  })

// axios的拦截器
// fn1:请求发送成功会执行的函数
// fn2：请求发送失败会执行的函数
// axios.interceptors.request.use(fn1, fn2)

axios.interceptors.request.use(
  (config: any) => {
    // 想做的一些操作
    // 1、给请求添加token
    // 2、isLoading动画
    console.log('请求成功的拦截')
    return config
  },
  (err: string) => {
    console.log('请求发送错误')
    return err
  }
)

// fn1:数据响应成功会执行的函数
// fn2：数据响应失败会执行的函数
// axios.interceptors.response.use(fn1.fn2)
axios.interceptors.response.use(
  (res: any) => {
    console.log('响应成功的拦截')
  },
  (err: any) => {
    console.log('服务器响应失败')
    return err
  }
)
