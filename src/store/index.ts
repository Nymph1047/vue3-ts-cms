import { createStore } from 'vuex'
import loginModule from './login'
import { IRootState } from '@/store/types'
// import { IRootState, IRootWithModule, IStoreType } from './types'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderwhy'
    }
  },
  modules: {
    login: loginModule
  }
})

export default store
