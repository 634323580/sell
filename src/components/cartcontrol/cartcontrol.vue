<template>
    <div class="cartcontrol">
        <transition name="decrease">
            <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
                <span class="line icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" @click="addCart($event)">
            <i class="icon-add_circle"></i>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Bus from 'common/js/bus';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        created() {
            // console.log(this.food);
        },
        methods: {
            // 添加商品
            addCart: function (event) {
                if(!event._constructed) {
                    return;
                }
                if(!this.food.count) {
                    // this.food.count = 1;
                    // console.log(this.food.count);
                    Vue.set(this.food, 'count', 1);
                }else {
                    this.food.count++;
                    console.log(this.food.count);
                }
                // bus组件通信
                Bus.$emit(':eventCartadd', event.target);
            },
            // 删除商品
            decreaseCart: function (event) {
                if(!event._constructed) {
                    return;
                }
                 if(this.food.count) {
                     this.food.count--;
                    };
            }
        }
    };
</script>
<style lang="scss" scoped>
    .cartcontrol {
        font-size:0;
        .cart-decrease,.cart-add{
            display: inline-block;
            padding: 6px;
            font-size:24px;
            line-height: 24px;
            color:rgb(0,160,220);
            vertical-align: top;
        }
        .cart-decrease .line{
            display: inline-block;
        }
        .cart-count {
            display: inline-block;
            line-height: 24px;
            vertical-align: top;
            font-size: 10px;
            color:rgb(147,153,159);
            margin-top: 6px;
        }
        .decrease-enter-active,.decrease-leave-active{
            transition:.4s linear;
            .line{
                transition:.4s linear;
            }
        }
        .decrease-enter,.decrease-leave-active{
            transform:translate3d(24px,0,0);
            opacity: 0;
            .line{
                transform:rotate(180deg);
                opacity: 0;
            }
        }
    }
</style>