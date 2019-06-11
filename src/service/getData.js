import Http from '@/utils/axios'
// member
export const login = (params) => new Http().require({api: '/api/user/authorize', param: params}) // 登陆授权
export const account = (params) => new Http().require({api: '/api/user/account', param: params}) // 授权访问
