<template>
  <div 
    class="full_modal" 
    :class="{
      empty
    }"
    :style="{
      left:show ? '0%' : '100%',
      opacity:show ? '1' : '0',
    }"
  >
    <div class="left_arrow_outer" v-if="hideHeader" @click="close_modal"></div>
    <div class="full_modal_header" v-if="!hideHeader">
      <div class="left_arrow" @click="close_modal"></div>
      <div class="header_text"><slot name="header"></slot></div>
    </div>
    <div 
      class="full_modal_body"
      ref="body"
      :style="{
        top:hideHeader ? 0 : bodyTop/75+'rem',
        bottom:footer_height/75+'rem'
      }"
      @scroll="bodyScroll"
    >
      <slot name="body"></slot>
    </div>
    <div class="full_modal_footer" :style="{height:footer_height/75+'rem'}">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { remCoefficient,stopScroll,allowScroll } from '@/utils/methods';

export default {
  props:{
    show2:{
      type:Boolean,
      default:false
    },
    footer_height:{
      type:Number,
      default:0
    },
    hideHeader:{
      type:Boolean,
      default:false
    },
    empty:{
      type:Boolean,
      default:false
    },
    bodyTop:{
      type:Number,
      default:88
    }
  },
  computed:{
    show:{
      get(){
        if(this.show2)  stopScroll();
        else  allowScroll();
        return this.show2;
      },
      set(nv){
        this.$emit('change_show',nv)
      }
    }
  },
  methods:{
    close_modal(){
      $('.mescroll-fade-in').removeClass('mescroll-fade-in').addClass('mescroll-fade-out')
      this.show=false;
    },
    bodyScroll(){
      var body=this.$refs.body;
      var scrollTop = $(body).scrollTop();
      var scrollHeight = body.scrollHeight-remCoefficient()*80;
      var bodyHeight = $(body).height();
      if(scrollTop + bodyHeight >= scrollHeight){
        this.$emit('down');
  　　}
    },
  },
  model:{
    prop:'show2',
    event:'change_show'
  }
}
</script>

<style scoped lang="scss">
  .full_modal{
    transition:all .2s ease-in-out;
    position:absolute;
    top:0;
    left:100%;
    width:100%;
    height:100%;
    z-index: 20;
    background: #F8F8F8;
    box-sizing: border-box;
    .left_arrow_outer{
      position:absolute;
      width:88px;
      height:88px;
      left:0px;
      top:0px;
      background:url(../assets/image/center/left_arrow.png) center center no-repeat;
      background-size:18px 30px;
      background-color:#fff;
      z-index: 99;
    }
    .full_modal_header{
      height:88px;
      position:relative;
      line-height:88px;
      font-size: 32px;
      text-align:center;
      background:#fff;
      .left_arrow{
        position:absolute;
        width:18px;
        height:30px;
        left:30px;
        top:50%;
        transform: translateY(-50%) rotate(180deg);
        background:url(../assets/image/center/right_arrow.png) 0 0 no-repeat;
        background-size:100% 100%;
      }
    }
    .full_modal_body{
      position:absolute;
      right:0;
      bottom:0;
      left:0;
      overflow-y:auto;
    }
    .full_modal_footer{
      position:absolute;
      bottom:0;
      left:0;
      right:0;
    }
    &.bg_1{
      .full_modal_header{
        background:url(/mobile_shop/static/center/bg_header_1.png) 0 0 no-repeat;
        .left_arrow{
          background-image:url(/mobile_shop/static/center/left_arrow.png);
          transform: translateY(-50%);
        }
      }
    }
    &.empty{
      .full_modal_body{
        display:flex;
        align-items:center;
        justify-content: center;
      }
    }
  }
</style>