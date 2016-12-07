<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect ref="ratingselect" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
                <div class="rating-wrapper">
                    <ul v-show="ratings && ratings.length">
                        <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
                            <div class="user-head-img">
                                <img :src="rating.avatar" class="avatar" alt="" width="12" height="12">
                            </div>
                            <div class="content">
                            <div class="user">
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <span class="name">{{rating.username}}</span>
                            </div>
                            <div class="star-wrapper">
                                <star :size="36" :score="rating.score"></star>
                                <span v-show="rating.deliveryTime" class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">
                                {{rating.text}}
                            </p>
                            <div class="recommend">
                                <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                                <div class="item-wrap" v-show="rating.recommend.length">
                                    <span class="item" v-for="recommend in rating.recommend">{{recommend}}</span>
                                </div>
                            </div>
                            </div>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
                </div>
        </div>  
    </div>
</template>
<script>
    import star from 'components/start/start';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';  
    import BScroll from 'better-scroll';
    import {formatDate} from 'common/js/date';
    const ALL = 2;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data: function() {
            return {
                selectType: ALL,
                onlyContent: true,
                ratings: []
            };
        },
        created: function() {
            this.$http.get('/api/ratings')
                .then((res) => {
                    this.ratings = res.data.data;
                    return;
                })
                .then(() => {
                     this.$nextTick(() => {
                        
                        if(!this.scroll) {
                            this.scroll = new BScroll(this.$refs.ratings, {
                                click: true
                            });
                        }
                     })
                })
            this.$nextTick(() => {
                this.$refs.ratingselect.$on(':eventToggle', (text) => {
                   this.onlyContent = text;
                   this.$nextTick(() => {
                     this.scroll.refresh();
                    });
                })
                this.$refs.ratingselect.$on(':eventSelectType', (text) => {
                    this.selectType = text;
                    this.$nextTick(() => {
                        this.scroll.refresh();
                    });
                })
            })
        },
        methods: {
            needShow: function(type, text) {
                if(this.onlyContent && !text) {
                    return false;
                }
                if(this.selectType === ALL) {
                    return true;
                }else {
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
            star,
            split,
            ratingselect
        }
    };
</script>
<style lang="scss" scoped>
    .ratings{
        position: absolute;
        top: 174px;
        bottom:0;
        left: 0;
        width: 100%;
        overflow:hidden;
        .overview{
            display: flex;
            padding: 18px 0;
            .overview-left{
                flex:0 0 137px;
                width: 137px;
                border-right:1px solid rgba(7,17,27,.1);
                padding:6px 0;
                text-align: center;
                @media only screen and (max-width: 320px) {
                    flex:0 0 120px;
                }
                .score{
                    margin-bottom: 6px;
                    line-height:28px;
                    font-size: 24px;
                    color:rgb(255,153,0);
                }
                .title{
                    font-size:12px;
                    line-height: 12px;
                    color:rgb(7,17,27);
                    margin-bottom: 8px;
                }
                .rank{
                    line-height:10px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
            }
            .overview-right{
                flex:1;
                padding:6px 0 6px 24px;
                @media only screen and (max-width: 320px) {
                    padding-left: 10px;
                }
                .score-wrapper{
                    margin-bottom: 8px;
                    font-size:0;
                    .title{
                        display: inline-block;
                        vertical-align: top;
                        font-size:12px;
                        color:rgb(7,17,27);
                        line-height: 18px;
                    }
                    .start{
                        display: inline-block;
                        vertical-align: top;
                        margin:0 12px;
                        @media only screen and (max-width: 320px) {
                            margin:0 6px;
                        }
                    }
                    .score{
                        display: inline-block;
                        vertical-align: top;
                        font-size:12px;
                        color:rgb(255,153,0);
                        margin-top: 2px;
                    }
                }
                .delivery-wrapper{
                    font-size: 0;
                    .title{
                        font-size:12px;
                        color:rgb(7,17,27);
                        line-height: 18px;
                    }
                    .delivery{
                        font-size: 12px;
                        color:rgb(147,153,159);
                        margin-left: 12px;
                    }
                }
                
            }
        }
    }
    .rating-wrapper{
        background:#fff;
        padding:18px;
        .rating-item{
            padding-bottom: 18px;
            margin-bottom: 18px;
            border-bottom:1px solid #e6e7e8;
            overflow:hidden;
            .user-head-img{
                float:left;
                width: 28px;
                height: 28px;
                img{
                    width:inherit;
                    height:inherit;
                    border-radius: 50%;
                }
            }
            .content{
                padding-left: 40px;
                .user{
                    .name{
                        font-size: 10px;
                        color:rgb(7,17,27);
                        line-height:12px;
                    }
                    .time{
                        font-size: 10px;
                        font-weight:200px;
                        line-height: 12px;
                        color:rgb(147,153,159);
                        float:right;
                    }
                }
                .text{
                    font-size: 12px;
                    line-height:18px;
                    color:rgb(7,17,27);
                }
                .star-wrapper{
                    margin-top: 4px;
                    margin-bottom: 6px;
                    .start,.deliveryTime{
                        display: inline-block;
                        vertical-align:middle;
                    }
                    .deliveryTime{
                        font-size: 10px;
                        font-weight:200px;
                        line-height: 12px;
                        color:rgb(147,153,159);
                    }
                }
                .recommend{
                    margin-top: 8px;
                    .icon-thumb_up,.icon-thumb_down{
                        font-size:14px;
                        line-height:16px;
                        float:left;
                        margin-top: 5px;
                    }
                    .icon-thumb_up{
                        color:rgb(0,160,220);
                    }
                    .icon-thumb_down{
                        color:rgb(183,187,191);
                    }
                    .item-wrap{
                        padding-left: 25px;
                        font-size:0;
                    }
                    .item{
                        display:inline-block;
                        font-size:9px;
                        line-height:16px;
                        color:rgb(147,153,159);
                        border:1px solid rgba(7, 17, 27, .1);
                        padding:3px 6px;
                        margin-right: 6px;
                        margin-bottom: 6px;
                        max-width:65px;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>