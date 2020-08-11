<template>
  <div v-title data-title="个人中心"> 
    <mescroll-vue class="p_center" ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <div class="login_box">
        <template v-if="log_info.has_login">
          <div class="portrait" @click="slide_setting"><img src="/static/center/logo.png"></div>
          <div class="login_name has_login">
            <div class="name_1" @click="slide_setting">邢123345</div>
            <div class="name_vip">会员等级: 暂无任何等级</div>
          </div>
        </template>
        <template v-else>
          <div class="portrait" @click="login_modal"><img src="/static/center/logo.png"></div>
          <div class="login_name" @click="login_modal">登录/注册</div>
        </template>
        <div class="set_icon" @click="slide_setting"></div>
      </div>
      <div class="goods_menu">
        <div class="goods_menu_col1">
          <div class="goods_menu_list" @click="slide_order(1);">
            <div class="list_icon"><img src="@/assets/image/center/1_1.png" style="width:0.58667rem;height:0.58667rem;"></div>
            <div class="list_name">待确认</div>
          </div>
          <div class="goods_menu_list" @click="slide_order(2);">
            <div class="list_icon"><img src="@/assets/image/center/1_2.png"></div>
            <div class="list_name">待付款</div>
          </div>
          <div class="goods_menu_list" @click="slide_order(3);">
            <div class="list_icon"><img src="@/assets/image/center/1_3.png"></div>
            <div class="list_name">待发货</div>
          </div>
          <div class="goods_menu_list" @click="slide_order(4);">
            <div class="list_icon"><img src="@/assets/image/center/1_4.png"></div>
            <div class="list_name">待收货</div>
          </div>
        </div>
        <div class="goods_menu_col2" @click="slide_order(0);">
          <div class="list_icon"><img src="@/assets/image/center/1_5.png" style="width:0.53333rem;height:0.58667rem;"></div>
          <div class="list_name">全部订单</div>
        </div>
      </div>
      <div class="personal_menu">
        <div class="personal_list border-bottom" @click="slide_after">
          <img class="list_icon2" src="@/assets/image/center/2_1.png">
          <div class="list_name2">我的售后</div>
          <div class="list_describe">查看全部售后</div>
          <div class="list_enter"></div>
        </div>
        <div class="personal_list border-bottom" @click="slide_region">
          <img class="list_icon2" src="@/assets/image/center/2_2.png">
          <div class="list_name2">收货地址</div>
          <div class="list_enter"></div>
        </div>
        <div class="personal_list border-bottom" @click="slide_collect">
          <img class="list_icon2" src="@/assets/image/center/2_3.png">
          <div class="list_name2">我的收藏</div>
          <div class="list_enter"></div>
        </div>
        <div class="personal_list border-bottom" @click="slide_message">
          <img class="list_icon2" src="@/assets/image/center/2_4.png">
          <div class="list_name2">我的留言</div>
          <div class="list_enter"></div>
        </div>
        <div class="personal_list border-bottom" @click="slide_comment">
          <img class="list_icon2" src="@/assets/image/center/2_5.png">
          <div class="list_name2">我的评论</div>
          <div class="list_enter"></div>
        </div>
        <div class="personal_list border-bottom" @click="slide_credit">
          <img class="list_icon2" src="@/assets/image/center/2_6.png" style="height:0.36rem;">
          <div class="list_name2">信用支付额度</div>
          <div class="list_enter"></div>
        </div>
      </div>
    </mescroll-vue>
    <!-- 登录注册 -->
    <login-res ref="login_res" />
    <!-- 个人设置 -->
    <personal-setting ref="personal_setting"></personal-setting>
    <!-- 登录弹窗 -->
    <shadow-modal 
      v-model="show_login" 
      type="middle"
      ok_text="立即登录"
      :okHide="true"
      @ok="save_login"
      >
      <template slot="header">欢迎来到一线达通云商城</template>
      <template slot="body">请授权登录,获得完整购物体验</template>
    </shadow-modal>
    <!-- 我的订单 -->
    <my-order ref="my_order" />
    <!-- 我的售后 -->
    <my-after ref="my_after" />
    <!-- 收货地址 -->
    <shipping-address ref="my_shipping" />
    <!-- 我的收藏 -->
    <my-collect ref="my_collect" />
    <!-- 我的留言 -->
    <my-message ref="my_message" />
    <!-- 我的评论 -->
    <my-comment ref="my_comment" />
    <!-- 信用支付额度 -->
    <my-credit ref="my_credit" />
    <v-footer :active="3"></v-footer>
  </div>
</template>

<script>
import Vue from "vue";
import MescrollVue from 'mescroll.js/mescroll.vue';
import VFooter from "./ViewFooter";
import ShadowModal from "@/iYxdt/ShadowModal";
import PersonalSetting from "@/views/PersonalCenter/PersonalSetting";
import $ from 'jquery';
import LoginRes from '@/views/components/LoginRes';
import MyOrder from "@/views/PersonalCenter/MyOrder";
import MyAfter from "@/views/PersonalCenter/MyAfter";
import ShippingAddress from "@/views/PersonalCenter/ShippingAddress";
import MyCollect from "@/views/PersonalCenter/MyCollect";
import MyMessage from "@/views/PersonalCenter/MyMessage";
import MyComment from "@/views/PersonalCenter/MyComment";
import MyCredit from "@/views/PersonalCenter/MyCredit";

