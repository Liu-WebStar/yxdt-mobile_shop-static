<template>
  <div>
    <!-- 我的留言 -->
    <full-modal 
      v-model="show_component"
      :footer_height="106"
      >
      <template slot="header">新增留言</template>
      <template slot="body">
        <div class="add-message">
          <div class="row">
            <van-radio-group v-model="formData.messageType" direction="horizontal">
              <van-radio name="0">留言</van-radio>
              <van-radio name="1">投诉</van-radio>
              <van-radio name="2">询问</van-radio>
              <van-radio name="3">售后</van-radio>
              <van-radio name="4">采购</van-radio>
            </van-radio-group>
          </div>
          <div class="row mt_30">
            <input type="text" class="yxdt-input" v-model="formData.title" placeholder="请输入留言主题" />
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
          <div class="row row-file">
            <van-uploader 
              v-model="formData.fileList" 
              :before-read="beforeRead"
              :max-count='5'
              :multiple="true"
              :before-delete="beforeDelete"
              />
            <div class="file-text">支持jpg、png格式</div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <a class="btn_s1" @click="commitMessage">提交留言</a>
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
      show_component:false,  // 新增留言
      formData:{
        messageType:'0',
        title:null,
        content:null,
        fileList: [],
      },
    }
  },
  methods: {
    commitMessage(){
      console.log('commitMessage');
      console.log(this.formData);
    },
    beforeRead(files) {
      var read=true;
      var reg_type= file => file.type=='image/png' || file.type == 'image/jpeg';
      if(files.length){
        for (var i=0;i<files.length;i++) {
          if(!reg_type(files[i])){
            read=false;
            break ;
          } 
        }
      }else 
        if(!reg_type(files)) read=false;
      console.log(read);
      if(!read) Toast('请上传 jpg/png 格式图片');
      return read;
    },
    beforeDelete(){
      Toast('操作成功');
      return true;
    }
  },
  components:{
    FullModal,
  }
}
</script>

<style scoped lang="scss">
  .add-message{
    margin-top:20px;
    background:#fff;
    padding:30px;
    .row{
      &+.row{
        margin-top:20px;
      }
      &.mt_30{
        margin-top:30px;
      }
      &.row-file{
        display:flex;
        align-items:center;
        flex-wrap:wrap;
        .van-uploader{
          flex-shrink:0;
        }
        .file-text{
          flex:1;
          margin-left:20px;
          color:#999;
        }
      }
    }
  }
</style>