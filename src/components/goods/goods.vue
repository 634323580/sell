<template>
  <div class="goods-wrapper">
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'on':index === currentIndex}" @click="_selectMenu(index,$event)">
            <span class="text border-1px">
                        <template v-if="item.type > 0">
                            <hot :size='3' :type="item.type"></hot>
                        </template>
                        <span>{{item.name}}</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h2 class="title">{{item.name}}</h2>
            <ul>
              <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h3 class="name">{{food.name}}</h3>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--商品详情-->
      <food :food="selectedFood" ref="food"></food>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>
<script>
    import BScroll from 'better-scroll';
    import hot from 'components/hot/hot';
    import shopcart from 'components/shopcart/shopcart';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import food from 'components/food/food';
    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        created: function() {
            let sellItem = JSON.parse(window.localStorage.getItem('sellItem'));
            this.$http.get('/api/goods')
            .then(res => {
                if (res.data.erron === ERR_OK) {
                    this.goods = res.data.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        // 计算每大层离浏览器的距离
                        this._calculateHeight();
                    });
                    return ERR_OK;
                }
                return '';
            })
            .then((res) => {
              if(res === 0) {
                if(sellItem && sellItem.length > 0) {
                  this.goods.forEach(good => {
                    good.foods.forEach(foods => {
                      sellItem.forEach(food => {
                        if(foods.id === food.id) {
                          this.$set(foods, 'count', food.count);
                          return;
                        }
                      });
                    });
                  });
                }
              }
            });
        },
        methods: {
            _initScroll() {
                this.meunScroll = new BScroll(this.$refs.menu, {
                  click: true
                });

                this.foodScroll = new BScroll(this.$refs.foods, {
                    probeType: 3,
                    click: true
                });

                this.foodScroll.on('scroll', (pos) => {
                  // 获取当前滚动位置
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight() {
                let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
                let height = 0;
                // 进行累加上一个兄弟节点的高度获取自身元素离窗口的距离
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            _selectMenu(index, event) {
              if(!event._constructed) {
                return;
              }
              console.log(index);
              let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
              let el = foodList[index];
              this.foodScroll.scrollToElement(el, 300);
            },
            selectFood: function(food, event) {
              if(!event._constructed) {
                return;
              }
              this.selectedFood = food;
              this.$refs.food.show();
            }
        },
        computed: {
            // 我的算法，判断不够周全
            // menuItemOn: function() {
            //     let indexs = 0;
            //      this.listHeight.map((value, index) => {
            //          if(this.scrollY >= this.listHeight[index]) {
            //              indexs = index;
            //          };
            //      });
            //      console.log(indexs);
            //     return indexs;
            // }
            // 老师的算的更加稳妥
            currentIndex: function() {
                for(let i = 0; i < this.listHeight.length; i++) {
                    let height = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if(!height2 || this.scrollY >= height && this.scrollY < height2) {
                        return i;
                    }
                }
            },
            selectFoods: function() {
              let foods = [];
              this.goods.forEach(good => {
                // good 循环获得大分类。
                good.foods.forEach(food => {
                  // good.foods 循环所有大分类里面的商品
                  if(food.count) {
                    // 判断是否有count 有则表示商品有被选中，push
                    foods.push(food);
                  }
                });
              });
              window.localStorage.setItem('sellItem', JSON.stringify(foods));
              return foods;
            }
        },
        components: {
            hot,
            shopcart,
            cartcontrol,
            food
        }
    };
</script>
<style lang="scss" scoped>
  @import '../../common/scss/mixin';
  .goods {
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    display: flex;
  }
  
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      /*margin:0 auto;*/
      padding: 0 12px;
      .text {
        font-size: 12px;
        display: table-cell;
        vertical-align: middle;
        width: 56px;
        @include border-1px(rgba(7, 17, 27, .1));
        line-height: 14px;
        span {
          vertical-align: middle;
        }
      }
      &.on {
        background: #fff;
        border-bottom: none;
        position: relative;
        z-index: 3;
        margin-top: -1px;
        .border-1px:after {
          display: none;
        }
      }
    }
  }
  
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-1px(rgba(7, 17, 27, .1));
      &:last-child {
        margin-bottom: 0;
        &:after {
          display: none;
        }
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
        img {
          display: block;
          width: 57px;
          height: 57px;
        }
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          margin-bottom: 8px;
          line-height: 12px;
        }
        .extra {
          .count {
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
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 14px;
        }
      }
    }
  }
</style>