/**
 * @flow
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';

import './assets/vue-material';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#App',
  store,
  render: f => f(App)
});
