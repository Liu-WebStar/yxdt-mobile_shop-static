<template>
  <div>
    <div class="order-settle">
      <div class="default-address" @click="selectAddress" v-if="addressList.length">
        <div class="address-header">
          <div class="default-box" v-if="selectedAddress.default">默认</div>
          <div class="name">邢晓倩</div>
          <div class="phone">{{'18512345678' | phone}}</div>
          <img src="/static/center/right-arrow.png" alt="" class="arrow-right">
        </div>
        <div class="address-detail">北京市 北京市 西城区莲花池东路3号天云五金大厦308室  天云五金大厦 308室</div>
      </div>
      <div class="add-address" @click="add_address" v-else>
        <img src="/static/cart/dizhi.png" alt="" class="position_icon">
        <div class="text">添加收货地址</div>
        <img src="/static/center/right-arrow.png" alt="" class="right_icon">
      </div>
      <div class="goods-info">
        <div class="goods-header">
          <img src="/static/center/store.png" alt="" class="icon">
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
          <div class="goods-list inventoryEmpty">
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
            <div class="more-box" @click="showMore">
              <div class="text">展开更多</div>
              <div class="under-arrow"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="action-info">
        <div class="action-list" @click="pay_now">
          <div class="label">支付方式</div>
          <div class="value pay">
            <img :src="pay_type.image" alt="" class="wx_icon">
            <div class="text">{{pay_type.text}}</div>
            <img src="/static/center/right-arrow.png" alt="" class="right_icon">
          </div>
        </div>
        <div class="action-list" @click="show_invoice">
          <div class="label">发票信息</div>
          <div class="value">
            <div class="text">不开发票</div>
            <img src="/static/center/right-arrow.png" alt="" class="right_icon">
          </div>
        </div>
        <div class="action-list" @click="show_backup">
          <div class="label">备注</div>
          <div class="value">
            <div class="text gray">填写订单额外要求</div>
            <img src="/static/center/right-arrow.png" alt="" class="right_icon">
          </div>
        </div>
      </div>
      <div class="info-group">
        <div class="list list_2">
          <div class="label">商品总价</div>
          <div class="value"><span class="s1">￥</span><span class="s2">256.00</span></div>
        </div>
        <div class="list">
          <div class="label">配送费</div>
          <div class="value">￥0.00</div>
        </div>
        <div class="list">
          <div class="label">已优惠</div>
          <div class="value">￥12.00</div>
        </div>
      </div>
      <div class="page-footer">
        <router-link class="go-back" to="/cart">
          <img src="/static/center/left-arrow.png" alt="" class="left-arrow">
          <span>购物车</span>
        </router-link>
        <div class="col_2">
          <div class="s1">合计:</div>
          <div class="price">
            <span class="s2">￥</span>
            <span class="s3">256.00</span>
          </div>
          <div class="btn_s1" @click="confirmOrder">提交订单</div>
        </div>
      </div>
    </div>
    <!-- 删除弹窗 -->
    <shadow-modal 
      v-model="show_toast_add" 
      type="middle"
      :show_cancel="true"
      :okHide="true"
      @ok="add_address"
      class="text-center"
      >
      <template slot="header">请先添加收货地址哦~</template>
    </shadow-modal>
    <!-- 选择收货地址 -->
    <shadow-modal
      v-model="show_select_address"
      @ok="save_select_address"
      >
      <template slot="header">选择收货地址</template>
      <template slot="body">
        <div class="shadow-select-address">
          <div class="address-group">
            <div class="address-list" 
              v-for="(item,key) in addressList" 
              :key="key"
              @click="changeSelect(key)"
              >
              <div class="address-select" :class="{selected:item.select_cache}"></div>
              <div class="col_2">
                <div class="address-header">
                  <div class="name">邢晓倩</div>
                  <div class="phone">{{'18512346789' | phone}}</div>
                  <div class="default" v-if="item.default">默认</div>
                </div>
                <div class="address-detail">北京市 北京市 西城区 莲花池东路3号天云五金大厦308 室 天云五金大厦 308室</div>
              </div>
            </div>
          </div>
          <div class="shadow-add-address">
            <div class="item-box" @click="add_address">
              <img src="/static/cart/icon-add.png" alt="" class="icon">
              <span class="text">新建收货地址</span>
            </div>
          </div>
        </div>
      </template>
    </shadow-modal>
    <!-- 新增收货地址 -->
    <modal-address 
      v-model="show_add"
      header-text="新增收货地址"
      :address-data="addData"
      />
    <!-- 编辑收货地址 -->
    <modal-address 
      v-model="show_edit"
      header-text="编辑收货地址"
      :address-data="editData"
      />
    <!-- 立即付款弹窗 -->
    <modal-pay
      v-model="show_pay" 
      :payIndex="payIndex"
      @inputpay="changePay"
      price="2125.00"
      />
    <!-- 发票信息 -->
    <shadow-modal
      v-model="show_invoice_type"
      @ok="save_invoice"
      >
      <template slot="header">发票信息</template>
      <template slot="body">
        <div class="invoice-container">
          <div class="item-list">
            <div class="label">发票类型</div>
            <div class="content">
              <div class="select-box">
                <div class="select-btn" :class="{selected:invoiceData.type=='普通发票'}" @click="invoiceData.type='普通发票'">普通发票</div>
                <div class="select-btn" :class="{selected:invoiceData.type=='增值税发票'}" @click="invoiceData.type='增值税发票'">增值税发票</div>
              </div>
            </div>
          </div>
          <div class="item-list">
            <div class="label">发票抬头</div>
            <div class="content">
              <input type="text" class="yxdt-input" placeholder="请输入内容" v-model="invoiceData.title">
            </div>
          </div>
          <div class="item-list">
            <div class="label">发票明细</div>
            <div class="content">
              <div class="select-box">
                <div class="select-btn" :class="{selected:invoiceData.detail=='商品明细'}" @click="invoiceData.detail='商品明细'">商品明细</div>
                <div class="select-btn" :class="{selected:invoiceData.detail=='商品类别'}" @click="invoiceData.detail='商品类别'">商品类别</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </shadow-modal>
    <!-- 备注信息 -->
    <shadow-modal
      v-model="show_backup_type"
      @ok="save_backup"
      >
      <template slot="header">备注信息</template>
      <template slot="body">
        <div class="backup-box">
          <van-field
            v-model="data_backup"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入留言内容"
            class="van-yxdt-textarea"
            show-word-limit
            style="height:260px;"
          />
        </div>
      </template>
    </shadow-modal>
    <!-- 支付确认 -->
    <shadow-modal
      v-model="show_payment"
      :show_ok="false"
      ref="payment"
      >
      <template slot="header">支付确认</template>
      <template slot="body">
        <div class="payment-box">
          <div class="text">请确认是否已支付完成</div>
        </div>
      </template>
      <div class="payment-footer" slot="footer">
        <div class="btn_s2" @click="$refs.payment.close_modal()">稍后支付</div>
        <div class="btn_s1" @click="save_pament">刷新支付结果</div>
      </div>
    </shadow-modal>
  </div>
