import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
// import 'iview/dist/styles/iview.css';

import axios from 'axios'

Vue.config.productionTip = false
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
