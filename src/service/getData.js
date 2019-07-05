import Http from '@/utils/axios'
// user
export const userauthorize = (params) => new Http().require({api: '/api/user/authorize', param: params, methods: 'POST'}) // 登陆授权
export const useraccount = (params) => new Http().require({api: '/api/user/account', param: params}) // 授权访问

// institute
export const getinstitute = (params) => new Http().require({api: '/api/institute', param: params})
// 数据交换
export const getdata = (params, lastparams) => new Http().require({api: '/api/data/', param: params})
