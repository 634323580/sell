<template>
        <span class="icon" :class="[classMap[type],iconSize]"></span>
</template>
<script>
    export default {
        props: {
            type: {
                type: Number
            },
            size: {
                type: Number
            }
        },
        computed: {
            iconSize: function() {
                return 'icon-' + this.size;
            }
        },
        data() {
            return {
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            };
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../common/scss/mixin';
        .icon{
            display: inline-block;
            vertical-align: middle;
        }
        .icon-1{
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
        }
        .icon-2{
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
        }
        .icon-3{
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
        }
        .icon-1.decrease {
            @include bg-image('decrease_1');
        }
        .icon-1.discount {
            @include bg-image('discount_1');
        }
        .icon-1.guarantee {
            @include bg-image('guarantee_1');
        }
        .icon-1.invoice {
            @include bg-image('invoice_1');
        }
        .icon-2.special {
            @include bg-image('special_2');
        }
        .icon-2.decrease {
            @include bg-image('decrease_2');
        }
        .icon-2.discount {
            @include bg-image('discount_2');
        }
        .icon-2.guarantee {
            @include bg-image('guarantee_2');
        }
        .icon-2.invoice {
            @include bg-image('invoice_2');
        }
        .icon-2.special {
            @include bg-image('special_2');
        }
        .icon-3.special {
            @include bg-image('special_3');
        }
        .icon-3.decrease {
            @include bg-image('decrease_3');
        }
        .icon-3.discount {
            @include bg-image('discount_3');
        }
        .icon-3.guarantee {
            @include bg-image('guarantee_3');
        }
        .icon-3.invoice {
            @include bg-image('invoice_3');
        }
        .icon-3.special {
            @include bg-image('special_3');
        }
</style>