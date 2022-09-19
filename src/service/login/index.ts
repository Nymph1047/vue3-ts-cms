import { ylRequest } from '@/service/index'

import { ResultType } from '@/service/type'
import { AccountLoginType, AccountLoginResultType } from '@/service/login/type'

enum AccountLoginAPI {
  ACCOUNT_LOGIN = '/login',
  USER_INFO = '/users/',
  USER_MENU = 'role/'
}

export function accountLoginRequset(account: AccountLoginType) {
  return ylRequest.post<ResultType<AccountLoginResultType>>({
    url: AccountLoginAPI.ACCOUNT_LOGIN,
    data: {
      ...account,
      name: 'coderwhy'
    }
  })
}

export function userInfoRequest(id: number) {
  return ylRequest.get<ResultType>({
    url: AccountLoginAPI.USER_INFO + id
  })
}

export function userMenuRequest(id: number) {
  return ylRequest.get<ResultType>({
    url: AccountLoginAPI.USER_MENU + id + '/menu'
  })
}
