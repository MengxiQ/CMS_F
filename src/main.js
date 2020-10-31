import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import $ from 'jquery'
// 当然还有这句话 给vue原型上添加 $
Vue.prototype.$ = $
import Contextmenu from 'vue-contextmenujs'
Vue.use(Contextmenu)
Vue.config.productionTip = false
import App from './App'
import store from './store'
import router from './router'


// 代码编辑器
import VueCodemirror from 'vue-codemirror'
// import base style
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

//
import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

import less from 'less'
Vue.use(less)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
