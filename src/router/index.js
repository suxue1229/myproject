import Vue from 'vue'
import Router from 'vue-router'
import firstrouter from './firstrouter'
import secondrouter from './secondrouter'
import thirdrouter from './thirdrouter'
import fourrouter from './fourrouter'

Vue.use(Router)
export default new Router(
  {
    mode: 'history',
    // 路由选项高亮设置
    linkActiveClass: 'active',
    base: process.env.BASE_URL,
    routes: [
      firstrouter,
      secondrouter,
      thirdrouter,
      fourrouter,
      {
        path: '/*',
        redirect: '/first'
      }
    ]
  })
