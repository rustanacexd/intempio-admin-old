import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

if (process.env.production) {
  Raven
    .config('https://d07f7532ddfb47fbb4a316a3a6c12cef@sentry.io/1194201')
    .addPlugin(RavenVue, Vue)
    .install()
}
