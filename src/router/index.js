import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

Vue.use(Router)
/* Layout */

export const router = new Router(
  {
    /* mode:'history'时build出现空白，要删除或mode:'hash' */
    // mode: 'history',
    // 路由选项高亮设置
    linkActiveClass: 'active',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '',
        component: Layout,
        redirect: '/overview',
        children: [
          {
            path: 'overview',
            name: 'overview',
            component: resolve => require(['@/views/overview'], resolve), /* 路由懒加载 用时再加载  可以有效的分担首页所承担的加载压力，减少首页加载用时 */
            meta: {login_required: true},
            children: [{
              path: 'monitor',
              name: 'monitor',
              component: resolve => require(['@/views/overview/monitor'], resolve),
              meta: {login_required: true}
            }]
          }
        ]
      },
      {
        path: '/institute',
        component: Layout,
        children: [{
          path: '',
          name: 'institute',
          component: resolve => require(['@/views/institute'], resolve),
          meta: {login_required: true}
        }]
      },
      {
        path: '/tables',
        component: Layout,
        children: [{
          path: '',
          name: 'tables',
          component: resolve => require(['@/views/tables'], resolve),
          meta: {login_required: true}
        }]
      },
      {
        path: '/alerts',
        component: Layout,
        children: [{
          path: '',
          name: 'alerts',
          component: resolve => require(['@/views/alerts'], resolve),
          meta: {
            login_required: true
          }
        }]
      },
      {
        path: '/setinfo',
        component: Layout,
        children: [{
          path: '',
          name: 'setinfo',
          component: resolve => require(['@/components/SetInfo'], resolve),
          meta: {login_required: true}
        }]
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
  var token = sessionStorage.getItem('token')
  if (to.matched.some(item => item.meta.login_required) && !token) {
    next('/login')
  } else {
    next()
  }
})
