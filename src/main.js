import Vue from 'vue';

import Axios from 'axios';

import App from './App';

import VueRoute from 'vue-router';

import MyRoutes from 'common/js/myRouter';

import 'common/scss/index.scss';

Vue.use(VueRoute);

Vue.prototype.$http = Axios;

/* eslint-disable no-new */
let router = new VueRoute({
  routes: MyRoutes
});
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
  router,
  render: h => h(App)
}).$mount('#app');

// new Vue({
//   el: '#app',
//   router: myRouter,
//   template: '<App/>',
//   components: { App }
// });