</template>

<script>
import {Toast} from 'vant'
import ShadowModal from "@/iYxdt/ShadowModal";
import ModalAddress from "@/views/components/ModalAddress";
import ModalPay from "@/views/components/ModalPay";

export default {
  data(){
    return {
      show_toast_add:false,
      show_add:false,
      show_edit:false,
      show_select_address:false,
      show_pay:false,
      payIndex:0,
      show_invoice_type:false,
      invoiceData:{
        type:'普通发票',
        title:'',
        detail:'商品明细',
      },
      // 
      show_backup_type:false,
      data_backup:'',
      show_payment:false,
      // 
      addData:{
        address_id:null,
        name:'',
        phone:'',
        address:'',
        address_detail:'',
        default_checked:false,
      },
      editData:{
        address_id:3,
        name:'1',
        phone:'2',
        address:'福建,厦门,海沧区',
        address_detail:'3',
        default_checked:true,
      },
      // 
      addressList:[
        {default:true,select:true,select_cache:true},
        {default:false,select:false,select_cache:false},
        {default:false,select:false,select_cache:false},
      ],
    }
  },
  computed:{
    selectedAddress(){ 
      return this.addressList.filter(item=>item.select)[0] 
    },
    pay_type(){
      var obj={image:'',text:''};
      switch(this.payIndex){
        case 0:
          obj.image='/static/center/xinyongeduzhifu.png';
          obj.text='信用额度支付';
          break;
        case 1:
          obj.image='/static/cart/weixin.png';
          obj.text='微信支付';
          break;
        case 2:
          obj.image='/static/center/zhifubao.png';
          obj.text='支付宝支付';
          break;
        case 3:
          obj.image='/static/center/yinhangqia.png';
          obj.text='银行汇款/转账';
          break;
        case 4:
          obj.image='/static/center/huodaofukuan.png';
          obj.text='货到付款';
          break;
      }
      return obj;
    }
  },
  methods:{
    showMore(){
      console.log('showMore');
    },
    changeSelect(key){
      this.addressList.forEach((item,index)=>{
        item.select_cache = key==index;
      })
    },
    changePay(payIndex){
      console.log(payIndex);
      this.payIndex=payIndex;
    },
    // 
    act_delete(){
      console.log('act_delete')
      this.show_toast_add=true;
    },
    add_address(){
      console.log('add_address');
      this.addData={
        address_id:null,
        name:'',
        phone:'',
        address:'',
        address_detail:'',
        default_checked:false,
      },
      this.show_add=true;
    },
    selectAddress(){
      console.log('selectAddress')
      this.addressList.forEach(item=>{
        item.select_cache=item.select;
      });
      this.show_select_address=true;
    },
    pay_now(){
      console.log('pay_now');
      this.show_pay=true;
    },
    show_invoice(){
      console.log('show_invoice');
      this.show_invoice_type=true;
    },
    show_backup(){
      console.log('show_backup');
      this.show_backup_type=true;
    },
    // 
    save_select_address(modal){
      console.log('save_select_address');
      this.addressList.forEach(item=>{
        item.select=item.select_cache;
      });
      modal.close_modal();
    },
    save_invoice(modal){
      console.log('save_invoice');
      console.log(this.invoiceData);
      modal.close_modal();
    },
    save_backup(modal){
      console.log('save_backup');
      modal.close_modal();
    },
    save_pament(){
      console.log('save_pament');
      Toast('未获取到支付结果,请继续完成支付!');
    },
    confirmOrder(){
      console.log('confirmOrder');
      if(this.addressList.length){
        var payIndex=this.payIndex;
        console.log(this.selectedAddress);
        console.log(payIndex);
        console.log(this.invoiceData);
        console.log(this.data_backup);
        if(payIndex==0 || payIndex==4){ // 0-信用额度支付 4-货到付款
          Toast('订单提交成功');
        }else if(payIndex==3){ // 银行汇款/转账
          this.$router.push({ name:'OrderSubmit'});
        }else if(payIndex==1){ // 微信支付
          Toast('支付成功');
        }else if(payIndex==2){ // 支付宝支付
          this.show_payment=true;
        }        
      }else{
        this.act_delete();
      }
    }
  },
  components:{
    ShadowModal,
    ModalAddress,
    ModalPay,
  }
}
</script>

