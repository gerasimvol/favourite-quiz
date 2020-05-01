import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// THIS PROJECT MADE JUST FOR FUN! No security or clean code :)
// DB https://favouritequiz-707a.restdb.io/home/db/favouritequiz-707a/cards/5eac3b82423f27520001614d

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
