<template>
  <shadow-modal 
    v-model="value2"
    @ok="save_ok"
    ok_text="进行支付"
    >
    <template slot="header">支付方式</template>
    <template slot="body">
      <div class="pay_container">
        <div class="price"><i>￥</i><span>{{price}}</span></div>
        <ul>
          <li :class="{active:payIndexCache==0}" @click="changePay(0)">
            <div class="icon"><img src="/static/center/xinyongeduzhifu.png" alt=""></div>
            <div class="name">信用额度支付</div>
            <div class="select"></div>
          </li>
          <li :class="{active:payIndexCache==1}" @click="changePay(1)">
            <div class="icon"><img src="/static/center/weixin1.png" alt=""></div>
            <div class="name">微信支付</div>
            <div class="select"></div>
          </li>
          <li :class="{active:payIndexCache==2}" @click="changePay(2)">
            <div class="icon"><img src="/static/center/zhifubao.png" alt=""></div>
            <div class="name">支付宝支付</div>
            <div class="select"></div>
          </li>
          <li :class="{active:payIndexCache==3}" @click="changePay(3)">
            <div class="icon"><img src="/static/center/yinhangqia.png" alt=""></div>
            <div class="name">银行汇款/转账</div>
            <div class="select"></div>
          </li>
          <li :class="{active:payIndexCache==4}" @click="changePay(4)">
            <div class="icon"><img src="/static/center/huodaofukuan.png" alt=""></div>
            <div class="name">货到付款</div>
            <div class="select"></div>
          </li>
        </ul>
      </div>
    </template>
  </shadow-modal>
</template>

<script>
import ShadowModal from "@/iYxdt/ShadowModal";

export default {
  data(){
    var payIndexCache=this.payIndex;
    return {
      payIndexCache,
    }
  },
  props:{
    value:{
      type:Boolean,
      default:false
    },
    payIndex:{
      type:Number,
      default:0
    },
    price:{
      type:String,
      default:'0.00'
    }
  },
  computed:{
    value2:{
      get(){
        return this.value;
      },
      set(nv){
        this.$emit('input',nv);
      }
    },
    payIndex2:{
      get(){
        return this.payIndex;
      },
      set(nv){
        this.$emit('inputpay',nv);
      }
    }
  },
  watch:{
    value(nv){
      if(nv){
        this.payIndexCache=this.payIndex;
      }
    }
  },
  methods:{
    changePay(payIndex){
      console.log(payIndex);
      this.payIndexCache=payIndex;
    },
    save_ok(modal){
      console.log('save_ok');
      console.log(this.formData);
      modal.close_modal();
      this.payIndex2=this.payIndexCache;
    },
  },
  components:{
    ShadowModal,
  }
}
</script>

<style scoped lang="scss">
.pay_container{
  padding-bottom:80px;
  .price{
    text-align:center;
    padding-top:30px;
    padding-bottom:30px;
    color:#FF6901;
    i{
      font-size:22px;
    }
    span{
      font-size:44px;
    }
  }
  ul{
    padding:0 30px;
    li{
      padding:25px 0;
      display:flex;
      align-items:center;
      .icon{
        img{
          width:38px;
          height:38px;
          display:block;
        }
      }
      .name{
        margin-left:20px;
        flex:1;
      }
      .select{
        width:35px;
        height:35px;
        border:1Px solid #ccc;
        border-radius:50%;
      }
      &.active{
        .select{
          border-color:#ea5513;
          background:url(/static/center/selected.png) 0 0 no-repeat;
          background-size:100% 100%;
        }
      }
    }
  }
}
</style>