<template>
  <div class="component-history">
    <div class="component-title">浏览历史</div>
    <scroll-view scroll-x :height="402">
      <div class="goods-group">
        <div class="goods-list" v-for="(item,key) in historyList" :key="key">
          <div class="img"><img src="" alt="" @click="push_goods_info"></div>
          <div class="name" @click="push_goods_info">联想(Lenovo)K4-IM L 14英寸笔记本电 联想(Lenovo)K4-IM L 14英寸笔记本电 </div>
          <div class="action">
            <div class="price"><span class="s1">￥</span><span class="s2">2088.00</span></div>
            <img class="cart" src="/static/cart/cart-icon.png" alt="">
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>

export default {
  props:{
    historyList:{
      type:Array,
      default:[]
    }
  },
  methods:{
    push_goods_info(){
      this.$router.push('goods');
    },
  }
}
</script>

<style scoped lang="scss">
.component-history{
  .component-title{
    margin:0 30px 32px;
    padding-left:20px;
    border-left:8px solid #ff6501;
    font-size:32px;
    line-height:32px;
  }
  .scroll-view{
    .goods-group{
      display:flex;
      .goods-list{
        width: 280px;
        height: 402px;
        background:#fff;
        margin:0 15px;
        flex-shrink:0;
        &:first-child,&:last-child{
          margin-left:30px;
        }
        .img{
          img{
            width:280px;
            height:248px;
            background:#f00;
            display:block;
          }
        }
        .name{
          margin:20px;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow:hidden;
        }
        .action{
          margin:0 20px 14px;
          height:36px;
          display:flex;
          justify-content:space-between;
          .price{
            color:#ff6901;
            .s1{
              font-size:22px;
            }
            .s2{
              font-size:32px;
            }
          }
          .cart{
            width:36px;
            height:36px;
          }
        }
      }
    }
  }
}
</style>