import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
import alert from './config/alert'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
