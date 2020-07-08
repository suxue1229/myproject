// import Router from 'myRouter'
import Router from 'vue-router'
import Layout from '@/views/layout'
import Vue from 'vue'

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
        path: '/roles',
        component: Layout,
        children: [{
          path: '',
          name: 'roles',
          component: resolve => require(['@/views/roles'], resolve),
          meta: {
            login_required: true,
            roles: 'admin'
          }
        }]
      },
      {
        path: '/setinfo/:url',
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
        path: '*',
        component: resolve => require(['@/views/error'], resolve)
      }
    ]
  })
export default router

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  var token = sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')).login.token : ''
  // if (token) {
  //   if (to.path === '/login') {
  //     next()
  //   } else {
  //     store.dispatch('user_account')
  //       .then(() => {
  //         let role = JSON.parse(sessionStorage.getItem('store')).login.user.LastName
  //         if (to.matched.some(item => { return item.meta && (item.meta.roles === role) })) {
  //           alert('欢迎admin管理员！')
  //           next()
  //         } else {
  //           if (to.path === '/roles') {
  //             alert('无权限')
  //             next('/error')
  //           } else {
  //             next()
  //           }
  //         }
  //       })
  //       .catch(error => {
  //         next('/login')
  //         console.log(error)
  //       })
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }

  if (to.matched.some(item => item.meta.login_required) && !token) {
    next('/login')
  } else {
    next()

    // if (sessionStorage.getItem('store')) {
    //   let role = JSON.parse(sessionStorage.getItem('store')).login.user.LastName
    //   if (to.matched.some(item => { return item.meta.roles === role })) {
    //     next()
    //   } else {
    //     alert('无权限！！！')
    //     next('/login')
    //   }
    // } else {
    // next('/login')
    // }
  }
})
