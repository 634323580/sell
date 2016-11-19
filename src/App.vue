<template>
  <div class="hone">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{ path:'goods' }" active-class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path:'/ratings' }" active-class="active">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path:'/seller' }" active-class="active">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header';
  export default {
    components: {
      'v-header': header
    }
  };
</script>

<style rel="stylesheet" lang="scss">
  body{
    background-color:#e8e8e8;
  }
  .tab{
    display: flex;
    width:100%;
    line-height: 40px;
    background-color:#fff;
    box-shadow:(0 1px 2px rgba(7,17,27,.1));
    .tab-item{
      flex: 1;
      text-align: center;
      font-size:14px;
      color:rgb(77,85,93);
      a{
        display:block;
        &.active{
          color:rgb(240,20,20);
        }
      }
    }
  }
</style>