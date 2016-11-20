import Vue from 'vue';

import Axios from 'axios';

import App from './App';

import myRouter from 'common/js/myRouter';

Vue.prototype.$http = Axios;

import 'common/scss/index.scss';

// Axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     console.log(config);
//     return config;
//   }, function (error) {
//     // Do something with request error
//     // console.log(error);
//     return Promise.reject(error);
//   });

// Axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     console.log(response);
//     return response;
//   }, function (error) {
//     // Do something with response error
//     console.log(error);
//     return Promise.reject(error);
//   });

/* eslint-disable no-new */
new Vue({
  router: myRouter,
  render: h => h(App)
}).$mount('#app');

// new Vue({
//   el: '#app',
//   router: myRouter,
//   template: '<App/>',
//   components: { App }
// });
