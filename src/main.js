// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'


//style(scss css)
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui' //elment-ui
import 'element-ui/lib/theme-chalk/index.css' //element-ui style
import '@/styles/theme/index.css' //change Theme
import '@/styles/index.scss' //global scss
import '@/styles/iconfont/iconfont.css' //icon css

//vue basic config(request page store router)
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import router from './router'


//plugins
import moment from 'moment'
import Cookie from 'js-cookie'
import VideoPlayer from 'vue-video-player'

//self defined
import cac from './utils/cac.js'

//Directive
// import rightMenu from '@/directive/rightMenu'
// Vue.use(rightMenu)

//separator
import separator from './utils/separator.js'

Vue.prototype.$cac = cac
Vue.prototype.$moment = moment
Vue.prototype.$separator = separator

Vue.use(VideoPlayer)
Vue.use(VueAxios, axios);
Vue.use(Element, {
  size: Cookie.get('size') || 'medium' //set element-ui default size
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
