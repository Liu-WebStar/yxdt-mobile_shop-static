<template>
  <van-tabbar v-model="active2" active-color="#FF6901" inactive-color="#666" class="tab_footer">
    <van-tabbar-item to="/" icon="home-o" class="">
      <span>首页</span>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/image/center/main_hover.png" />
        <img v-else src="@/assets/image/center/main.png" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/sort" icon="search">
      <span>分类</span>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/image/center/sort_hover.png" />
        <img v-else src="@/assets/image/center/sort.png" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to='/cart' icon="friends-o">
      <span>购物车</span>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/image/center/car_hover.png" />
        <img v-else src="@/assets/image/center/car.png" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/center">
      <span>个人中心</span>
      <template #icon="props">
        <img v-if="props.active" src="@/assets/image/center/center2.png" />
        <img v-else src="@/assets/image/center/center1.png" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
    }
  },
  props:{
    active:{
      type:Number,
      default:0
    }
  },
  computed:{
    active2:{
      get(){
        return this.active;
      },
      set(nv){
      }
    }
  },
  created(){
    this.active=this.active2;
  }
}
</script>

<style lang="scss">
.tab_footer{
  border-top:2px solid #eee;
}
.van-tabbar{
  height:100px;
  .van-tabbar-item{
    justify-content: left;
    font-size:20px;
    .van-tabbar-item__icon{
      margin-top:12px;
      margin-bottom:10px;
      img{
        width:44px;
        height:44px;
      }
    }
  }
}
</style>