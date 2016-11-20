<template>
    <div class="start" :class="startType">
        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="start-item" :key="index"></span>
    </div>
</template>
<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';
    export default{
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            startType: function() {
                return 'start-' + this.size;
            },
            itemClasses: function() {
                let result = [];
                // 计算总共有多少颗心
                let score = Math.floor(this.score * 2) / 2;
                // 计算是否有半颗心
                let hasDecimal = score % 1 !== 0;
                // 计算整颗心的有多少个
                let integer = Math.floor(score);
                // push整颗星进数组里面
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON);
                };
                // push半颗心进数组里面
                if (hasDecimal) {
                    result.push(CLS_HALF);
                };
                // push没有星星的状态进数组里面
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                };
                // 计算后星星状态
                return result;
            }
        }
    };
</script>
<style lang="scss">
    @import '../../common/scss/mixin';
    .start{
        font-size:0;
        .start-item{
            display: inline-block;
            background-repeat:no-repeat;
        }
        &.start-48{
            .start-item{
                width: 20px;
                height: 20px;
                margin-right: 22px;
                background-size:20px 20px;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-image('star48_on');
                }
                &.half{
                    @include bg-image('star48_half');
                }
                &.off{
                    @include bg-image('star48_off');
                }
            }
        };
        &.start-36{
            .start-item{
                width: 15px;
                height: 15px;
                margin-right: 16px;
                background-size:15px 15px;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-image('star36_on');
                }
                &.half{
                    @include bg-image('star36_half');
                }
                &.off{
                    @include bg-image('star36_off');
                }
            }
        };
        &.start-24{
            .start-item{
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size:10px 10px;
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-image('star24_on');
                }
                &.half{
                    @include bg-image('star24_half');
                }
                &.off{
                    @include bg-image('star24_off');
                }
            }
        };
    }
</style>