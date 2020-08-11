<template>
  <div 
    class="shadow_modal"
    v-if="computed_value"
    :class="{
      modal_leave:leave,
      position_middle:type=='middle',
      'form-item':modal_style=='form-item'
    }"
  >
    <div class="shadow_bg" @click="close_modal"></div>
    <div
      class="shadow_container"
    >
      <div class="shadow_header">
        <div class="header_text"><slot name="header"></slot></div>
        <div class="close" v-if="type!='middle'" @click="close_modal"></div>
      </div>
      <div class="shadow_body">
        <slot name="body"></slot>
      </div>
      <div class="shadow_footer" :style="{height:footer_height/75+'rem'}">
        <div class="btn_s2" @click="close_modal" v-if="show_cancel">{{cancel_text}}</div>
        <div class="btn_s1" @click="confirm" v-if="show_ok">{{ok_text}}</div>
        <slot name="footer"></slot>
      </div>
      <div class="close2" v-if="type=='middle'" @click="close_modal"></div>
    </div>
  </div>
</template>

<script>
import {stopScroll,allowScroll} from "@/utils/methods";

export default {
  data(){
    return {
      leave:false
    }
  },
  props:{
    value:{
      type:Boolean,
      default:false
    },
    type:{
      type:String,
      default:null
    },
    modal_style:{
      type:String,
      default:null
    },
    footer_height:{
      type:Number,
      default:106
    },
    // 
    show_cancel:{
      type:Boolean,
      default:false
    },
    show_ok:{
      type:Boolean,
      default:true
    },
    cancel_text:{
      type:String,
      default:'取消'
    },
    ok_text:{
      type:String,
      default:'确定'
    },
    okHide:{
      type:Boolean,
      default:false
    },
    footer_interval:{
      type:Number,
      default:50
    }
  },
  computed:{
    computed_value:{
      get(){
        return this.value;
      },
      set(nv){
        this.$emit('input',nv)
      }
    },
  },
  watch:{
    computed_value(nv){
      if(nv) stopScroll();
      else allowScroll();
    }
  },
  methods:{
    close_modal(){
      this.leave=true;
      setTimeout(()=>{
        this.leave=false;
        this.computed_value=false;
      },249)
    },
    confirm(){
      this.$emit('ok',this);
      if(this.okHide){
        this.close_modal();
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @keyframes fadeIn{
    from{ opacity:0; }
    to{ opacity:1; }
  }
  @keyframes fadeOut{
    from{ opacity:1; }
    to{ opacity:0; }
  }
  @keyframes moveBottomIn{
    0%{
      transform-origin:0 0;
      transform:translateY(100%);
      opacity:0
    }
    100%{
      transform-origin:0 0;
      transform:translateY(0);
      opacity:1
    }
  }
  @keyframes moveBottomOut{
    0%{
      transform-origin:0 0;
      transform:translateY(0);
      opacity:1
    }
    100%{
      transform-origin:0 0;
      transform:translateY(100%);
      opacity:0
    }
  }
  .shadow_modal{
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index: 20;
    .shadow_bg{
      position:absolute;
      width:100%;
      height:100%;
      background-color: rgba(5,0,1,.6);
      animation:fadeIn .25s linear both;
    }
    .shadow_container{
      position:absolute;
      right:0;
      bottom:0;
      left:0;
      z-index: 1;
      border-radius:30px 30px 0px 0px;
      background: #fff;
      animation:moveBottomIn .25s linear both;
      max-height:80%;
      display: flex;
      flex-direction: column;
      .shadow_header{
        height:90px;
        position:relative;
        line-height:90px;
        font-size: 32px;
        padding-left:30px;
        font-weight:bold;
        border-radius:30px 30px 0px 0px;
        background:#F8F8F8;
        .close{
          position:absolute;
          width:36px;
          height:36px;
          right:26px;
          top:50%;
          transform: translateY(-50%);
          background:url(../assets/image/center/close_1.png) 0 0 no-repeat;
          background-size:100% 100%;
        }
      }
      .shadow_body{
        font-size:28px;
        overflow-y: auto;
      }
      .shadow_footer{
        display:flex;
        justify-content:center;
        .btn_s1{
          width:460px;
        }
        .btn_s2{
          margin:0;
          width:210px;
          border-color:#ccc;
          color:#666;
          &+.btn_s1{
            margin:0;
            width:210px;
            margin-left:30px;
          }
        }
      }
    }
    &.position_middle{
      .shadow_container{
        width:600px;
        animation-name:fadeIn;
        padding-top:43px;
        bottom:50%;
        left:50%;
        transform:translate(-50%,50%);
        border-radius:30px;
        .shadow_header{
          height:auto;
          line-height:normal;
          padding:0;
          padding-left:126px;
          padding-right:40px;
          background:#fff;
        }
        .shadow_body{
          padding-top:19px;
          padding-left:126px;
          padding-right:40px;
          padding-bottom:50px;
        }
      }
      .close2{
        width:76px;
        height:76px;
        position:absolute;
        left:50%;
        bottom:-116px;
        transform:translateX(-50%);
        background:url(../assets/image/center/close_2.png);
        background-size:100% 100%;
      }
    }
    &.modal_leave{
      .shadow_bg{
        animation:fadeOut .25s linear both;
      }
      .shadow_container{
        animation:moveBottomOut .25s linear both;
      }
      &.position_middle{
        .shadow_container{
          animation-name:fadeOut;
        }
      }
    }
    &.more{
      .shadow_container{
        .shadow_header{
          padding-left:40px;
        }
        .shadow_body{
          padding-left:40px;
        }
      } 
    }
    &.text-center{
      .shadow_container{
        .shadow_header{
          padding:0 30px;
          text-align:center;
        }
      }
    }
    &.form-item{
      .shadow_container{
        padding-top:50px;
        .shadow_header{
          padding:0;
          text-align:center;
        }
        .shadow_body{
          padding:43px 20px 0;
        }
      }
    }
  }
</style>