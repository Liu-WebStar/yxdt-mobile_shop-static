<template>
  <div>
    <!-- 个人设置 -->
    <full-modal v-model="show_component" :footer_height="212">
      <template slot="header">个人设置</template>
      <template slot="body">
        <div class="personal_container">
          <div class="personal_item portrait border-bottom">
            <div class="item_filed">头像</div>
            <div class="item_value"><img src="/mobile_shop/static/center/logo.png"></div>
            <div class="item_arrow"></div>
          </div>
          <div class="personal_item border-bottom">
            <div class="item_filed">用户名</div>
            <div class="item_value">邢123345</div>
          </div>
          <div class="personal_item border-bottom" @click="show_gender_modal">
            <div class="item_filed">性别</div>
            <div class="item_value" v-text="data_gender"></div>
            <div class="item_arrow"></div>
          </div>
          <div class="personal_item border-bottom" @click="show_birthday_modal">
            <div class="item_filed">生日</div>
            <div class="item_value" v-text="data_birthday_show"></div>
            <div class="item_arrow"></div>
          </div>
          <div class="personal_item border-bottom" @click="show_email_modal">
            <div class="item_filed">邮箱地址</div>
            <div class="item_value" v-text="data_email"></div>
            <div class="item_arrow"></div>
          </div>
          <div class="personal_item border-bottom" @click="show_phone_modal">
            <div class="item_filed">手机号码</div>
            <div class="item_value" v-text="data_phone"></div>
            <div class="item_arrow"></div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="btn_box">
          <div class="btn_s1" @click="show_password_modal">修改密码</div>
          <div class="btn_s2" @click="show_logout_modal">退出登录</div>
        </div>
      </template>
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
    <!-- 选择出生日期 -->
    <shadow-modal 
      v-model="show_birthday" 
      :okHide="true"
      @ok="save_birthday"
      >
      <template slot="header">选择出生日期</template>
      <template slot="body">
        <div class="birthday_container">
          <van-datetime-picker
            v-model="data_birthday2"
            type="date"
            :show-toolbar="false"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
          />
        </div>
      </template>
    </shadow-modal>
    <!-- 设置邮箱地址 -->
    <shadow-modal 
      ref="shadow_modal3"
      v-model="show_email" 
      @ok="save_email"
      >
      <template slot="header">设置邮箱地址</template>
      <template slot="body">
        <div class="shadow_email">
          <van-field size="large" v-model="data_email2" placeholder="请输入邮箱地址" />
        </div>
      </template>
    </shadow-modal>
    <!-- 修改手机号 -->
    <shadow-modal 
      ref="shadow_modal4"
      v-model="show_phone" 
      @ok="save_phone"
      >
      <template slot="header">修改手机号</template>
      <template slot="body">
        <div class="shadow_phone">
          <div class="row_1">
            <van-field label="新手机号" type="tel" v-model="data_phone2" placeholder="请输入新手机号码" maxLength="11" />
          </div>
          <div class="row_2">
            <van-field label="验证码" type="tel" v-model="data_phone_code" placeholder="请输入验证码" maxLength="6" class="inp-left"/>
            <div v-if="send_code_type" class="send_code disabled" v-text="code_number"></div>
            <div v-else class="send_code" @click="send_code">发送验证码</div>
          </div>
        </div>
      </template>
    </shadow-modal>
    <!-- 修改密码 -->
    <shadow-modal 
      ref="shadow_modal5"
      v-model="show_password" 
      @ok="save_password"
      >
      <template slot="header">修改密码</template>
      <template slot="body">
        <div class="shadow_password">
          <div class="row_1">
            <van-field label="新密码" type="password" clearable v-model="data_password" placeholder="密码长度8-14位" maxLength="14" />
          </div>
          <div class="row_2">
            <van-field label="确认密码" type="password" clearable v-model="data_password2" placeholder="请确认新密码" maxLength="14" />
          </div>
        </div>
      </template>
    </shadow-modal>
    <!-- 退出登录 -->
    <shadow-modal 
      v-model="show_logout" 
      type="middle"
      :show_cancel="true"
      @ok="save_logout"
      >
      <template slot="header">确定退出登录状态吗？</template>
      <template slot="body">确定后，账号将退出登录状态。</template>
    </shadow-modal>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import FullModal from "@/iYxdt/FullModal";
import ShadowModal from "@/iYxdt/ShadowModal";
import { Toast } from 'vant';

