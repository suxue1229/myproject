import Http from '@/utils/axios'
// user
export const userauthorize = (params) => new Http().require({api: '/api/user/authorize', param: params}) // 登陆授权
export const useraccount = (params) => new Http().require({api: '/api/user/account', param: params}) // 授权访问
