<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <start :size="36" :score="seller.score"></start>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite($event)">
                    <span :class="{active:favorite}" class="icon-favorite"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>

                </div>
                <ul class="support">
                    <li class="supports-item border-1px" v-for="(supports,index) in seller.supports">
                        <hot :size="4" :type="seller.supports[index].type"></hot>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h2 class="title">商家实景</h2>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic of seller.pics">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item border-1px" v-for="info of seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import start from 'components/start/start'
    import BScroll from 'better-scroll'
    import split from 'components/split/split'
    import hot from 'components/hot/hot'
    import {saveTolLocal, loadFromLocal} from 'common/js/store'
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                favorite: (() => {
                    return loadFromLocal(this.seller.id, 'favorite', false)
                })()
            }
        },
        mounted: function() {
            // console.log(this.$route.params.id)
            this.$nextTick(() => {
                this._initScroll();
                this._initpics();
            })
            
        },
        computed: {
            favoriteText: function() {
                return this.favorite ? '已收藏' : '收藏'
            }
        },
        watch: {
            seller() {
                this.$nextTick(() => {
                    this._initScroll();
                    this._initpics();
                })
            }
        },
        methods: {
            toggleFavorite(event) {
                if(!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
                saveTolLocal(this.seller.id, 'favorite', this.favorite)
            },
            _initScroll() {
                if(!this.scroll) {
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    })
                } else {
                    this.scroll.refresh();
                }
            },
            _initpics() {
                if(this.seller.pics) {
                    let picWidth = 120;
                    let margin = 6;
                    let width = (picWidth + margin) * this.seller.pics.length - margin;
                    this.$refs.picList.style.width = width + 'px';
                    if(!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        });
                    } else {
                        this.picScroll.refresh();
                    }
                }
            }
        },
        components: {
            start,
            split,
            hot
        }
    };
</script>
<style lang="scss">
    @import '../../common/scss/mixin';
    .seller {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            padding: 18px;
            position:relative;
            .title {
                margin-bottom: 8px;
                font-size: 14px;
                line-height: 14px;
                color: rgb(7, 17, 27);
            }
            .desc {
                line-height: 18px;
                font-size: 0;
                @include border-1px(rgba(7, 17, 27, .1));
                .start {
                    display: inline-block;
                    margin-right: 8px;
                    vertical-align: top;
                }
                .text {
                    display: inline-block;
                    margin-right: 12px;
                    vertical-align: top;
                    font-size: 10px;
                    color: rgb(77, 85, 93);
                    padding-bottom: 18px;
                }
            }
            .remark {
                display: flex;
                padding-top: 18px;
                .block {
                    flex: 1;
                    text-align: center;
                    border-right: 1px solid rgba(7, 17, 27, 0.1);
                    &:last-child {
                        border: none;
                    }
                    h2 {
                        margin-bottom: 4px;
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .content {
                        line-height: 24px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                        .stress {
                            font-size: 24px;
                            display: inline-block;
                            /*vertical-align:top;*/
                            /*margin-right: 2px;*/
                        }
                    }
                }
            }
            .favorite {
                position: absolute;
                width: 50px;
                right: 11px;
                top: 18px;
                text-align: center;
                .icon-favorite {
                    display: block;
                    margin-bottom: 4px;
                    line-height: 24px;
                    font-size: 24px;
                    color: #d4d6d9;
                    &.active {
                        color: #f01414;
                    }
                }
                .text {
                    line-height: 10px;
                    font-size: 10px;
                    color: #4d555d;
                }
            }
        }
        .bulletin {
            padding: 18px 18px 0 18px;
            .title {
                margin-bottom: 8px;
                font-size: 14px;
                line-height: 14px;
                color: rgb(7, 17, 27);
            }
            .content-wrapper {
                padding: 0 12px 16px 12px;
                @include border-1px(rgba(7, 17, 27, .1)) .content {
                    line-height: 24px;
                    font-size: 12px;
                    color: rgb(240, 20, 20);
                }
            }
            .support {
                .supports-item {
                    padding: 16px 12px;
                    font-size: 0;
                    @include border-1px(rgba(7, 17, 27, .1)) .text {
                        line-height: 16px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        display: inline-block;
                        vertical-align: middle;
                    }
                    &:last-child {
                        border: none;
                        &:after {
                            display: none;
                        }
                    }
                }
            }
        }
        .pics {
            padding: 18px;
            .title {
                margin-bottom: 12px;
                font-size: 14px;
                line-height: 14px;
                color: rgb(7, 17, 27);
            }
            .pic-wrapper {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                .pic-list {
                    font-size: 0;
                    .pic-item {
                        display: inline-block;
                        margin-right: 6px;
                        width: 120px;
                        height: 90px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
        .info {
            padding: 18px 18px 0 18px;
            color: #07111b;
            .title {
                padding-bottom: 12px;
                line-height: 14px;
                position: relative;
                font-size: 14px;
            }
            .info-item {
                padding: 16px 12px;
                line-height: 16px;
                position: relative;
                font-size: 12px;
                @include border-1px(rgba(7, 17, 27, 0.1));
            }
        }
    }
</style>