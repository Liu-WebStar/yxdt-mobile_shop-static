<template>
  <div>
    <!-- 登录 -->
    <full-modal v-model="entry"  class="sign_up_father">
      <template slot="header" >登录云商城</template>
      <template slot="body">
        <div class="entry">
          <div class="logo_pic">
            <span></span>
          </div>
          <div class="phone">
            <img class="phone_pic" src="@/assets/image/logo/people.png" alt="">
            <input type="text" v-model="formUser.username" class="phone_input" placeholder="手机号码/用户名">
          </div>
          <div class="password">
            <img class="password_pic" src="@/assets/image/logo/password.png" alt="">
            <input type="password" v-model="formUser.password" ref="login_pw" class="password_input" placeholder="登录密码">
            <img @click="login_eye" class="eye_pic" :src="login_pic ? login_img : login_img2" alt="">
          </div>
          <div v-if="is_wrong" class="wrong">账号/密码有误,请确认!</div>
          <div class="handle">
            <a class="register" @click="reg">新用户注册</a>
            <a class="forget" @click="forget">忘记密码</a>
          </div>
          <div class="sub" @click="sub">登录</div>
          <div v-if="is_wrong" class="wrong nothing">账号不存在,请直接进行注册!</div>
          <div class="third_party">
            <div class="third_content">
              <span class="left_line"></span>
              <span class="third_word">第三方账号登录</span>
              <span class="right_line"></span>
            </div>
            <div class="weixin" @click="wxLogin">
              <img src="@/assets/image/logo/weixin.png" alt="">
            </div>
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 注册 -->
    <full-modal ref="login_now" v-model="sign_up" class="sign_up_father">
      <template slot="header">注册账号</template>
      <template slot="body">
        <div class="sign_up">
          <div class="reg_process">
            <div class="reg_top">
              <div class="status_round">
                <span class="round"></span>
              </div>
              <span class="sign_line"></span>
              <div class="set_round">
                <span class="round"></span>
              </div>
            </div>
            <div class="reg_bottom">
              <span class="status_word">1.身份验证</span>
              <span class="set_word">2.设置密码</span>
            </div>
          </div>

          <div class="sign_name">
            <img class="sign_pic" src="@/assets/image/logo/people.png" alt="">
            <input type="text" class="sign_input" placeholder="请设置用户名">
          </div>
          <div v-if="user_error" class="wrong">用户名格式不正确,请确认!</div>
          
          <div class="member" :class="{member_er:user_error}">
            <img class="member_pic" src="@/assets/image/logo/member.png" alt="">
            <input type="text" class="member_input" placeholder="会员邀请码(非必填)">
          </div>

          <div class="sign_tel">
            <img class="tel_pic" src="@/assets/image/logo/tel.png" alt="">
            <input type="text" class="tel_input" placeholder="请输入注册手机号码">
          </div>
          <div v-if="tel_error" class="wrong">手机号码填写有误,请确认!</div>

          <div class="code" :class="{code_er:tel_error}">
            <img class="code_pic" src="@/assets/image/logo/code.png" alt="">
            <input type="text" class="code_input" placeholder="请输入手机验证码">
            <span v-if="send_code_type" v-text="code_number" class="gain_code disabled"></span>
            <span v-else class="gain_code" @click="gainCode('sign')">获取验证码</span>
          </div>
          <div v-if="verification_error" class="wrong">验证码不正确,请确认!</div>

          <div class="next" @click="next('sign')">
            下一步
          </div>
          <div class="logo_new">
            <span class="already">已有账户，</span>
            <span class="logo" @click="logoNew">立即登录</span>
          </div>
          <div v-if="tel_no" class="wrong nothing">手机号不存在,请确认!</div>
        </div>
      </template>
    </full-modal>
    <!-- 设置密码 -->
    <full-modal ref="login_now2" v-model="set_pw" class="sign_up_father">
      <template slot="header">注册账号</template>
      <template slot="body">
        <div class="set">
          <div class="reg_process">
            <div class="reg_top">
              <div class="status_round">
                <span class="round"></span>
              </div>
              <span class="sign_line"></span>
              <div class="set_round">
                <span class="round"></span>
              </div>
            </div>
            <div class="reg_bottom">
              <span class="status_word">1.身份验证</span>
              <span class="set_word">2.设置密码</span>
            </div>
          </div>
          <div class="set_password">
            <img class="password_pic" src="@/assets/image/logo/password.png" alt="">
            <input type="password" class="password_input" placeholder="请设置6-14位登录密码">
            <img class="eye_pic" src="@/assets/image/logo/eye.png" alt="">
          </div>
          <div v-if="password_error" class="wrong">密码填写有误,请确认!</div>

          <div :class="{define_er:password_error}" class="define_password">
            <img class="password_pic" src="@/assets/image/logo/password.png" alt="">
            <input type="password" class="password_input" placeholder="请确认登录密码">
            <img class="eye_pic" src="@/assets/image/logo/hide_eye.png" alt="">
          </div>
          <div v-if="two_pw_error" class="wrong">两次密码不一致,请确认!</div>

          <div class="treaty">
            <div class="checkbox action" @click="check">
              <input type="checkbox" class="check_b">
            </div>
            <div class="agree">
              <a href="#" class="agree_a">同意《用户协议》</a>
            </div>
          </div>
          <div class="reg_num" @click="regNum('set')">
            注册
          </div>
          <div class="logo_new">
            <span class="already">已有账户，</span>
            <span class="logo" @click="logoNew2">立即登录</span>
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 找回密码 -->
    <full-modal v-model="forgot" class="sign_up_father">
      <template slot="header">找回密码</template>
      <template slot="body">
        <div class="forgot">
          <div class="reg_process">
            <div class="reg_top">
              <div class="status_round">
                <span class="round"></span>
              </div>
              <span class="sign_line"></span>
              <div class="set_round">
                <span class="round"></span>
              </div>
            </div>
            <div class="reg_bottom">
              <span class="status_word">1.验证手机号码</span>
              <span class="set_word">2.设置新密码</span>
            </div>
          </div>
          <div class="sign_tel">
            <img class="tel_pic" src="@/assets/image/logo/tel.png" alt="">
            <input type="text" class="tel_input" placeholder="请输入手机号码/用户名">
          </div>
          <div v-if="phone_error" class="wrong">手机号不存在,请确认!</div>

          <div :class="{code_er:phone_error}" class="code">
            <img class="code_pic" src="@/assets/image/logo/code.png" alt="">
            <input type="text" class="code_input" placeholder="请输入手机验证码">
            <span v-if="send_code_type2" v-text="code_number2" class="gain_code disabled"></span>
            <span v-else class="gain_code" @click="gainCode('forget')">获取验证码</span>
          </div>
          <div v-if="phone_code_error" class="wrong">验证码填写有误,请确认!</div>

          <div class="next" @click="next('forgot')">
            下一步
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 找回密码后设置密码 -->
    <full-modal v-model="forgot_set_pw" class="sign_up_father">
      <template slot="header">注册账号</template>
      <template slot="body">
        <div class="forgot_set">
          <div class="reg_process">
            <div class="reg_top">
              <div class="status_round">
                <span class="round"></span>
              </div>
              <span class="sign_line"></span>
              <div class="set_round">
                <span class="round"></span>
              </div>
            </div>
            <div class="reg_bottom">
              <span class="status_word">1.验证手机号码</span>
              <span class="set_word">2.设置新密码</span>
            </div>
          </div>
          <div class="set_password">
            <img class="password_pic" src="@/assets/image/logo/password.png" alt="">
            <input type="password" class="password_input" placeholder="请设置6-14位登录密码">
            <img class="eye_pic" src="@/assets/image/logo/eye.png" alt="">
          </div>
          <div v-if="set_pw_error" class="wrong">密码填写有误,请确认!</div>
          
          <div :class="{set_define:set_pw_error}" class="define_password">
            <img class="password_pic" src="@/assets/image/logo/password.png" alt="">
            <input type="password" class="password_input" placeholder="请确认登录密码">
            <img class="eye_pic" src="@/assets/image/logo/hide_eye.png" alt="">
          </div>
          <div v-if="set_two_pw_error" class="wrong">两次密码不一致,请确认!</div>
          <!-- <div class="treaty">
            <div class="checkbox action" @click="check">
              <input type="checkbox" class="check_b">
            </div>
            <div class="agree">
              <a href="#" class="agree_a">同意《用户协议》</a>
            </div>
          </div> -->
          <div class="reg_num" @click="regNum('forgot_set')">
            确定
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 微信登录 -->
    <full-modal ref="weixin_login" v-model="weixin" class="sign_up_father">
      <template slot="header">微信登录验证</template>
      <template slot="body">
        <div class="weixin">
          <div class="reg_process">
            <div class="reg_top">
              <div class="status_round">
                <span class="round"></span>
              </div>
              <span class="sign_line"></span>
              <div class="set_round">
                <span class="round"></span>
              </div>
            </div>
            <div class="reg_bottom">
              <span class="status_word">1.绑定手机号码</span>
              <span class="set_word">2.设置登录密码</span>
            </div>
          </div>
          <div class="sign_tel">
            <img class="tel_pic" src="@/assets/image/logo/tel.png" alt="">
            <input type="text" class="tel_input" placeholder="请输入手机号码/用户名">
          </div>
          <div v-if="wx_phone_error" class="wrong">手机号码填写有误,请确认!</div>

          <div :class="{wx_code_er:wx_phone_error}" class="code">
            <img class="code_pic" src="@/assets/image/logo/code.png" alt="">
            <input type="text" class="code_input" placeholder="请输入手机验证码">
            <span v-if="send_code_type3" v-text="code_number3" class="gain_code disabled"></span>
            <span v-else class="gain_code" @click="gainCode('wx')">获取验证码</span>
          </div>
          <div v-if="wx_phone_code_error" class="wrong">验证码不正确,请确认!</div>

          <div class="next" @click="next('wx')">
            下一步
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 微信登录设置密码 -->
    <full-modal v-model="wx_set_pw" class="sign_up_father">
      <template slot="header">微信登录验证</template>
      <template slot="body">
        <div class="weixin_set">
          <div class="reg_process">
            <div class="reg_top">
              <div class="status_round">
                <span class="round"></span>
              </div>
              <span class="sign_line"></span>
              <div class="set_round">
                <span class="round"></span>
              </div>
            </div>
            <div class="reg_bottom">
              <span class="status_word">1.验证手机号码</span>
              <span class="set_word">2.设置新密码</span>
            </div>
          </div>
          <div class="set_password">
            <img class="password_pic" src="@/assets/image/logo/password.png" alt="">
            <input type="password" class="password_input" placeholder="请设置6-14位登录密码">
            <img class="eye_pic" src="@/assets/image/logo/eye.png" alt="">
          </div>
          <div v-if="wx_set_pw_error" class="wrong">密码填写有误,请确认!</div>
          
          <div :class="{wx_set_define:wx_set_pw_error}" class="define_password">
            <img class="password_pic" src="@/assets/image/logo/password.png" alt="">
            <input type="password" class="password_input" placeholder="请确认登录密码">
            <img class="eye_pic" src="@/assets/image/logo/hide_eye.png" alt="">
          </div>
          <div v-if="wx_set_two_pw_error" class="wrong">两次密码不一致,请确认!</div>
          
          <div class="reg_num" @click="regNum('wx_set')">
            确定
          </div>
        </div>
      </template>
    </full-modal>
  </div>
