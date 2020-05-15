import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


//NProgress Configuration
NProgress.configure({
  showSpinner: false
})
Vue.use(Router)

export default new Router({
  routes: [
    /******login ****/
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录',
        name: 'login'
      }
    },
    /******register ****/
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/register'),
      meta: {
        title: '注册',
        name: 'register',
        header: ['redBar']
      }
    },
    /******resetPassword ****/
    {
      name: 'resetPassword',
      path: '/resetPassword',
      component: () => import('@/views/resetPassword'),
      meta: {
        title: '忘记密码',
        name: 'resetPassword',
        header: ['redBar']
      }
    }, {
      path: '*',
      redirect: '/login'

    }
  ]
})
