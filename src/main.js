import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Firebase from 'firebase'

Vue.use(BootstrapVue)
Vue.use(Element)

const firebaseConfig = {
  apiKey: "AIzaSyAwFQrncQFVPXQTLV3HDW_vtcFM-PWbDys",
  authDomain: "proyecto-dbz.firebaseapp.com",
  databaseURL: "https://proyecto-dbz.firebaseio.com",
  projectId: "proyecto-dbz",
  storageBucket: "proyecto-dbz.appspot.com",
  messagingSenderId: "395973125308",
  appId: "1:395973125308:web:b43f6823d41fc57b069cb9"
};
Firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