</template>>

<script>
import FullModal from '@/iYxdt/FullModal';
import {Toast} from 'vant';
import $ from 'jquery';

export default {
  data() {
    return {
      entry:false,
      wx_set_pw:false,
      weixin:false,
      forgot_set_pw:false,
      forgot:false,
      set_pw:false,
      sign_up:false,
      login_pic:true,
      login_img:'/mobile_shop/static/login/eye.png',
      login_img2:'/mobile_shop/static/login/hide_eye.png',
      send_code_type:false,
      code_number:60,
      send_code_type2:false,
      code_number2:60,
      send_code_type3:false,
      code_number3:60,
      is_wrong:true, //登录错误提示
      user_error:true, //注册用户名错误提示
      tel_error:true, //注册手机号错误提示
      verification_error:true, //注册验证码错误提示
      tel_no:true,  //注册手机号不存在错误提示

      password_error:true, //注册设置密码错误提示
      two_pw_error:true,  //注册设置确认密码错误提示

      phone_error:true, //找回密码手机号错误提示
      phone_code_error:true,  //找回密码验证码错误提示

      set_pw_error:true, //找回密码设置密码错误提示
      set_two_pw_error:true, //找回密码确认密码错误提示

      wx_phone_error:true, //微信登录手机号错误提示
      wx_phone_code_error:true, //微信登录验证码错误提示

      wx_set_two_pw_error:true, //微信设置密码确密码错误提示
      wx_set_pw_error:true,  //微信设置密码错误提示
      formUser:{
        username:null,
        password:null,
      }
    }
  },
  methods:{
    login_eye(){
      if(this.login_pic){
        this.login_pic=false;
        this.$refs.login_pw.type='text';
      }else{
        this.login_pic=true;
        this.$refs.login_pw.type='password';
      }
    },
    onSubmit(values) {
      console.log('submit', values);
    },
    sub(){
      console.log('登录');
      console.log(this.formUser);
      this.$store.dispatch('Login',this.formUser).then(resp=>{
        if(resp.success){
          this.$router.push('/');
        }else{
          Toast(resp.message);
        }
      })
    },
    reg(){
      console.log('注册');
      this.sign_up=true;
    },
    forget(){
      console.log('忘记');
      this.forgot=true;
    },
    gainCode(val){
      if(val=='sign'){
        this.send_code_type=true;
        this.code_number=60;
        this.code_timer=setInterval(()=>{
          this.code_number--;
          if(this.code_number<=0){
            clearInterval(this.code_timer);
            this.send_code_type=false;
          }
        },1000)
      }else if(val=='forget'){
        this.send_code_type2=true;
        this.code_number2=60;
        this.code_timer=setInterval(()=>{
          this.code_number2--;
          if(this.code_number2<=0){
            clearInterval(this.code_timer);
            this.send_code_type2=false;
          }
        },1000)
      }else if(val=='wx'){
        this.send_code_type3=true;
        this.code_number3=60;
        this.code_timer=setInterval(()=>{
          this.code_number3--;
          if(this.code_number3<=0){
            clearInterval(this.code_timer);
            this.send_code_type3=false;
          }
        },1000)
      }
    },
    next(val){
      if(val=='sign'){
        console.log('注册下一步');
        this.set_pw=true;
      }else if(val=='forgot'){
        console.log('忘记密码下一步');
        this.forgot_set_pw=true;
      }else if(val=='wx'){
        console.log('微设置密码');
        this.wx_set_pw=true;
      }
    },
    logoNew(){
      this.$refs.login_now.show=false;
    },
    logoNew2(){
      this.$refs.login_now.show=false;
      this.$refs.login_now2.show=false;
    },
    check(){
      var a=$('.check_b').get(0).checked;
      console.log(a);
    },
    regNum(val){
      if(val=='set'){
        console.log('设置注册账号');
      }else if(val=='forgot_set'){
        console.log('忘记密码后设置密码');
      }else if(val=='wx_set'){
        console.log('微信设置密码');
      }
    },
    wxLogin(){
      this.weixin=true;
    }
  },
  components:{
    FullModal,
  }
}
</script>

