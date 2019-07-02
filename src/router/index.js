import Vue from 'vue'
import Router from 'vue-router'
import firstrouter from './firstrouter'
import secondrouter from './secondrouter'
import thirdrouter from './thirdrouter'
import fourrouter from './fourrouter'
import Login from '@/views/login'

Vue.use(Router)
export const router = new Router(
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
        path: '/login',
        component: Login
      },
      {
        path: '/',
        redirect: '/login'
      }
    ]
  })
export default router

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = sessionStorage.getItem('Authorization')
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
