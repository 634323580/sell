<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="menu-item">
                    <span class="text border-1px">
                        <template v-if="item.type > 0">
                            <hot :size='3' :type="item.type"></hot>
                        </template>
                        <span>{{item.name}}</span>
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" class="food-list">
                    <h2 class="title">{{item.name}}</h2>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h3 class="name">{{food.name}}</h3>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
          
                            </div>

                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    const ERR_OK = 0;
    import hot from 'components/hot/hot';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: []
            };
        },
        created: function() {
            this.$http.get('/api/goods').then(res => {
                if (res.data.erron === ERR_OK) {
                    this.goods = res.data.data;
                    console.log(this.goods);
                }
            });
        },
        components: {
            hot
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../common/scss/mixin';
   .goods{
       position: absolute;
       top: 174px;
       bottom: 46px;
       width: 100%;
       overflow: hidden;
       display: flex;
   }
   .menu-wrapper{
       flex: 0 0 80px;
       width: 80px;
       background-color:#f3f5f7;
       .menu-item{
           display: table;
           height: 54px;
           width: 56px;
           /*margin:0 auto;*/
           padding:0 12px;
           .text{
               font-size:12px;
               display: table-cell;
               vertical-align:middle;
               width: 56px;
               @include border-1px(rgba(7,17,27,.1));
               line-height:14px;
               span{
                   vertical-align:middle;
               }
           }
       }
   }
   .foods-wrapper{
       flex: 1;
       .title{
           padding-left: 14px;
           height: 26px;
           line-height:26px;
           border-left:2px solid #d9dde1;
           font-size:12px;
           color:rgb(147,153,159);
           background-color:#f3f5f7;
       }
       .food-item{
           display: flex;
           margin:18px;
           padding-bottom: 18px;
           @include border-1px(rgba(7,17,27,.1));
           &:last-child{
               margin-bottom: 0;
               &:after{
                   display: none;
               }
           }
           .icon{
               flex:0 0 57px;
               margin-right: 10px;
               img{
                   display:block;
                   width: 57px;
                   height: 57px;
               }
           }
           .content{
               flex:1;
               .name{
                   margin:2px 0 8px 0;
                   height: 14px;
                   line-height: 14px;
                   font-size:14px;
                   color:rgb(7,17,27);
               }
               .desc,.extra{
                   line-height: 10px;
                   font-size: 10px;
                   color:rgb(147,153,159);
               }
               .desc{
                   margin-bottom: 8px;
               }
               .extra{
                   .count{
                       margin-right: 12px;
                   }
               }
               .price{
                   font-weight: 700;
                   line-height: 24px;
                   .now{
                       margin-right: 8px;
                       font-size:14px;
                       color:rgb(240,20,20);
                   }
                   .old{
                       text-decoration: line-through;
                       font-size:10px;
                      color:rgb(147,153,159);
                   }
               }
           }
       }
   }
</style>