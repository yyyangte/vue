import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from './utils/axios'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;//请求模块挂载到vue原型上
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')