export default {
  data(){
    return {
      show_component:false,  // 个人设置
      show_gender:false,  // 设置性别
      // 选择出生日期
      show_birthday:false,  
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      data_birthday: new Date(),
      data_birthday2: new Date(),
      new_birthday:true,
      // 
      data_gender:'男',
      data_gender2:'男',
      // 
      show_email:false,
      data_email:'',
      data_email2:'',
      // 
      show_phone:false,
      data_phone:'',
      data_phone2:'',
      data_phone_code:'',
      phone_code:null,
      send_code_type:false,
      code_number:60,
      // 
      show_password:false,
      data_password:'',
      data_password2:'',
      // 
      show_logout:false
    }
  },
  computed:{
    data_birthday_show(){
      if(this.new_birthday){
        return '请选择你的生日'
      }else{
        var date=this.data_birthday;
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        return `${year}年${month}月${day}日`;
      }
    }
  },
  methods:{
    show_gender_modal(){
      this.data_gender2=this.data_gender;
      this.show_gender=true;
    },
    show_birthday_modal(){
      this.data_birthday2=this.data_birthday;
      this.show_birthday=true;
    },
    show_email_modal(){
      this.data_email2=this.data_email;
      this.show_email=true;
    },
    show_phone_modal(){
      this.data_phone2=this.data_phone;
      this.show_phone=true;
    },
    show_password_modal(){
      this.data_password='';
      this.data_password2='';
      this.show_password=true;
    },
    show_logout_modal(){
      this.show_logout=true;
    },
    save_gender(){
      var gender=this.data_gender2;
      this.data_gender=this.data_gender2;
    },
    save_birthday(){
      var birthday=this.data_birthday2;
      this.data_birthday=birthday;
      this.new_birthday=false;
    },
    save_email(){
      var email=this.data_email2;
      console.log(email);
      var r1 = /^[^@]+@[^@]+\.[a-zA-Z]{2,6}$/;
      var reg = r1.test(email);
      if (reg) {
        this.data_email=email;
        this.$refs.shadow_modal3.close_modal();
      } else {
        var error=email == "" ? "不能为空" : "邮箱格式不正确，请确认";
        Toast(error);
        $('.shadow_email input').get(0).focus();
      }
    },
    send_code(){
      console.log('send_code');
      this.send_code_type=true;
      this.code_number=60;
      this.code_timer=setInterval(()=>{
        this.code_number--;
        if(this.code_number<=0){
          clearInterval(this.code_timer);
          this.send_code_type=false;
        }
      },1000)
    },
    save_phone(){
      var phone=this.data_phone2;
      console.log(phone);
      var r1 = /^1[34578]\d{9}$/;
      var reg = r1.test(phone);
      if (reg) {
        if(this.phone_code!=null && this.phone_code==this.data_phone_code){
          this.data_phone=phone;
          this.$refs.shadow_modal4.close_modal();
        }else{
          var error=this.phone_code == null ? "请发送验证码" : "验证码不正确";
          Toast(error);
        }
      } else {
        var error=phone == "" ? "手机号不能为空" : "手机号格式不正确，请确认";
        Toast(error);
        $('.shadow_phone input').get(0).focus();
      }
    },
    psw_error(text){
      Toast(text);
      $('.shadow_password input').get(0).focus();
    },
    save_password(){
      var psw=this.data_password;
      var psw2=this.data_password2;
      console.log(psw,psw2);
      var r1 =
        /^[\s\S]{8,14}$/.test(psw) &&
        /[\d]/.test(psw) &&
        /[a-zA-Z]/.test(psw);
      if (psw === "") {
        this.psw_error("请输入密码");
      } else if (!r1) {
        this.psw_error("请填写8～14位数字+字母组合的密码！");
      } else if (psw === "") {
        this.psw_error("请确认密码");
      } else if (psw !== psw2) {
        this.psw_error("两次密码输入不一致");
      }else{
        this.$refs.shadow_modal5.close_modal();
      }
    },
    // 
    save_logout(){
      console.log('退出登录');
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
  },
  components:{
    FullModal,
    ShadowModal
  }
}
</script>

<style scoped lang="scss">
  .personal_container{
    background:#fff;
    padding:0 30px;
    .personal_item{
      height:101px;
      display:flex;
      align-items:center;
      .item_filed{
        font-size:28px;
      }
      .item_value{
        flex:1;
        text-align:right;
        font-size:26px;
        color:#999;
      }
      .item_arrow{
        width:10px;
        height:19px;
        background:url(../../assets/image/center/right_arrow.png) 0 0 no-repeat;
        background-size:100% 100%;
        margin-left:20px;
      }
      &.portrait{
        height:121px;
        .item_value{
          img{
            width:80px;
            height:80px;
          }
        }
      }
    }
  }
  .btn_box{
    .btn_s2{
      margin-top:30px;
    }
  }
  .gender_container{
    padding:20px 30px 79px;
    .van-radio{
      height:89px;
    }
  }
  .shadow_email{
    padding:53px 30px 0;
  }
  .shadow_phone{
    padding:51px 30px 106px;
    .row_2{
      margin-top:55px;
      display:flex;
      align-items:center;
      .van-field{
        flex:1;
      }
      .send_code{
        height: 40px;
        color: #ea5513;
        box-sizing:border-box;
        border:1Px solid rgba(234,85,19,1);
        border-radius:20px;
        font-size:20px;
        line-height:38px;
        padding:0 10px;
        min-width:120px;
        text-align:center;
        &.disabled{
          border-color:#999;
          color:#999;
        }
      }
    }
  }
  .shadow_password{
    padding:51px 30px 113px;
    .row_2{
      margin-top:55px;
    }
  }
</style>