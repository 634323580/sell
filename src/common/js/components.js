// import goods from 'components/goods/goods';
const goods = resolve => require(['components/goods/goods'], resolve)

// import ratings from 'components/ratings/ratings';
const ratings = resolve => require(['components/ratings/ratings'], resolve)

// import seller from 'components/seller/seller';
const seller = resolve => require(['components/seller/seller'], resolve)

export default {
    goods,
    ratings,
    seller
};
