<template>
  <div>
    <!-- 订单详情 -->
    <full-modal class="bg_1" v-model="show_component">
      <div class="header_1" slot="header">
        <img src="/static/center/time.png" alt="" class="icon">
        <span>{{order_status}}</span>
      </div>
      <div class="oder_detail_container" slot="body">
        <div class="order-info">
          <div class="list">
            <div class="label">售后编号：</div>
            <div class="value">DG39398389</div>
          </div>
          <div class="list">
            <div class="label">申请时间：</div>
            <div class="value">2020-09-12 12:09:13</div>
          </div>
          <div class="list">
            <div class="label">售后类型：</div>
            <div class="value">退货</div>
          </div>
          <div class="list">
            <div class="label">订单编号：</div>
            <div class="value">DG39398389</div>
          </div>
          <div class="list">
            <div class="label">退款金额：</div>
            <div class="value s2">￥28298.00</div>
          </div>
          <div class="list">
            <div class="label">备注说明：</div>
            <div class="value">- -</div>
          </div>
        </div>
        <div class="goods-info">
          <div class="goods-header">
            <div class="text">售后商品</div>
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
              </div>
            </div>
            <div class="goods-list">
              <div class="col_1"><img src="" alt=""></div>
              <div class="col_2">
                <div class="name">博文（bowen） 25202皮面笔记本 单本 25202皮面笔记本 单本</div>
                <div class="info">
                  <div class="num">x15</div>
                  <div class="price"><span class="s1">￥</span><span class="s2">128.00</span></div>
                </div>
              </div>
            </div>
            <div class="goods-list">
              <div class="col_1"><img src="" alt=""></div>
              <div class="col_2">
                <div class="name">博文（bowen） 25202皮面笔记本 单本 25202皮面笔记本 单本</div>
                <div class="info">
                  <div class="num">x15</div>
                  <div class="price"><span class="s1">￥</span><span class="s2">128.00</span></div>
                </div>
              </div>
            </div>
            <div class="more border-bottom">
              <div class="text">展开更多</div>
              <div class="under-arrow"></div>
            </div>
            <div class="info-group">
              <div class="list">
                <div class="label">商品金额</div>
                <div class="value">￥128.00</div>
              </div>
              <div class="list">
                <div class="label">实付款</div>
                <div class="value">￥0.00</div>
              </div>
              <div class="list list_2">
                <div class="label">应退款</div>
                <div class="value"><span class="s1">￥</span><span class="s2">128.00</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="after_progress">
          <div class="title">售后进展</div>
          <yxdt-timeline>
            <yxdt-line-list>2020-06-28  11:36:24  您已确认收货啦啦啦啦啦啦阿拉啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</yxdt-line-list>
            <yxdt-line-list>2020-06-28  11:36:24  商家已发货;  配送员:某某某</yxdt-line-list>
            <yxdt-line-list>2020-06-28  11:36:24  商家已开始配货</yxdt-line-list>
            <yxdt-line-list>2020-06-28  11:36:24  您已成功创建订单</yxdt-line-list>
          </yxdt-timeline>
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
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import FullModal from "@/iYxdt/FullModal";
import ShadowModal from "@/iYxdt/ShadowModal";
import { Toast } from 'vant';
import YxdtTimeline from "@/iYxdt/YxdtTimeline";
import YxdtLineList from "@/iYxdt/YxdtLineList";

export default {
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
    cancel_btn(){},
    confirm(){},
  },
  components:{
    FullModal,
    ShadowModal,
    YxdtTimeline,
    YxdtLineList,
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
    .order-info{
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
    .goods-info{
      margin-top:20px;
      background:#fff;
      .goods-header{
        padding:0 30px;
        display:flex;
        align-items:center;
        height:80px;
        border-bottom:1Px solid #f6f6f6;
        .text{
          font-size:28px;
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
            justify-content:center;
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
            background:url(/static/center/under_arrow.png) 0 0 no-repeat;
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
    .after_progress{
      background:#fff;
      margin-top:20px;
      padding:40px 30px 30px;
      margin-bottom:20px;
      .title{
        font-size:28px;
        line-height:27px;
      }
      .yxdt-timeline{
        margin:0;
        margin-top:30px;
      }
    }
  }
</style>