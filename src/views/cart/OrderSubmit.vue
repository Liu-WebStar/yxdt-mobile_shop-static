<template>
  <div class="order-submit" v-title data-title="确认订单"> 
    <div class="page-body">
      <div class="login_box">
        <div class="image"><img src="/mobile_shop/static/cart/success.png"></div>
        <div class="text">订单提交成功</div>
      </div>
      <div class="order-info">
        <div class="order-group">
          <div class="info-list">
            <div class="label">订单编号：</div>
            <div class="content">2020060149485010</div>
          </div>
          <div class="info-list">
            <div class="label">支付方式：</div>
            <div class="content">银行转账</div>
          </div>
          <div class="info-list">
            <div class="label">配送方式：</div>
            <div class="content">自营物流</div>
          </div>
          <div class="info-list">
            <div class="label">实付金额：</div>
            <div class="content price"><span class="s1">￥</span><span class="s2">123.00</span><span class="s3">（含运费￥0.00）</span></div>
          </div>
        </div>
        <div class="bank-group">
          <div class="info-list">
            <div class="label">银行铝管：</div>
            <div class="content">交通银行北京百万庄支行</div>
          </div>
          <div class="info-list">
            <div class="label">银行账号：</div>
            <div class="content">110060774018001901161</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <a class="btn_s1" @click="go_detail">查看订单详情</a>
      <router-link to="/" class="btn_s2">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    go_detail(){
      console.log('go_detail');
      this.$router.push({name:'PersonalCenter',query:{orderId:123} })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-submit{
  display:flex;
  flex-direction:column;
  position:absolute;
  top:0;
  right:0;
  left: 0;
  bottom: 0;
  .page-body{
    flex:1;
    overflow-y:auto;
    .login_box{
      padding:50px 0;
      background:url(../../assets/image/center/center_bg.png) 0 0 no-repeat;
      background-size:100% 100%;
      text-align:center;
      .image{
        font-size:0;
        img{
          display:inline-block;
          width: 76px;
          height: 76px;
        }
      }
      .text{
        margin-top:18px;
        line-height:29px;
        font-weight:bold;
        font-size:30px;
        color:#fff;
      }
    }
    .order-info{
      margin-top:20px;
      padding:35px 30px;
      background:#fff;
      .order-group{
        padding:0 20px;
        .info-list{
          font-size:26px;
          display:flex;
          margin-bottom:35px;
          .content{
            flex:1;
            &.price{
              .s1{
                font-size:20px;
                color:#ff6501;
              }
              .s2{
                font-size:34px;
                color:#ff6501;
              }
              .s3{
                font-size:24px;
                position:relative;
                top:-2px;
              }
            }
          }
        }
      }
      .bank-group{
        padding:30px 20px;
        background:#FFF7F3;
        border:1Px dashed #ff6501;
        border-radius:10px;
        .info-list{
          font-size:26px;
          display:flex;
          .content{
            flex:1;
          }
          &+.info-list{
            margin-top:30px;
          }
        }
      }
    }
  }
  .page-footer{
    .btn_s2{
      margin-top:30px;
    }
  }
}
</style>