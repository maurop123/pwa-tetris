import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import './registerServiceWorker'

import './unit/const';
import './control';
import { subscribeRecord } from './unit';
subscribeRecord(store); // 将更新的状态记录到localStorage
Vue.config.productionTip = false

/* Firebase coding */
import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store: store
})
