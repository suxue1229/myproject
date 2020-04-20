import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from '@/js/untils/validate.js'

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
        path: '/overview',
        name: 'overview',
        component: resolve => require(['@/views/overview'], resolve), /* 路由懒加载 用时再加载  可以有效的分担首页所承担的加载压力，减少首页加载用时 */
        meta: {
          login_required: true
        },
        children: [{
          path: 'monitor',
          name: 'monitor',
          component: resolve => require(['@/views/overview/monitor'], resolve),
          meta: {
            login_required: true
          }
        }]
      },
      {
        path: '/institute',
        name: 'institute',
        component: resolve => require(['@/views/institute'], resolve),
        meta: {
          login_required: true
        }
      },
      {
        path: '/tables',
        name: 'tables',
        component: resolve => require(['@/views/tables'], resolve),
        meta: {
          login_required: true
        }
      },
      {
        path: '/alters',
        name: 'alters',
        component: resolve => require(['@/views/alters'], resolve),
        meta: {
          login_required: true
        }
      },
      {
        path: '/login',
        component: resolve => require(['@/views/login'], resolve)
      },
      {
        path: '/*',
        redirect: '/login'
      }
    ]
  })
export default router

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  var token = getCookie('token')
  if (to.matched.some(item => item.meta.login_required) && !token) {
    next('/login')
  } else {
    next()
  }
})
