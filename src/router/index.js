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
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/401', component: () => import('@/views/401'), hidden: true },
  { path: '/500', component: () => import('@/views/500'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterMap = [
  {
    path: '/biogen-events',
    component: Layout,
    redirect: '/biogen-events/',
    name: 'biogenEvents',
    meta: {
      title: 'Biogen',
      icon: 'table',
      role: ['staff']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/events/biogen/index'),
        name: 'biogenEventIndex',
        meta: { title: 'Biogen', icon: 'table' }
      }
    ]
  },
  {
    path: '/biogen-events',
    component: Layout,
    redirect: '/biogen-events/',
    hidden: true,
    // meta: { role: ['biogen'] },
    children: [
      {
        path: 'create-event',
        component: () => import('@/views/events/biogen/create'),
        name: 'biogenCreateEvent',
        meta: {
          title: 'Create',
          icon: 'form',
          role: ['biogen']
        }
      },
      {
        path: 'edit-event/:eventId',
        component: () => import('@/views/events/biogen/edit'),
        name: 'biogenEditEvent',
        meta: {
          title: 'Edit',
          icon: 'form',
          role: ['biogen']
        }
      },
      {
        path: 'history/:eventId',
        component: () => import('@/views/events/biogen/history'),
        name: 'biogenEventHistory',
        meta: { title: 'History', icon: 'form' }
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
      icon: 'table',
      role: ['staff']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/events/sunovion/index'),
        name: 'sunovionEventIndex',
        meta: { title: 'Sunovion', icon: 'table' }
      }
    ]
  },
  {
    path: '/sunovion-events',
    component: Layout,
    redirect: '/sunovion-events/',
    hidden: true,
    meta: { role: ['sunovion'] },
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
      },
      {
        path: 'history/:eventId',
        component: () => import('@/views/events/sunovion/history'),
        name: 'sunovionEventHistory',
        meta: { title: 'History', icon: 'form' }
      }
    ]
  },
  {
    path: '/projects',
    component: Layout,
    redirect: '/projects',
    name: 'projects',
    meta: {
      title: 'Projects',
      icon: 'table',
      role: ['staff']
    },
    children: [
      {
        path: '',
        component: () => import('@/views/events/projects/index'),
        name: 'projectEventIndex',
        meta: {
          title: 'Projects', icon: 'table2'
        }
      }
    ]
  },
  {
    path: '/projects',
    component: Layout,
    redirect: '/projects',
    hidden: true,
    meta: { role: ['staff'] },
    children: [
      {
        path: 'create-project',
        component: () => import('@/views/events/projects/create'),
        name: 'createProject',
        meta: { title: 'Create', icon: 'form' }
      },
      {
        path: 'edit-project/:id',
        component: () => import('@/views/events/projects/edit'),
        name: 'editProject',
        meta: { title: 'Edit', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // Backend support can be opened
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

