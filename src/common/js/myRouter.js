// import goods from 'components/goods/goods';

// import ratings from 'components/ratings/ratings';

// import seller from 'components/seller/seller';

import components from 'common/js/components';

 let router = [
    // 默认显示路由
    {
      path: '/',
      name: 'hone',
      component: components.goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: components.goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: components.ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: components.seller
    },
    // 重定向路由
    {
      path: '/',
      redirect: '/ratings'
    }
  ];

export default router;
