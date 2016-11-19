import Vue from 'vue';

import App from './App';

import myRouter from './common/js/myRouter';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: myRouter,
  render: h => h(App)
});
