<template>
  <div>
    <!-- 我的留言 -->
    <full-modal 
      v-model="show_component"
      :footer_height="106"
      >
      <template slot="header">我的评价</template>
      <template slot="body">
        <div class="info-container">
          <div class="row row-goods">
            <img src="" alt="">
            <div class="text">博文（bowen）25202 皮面笔记本 单皮面笔记 博文（bowen）25202 皮面笔记本 单皮面笔记 </div>
          </div>
          <div class="row row-rate">
            <div class="text_1">评价等级</div>
            <yxdt-rate v-model="formData.rate"></yxdt-rate>
            <div class="text_2">待点评</div>
          </div>
          <div class="row">
            <van-field
              v-model="formData.content"
              autosize
              type="textarea"
              maxlength="300"
              placeholder="请输入留言内容"
              class="van-yxdt-textarea"
              show-word-limit
              style="height:300px;"
            />
          </div>
        </div>
      </template>
      <template slot="footer">
        <a class="btn_s1" @click="dataConfirm">提交评价</a>
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

export default {
  data(){
    return {
      show_component:false,  // 我的评价
      formData:{
        content:null,
        rate: 1
      },
    }
  },
  methods: {
    dataConfirm(){
      console.log('dataConfirm');
      console.log(this.formData);
      Toast('发表评论成功');
    },
  },
  components:{
    FullModal,
  }
}
</script>

<style scoped lang="scss">
  .info-container{
    margin-top:20px;
    background:#fff;
    padding:30px;
    .row{
      &+.row{
        margin-top:20px;
      }
      &.row-goods{
        display:flex;
        overflow:hidden;
        align-items:center;
        img{
          width: 102px;
          height: 102px;
          background:#f00;
        }
        .text{
          flex:1;
          margin-left:30px;
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
        }
      }
      &.row-rate{
        display:flex;
        overflow:hidden;
        align-items:center;
        .text_1{
          font-size:28px;
        }
        .text_2{
          font-size:26px;
          color:#999;
        }
      }
    }
  }
</style>