<style lang="scss" scoped>
  // 登录
  .entry{
    width:100%;
    .logo_pic{
      span{
        display:inline-block;
        background-image: url('../../assets/image/logo/sign.png');
        background-size:100% 100%;
        width:420px;
        height:119px;
        margin:100px 165px;
      }
    }
    .phone{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      .phone_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .phone_input{
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        display:block;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
    }
    .password{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      margin-top:40px;
      position: relative;
      .password_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .eye_pic{
        position:absolute;
        top:23px;
        right:32px;
        display: inline-block;
        width:47px;
        height:30px;
      }
      .password_input{
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        display:block;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
    }
    .wrong{
      color:#E11A1A;
      font-size:22px;
      display: block;
      height:22px;
      line-height: 22px;
      margin-left:30px;
      margin-top:10px;
      &.nothing{
        margin-top:63px;
      }
    }
    .handle{
      width:690px;
      margin:0 auto;
      display: flex;
      justify-content: space-between;
      margin-top:30px;
      .register{
        font-size:28px;
        color:#333;
        font-weight: bold;
        line-height: 27px;
      }
      .forget{
        font-size:28px;
        color:#999;
        line-height: 26px;
      }
    }
    .sub{
      margin:0 auto;
      margin-top:80px;
      width:690px;
      height:76px;
      text-align: center;
      line-height: 76px;
      background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
      opacity:0.7;
      color: #fff;
      border-radius: 38px;
      font-size:30px;
    }
    .third_party{
      .third_content{
        margin:0 71px;
        height:24px;
        line-height: 24px;
        .left_line{
          display: inline-block;
          vertical-align: middle;
          width:169px;
          height:2px;
          background:rgba(0,0,0,1);
          opacity:0.1;
        }
        .third_word{
          display: inline-block;
          vertical-align: middle;
          color:#9b9b9b;
          font-size:24px;
          margin:0 44px;
        }
        .right_line{
          display: inline-block;
          vertical-align: middle;
          width:169px;
          height:2px;
          background:rgba(0,0,0,1);
          opacity:0.1;
        }
      }
      .weixin{
        margin-top:40px;
        margin-bottom:40px;
        height:88px;
        line-height: 88px;
        img{
          display: inline-block;
          width:88px;
          height:88px;
          margin:0 331px;
        }
      }
    }
  }
  // 注册
  .sign_up{
    .reg_process{
      width: 750px;
      position: relative;
      display:flex;
      flex-direction: column;
      align-items: center;
      .reg_top{
        width:450px;
        display:inline-block;
        .status_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
        .sign_line{
          display: inline-block;
          vertical-align: middle;
          width:382px;
          height:2px;
          background:#ccc;
          margin:0 12px;
        }
        .set_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:#ccc;
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
      }
      .reg_bottom{
        width: 558px;
        display:flex;
        justify-content: space-between;
        .status_word{
          display:block;
          font-size:28px;
          color:#333;
        }
        .set_word{
          display:block;
          font-size:28px;
          color:#999;
        }
      }
    }
    .sign_name{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:50px;
      .sign_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .sign_input{
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        display:block;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
    }
    .wrong{
      color:#E11A1A;
      font-size:22px;
      display: block;
      height:22px;
      line-height: 22px;
      margin-left:30px;
      margin-top:10px;
      &.nothing{
        margin-top:83px;
      }
    }
    .member{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:40px;
      &.member_er{
        margin-top:30px;
      }
      .member_pic{
        position:absolute;
        top:25px;
        left:32px;
        display: inline-block;
        width:30px;
        height:26px;
      }
      .member_input{
        width:690px;
        border:0;
        display: block;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
    }
    .sign_tel{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:40px;
      .tel_pic{
        position:absolute;
        top:24px;
        left:32px;
        display: inline-block;
        width:26px;
        height:30px;
      }
      .tel_input{
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        display: block;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
    }
    .code{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:40px;
      &.code_er{
        margin-top:30px;
      }
      .code_pic{
        position:absolute;
        top:26px;
        left:32px;
        display: inline-block;
        width:30px;
        height:24px;
      }
      .code_input{
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        display: block;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .gain_code{
        position:absolute;
        top:27px;
        right:32px;
        font-size:28px;
        color:#FF6501;
        height:26px;
        line-height: 26px;
        &.disabled{
          color:#999;
        }
      }
    }
    .next{
      margin:0 auto;
      margin-top:80px;
      width:690px;
      height:76px;
      text-align: center;
      line-height: 76px;
      background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
      box-shadow:0px 3px 7px 0px rgba(253, 45, 104, 0.35);
      opacity:0.6;
      color: #fff;
      border-radius: 38px;
      font-size:30px;
    }
    .logo_new{
      width:262px;
      height:28px;
      line-height: 28px;
      margin:0 auto;
      margin-top:30px;
      display:flex;
      .already{
        display: block;
        font-size:28px;
        color:#666;
        height:28px;
        line-height: 28px;
      }
      .logo{
        display: block;
        color:#FF6901;
        font-size:28px;
        height:28px;
        line-height: 28px;
      }
    }
  }
  // 设置密码
  .set{
    .reg_process{
      width: 750px;
      position: relative;
      display:flex;
      flex-direction: column;
      align-items: center;
      .reg_top{
        width:450px;
        display:inline-block;
        .status_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
        .sign_line{
          display: inline-block;
          vertical-align: middle;
          width:382px;
          height:2px;
          background:#FF6901;
          margin:0 12px;
        }
        .set_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
      }
      .reg_bottom{
        width: 558px;
        display:flex;
        justify-content: space-between;
        .status_word,.set_word{
          display:block;
          font-size:28px;
          color:#333;
        }
      }
    }
    .set_password{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:50px;
      .password_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .password_input{
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        display:block;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .eye_pic{
        position:absolute;
        top:23px;
        right:32px;
        display: inline-block;
        width:47px;
        height:30px;
      }
    }
    .wrong{
      color:#E11A1A;
      font-size:22px;
      display: block;
      height:22px;
      line-height: 22px;
      margin-left:30px;
      margin-top:10px;
    }
    .define_password{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:50px;
      &.define_er{
        margin-top:30px;
      }
      .password_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .password_input{
        width:690px;
        border:0;
        display:block;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .eye_pic{
        position:absolute;
        top:23px;
        right:32px;
        display: inline-block;
        width:47px;
        height:30px;
      }
    }
    .treaty{
      width:690px;
      height: 28px;
      line-height: 28px;
      margin:0 auto;
      margin-top:30px;
      .checkbox{
        width:28px;
        height:28px;
        display:inline-block;
        border:2px solid #ccc;
        border-radius: 20%;
        margin-right:20px;
        &.action{
          background:#FF6901;
          border-color:#FF6901;
          &::before{
            content:'';
            display: inline-block;
            width:20px;
            height:12px;
            border: 2px solid #fff;
            border-width: 0 0 4px 4px;
            transform: rotate(-45deg);
            margin-bottom:16px;
            margin-left:2px;
          }
        }
        .check_b{
          display:none;
        }
      }
      .agree{
        display: inline-block;
        vertical-align: middle;
        height:28px;
        line-height: 28px;
        .agree_a{
          font-size:28px;
          color:#999;
          height:28px;
          line-height: 28px;
          display: block;
        }
      }
    }
    .reg_num{
      margin:0 auto;
      margin-top:80px;
      width:690px;
      height:76px;
      text-align: center;
      line-height: 76px;
      background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
      box-shadow:0px 3px 7px 0px rgba(253, 45, 104, 0.35);
      opacity:0.6;
      color: #fff;
      border-radius: 38px;
      font-size:30px;
    }
    .logo_new{
      width:262px;
      height:28px;
      line-height: 28px;
      margin:0 auto;
      margin-top:30px;
      display:flex;
      .already{
        display: block;
        font-size:28px;
        color:#666;
        height:28px;
        line-height: 28px;
      }
      .logo{
        display: block;
        color:#FF6901;
        font-size:28px;
        height:28px;
        line-height: 28px;
      }
    }
  }
  // 找回密码
  .forgot{
    .reg_process{
      width: 750px;
      position: relative;
      display:flex;
      flex-direction: column;
      align-items: center;
      .reg_top{
        width:450px;
        display:inline-block;
        .status_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
        .sign_line{
          display: inline-block;
          vertical-align: middle;
          width:382px;
          height:2px;
          background:#ccc;
          margin:0 12px;
        }
        .set_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:#ccc;
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
      }
      .reg_bottom{
        width: 558px;
        display:flex;
        justify-content: space-between;
        .status_word{
          display:block;
          font-size:28px;
          color:#333;
        }
        .set_word{
          display:block;
          font-size:28px;
          color:#999;
        }
      }
    }
    .sign_tel{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:40px;
      .tel_pic{
        position:absolute;
        top:24px;
        left:32px;
        display: inline-block;
        width:26px;
        height:30px;
      }
      .tel_input{
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        display:block;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
    }
    .wrong{
      color:#E11A1A;
      font-size:22px;
      display: block;
      height:22px;
      line-height: 22px;
      margin-left:30px;
      margin-top:10px;
    }
    .code{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:40px;
      &.code_er{
        margin-top:30px;
      }
      .code_pic{
        position:absolute;
        top:26px;
        left:32px;
        display: inline-block;
        width:30px;
        height:24px;
      }
      .code_input{
        display:block;
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .gain_code{
        position:absolute;
        top:27px;
        right:32px;
        font-size:28px;
        color:#FF6501;
        height:26px;
        line-height: 26px;
        &.disabled{
          color:#999;
        }

      }
    }
    .next{
      margin:0 auto;
      margin-top:80px;
      width:690px;
      height:76px;
      text-align: center;
      line-height: 76px;
      background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
      box-shadow:0px 3px 7px 0px rgba(253, 45, 104, 0.35);
      opacity:0.6;
      color: #fff;
      border-radius: 38px;
      font-size:30px;
    }
  }
  // 找回密码后设置密码
  .forgot_set{
    .reg_process{
      width: 750px;
      position: relative;
      display:flex;
      flex-direction: column;
      align-items: center;
      .reg_top{
        width:450px;
        display:inline-block;
        .status_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
        .sign_line{
          display: inline-block;
          vertical-align: middle;
          width:382px;
          height:2px;
          background:#FF6901;
          margin:0 12px;
        }
        .set_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
      }
      .reg_bottom{
        width: 558px;
        display:flex;
        justify-content: space-between;
        .status_word,.set_word{
          display:block;
          font-size:28px;
          color:#333;
        }
      }
    }
    .set_password{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:50px;
      .password_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .password_input{
        width:690px;
        display:block;
        border:0;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .eye_pic{
        position:absolute;
        top:23px;
        right:32px;
        display: inline-block;
        width:47px;
        height:30px;
      }
    }
    .wrong{
      color:#E11A1A;
      font-size:22px;
      display: block;
      height:22px;
      line-height: 22px;
      margin-left:30px;
      margin-top:10px;
    }
    .define_password{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:50px;
      &.set_define{
        margin-top:30px;
      }
      .password_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .password_input{
        width:690px;
        display:block;
        border:0;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .eye_pic{
        position:absolute;
        top:23px;
        right:32px;
        display: inline-block;
        width:47px;
        height:30px;
      }
    }
    .treaty{
      width:690px;
      height: 28px;
      line-height: 28px;
      margin:0 auto;
      margin-top:30px;
      .checkbox{
        width:28px;
        height:28px;
        display:inline-block;
        border:2px solid #ccc;
        border-radius: 20%;
        margin-right:20px;
        &.action{
          background:#FF6901;
          border-color:#FF6901;
          &::before{
            content:'';
            display: inline-block;
            width:20px;
            height:12px;
            border: 2px solid #fff;
            border-width: 0 0 4px 4px;
            transform: rotate(-45deg);
            margin-bottom:16px;
            margin-left:2px;
          }
        }
        .check_b{
          display:none;
        }
      }
      .agree{
        display: inline-block;
        vertical-align: middle;
        height:28px;
        line-height: 28px;
        .agree_a{
          font-size:28px;
          color:#999;
          height:28px;
          line-height: 28px;
          display: block;
        }
      }
    }
    .reg_num{
      margin:0 auto;
      margin-top:80px;
      width:690px;
      height:76px;
      text-align: center;
      line-height: 76px;
      background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
      box-shadow:0px 3px 7px 0px rgba(253, 45, 104, 0.35);
      opacity:0.6;
      color: #fff;
      border-radius: 38px;
      font-size:30px;
    }
  }
  // 微信登录
  .weixin{
    .reg_process{
      width: 750px;
      position: relative;
      display:flex;
      flex-direction: column;
      align-items: center;
      .reg_top{
        width:450px;
        display:inline-block;
        .status_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
        .sign_line{
          display: inline-block;
          vertical-align: middle;
          width:382px;
          height:2px;
          background:#ccc;
          margin:0 12px;
        }
        .set_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:#ccc;
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
      }
      .reg_bottom{
        width: 558px;
        display:flex;
        justify-content: space-between;
        .status_word{
          display:block;
          font-size:28px;
          color:#333;
        }
        .set_word{
          display:block;
          font-size:28px;
          color:#999;
        }
      }
    }
    .sign_tel{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:40px;
      .tel_pic{
        position:absolute;
        top:24px;
        left:32px;
        display: inline-block;
        width:26px;
        height:30px;
      }
      .tel_input{
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        display:block;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
    }
    .wrong{
      color:#E11A1A;
      font-size:22px;
      display: block;
      height:22px;
      line-height: 22px;
      margin-left:30px;
      margin-top:10px;
    }
    .code{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      position: relative;
      margin:0 auto;
      margin-top:40px;
      &.wx_code_er{
        margin-top:30px;
      }
      .code_pic{
        position:absolute;
        top:26px;
        left:32px;
        display: inline-block;
        width:30px;
        height:24px;
      }
      .code_input{
        display:block;
        width:690px;
        border:0;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .gain_code{
        position:absolute;
        top:27px;
        right:32px;
        font-size:28px;
        color:#FF6501;
        height:26px;
        line-height: 26px;
        &.disabled{
          color:#999;
        }

      }
    }
    .next{
      margin:0 auto;
      margin-top:80px;
      width:690px;
      height:76px;
      text-align: center;
      line-height: 76px;
      background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
      box-shadow:0px 3px 7px 0px rgba(253, 45, 104, 0.35);
      opacity:0.6;
      color: #fff;
      border-radius: 38px;
      font-size:30px;
    }
  }
  // 微信登录设置密码
  .weixin_set{
    .reg_process{
      width: 750px;
      position: relative;
      display:flex;
      flex-direction: column;
      align-items: center;
      .reg_top{
        width:450px;
        display:inline-block;
        .status_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
        .sign_line{
          display: inline-block;
          vertical-align: middle;
          width:382px;
          height:2px;
          background:#FF6901;
          margin:0 12px;
        }
        .set_round{
          display:inline-block;
          vertical-align: middle;
          width:22px;
          height:22px;
          background:linear-gradient(-90deg,rgba(255,91,0,1),rgba(255,132,0,1));
          box-shadow:0px 4px 13px 0px rgba(255,111,0,0.3);
          border-radius:50%;
          position: relative;
          .round{
            position: absolute;
            width:14px;
            height:14px;
            border-radius:50%;
            background:#fff;
            top:4px;
            left:4px;
          }
        }
      }
      .reg_bottom{
        width: 558px;
        display:flex;
        justify-content: space-between;
        .status_word,.set_word{
          display:block;
          font-size:28px;
          color:#333;
        }
      }
    }
    .set_password{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:50px;
      .password_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .password_input{
        width:690px;
        display:block;
        border:0;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .eye_pic{
        position:absolute;
        top:23px;
        right:32px;
        display: inline-block;
        width:47px;
        height:30px;
      }
    }
    .wrong{
      color:#E11A1A;
      font-size:22px;
      display: block;
      height:22px;
      line-height: 22px;
      margin-left:30px;
      margin-top:10px;
    }
    .define_password{
      width:690px;
      height:80px;
      border:2px solid #FF6501;
      border-radius: 10px;
      margin:0 auto;
      position: relative;
      margin-top:50px;
      &.wx_set_define{
        margin-top:30px;
      }
      .password_pic{
        position:absolute;
        top:23px;
        left:32px;
        display: inline-block;
        width:30px;
        height:30px;
      }
      .password_input{
        width:690px;
        display:block;
        border:0;
        border-radius: 10px;
        height:80px;
        text-indent: 82px;
        font-size:28px;
        &::-webkit-input-placeholder{
          color:#999;
          font-size:28px;
        }
      }
      .eye_pic{
        position:absolute;
        top:23px;
        right:32px;
        display: inline-block;
        width:47px;
        height:30px;
      }
    }
    .treaty{
      width:690px;
      height: 28px;
      line-height: 28px;
      margin:0 auto;
      margin-top:30px;
      .checkbox{
        width:28px;
        height:28px;
        display:inline-block;
        border:2px solid #ccc;
        border-radius: 20%;
        margin-right:20px;
        &.action{
          background:#FF6901;
          border-color:#FF6901;
          &::before{
            content:'';
            display: inline-block;
            width:20px;
            height:12px;
            border: 2px solid #fff;
            border-width: 0 0 4px 4px;
            transform: rotate(-45deg);
            margin-bottom:16px;
            margin-left:2px;
          }
        }
        .check_b{
          display:none;
        }
      }
      .agree{
        display: inline-block;
        vertical-align: middle;
        height:28px;
        line-height: 28px;
        .agree_a{
          font-size:28px;
          color:#999;
          height:28px;
          line-height: 28px;
          display: block;
        }
      }
    }
    .reg_num{
      margin:0 auto;
      margin-top:80px;
      width:690px;
      height:76px;
      text-align: center;
      line-height: 76px;
      background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
      box-shadow:0px 3px 7px 0px rgba(253, 45, 104, 0.35);
      opacity:0.6;
      color: #fff;
      border-radius: 38px;
      font-size:30px;
    }
  }
</style>