export default {
  data() {
    return {
      username: '',
      password: '',

      init:false,
      mescroll:null,
      mescrollUp: {
        callback: this.upCallback // 上拉回调
      },
      show_login:false,
      log_info:{
        has_login:false
      }
    }
  },
  methods:{
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      setTimeout(()=>{
        mescroll.endSuccess(5)
        if(this.init){
          location.reload();
        }
        this.init=true;
      },500)
    },
    slide_setting(){
      this.$refs.personal_setting.show_component=true;
    },
    slide_order(tabIndex){
      var my_order=this.$refs.my_order;
      my_order.show_component=true;
      my_order.changeTab(tabIndex);
    },
    slide_after(){
      console.log('slide_after');
      var my_after=this.$refs.my_after;
      my_after.show_component=true;
      my_after.changeTab(0);
    },
    slide_region(){
      console.log('slide_region');
      this.$refs.my_shipping.show_component=true;
    },
    slide_collect(){
      console.log('slide_collect');
      var my_collect=this.$refs.my_collect;
      my_collect.show_component=true;
      my_collect.mescroll.triggerDownScroll();
    },
    slide_message(){
      console.log('slide_message');
      var my_message=this.$refs.my_message;
      my_message.show_component=true;
      my_message.mescroll.triggerDownScroll();
    },
    slide_comment(){
      console.log('slide_comment');
      var my_comment=this.$refs.my_comment;
      my_comment.show_component=true;
      my_comment.mescroll.triggerDownScroll();
    },
    slide_credit(){
      console.log('slide_credit');
      var my_credit=this.$refs.my_credit;
      my_credit.show_component=true;
      my_credit.getData();
    },
    login_modal(){
      this.show_login=true;
    },
    save_login(){
      this.$refs.login_res.entry=true;
    }
  },
  components:{
    VFooter,
    MescrollVue,
    PersonalSetting,
    ShadowModal,
    LoginRes,
    MyOrder,
    MyAfter,
    ShippingAddress,
    MyCollect,
    MyMessage,
    MyComment,
    MyCredit,
  },
  mounted(){
    var query=this.$route.query;
    if(query.orderId){
      console.log(this.$refs.my_order.show_detail(query.orderId));
    }
  }
}
</script>

<style lang="scss" scoped>
  .mescroll {
    position:absolute;
    top: 0px;
    bottom: 100px;
    height: auto;
    .login_box{
      height:246px;
      display:flex;
      align-items:center;
      background:url(../assets/image/center/center_bg.png) 0 0 no-repeat;
      background-size:100% 100%;
      .portrait{
        margin-left:32px;
        margin-right:30px;
        background-color: #fff;
        border-radius:50%;
        font-size:0;
        img{
          width:90px;
          height:90px;
          border:4Px solid #fff;
          border-radius:50%;
          display:inline-block;
        }
      }
      .login_name{
        color:#fff;
        flex:1;
        font-size:36px;
        &.has_login{
          .name_vip{
            margin-top:19px;
            font-size:22px;
          }
        }
      }
      .set_icon{
        width:38px;
        height:35px;
        background:url(../assets/image/center/shezhi.png) 0 0 no-repeat;
        background-size:100% 100%;
        margin-right:30px;
      }
    }
    .goods_menu{
      background-color: #fff;
      display:flex;
      margin-top:20px;
      margin-bottom:20px;
      @mixin flex_list{
        position:relative;
        .list_icon{
          height:94px;
          display:flex;
          align-items:center;
          justify-content:center;
          img{
            width: 44px;
            height: 40px;
          }
        }
        .list_name{
          font-size:24px;
          width:100%;
          height:53px;
          text-align:center;
        }
      }
      .goods_menu_col1{
        flex:1;
        display:flex;
        .goods_menu_list{
          flex:1;
          @include flex_list;
        }
      }
      .goods_menu_col2{
        width:152px;
        margin-left:38px;
        @include flex_list;
      }
    }
    .personal_menu{
      background:#fff;
      padding:0 30px;
      margin-bottom:71px;
      .personal_list{
        height:101px;
        display:flex;
        align-items:center;
        position:relative;
        padding-left:46px;
        .list_icon2{
          position:absolute;
          top:50%;
          left:0;
          transform:translateY(-50%);
          width:30px;
          height:30px;
        }
        .list_name2{
          font-size:28px;
          flex:1;
        }
        .list_describe{
          font-size:22px;
          color:#999;
          margin-right:20px;
        }
        .list_enter{
          width:16px;
          height:25px;
          background:url(../assets/image/center/right_arrow.png) 0 0 no-repeat;
          background-size:100% 100%;
        }
      }
    }
  }
</style>