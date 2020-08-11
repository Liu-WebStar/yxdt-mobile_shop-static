<template>
  <div>
    <!-- 信用支付明细 -->
    <full-modal 
      v-model="show_component"
      :empty="show_empty"
      @down="scrollDown"
      >
      <template slot="header">信用支付明细</template>
      <template slot="body">
        <yxdt-loading :show="!init" v-if="!init"/>
        <template v-if="init">
          <template v-if="show_empty">
            <div>
              <yxdt-empty img-url="/static/center/empty-credit.png" text="暂无数据哦~"/>
            </div>
          </template>
          <template v-else>
            <div class="info-container">
              <div class="img-box"><img src="/static/center/xinyongeduzhanghu.png" alt=""></div>
              <div class="h2">可用信用额度</div>
              <div class="num">2198.00</div>
            </div>
            <div class="data-container">
              <ul class="tabs-bar border-bottom">
                <li class="tab" :class="{active:tabIndex==0}" @click="changeTab(0)">全部</li>
                <li class="tab" :class="{active:tabIndex==1}" @click="changeTab(1)">增加</li>
                <li class="tab" :class="{active:tabIndex==2}" @click="changeTab(2)">扣减</li>
              </ul>
              <div class="tabs-body">
                <div class="data-list border-bottom" v-for="(data,key) in data_list" :key="key">
                  <div class="col_1">
                    <div class="credit_id">售后退回 #2020051549534954</div>
                    <div class="time">2020-05-25 19:05:38</div>
                  </div>
                  <div class="col_2">
                    <div class="change" :class="1 ? 'add' : 'minus'">{{1 ? '+' : '-'}}357.00</div>
                    <div class="balance">余额:2191.98</div>
                  </div>
                </div>
                <yxdt-loading :no_more="no_more" :show="loadingData" :transition="false"/>
              </div>
            </div>
          </template>
        </template>
      </template>
    </full-modal>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Toast } from 'vant';
// 
import FullModal from "@/iYxdt/FullModal";
import ShadowModal from "@/iYxdt/ShadowModal";

export default {
  data(){
    return {
      show_component:false,  // 信用支付明细
      data_list:[],
      loadingData:false,
      no_more:false,
      tabIndex:0,
      init:false,
      page:{
        num:0,
        size:10
      }
    }
  },
  computed:{
    show_empty(){
      return !this.data_list.length && this.loadingData==false;
    }
  },
  methods: {
    getData(initData=true){
      if(initData){
        this.data_list=[];
        this.page.num=0;
        this.no_more=false;
      }
      if(this.no_more) return;
      this.page.num++;
      this.loadingData=true;
      setTimeout( ()=> {
        this.loadingData=false;
        var newData=[{},{},{},{},{},{},{},{},{},{}];
        /*  */ /*  */
        if(this.page.num==3){
          newData=[]
        }
        /*  */ /*  */
        // 无更多数据
        if(newData.length<this.page.size){ 
          this.no_more=true;
        }
        if(this.no_more) return ;
        if(initData){
          this.data_list=newData;
        }else{
          this.data_list=this.data_list.concat(newData);
        }
        if(!this.init) this.init=true;
      }, 1000)
    },
    changeTab(tabIndex){
      this.tabIndex=tabIndex;
      this.getData();
    },
    scrollDown(){
      if(!this.loadingData){
        console.log('scrollDown');
        this.getData(false);
      }
    }
  },
  components:{
    FullModal,
    ShadowModal,
  }
}
</script>

<style scoped lang="scss">
  .info-container{
    padding:50px 0;
    background:#fff;
    margin-top:20px;
    text-align:center;
    .img-box{
      font-size:0;
      img{
        width:160px;
        height:160px;
      }
    }
    .h2{
      margin-top:50px;
      font-size:32px;
      line-height:31px;
    }
    .num{
      margin-top:40px;
      font-size:80px;
      line-height:60px;
      font-weight:bold;
    }
  }
  .data-container{
    background:#fff;
    margin-top:20px;
    margin-bottom:30px;
    .tabs-bar{
      padding:30px 30px 0;
      display:flex;
      .tab{
        line-height:27px;
        font-size:28px;
        padding-bottom:29px;
        position:relative;
        &.active{
          color: #333;
          font-weight:bold;
          font-size:32px;
          &:before{
            content:'';
            bottom:0px;
            left:0;
            width:100%;
            height:8px;
            position:absolute;
            background:linear-gradient(90deg,rgba(255,175,3,1),rgba(255,96,0,1));
            box-shadow:0px 2px 4px 0px rgba(255,124,1,0.4);
            border-radius:4px;
          }
        }
        &+.tab{
          margin-left:83px;
        }
      }
    }
    .tabs-body{
      padding:0 30px;
      .data-list{
        padding:30px 0;
        display:flex;
        .col_1{
          flex:1;
          overflow:hidden;
          margin-right:20px;
          .credit_id{
            font-size:26px;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
          }
          .time{
            font-size:22px;
            color:#999;
            margin-top:15px;
          }
        }
        .col_2{
          flex-shrink:0;
          .change{
            font-size:26px;
            color:#FF6901;
          }
          .balance{
            font-size:22px;
            color:#666;
          }
        }
        &:nth-last-of-type(2){
          padding-bottom:0;
          &:before{
            border-bottom:0;
          }
        }
      }
    }
  }
</style>