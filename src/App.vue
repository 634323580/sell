<template>
  <div class="hone">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{ path:'/goods' }" active-class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path:'/ratings' }" active-class="active">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path:'/seller' }" active-class="active">商家</router-link>
      </div>
    </div>
      <transition name="fead">
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
      </transition>
  </div>
</template>

<script>
  import header from 'components/header/header';
  import {urlParse} from 'common/js/util';
  const ERR_OK = 0;

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created: function() {
      // console.log(this.$http);
      this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
        if (response.data.erron === ERR_OK) {
          // this.seller = response.data.data;
          this.seller = Object.assign({}, this.seller, response.data.data);
          // console.log(this.seller.id)
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="scss" scoped>
  @import 'common/scss/mixin';
  .tab {
    display: flex;
    width: 100%;
    line-height: 40px;
    background-color: #fff;
    z-index: 3;
    /*box-shadow:(0 1px 2px rgba(7,17,27,.1));*/
    /*移动端1px解决方案*/
    @include border-1px(rgba(7, 17, 27, .1));
    .tab-item {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: rgb(77, 85, 93);
      a {
        display: block;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
  .fead-enter-active,.fead-leave-active{
    transition:.2s ease;
  }
  .fead-enter,.fead-leave-active{
    opacity: 0;
  }
</style>