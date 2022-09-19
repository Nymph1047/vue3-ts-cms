import { Module } from 'vuex'
import router from '@/router'

import {
  accountLoginRequset,
  userInfoRequest,
  userMenuRequest
} from '@/service/login'
import localCache from '@/utils/cache'

import { AccountLoginType } from '@/service/login/type'
import { IRootState } from '@/store/types'
import { ILoginState } from './types'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload: any) {
      state.userMenus = payload
    }
  },
  actions: {
    async accountLoginAction(context, payload: AccountLoginType) {
      // 登陆信息
      const loginResult = await accountLoginRequset(payload)
      const { id, token } = loginResult.data
      context.commit('changeToken', token)
      localCache.setCache('token', token)
      // 登陆后用户信息
      const userInfoResult = await userInfoRequest(id)
      context.commit('changeUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data)
      //请求用户菜单
      const userMenuResult = await userMenuRequest(id)
      context.commit('changeUserMenus', userMenuResult.data)
      localCache.setCache('userMenus', userMenuResult.data)
      // 路由跳转
      router.push('/main')
    }
  }
}

export default loginModule
