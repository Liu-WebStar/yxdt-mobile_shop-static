<template>
  <div>
    <div class="view-cart">
      <template v-if="!dataList.length">
        <div class="empty-box" :class="{noCenter:historyList.length}">
          <yxdt-empty img-url="/static/cart/gouwucheweikong.png" text="购物车空空如也,快来逛一逛吧~"/>
          <router-link class="btn_s1 empty-btn" to="/">逛一逛</router-link>
          <div class="history-box" v-if="historyList.length">
            <component-history :historyList="historyList"/>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="cart_top">
          <div class="cart_top1">共 {{dataList.length}} 件商品</div>
          <div v-if="!modifyType" class="cart_top2" @click="modifyType = true">管理</div>
          <div v-else class="cart_top2" @click="modifyType = false">完成</div>
        </div>
        <div class="cart-container">
          <div class="cart-header">
            <div class="select-box" @click="selectAll">
              <div class="cart-select" :class="{selected:selectAllType}"></div>
              <img src="/static/cart/dianpu.png" alt="" class="icon">
              <div class="cart-header-text">一线达通自营</div>
            </div>
          </div>
          <div class="cart-body">
            <van-swipe-cell 
              v-for="(item,index) of dataList"
              :key="index" 
              >
              <cart-body-list :data="item"/>
              <template #right>
                <div class="swipe-actionbox">
                  <div class="act s1" @click="addCollect"><div>加入<br/>收藏夹</div></div>
                  <div class="act" @click="act_delete(index)"><div>删除</div></div>
                </div>
              </template>
            </van-swipe-cell>
          </div>
        </div>
        <div class="cart-footer">
          <div class="col_1" @click="selectAll">
            <div class="cart-select" :class="{selected:selectAllType}"></div>
            <div class="text">全选</div>
          </div>
          <div class="col_2" v-if="modifyType">
            <a class="btn_s2 gray" @click="toCollect">移入收藏夹</a>
            <a class="btn_s2 del" @click="deleteGoods">删除</a>
          </div>
          <div class="col_2 modify" v-else>
            <span class="s1">合计: </span>
            <div class="price">
              <span class="s2">￥</span>
              <span class="s3">0.00</span>
            </div>
            <div class="btn" :class="{allow:dataListChecked.length}" @click="toSettle">结算</div>
          </div>
        </div>
      </template>
    </div>
    <!-- footer -->
    <v-footer :active='2' />
    <!-- 删除弹窗 -->
    <shadow-modal 
      v-model="show_del" 
      type="middle"
      :show_cancel="true"
      @ok="save_del"
      class="text-center"
      >
      <template slot="header">{{del_header_text}}</template>
    </shadow-modal>
  </div>
</template>

<script>
import {Toast} from 'vant'
import VFooter from './ViewFooter'
import CartBodyList from '@/views/cart/CartBodyList.vue';
import ShadowModal from "@/iYxdt/ShadowModal";
import ComponentHistory from "@/views/components/ComponentHistory";

