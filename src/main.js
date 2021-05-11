import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.withCredentials = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
