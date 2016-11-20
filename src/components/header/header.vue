<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            
            </div>
            <div v-if="seller.supports" @click="showDetail" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="start-wrapper">
                        <start :size="48" :score="seller.score" ></start>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="support">
                        <li class="supports-item" v-for="(supports,index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                            <span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">
                            {{seller.bulletin}}
                        </p>
                    </div>
                </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import start from 'components/start/start';
    export default {
        name: 'header',
        data() {
            return {
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                detailShow: false
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        methods: {
            // 控制header图层显示隐藏
            showDetail: function() {
                this.detailShow = true;
            },
            hideDetail: function() {
                this.detailShow = false;
            }
        },
        created: function() {
            // console.log(this.props);
        },
        components: {
            start
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../common/scss/mixin';
    .header{
        color:#fff;
        position: relative;
        overflow: hidden;
        background:rgba(7, 17, 27, .4);
    }
    .content-wrapper{
        padding:24px 12px 18px 24px;
        font-size:0;
        position: relative;
        .avatar{
            display: inline-block;
            vertical-align:top;
            img{
                border-radius:2px;
            }
        }
        .content{
            display: inline-block;
            margin-left: 16px;
            .title{
                margin:2px 0 8px 0;
                .brand{
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    /*background:url(./brand@2x.png) no-repeat center / cover;*/
                    @include bg-image('brand');
                    background-size:30px 18px;
                    background-repeat:no-repeat;
                    vertical-align: middle;
                }
                .name{
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                }
            }
            .description{
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .support{
                .icon{
                    display: inline-block;
                    vertical-align:middle;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size:12px 12px;
                    background-repeat:no-repeat;
                    &.decrease{
                        @include bg-image('decrease_1');
                    }
                    &.discount{
                        @include bg-image('discount_1');
                    }
                    &.guarantee{
                        @include bg-image('guarantee_1');
                    }
                    &.invoice{
                        @include bg-image('invoice_1');
                    }
                    &.special{
                        @include bg-image('special_1');
                    }
                }
                .text{
                    display: inline-block;
                    vertical-align:middle;
                    line-height: 12px;
                    font-size: 10px;
                }
            }
        }
        .support-count{
            position: absolute;
            right: 12px;
            bottom:14px;
            padding:0 8px;
            line-height: 24px;
            border-radius:14px;
            background:rgba(0, 0, 0, .2);
            text-align: center;
            .count,.icon-keyboard_arrow_right{
                font-size: 10px;
                display:inline-block;
                vertical-align:middle;
            }
            .icon-keyboard_arrow_right{
                margin-left:2px;
            }
        }
    }
    .bulletin-wrapper{
        line-height:28px;
        padding:0 22px 0 12px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        background-color:rgba(7,17,27,.2);
        .bulletin-title{
            display: inline-block;
            width: 22px;
            height: 12px;
            @include bg-image('bulletin');
            background-size:22px 12px;
            vertical-align:middle;
        }
        .bulletin-text{
            font-size: 10px;
            margin:0 4px;
        }
        .icon-keyboard_arrow_right{
            margin-left:2px;
            position: absolute;
            font-size: 10px;
            right: 12px;
            top: 50%;
            transform:translateY(-50%);
        }
    }
    .background{
        position: absolute;
        top: 50%;
        /*bottom: 0;*/
        /*left: 0;*/
        right: 0;
        z-index:-1;
        width: 100%;
        -webkit-filter:blur(10px);
        filter:blur(10px);
        transform:translateY(-50%);
    }
    .detail{
        position: fixed;
        z-index:10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, .8);
        overflow: auto;
        backdrop-filter: blur(10px);
        .detail-wrapper{
            min-height: 100%;
            border-top:1px solid transparent;
            box-sizing:border-box;
            .detail-main{
                margin-top:64px;
                /*padding-top: 64px;*/
                padding-bottom: 64px;
                .name{
                    line-height: 16px;
                    text-align:center;
                    font-size:16px;
                    font-weight:700;
                }
                .start-wrapper{
                    margin-top: 18px;
                    padding:2px 0;
                    text-align: center;
                }
                .title{
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px auto;
                    .line{
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255, 255, 255, .2);
                    }
                    .text{
                        padding:0 12px;
                        font-size: 14px;
                        font-weight:700;

                    }
                }
                .support{
                    width: 80%;
                    margin:0 auto;
                    .supports-item{
                        padding:0 12px;
                        margin-bottom: 12px;
                        font-size:0;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                    .icon{
                        display: inline-block;
                        vertical-align:middle;
                        width: 16px;
                        height: 16px;
                        margin-right: 6px;
                        background-size:16px 16px;
                        background-repeat:no-repeat;
                        &.decrease{
                            @include bg-image('decrease_2');
                        }
                        &.discount{
                            @include bg-image('discount_2');
                        }
                        &.guarantee{
                            @include bg-image('guarantee_2');
                        }
                        &.invoice{
                            @include bg-image('invoice_2');
                        }
                        &.special{
                            @include bg-image('special_2');
                        }
                    }
                    .text{
                        display: inline-block;
                        vertical-align:middle;
                        line-height: 16px;
                        font-size: 12px;
                    }
                }
                .bulletin{
                    width: 80%;
                    margin:0 auto;
                    .content{
                        padding:0 12px;
                        line-height:24px;
                        font-size:12px;
                    }
                }
            }

        }
        .detail-close{
            position: relative;
            width: 32px;
            height: 32px;
            margin:-64px auto 0;
            text-align: center;
            clear: both;
            font-size: 32px;
        }
        
        &.fade-enter-active{
            /*进入动画*/
            animation: bounce-in .5s;
        }
        &.fade-leave-active {
            /*离开动画*/
            animation: bounce-out .5s;
        }

    }
    @keyframes bounce-in {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
    }
    @keyframes bounce-out {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-100%);
    }
    }
</style>