import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
export const router = new Router(
  {
    /* mode:'history'时build出现空白，要删除或mode:'hash' */
    // mode: 'history',
    // 路由选项高亮设置
    linkActiveClass: 'active',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/first',
        component: resolve => require(['@/views/first'], resolve), /* 路由懒加载 用时再加载  可以有效的分担首页所承担的加载压力，减少首页加载用时 */
        meta: {
          login_required: true
        }
      },
      {
        path: '/second',
        component: resolve => require(['@/views/second'], resolve),
        meta: {
          login_required: true
        }
      },
      {
        path: '/third',
        component: resolve => require(['@/views/third'], resolve),
        meta: {
          login_required: true
        }
      },
      {
        path: '/four',
        component: resolve => require(['@/views/four'], resolve),
        meta: {
          login_required: true
        }
      },
      {
        path: '/login',
        component: resolve => require(['@/views/login'], resolve),
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
    var islogining = store.getters.islogining
    if (islogining) {
      next()
    } else {
      next('/login')
    }
  }
  // var islogining = store.getters.islogining
  // if (to.matched.some(item => item.meta.login_required)) {
  //   if (islogining) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // } else {
  //   next()
  // }
})
