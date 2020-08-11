<template>
  <li class="order-item">
    <div class="order-header" @click="myOrder.go_detail">
      <div class="order-sn">订单号：DD9292922222222222222222222</div>
      <div class="order-status">待确认</div>
    </div>
    <div class="order-body">
      <div class="order-info" @click="myOrder.go_detail">
        <template v-if="data.goods_list.length<4">
          <div class="goods-list" v-for="(goods,index) in data.goods_list" :key="index">
            <img src="/static/main/default_image.png" :imgurl="data.pdImg">
            <div class="order-name">博文 (bowen) 25202 皮面笔记本单本装皮面笔记本 单本皮本单本装皮面笔记本 单本皮本单本装皮面笔记本 单本皮</div>
            <div class="order-attr">
              <div class="price"><i class="i1">￥</i><i class="i2">128.00</i></div>
              <div class="num">x1</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="goods-list-more">
            <div class="img-list" @touchmove.stop>
              <img v-for="(goods,index) in data.goods_list" :key="index" src="/static/main/default_image.png" :imgurl="data.pdImg">
            </div>
            <div class="order-attr">
              <div class="price"><i class="i1">￥</i><i class="i2">128.00</i></div>
              <div class="num">共{{data.goods_list.length}}件</div>
            </div>
          </div>
        </template>
      </div>
      <div class="order-pay">
        <div class="s1">实付款:</div>
        <div class="s2"><i>￥</i>128.00</div>
      </div>
    </div>
    <div class="order-footer">
      <div class="btn_s2 gray" @click="myOrder.cancel_order">取消订单</div>
      <div class="btn_s2" @click="myOrder.pay_now">立即付款</div>
      <div class="btn_s2" @click="myOrder.hasten">催促发货</div>
      <div class="btn_s2" @click="myOrder.logistics">查看物流</div>
      <div class="btn_s2" @click="myOrder.receipt">确认收货</div>
      <div class="btn_s2" @click="myOrder.after_sale">申请售后</div>
      <div class="btn_s2" @click="myOrder.buy_again">再次购买</div>
      <div class="btn_s2" @click="myOrder.del_order">删除订单</div>
    </div>
  </li>
</template>

<script>

export default {
  inject:['myOrder'],
  data(){
    return {
    }
  },
  props:{
    data:{
      type:Object,
      default:{}
    }
  }
}
</script>

<style scoped lang="scss">
  .order-item{
    background:#fff;
    padding:30px;
    &+.order-item{
      margin-top:20px;
    }
    .order-header{
      padding-bottom:28px;
      border-bottom:1Px solid rgba(246,246,246,1);
      display:flex;
      .order-sn{
        flex:1;
        color:#666;
        font-size:26px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .order-status{
        font-size:24px;
        color:#FF6501;
      }
    }
    .order-body{
      padding-top:20px;
      .order-info{
        @mixin orderAttr{
          .order-attr{
            width:151px;
            text-align:right;
            flex-shrink:0;
            .price{
              color:#ff6901;
              white-space:nowrap;
              text-overflow:ellipsis;
              overflow:hidden;
              .i1{
                font-size:20px;
              }
              .i2{
                font-size:28px;
              }
            }
            .num{
              font-size:24px;
              color:#999;
              margin-top:10px;
            }
          }
        }
        .goods-list{
          display:flex;
          align-items:center;
          img{
            width: 160px;
            height: 160px;
            margin-right:20px;
          }
          .order-name{
            flex:1;
            font-size:26px;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
            overflow:hidden;
          }
          @include orderAttr;
          &+.goods-list{
            margin-top:20px;
          }
        }
        .goods-list-more{
          display:flex;
          .img-list{
            display:flex;
            overflow-x:auto;
            flex:1;
            img{
              width:120px;
              height:120px;
              &+img{
                margin-left:10px;
              }
            }
          }
          @include orderAttr;
        }
      }
      .order-pay{
        display:flex;
        justify-content:flex-end;
        padding-top:20px;
        .s1{
          font-size:26px;
        }
        .s2{
          font-size:34px;
          i{
            font-size:20px;
          }
        }
      }
    }
    .order-footer{
      padding-top:30px;
      display:flex;
      justify-content: flex-end;
      .btn_s2{
        margin:0;
        padding:0 28px;
        font-size:26px;
        display:flex;
        &.gray{
          margin-right:30px;
          border-color:#ccc;
          color:#333;
        }
      }
    }
  }
</style>