<style scoped lang="scss">
.order-settle{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  overflow-y:auto;
  .default-address{
    background:#fff;
    padding:30px;
    .address-header{
      display:flex;
      align-items: center;
      line-height:34px;
      font-size:30px;
      font-weight:bold;
      .default-box{
        padding:0 18px;
        height:34px;
        background:#ff6901;
        border-radius:17px;
        color:#fff;
        font-size:22px;
        font-weight:normal;
        margin-right:20px;
      }
      .phone{
        margin-left:30px;
        flex:1;
      }
      .arrow-right{
        width:10px;
        height:19px;
      }
    }
    .address-detail{
      margin-top:18px;
      font-size:26px;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      overflow:hidden;
    }
  }
  .add-address{
    height:100px;
    padding:0 30px;
    display:flex;
    align-items:center;
    background:#fff;
    .position_icon{
      width:30px;
      height:40px;
    }
    .text{
      margin-left:30px;
      font-size:28px;
      flex:1;
    }
    .right_icon{
      width:16px;
      height:25px;
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
          justify-content:space-between;
          .name{
            font-size:26px;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
            margin-top:18px;
          }
          .info{
            margin-bottom:20px;
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
        &.inventoryEmpty{
          .col_1{
            position:relative;
            img{
              opacity:0.5;
            }
            &:after{
              content:'无货';
              padding:0 20px;
              line-height:36px;
              background:#666;
              border-radius:18px;
              color:#fff;
              font-size:20px;
              position:absolute;
              top:50%;
              left:50%;
              transform:translate(-50%,-50%);
            }
          }
          .col_2{
            .name{
              color:#999999;
            }
            .info{
              .num{
                color:#999999;
              }
              .price{
                color:#FFCEAF;
              }
            }
          }
        }
      }
      .more{
        padding-top:20px;
        padding-bottom:35px;
        font-size:0;
        text-align:center;
        .more-box{
          display:inline-block;
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
      }
    }
  }
  .action-info{
    margin-top:20px;
    padding:0 30px;
    background:#fff;
    .action-list{
      display:flex;
      align-items:center;
      justify-content: space-between;
      height:88px;
      .label{
        font-size:28px;
      }
      .value{
        display:flex;
        align-items:center;
        .text{
          margin-left:16px;
          font-size:26px;
          &.gray{
            color:#999;
          }
        }
        .right_icon{
          width: 16px;
          height: 25px;
          margin-left:17px;
        }
        &.pay{
          .wx_icon{
            width: 32px;
            height: 32px;
          }
        }
      }
      &+.action-list{
        border-top:1px solid #f6f6f6;
      }
    }
  }
  .info-group{
    margin-top:24px;
    margin-bottom:24px;
    padding:0 30px;
    .list{
      display:flex;
      justify-content:space-between;
      color:#666;
      &+.list{
        margin-top:20px;
      }
      &.list_2{
        .label{
          color:#333;
        }
        .value{
          color:#FF6800;
          .s1{ font-size:20px; }
          .s2{ font-size:26px; }
        }
      }
    }
  }
  .page-footer{
    height:100px;
    background:#fff;
    border-top:1px solid #eee;
    padding:0 30px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    .go-back{
      display:flex;
      align-items:center;
      .left-arrow{
        width:16px;
        height:25px;
        margin-top:2px;
      }
      span{
        margin-left:6px;
      }
    }
    .col_2{
      display:flex;
      align-items:center;
      .price{
        margin-right:20px;
        color:#ff6501;
        .s2{ font-size:20px; }
        .s3{ font-size:34px; }
      }
      .btn_s1{
        margin:0;
        width: 220px;
      }
    }
  }
}
.shadow-select-address{
  padding:14px 30px 30px;
  .address-group{
    .address-list{
      padding:30px 0;
      border-bottom:1Px solid #f6f6f6;
      display:flex;
      align-items:center;
      .address-select{
        width:36px;
        height:36px;
        background:rgba(255,101,1,0);
        border:2Px solid rgba(204, 204, 204, 1);
        border-radius:50%;
        box-sizing:border-box;
        flex-shrink:0;
        &.selected{
          background:url(/static/center/selected.png) 0 0 no-repeat;
          background-size:100% 100%;
          border:none;
        }
      }
      .col_2{
        flex:1;
        margin-left:20px;
        .address-header{
          display:flex;
          align-items:center;
          line-height:34px;
          font-size:30px;
          font-weight:bold;
          .phone{ margin-left:30px; }
          .default{
            padding:0 18px;
            height:34px;
            background:#ff6901;
            border-radius:17px;
            color:#fff;
            margin-left:30px;
            font-size:22px;
            font-weight:normal;
          }
        }
        .address-detail{
          margin-top:20px;
          font-size:26px;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow:hidden;
        }
      }
    }
  }
  .shadow-add-address{
    margin-top:86px;
    display:flex;
    justify-content:center;
    .item-box{
      display:flex;
      line-height:30px;
      .icon{
        width:30px;
        height:30px;
      }
      .text{
        margin-left:20px;
        font-size:30px;
        color:#ff6901;
      }
    }
  }
}
.invoice-container{
  padding:0 30px 50px;
  .item-list{
    padding:30px 0;
    border-bottom:1Px solid #f6f6f6;
    .label{
      padding-bottom:30px;
      font-size:28px;
    }
    .content{
      input{
        margin-top:8px;
        height:30px;
        border:none;
        padding:0 18px;
      }
      .select-box{
        display:flex;
        .select-btn{
          width: 190px;
          height:54px;
          box-sizing:border-box;
          border:2Px solid transparent;
          line-height:50px;
          text-align:center;
          color:#999;
          background:#f6f6f6;
          border-radius:27px;
          &.selected{
            background:#FFF7EE;
            border-color:#ea5513;
            color:#ea5513;
          }
          &+.select-btn{
            margin-left:30px;
          }
        }
      }
    }
  }
}
.backup-box{
  padding:30px 30px 80px;
}
.payment-box{
  .text{
    padding:80px 0;
    text-align:center;
  }
}
.shadow_modal .shadow_container .shadow_footer .payment-footer{
  display:flex;
  .btn_s2{
    width:260px;
    margin:0;
    border-color:#ff6901;
    color:#ff6901;
  }
  .btn_s1{
    width:260px;
    margin:0;
    margin-left:70px;
  }
}
</style>