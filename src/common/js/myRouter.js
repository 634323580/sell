import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import goods from 'components/goods/goods';

import ratings from 'components/ratings/ratings';

import seller from 'components/seller/seller';

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    // 默认显示路由
    {
      path: '/',
      name: 'hone',
      component: goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    // 重定向路由
    {
      path: '/',
      redirect: '/goods'
    }
  ]
});

export default router;
