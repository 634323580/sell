<template>
    <div class="ratingselect border-1px">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType == 2 }">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType == 0 }">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType == 1 }">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span @click="toggleContent($event)" class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
    // 正面
    const POSITIVE = 0;
    // 负面
    const NEGATIVE = 1;
    // 全部
    const ALL = 2;
    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        },
        computed: {
            positives() {
                return this.ratings.filter(rating => {
                    return rating.rateType === POSITIVE;
                });
            },
            negatives() {
                return this.ratings.filter(rating => {
                   return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
            select: function(type, event) {
                if(!event._constructed) {
                    return;
                }
                // 事件通知food组件我点击改变了selectType
                this.$emit(':eventSelectType', type);
            },
            toggleContent: function(event) {
                if(!event._constructed) {
                    return;
                }
                // 事件通知food组件我点击改变了onlyContent
                this.$emit(':eventToggle', !this.onlyContent);
            }
        }
    };
</script>
<style lang="scss" scoped>
     @import '../../common/scss/mixin';
    .ratingselect{
       .rating-type{
           padding:18px 0;
           margin:0 18px;
           @include border-1px(rgba(7,17,27,.1));
           font-size:0;
           .block{
               display: inline-block;
               padding:8px 12px;
               font-size:12px;
               margin-right: 8px;
               border-radius:1px;
               /*background:rgba(0, 220, 160, .2);*/
                color:rgb(77,85,93);
                line-height:16px;
                .count{
                    font-size:8px;
                    margin-left: 2px;
                }
                &.active{
                    color:#fff;
                }
               &.positive{
                   background:rgba(0,160,220,.2);
                   &.active{
                    background:rgba(0,160,220,1);
                   }
               }
               &.negative{
                   background:rgba(77,85,93,.2);
                   &.active{
                        background:rgba(77,85,93,1);
                   }
               }
           }
       } 
       .switch{
           padding:12px 18px;
           line-height:24px;
           border-bottom:1px solid rgba(7,17,27,.1);
           color:rgb(147,153,159);
           font-size:0;
           .text{
               font-size:14px;
               display:inline-block;
               vertical-align: middle;
           }
           .icon-check_circle{
               font-size:24px;
               margin-right: 4px;
               vertical-align: middle;
           }
           &.on{
               .icon-check_circle{
                   color:#00c850;
               }
           }
       }
    }
</style>