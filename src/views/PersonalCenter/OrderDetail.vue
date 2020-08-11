<template>
  <div>
    <!-- 订单详情 -->
    <full-modal class="bg_1" v-model="show_component">
      <div class="header_1" slot="header">
        <img src="/mobile_shop/static/center/time.png" alt="" class="icon">
        <span>{{order_status}}</span>
      </div>
      <div class="oder_detail_container" slot="body">
        <div class="logistics-info">
          <div class="record border-bottom">
            <img src="/mobile_shop/static/center/wuliu.png" alt="" class="icon">
            <div class="text">2020-06-24 11:41:23,您已成功创建订单</div>
            <div class="right-arrow"></div>
          </div>
          <div class="my-region">
            <img src="/mobile_shop/static/center/position.png" alt="" class="icon">
            <div class="region-info">
              <div class="person">
                <span class="name">邢晓倩</span>
                <span class="phone">185****2516</span>
              </div>
              <div class="region">北京市 北京市 西城区 莲花池东路3号天云五金大厦308 室 天云五金大厦 308室</div>
            </div>
          </div>
        </div>
        <div class="goods-info">
          <div class="goods-header">
            <img src="/mobile_shop/static/center/store.png" alt="" class="icon">
            <div class="text">一线达通自营</div>
          </div>
          <div class="goods-group">
            <div class="goods-list">
              <div class="col_1"><img src="" alt=""></div>
              <div class="col_2">
                <div class="name">博文（bowen） 25202皮面笔记本 单本 25202皮面笔记本 单本</div>
                <div class="info">
                  <div class="num">x15</div>
                  <div class="price"><span class="s1">￥</span><span class="s2">128.00</span></div>
                </div>
                <div class="action-box">
                  <a @click="buy_again">再次购买</a>
                  <a @click="after_sale">申请售后</a>
                  <a @click="my_evaluation">进行评价</a>
                </div>
              </div>
            </div>
            <div class="more border-bottom">
              <div class="more-box" style="display:inline-block;" @click="show_more">
                <div class="text">展开更多</div>
                <div class="under-arrow"></div>
              </div>
            </div>
            <div class="info-group">
              <div class="list">
                <div class="label">总价</div>
                <div class="value">￥128.00</div>
              </div>
              <div class="list">
                <div class="label">优惠</div>
                <div class="value">￥0.00</div>
              </div>
              <div class="list">
                <div class="label">运费</div>
                <div class="value">￥0.00</div>
              </div>
              <div class="list list_2">
                <div class="label">实付款</div>
                <div class="value"><span class="s1">￥</span><span class="s2">128.00</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-info">
          <div class="list">
            <div class="label">订单编号：</div>
            <div class="value">DG39398389</div>
          </div>
          <div class="list">
            <div class="label">下单时间：</div>
            <div class="value">2020-09-12 12:09:13</div>
          </div>
          <div class="list">
            <div class="label">支付方式：</div>
            <div class="value">微信支付</div>
          </div>
          <div class="list">
            <div class="label">配送方式：</div>
            <div class="value">自营物流</div>
          </div>
          <div class="list">
            <div class="label">发票信息：</div>
            <div class="value">需要发票</div>
          </div>
          <div class="list">
            <div class="label">备注说明：</div>
            <div class="value">- -</div>
          </div>
          <div class="list">
            <div class="label">订单状态：</div>
            <div class="value s2">待确认</div>
          </div>
          <div class="list">
            <div class="label">付款状态：</div>
            <div class="value s2">待付款</div>
          </div>
          <div class="list">
            <div class="label">物流状态：</div>
            <div class="value s2">待发货</div>
          </div>
        </div>
        <div class="btn_box">
          <div class="btn_s2 s2" @click="cancel_btn">取消订单</div>
          <div class="btn_s2" @click="confirm">立即付款</div>
        </div>
      </div>
    </full-modal>
    <!-- 设置性别 -->
    <shadow-modal
      v-model="show_gender" 
      :okHide="true"
      @ok="save_gender"
      >
      <template slot="header">设置性别</template>
      <template slot="body">
        <div class="gender_container">
          <van-radio-group v-model="data_gender2">
            <van-radio class="border-bottom" name="男">男</van-radio>
            <van-radio class="border-bottom" name="女">女</van-radio>
            <van-radio class="border-bottom" name="保密">保密</van-radio>
          </van-radio-group>
        </div>
      </template>
    </shadow-modal>
    <!-- 我的评论 -->
    <my-evaluation ref="my_evaluation" />
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Toast } from 'vant';
// 
import FullModal from "@/iYxdt/FullModal";
import ShadowModal from "@/iYxdt/ShadowModal";
import MyEvaluation from "./MyEvaluation";

