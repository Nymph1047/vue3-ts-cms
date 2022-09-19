import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
// 全局引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/base.less'
// import { ElButton } from 'element-plus/lib/index'
// import './service/axios_demo''

import App from './App.vue'

import router from '@/router'
import store from '@/store'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
