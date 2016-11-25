<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{on:totalCount>0}">
                            <i class="icon-shopping_cart"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">
                            {{totalCount}}
                        </div>
                    </div>
                    <div class="price" :class="{on:totalPrice>0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}</div>
                </div>
                <div class="content-right" :class="payClass" @click.stop.prevent="pay">
                    <div class="pay">{{payDesc}}</div>
                </div>
            </div>
            <div class="ball-container">
                <template v-for="ball in balls">
                    <transition name="drop" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" v-on:enter="enter">
                        <div v-show="ball.show" class="ball">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </template>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h2 class="title">购物车</h2>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food border-1px" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price * food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transitiona>
        </div>
        <transition name="mask">
            <div class="list-mask" v-show="listShow" @click="toggleList"></div>
        </transition>
    </div>
</template>
<script>
    import Bus from 'common/js/bus';
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    export default {
        props: {
            // 被选中的商品价钱和数量
            selectFoods: {
                type: Array,
                default() {
                    return [
                        {
                            price: 1,
                            count: 1
                        },
                        {
                            price: 10,
                            count: 1
                        }
                    ];
                }
            },
            // 配送费
            deliveryPrice: {
                type: Number,
                default: 0
            },
            // 起送价钱
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                    balls: [
                        {
                            show: false
                        },
                        {
                            show: false
                        },
                        {
                            show: false
                        },
                        {
                            show: false
                        },
                        {
                            show: false
                        }
                    ],
                    dropBall: [],
                    fold: true
                };
            },
        created: function() {
            // 监听事件获取add商品DOM
            let i = 0;
            Bus.$on(':eventCartadd', el => {
                    while(i < this.balls.length) {
                        i++;
                        if(i >= this.balls.length) {
                            i = 0;
                        }
                        let ball = this.balls[i];
                        if(!ball.show) {
                            ball.show = true;
                            ball.el = el;
                            this.dropBall.push(ball);
                            return;
                        }
                    }
            });
        },
        computed: {
            // 计算总价 循环被选中的商品累加 每个商品价格*数量
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            // 总共选择的商品数量
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            // 计算是否有差价
            payDesc() {
                // 如果选中商品总额为0，显示默认值
                if(this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`;
                }else if(this.totalPrice < this.minPrice) {
                    // 如果选中商品总额为0，显示默认值 小于 起送费 则算出差价
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                }else{
                    // 否则结算
                    return '去结算';
                }
            },
            payClass() {
                if(this.totalPrice < this.minPrice) {
                // 总额小于起送费则不高亮结算按钮
                    return 'not-enough';
                }else {
                    // 否则高亮结算按钮
                    return 'enough';
                }
            },
            listShow() {
                if(!this.totalCount) {
                    // 如果没有选择
                    this.fold = true;
                    // 默认隐藏
                    return false;
                }
                // 监听点击的显示隐藏
                let show = !this.fold;
                if(show) {
                    this.$nextTick(() => {
                        if(!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        methods: {
            beforeEnter: function(el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if(ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter: function(el, done) {
                /* eslint-disable no-unused-vars */
                let elHeight = el.offsetHeight;
                this.$nextTick(() => {
                        setTimeout(function() {
                            el.style.webkitTransform = 'translate3d(0,0,0)';
                            el.style.transform = 'translate3d(0,0,0)';
                            let inner = el.getElementsByClassName('inner-hook')[0];
                            inner.style.webkitTransform = 'translate3d(0,0,0)';
                            inner.style.transform = 'translate3d(0,0,0)';
                        });
                });
                done();
            },
            afterEnter: function(el) {
                let ball = this.dropBall.shift();
                if(ball) {
                        ball.show = false;
                        el.style.display = 'none';
                };
            },
            toggleList: function() {
                if(!this.totalCount) {
                    // 如果没有选择，则不进行操作
                    return;
                }
                // 否则控制显示隐藏
                this.fold = !this.fold;
            },
            empty: function() {
                // 清空购物车
                this.selectFoods.forEach(food => {
                    food.count = 0;
                });
            },
            // 点击结算
            pay: function() {
                if(this.totalPrice < this.minPrice) {
                    return;
                }
                window.alert(`支付${this.totalPrice + this.deliveryPrice}元,包含配送费${this.deliveryPrice}元`);
            }
        },
        components: {
            cartcontrol
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../common/scss/mixin';
    .shopcart {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 8;
        width: 100%;
        height: 48px;
        .content {
            display: flex;
            background: #141d27;
            font-size: 0;
            .content-left {
                flex: 1;
                .logo-wrapper {
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background: #141d27;
                    .logo {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #2b343c;
                        text-align: center;
                        .icon-shopping_cart {
                            line-height: 44px;
                            font-size: 24px;
                            color: #80858a;
                        }
                        &.on {
                            background: rgb(0, 160, 220);
                            .icon-shopping_cart {
                                color: #fff;
                            }
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color: #fff;
                        background: rgb(240, 20, 20);
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
                    }
                }
                .price {
                    display: inline-block;
                    box-sizing: border-box;
                    margin-top: 12px;
                    padding-right: 12px;
                    line-height: 24px;
                    vertical-align: top;
                    border-right: 1px solid rgba(255, 255, 255, .1);
                    font-size: 16px;
                    font-weight: 700;
                    color: rgba(255, 255, 255, .4);
                    &.on {
                        color: #fff;
                    }
                }
                .desc {
                    display: inline-block;
                    vertical-align: top;
                    margin: 12px 0 0 12px;
                    line-height: 24px;
                    font-size: 16px;
                    color: rgba(255, 255, 255, .4);
                    font-size: 10px;
                }
            }
            .content-right {
                flex: 0 0 105px;
                width: 105px;
                background: #2b343c;
                font-size: 12px;
                color: rgba(255, 255, 255, .4);
                .pay {
                    font-size: 12px;
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-weight: 700;
                }
                &.not-enough {
                    background: #2b343c;
                }
                &.enough {
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
        .ball-container {
            .ball {
                position: fixed;
                left: 32px;
                bottom: 22px;
                transition: all .4s;
                z-index: 9;
                transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
                .inner {
                    width: 16px;
                    height: 16px;
                    transition: all .4s linear;
                    border-radius: 50%;
                    background: rgb(0, 160, 220);
                }
            }
        }
        .shopcart-list {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            transform: translate3d(0, -100%, 0);
            z-index: -1;
            &.fold-enter-active,
            &.fold-leave-active {
                transition: 0.5s ease;
            }
            &.fold-enter,
            &.fold-leave-active {
                transform: translate3d(0, 0, 0);
            }
            .list-header {
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
                .title {
                    float: left;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .empty {
                    float: right;
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                background: #fff;
                .food {
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    @include border-1px(rgba(7, 17, 27, .1));
                }
                .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .price {
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 2px;
                }
            }
        }
    }
    
    .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 7;
        backdrop-filter: blur(10px);
        background: rgba(7, 17, 27, .6);
        &.mask-enter-active,
        &.mask-leave-active {
            transition: 0.5s ease;
        }
        &.mask-enter {
            opacity: 0;
        }
        &.mask-leave-active {
            opacity: 0;
        }
    }
</style>