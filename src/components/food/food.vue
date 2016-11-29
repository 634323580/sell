<template>
    <transition name="fade">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="showFlag = false">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cratcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div @click="addFrist($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
                    </transition>
                </div>
                <split></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split v-show="food.info"></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect ref="ratingselect" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" class="avatar" alt="" width="12" height="12">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import Bus from 'common/js/bus';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';
    import {formatDate} from 'common/js/date';
    // 正面
    // const POSITIVE = 0;
    // 负面
    // const NEGATIVE = 1;
    // 全部
    const ALL = 2;
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        created: function() {
            this.$nextTick(() => {
                this.$refs.ratingselect.$on(':eventSelectType', text => {
                        this.selectType = text;
                        this.$nextTick(() => {
                            this.scroll.refresh();
                        });
                    });
                this.$refs.ratingselect.$on(':eventToggle', text => {
                        this.onlyContent = text;
                        this.$nextTick(() => {
                            this.scroll.refresh();
                        });
                    });
            });
        },
        methods: {
            show: function() {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if(!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                        click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            addFrist: function(event) {
                if(!event._constructed) {
                    return;
                }
                console.log(event);
                this.$set(this.food, 'count', 1);
                Bus.$emit(':eventCartadd', event.target);
            },
            needShow: function(type, text) {
                // 只看内容 但没有内容就 false
                if(this.onlyContent && !text) {
                    return false;
                }
                // 是否为全部
                if(this.selectType === ALL) {
                    return true;
                }else {
                    // 每条评论selectType ==== this.selectType
                    return type === this.selectType;
                }
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        components: {
            cartcontrol,
            split,
            ratingselect
        }
    };
</script>
<style lang="scss" scoped>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 6;
        width: 100%;
        background: #fff;
        &.fade-enter-active,
        &.fade-leave-active {
            transition: .2s linear;
        }
        &.fade-enter,
        &.fade-leave-active {
            transform: translate3d(100%, 0, 0);
        }
        .image-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                position: absolute;
                top: 10px;
                left: 0;
                .icon-arrow_lift {
                    display: block;
                    padding: 10px;
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
        .content {
            padding: 18px;
            position: relative;
            .title {
                line-height: 14px;
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(8, 17, 27);
            }
            .detail {
                margin-bottom: 18px;
                line-height: 10px;
                font-size: 0;
                height: 10px;
                .sell-count,
                .rating {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .sell-count {
                    margin-right: 12px;
                }
            }
            .price {
                font-weight: 700;
                line-height: 24px;
                font-size: 0;
                .now {
                    margin-right: 8px;
                    font-size: 14px;
                    color: rgb(240, 20, 20);
                }
                .old {
                    text-decoration: line-through;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
        }
        .cratcontrol-wrapper {
            position: absolute;
            right: 12px;
            bottom: 12px;
        }
        .buy {
            position: absolute;
            right: 18px;
            bottom: 18px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            box-sizing: border-box;
            font-size: 10px;
            color: #fff;
            border-radius: 12px;
            background: rgb(0, 160, 220);
            &.fade-enter-active,
            &.fade-leave-active {
                transition: .2s linear;
            }
            &.fade-enter,
            &.fade-leave-active {
                opacity: 0;
            }
        }
        .info {
            padding: 18px;
            .title {
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color: #07111b;
            }
            .text {
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color: #4d555d;
            }
        }
        .rating {
            padding-top: 18px;
            .title {
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color: #07111b;
                margin-left: 18px;
            }
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                position: relative;
                padding: 16px 0;
                position: relative;
                .user {
                    position: absolute;
                    right: 0;
                    top: 16px;
                    line-height: 12px;
                    font-size: 0;
                    .name {
                        display: inline-block;
                        margin-right: 6px;
                        vertical-align: top;
                        font-size: 10px;
                        color: #93999f;
                    }
                    .avatar {
                        border-radius: 50%;
                    }
                }
                .time {
                    margin-bottom: 6px;
                    line-height: 12px;
                    font-size: 10px;
                    color: #93999f;
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                    color: #07111b;
                }
                .icon-thumb_up,
                .icon-thumb_down {
                    margin-right: 4px;
                    line-height: 16px;
                    font-size: 12px;
                }
                .icon-thumb_up {
                    color: #00a0dc;
                }
                .icon-thumb_down {
                    color: #93999f;
                }
            }
        }
        .no-rating{
            padding: 16px 0;
            font-size:12px;
            color:rgb(147,153,159)
        }
    }
</style>