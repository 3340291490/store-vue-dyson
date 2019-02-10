// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import vueLazyLoad from 'vue-lazyload'
import vuex from 'vuex'
import './assets/css/bootstrap.min.css'  
import './assets/js/bootstrap.min.js' 

Vue.use(vuex)
const store = new vuex.Store({
  state:{
    cartCount:0
  },
  mutations:{
    updataCartCount() { 
       
    }
  }
});

Vue.prototype.$http = axios
Vue.use(vueLazyLoad,{
  loading:"/static/loading-svg/loading-bars.svg"
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
