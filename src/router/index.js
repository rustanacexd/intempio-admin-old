import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/401', component: () => import('@/views/401'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/',
    name: 'Dashboard Redirect',
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'noredirect',
    name: 'Dashboard',
    children: [{
      path: '',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/biogen-events',
    component: Layout,
    redirect: '/biogen-events/',
    name: 'biogenEvents',
    meta: {
      title: 'Biogen',
      icon: 'table'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/events/biogen/index'),
        name: 'biogenEventIndex',
        meta: { title: 'Biogen', icon: 'table2' }
      }
    ]
  },
  {
    path: '/biogen-events',
    component: Layout,
    redirect: '/biogen-events/',
    hidden: true,
    children: [
      {
        path: 'create-event',
        component: () => import('@/views/events/biogen/create'),
        name: 'biogenCreateEvent',
        meta: { title: 'Create', icon: 'form' }
      },
      {
        path: 'edit-event/:eventId',
        component: () => import('@/views/events/biogen/edit'),
        name: 'biogenEditEvent',
        meta: { title: 'Edit', icon: 'form' }
      }
    ]
  },
  {
    path: '/sunovion-events',
    component: Layout,
    redirect: '/sunovion-events/',
    name: 'sunovionEvents',
    meta: {
      title: 'Sunovion',
      icon: 'table'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/events/sunovion/index'),
        name: 'sunovionEventIndex',
        meta: { title: 'Sunovion', icon: 'table2' }
      }
    ]
  },
  {
    path: '/sunovion-events',
    component: Layout,
    redirect: '/sunovion-events/',
    hidden: true,
    children: [
      {
        path: 'create-event',
        component: () => import('@/views/events/sunovion/create'),
        name: 'sunovionCreateEvent',
        meta: { title: 'Create', icon: 'form' }
      },
      {
        path: 'edit-event/:eventId',
        component: () => import('@/views/events/sunovion/edit'),
        name: 'sunovionEditEvent',
        meta: { title: 'Edit', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

