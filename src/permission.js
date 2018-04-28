import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress progress bar
import 'nprogress/nprogress.css'// Progress progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // Right of verification

const whiteList = ['/login'] // Do not redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next(to.redirectedFrom)
            // next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Verification failed, please log in again')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // end of progress
})