export default {
  inject:['myOrder'],
  data(){
    return {
      show_component:false,
      order_status:'待确认',
      /*  */
      show_gender:false,  // 设置性别
      data_gender:'男',
      data_gender2:'男',
    }
  },
  methods:{
    show_gender_modal(){
      this.data_gender2=this.data_gender;
      this.show_gender=true;
    },
    save_gender(){
      var gender=this.data_gender2;
      this.data_gender=this.data_gender2;
    },
    cancel_btn(){
      console.log('cancel_btn')
    },
    confirm(){
      console.log('confirm')
    },
    buy_again(){
      console.log('buy_again')
      this.myOrder.buy_again();
    },
    after_sale(){
      console.log('after_sale')
      this.myOrder.after_sale();
    },
    my_evaluation(){
      console.log('my_evaluation')
      this.$refs.my_evaluation.show_component=true;
    },
    show_more(){
      console.log('show_more')
    }
  },
  components:{
    FullModal,
    ShadowModal,
    MyEvaluation,
  }
}
</script>

<style scoped lang="scss">
  .header_1{
    img{
      width: 36px;
      height: 36px;
      margin-right:20px;
      display:inline-block;
      vertical-align:middle;
    }
    span{
      vertical-align:middle;
      color:#fff;
    }
  }
  .oder_detail_container{
    .logistics-info{
      background:#fff;
      padding:0 30px;
      .record{
        height:100px;
        display:flex;
        align-items:center;
        .icon{
          width:32px;
          height:28px;
          flex-shrink:0;
        }
        .text{
          margin-left:20px;
          flex:1;
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
          font-size:26px;
        }
        .right-arrow{
          flex-shrink:0;
          margin-left:20px;
          width: 16px;
          height: 25px;
          background:url(/mobile_shop/static/center/right-arrow.png) 0 0 no-repeat;
          background-size:100% 100%;
        }
      }
      .my-region{
        display:flex;
        padding:36px 0;
        align-items:center;
        .icon{
          flex-shrink:0;
          width: 30px;
          height: 40px;
        }
        .region-info{
          flex:1;
          margin-left:20px;
          .person{
            margin-bottom:20px;
            font-size:30px;
            font-weight:bold; 
            .phone{
              margin-left:30px;
            }
          }
          .region{
            font-size:26px;
          }
        }
      }
    }
    .goods-info{
      margin-top:20px;
      background:#fff;
      .goods-header{
        padding:0 30px;
        display:flex;
        align-items:center;
        height:80px;
        border-bottom:1Px solid #f6f6f6;
        .icon{
          width: 29px;
          height: 26px;
        }
        .text{
          font-size:28px;
          margin-left:20px;
        }
      }
      .goods-group{
        padding:0 30px;
        .goods-list{
          margin-top:20px;
          display:flex;
          .col_1{
            flex-shrink:0;
            img{
              width: 180px;
              height: 180px;
              background:#ff0;
              display:block;
            }
          }
          .col_2{
            margin-left:30px;
            display:flex;
            flex-direction:column;
            flex:1;
            overflow:hidden;
            position:relative;
            .name{
              font-size:26px;
              white-space:nowrap;
              text-overflow:ellipsis;
              overflow:hidden;
            }
            .info{
              margin-top:20px;
              display:flex;
              justify-content:space-between;
              align-items:flex-end;
              .num{
                font-size:20px;
                color:#666;
              }
              .price{
                color:#FF6501;
                .s1{
                  font-size:20px;
                }
                .s2{
                  font-size:34px;
                }
              }
            }
            .action-box{
              font-size:0;
              text-align:right;
              position:absolute;
              bottom:0;
              left:0;
              right:0;
              a{
                display:inline-block;
                height:38px;
                line-height:38px;
                padding:0 15px;
                border:1Px solid #ccc;
                border-radius:20px;
                color:#666;
                font-size:22px;
                &+a{
                  margin-left:20px;
                }
              }
            }
          }
        }
        .more{
          padding-top:20px;
          padding-bottom:31px;
          font-size:0;
          text-align:center;
          .text{
            display:inline-block;
            font-size:24px;
            color:#999;
          }
          .under-arrow{
            display:inline-block;
            margin-left:7px;
            width: 25px;
            height: 16px;
            background:url(/mobile_shop/static/center/under_arrow.png) 0 0 no-repeat;
            background-size:100% 100%;
          }
        }
        .info-group{
          padding-top:30px;
          padding-bottom:30px;
          .list{
            display:flex;
            justify-content:space-between;
            color:#999;
            font-size:24px;
            &+.list{
              margin-top:20px;
            }
            &.list_2{
              .label{
                color:#343434;
                font-size:28px;
              }
              .value{
                color:#FF6800;
                .s1{ font-size:20px; }
                .s2{ font-size:28px; }
              }
            }
          }
        }
      }
    }
    .order-info{
      margin-top:20px;
      background:#fff;
      padding:30px;
      .list{
        font-size:0;
        .label{
          display:inline-block;
          font-size:26px;
          color:#666;
        }
        .value{
          display:inline-block;
          font-size:26px;
        }
        &+.list{
          margin-top:30px;
        }
      }
    }
    .btn_box{
      margin-top:20px;
      background:#fff;
      padding:20px 30px;
      display:flex;
      justify-content:flex-end;
      .btn_s2{
        padding:0 30px;
        margin:0;
        font-size:26px;
        height:60px;
        &+.btn_s2{
          margin-left:30px;
        }
        &.s2{
          border-color:#ccc;
          color:#333;
        }
      }
    }
  }
</style>