export default {
  provide(){
    return {
      viewCart:this,
    }
  },
  data(){
    return {
      dataList:[
        {select:false,num:1},
        {select:false,num:1},
        {select:false,num:1},
        {select:false,num:1},
        {select:false,num:1},
        {select:false,num:1},
        {select:false,num:1},
        {select:false,num:1},
        {select:false,num:1},
        {select:false,num:1},
      ],
      historyList:[
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      modifyType:false,
      // 
      show_del:false,
      del_multiple:false,
    }
  },
  computed:{
    selectAllType(){
      var type=true;
      for(var i = 0;i<this.dataList.length;i++){
        if(!this.dataList[i].select){
          type=false;
          break;
        }
      }
      return type;
    },
    dataListChecked(){
      return this.dataList.filter(item=>item.select);
    },
    del_header_text(){
      return this.del_multiple ? `确定要删除这${this.dataListChecked.length}种商品吗?` : '确定要删除此商品吗?'
    }
  },
  methods:{
    selectAll(){
      console.log('selectAll');
      var type=!this.selectAllType;
      this.dataList.forEach(item=>{
        item.select=type;
      })
    },
    testDataLength(){
      var reg=true;
      if(!this.dataListChecked.length){
        reg=false;
        Toast('还没有选择商品哟');
      }
      return reg;
    },
    toCollect(){
      if(this.testDataLength()){
        console.log('toCollect');
      }
    },
    toSettle(){
      if(this.testDataLength()){
        console.log('toSettle');
        this.$router.push('order_settle')
      }
    },
    act_delete(key){
      this.del_multiple=false;
      console.log('act_delete',key)
      this.show_del=true;
    },
    deleteGoods(){
      if(this.testDataLength()){
        console.log('deleteGoods');
        this.del_multiple=true;
        this.show_del=true;
      }
    },
    save_del(){
      console.log('save_del');
      if(this.del_multiple){
        Toast('批量删除成功');
      }else{
        Toast('删除成功');
      }
    },
    addCollect(){
      Toast('收藏成功');
    },
    push_goods_info(){
      this.$router.push('goods');
    },
  },
  components: {
    VFooter,
    CartBodyList,
    ShadowModal,
    ComponentHistory,
  },
  created(){
  }
}
</script>

<style scoped lang="scss">
  .view-cart{
    position:absolute;
    top:0;
    right:0;
    bottom:100px;
    left:0;
    .cart_top{
      background:rgba(242,242,242,1);
      height:69px;
      padding:0 30px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      position:absolute;
      top:0;
      left:0;
      right:0;
      .cart_top1{
        font-size:26px;
      }
      .cart_top2{
        font-size:26px;
        color:#FF6501;
      }
    }
    @mixin selectBox{
      width:36px;
      height:36px;
      background:rgba(255,101,1,0);
      border:2px solid rgba(204, 204, 204, 1);
      border-radius:50%;
      box-sizing:border-box;
      &.selected{
        background:url(/static/center/selected.png) 0 0 no-repeat;
        background-size:100% 100%;
        border:none;
      }
    }
    .cart-container{
      position: absolute;
      top: 69px;
      bottom: 100px;
      right:0;
      left:0;
      overflow-y: auto;
      background:#fff;
      .cart-header{
        padding-left:30px;
        margin-bottom:20px;
        box-sizing:border-box;
        border-bottom:1Px solid #f6f6f6;
        display:flex;
        .select-box{
          height:86px;
          display:flex;
          align-items:center;
          .cart-select{
            @include selectBox;
          }
          img{
            width: 29px;
            height: 26px;
            margin-left:30px;
          }
          .cart-header-text{
            margin-left:20px;
            font-size:28px;
          }
        }
      }
    }
    .cart-footer{
      height:100px;
      position:absolute;
      bottom:0;
      left:0;
      right:0;
      box-sizing:border-box;
      border-top:1Px solid #eee;
      background:#fff;
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding: 0 30px;
      .col_1{
        display:flex;
        align-items:center;
        .cart-select{
          @include selectBox;
        }
        .text{
          margin-left:20px;
        }
      }
      .col_2{
        display:flex;
        .btn_s2{
          padding:0 30px;
          margin:0;
          &.gray{
            color:#333;
          }
          &.del{
            margin-left:20px;
            border-color:#E11A1A;
            color:#E11A1A;
          }
        }
        &.modify{
          align-items:center;
          .s1{
            font-size:24px;
            margin-right:5px;
          }
          .price{
            color:#FF6501;
            margin-right:20px;
            .s2{
              font-size:20px;
            }
            .s3{
              font-size:34px;
            }
          }
          .btn{
            width:220px;
            height:76px;
            background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
            opacity:0.7;
            border-radius:38px;
            color:#fff;
            font-size:30px;
            text-align:center;
            line-height:76px;
            &.allow{
              opacity:1;
            }
          }
        }
      }
    }
    // empty-box
    .empty-box{
      position:absolute;
      top:0;
      right:0;
      bottom:0;
      left:0;
      display:flex;
      justify-content:center;
      flex-direction:column;
      overflow-y:auto;
      &.noCenter{
        justify-content:flex-start;
        .yxdt-empty{
          margin-top:80px;
        }
      }
    }
    // 
    .history-box{
      margin-top:80px;
      margin-bottom:30px;
    }
  }
</style>