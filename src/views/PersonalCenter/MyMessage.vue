<template>
  <div>
    <!-- 我的留言 -->
    <full-modal 
      v-model="show_component"
      :empty="show_empty"
      >
      <template slot="header">我的留言</template>
      <template slot="body">
        <template v-if="show_empty">
          <div>
            <yxdt-empty img-url="/static/center/empty-message.png" text="暂无任何留言哦~"/>
            <a class="btn_s1 empty-btn" @click="add_message">新增留言</a>
          </div>
        </template>
        <mescroll-vue v-show="!show_empty" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="message-group">
            <van-swipe-cell v-for="(news,key) in message_list" :key="key">
              <li class="message-list">
                  <div class="m-title border-bottom">
                    <div class="col_1"><img src="/static/center/liuyan.png" alt=""><span>留言</span></div>
                    <div class="status">未回复</div>
                  </div>
                  <div class="m-info">
                    <div class="row-item">
                      <span class="label">标题：</span>
                      <span class="content">留言的标题内容</span>
                    </div>
                    <div class="row-item">
                      <span class="label">内容：</span>
                      <span class="content">留言的标题内容留言的标题内容留言的标题内容留言留言的标题内容留言的标题内容留言</span>
                    </div>
                  </div>
                  <div class="m-time">2020-06-02 12:23:19</div>
                  <div class="m-file">
                    <img src="" alt="">
                    <div class="name">服务商系统图片.jpg</div>
                    <a href="" class="btn_s2 gray" download="服务商系统图片.jpg">下载</a>
                  </div>
                  <div class="m-reply row-item">
                    <div class="label">回复内容：</div>
                    <div class="content">留言的标题内容留言的标题内容留言的标题内容留 言留言的标题内容留言的标题内容留言</div>
                  </div>
                  <div class="m-time reply">2020-06-02 12:23:19</div>
              </li>
              <template #right>
                <div class="swipe-actionbox">
                  <div class="act" @click="del_shadow(key)"><div>删除</div></div>
                </div>
              </template>
            </van-swipe-cell>
          </div>
        </mescroll-vue>
        <a v-if="!show_empty && !loadingData" class="add_message_image" @click="add_message"></a>
      </template>
    </full-modal>
    <!-- 删除订单弹窗 -->
    <shadow-modal 
      v-model="show_del" 
      type="middle"
      :show_cancel="true"
      @ok="save_del"
      >
      <template slot="header">确定取消此留言?</template>
      <template slot="body">删除后,数据不可恢复。</template>
    </shadow-modal>
    <!-- 新增留言 -->
    <add-message ref="add_message"></add-message>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Toast } from 'vant';
// 
import MescrollVue from 'mescroll.js/mescroll.vue'
import FullModal from "@/iYxdt/FullModal";
import ShadowModal from "@/iYxdt/ShadowModal";
import AddMessage from "./AddMessage";

export default {
  data(){
    return {
      show_component:false,  // 我的留言
      mescrollDown:{
        auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        callback: this.downCallback // 下拉刷新的回调
      },
      mescrollUp: {
        auto: false, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        htmlNodata: '<p class="upwarp-nodata">没有更多数据了~</p>', // 无数据的布局
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      },
      message_list:[],
      mescroll: null,
      loadingData:false,
      // 
      show_del:false,
    }
  },
  computed:{
    show_empty(){
      return !this.message_list.length && this.loadingData==false;
    }
  },
  methods: {
    /* mescroll */
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    downCallback (mescroll) {
      mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
    },
    upCallback (page) {
      // 联网加载数据
      this.getListDataFromNet(page.num, page.size, (curPageData) => {
        // 添加列表数据
        if(page.num===1) this.message_list=[];
        this.message_list = this.message_list.concat(curPageData)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess(curPageData.length)
        })
      })
    },
    getListDataFromNet (pageNum, pageSize, successCallback, errorCallback) {
      // 延时一秒,模拟联网
      this.loadingData=true;
      setTimeout( ()=> {
        this.loadingData=false;
        try {
          if (pageNum === 0) {
            // 此处模拟下拉刷新返回的数据
            var id = new Date().getTime()
            var newObj = {title: '【新增新闻】 标题' + id, content: '新增新闻的内容', id: id}
            successCallback && successCallback(newObj)
          } else {
            // 此处模拟上拉加载返回的数据
            var message_list = []
            for (var i = 0; i < pageSize; i++) {
              var upIndex = (pageNum - 1) * pageSize + i + 1
              message_list.push({title: '【新闻' + upIndex + '】 标题标题标题标题标题标题', content: '内容内容内容内容内容内容内容内容内容内容', id: upIndex})
            }
            if(pageNum==3) message_list=[];
            successCallback && successCallback(message_list)
          }
        } catch (e) {
          // 联网失败的回调
          errorCallback && errorCallback()
        }
      }, 1000)
    },
    /*  */
    del_shadow(key){
      console.log('del_shadow',key)
      this.show_del=true;
    },
    add_message(){
      console.log('add_message')
      this.$refs.add_message.show_component=true;
    },
    save_del(){
      console.log('save_del');
    },
  },
  components:{
    FullModal,
    ShadowModal,
    MescrollVue,
    AddMessage,
  }
}
</script>

<style scoped lang="scss">
.message-group{
  .van-swipe-cell{
    margin-top:20px;
    background:#fff;
    li{
      padding:30px;
      .m-title{
        display:flex;
        justify-content:space-between;
        align-items:center;
        line-height:29px;
        font-size:26px;
        .col_1{
          img{
            display:inline-block;
            width:30px;
            height:29px;
            vertical-align:middle;
          }
          span{
            margin-left:20px;
            vertical-align:middle;
          }
        }
        .status{
          color:#FF6901;
        }
      }
      .m-info{
        margin-top:55px;
      }
      .m-time{
        margin-top:20px;
        text-align:right;
        font-size:22px;
        color:#999;
        &.reply{
          margin-top:30px;
        }
      }
      .m-file{
        margin-top:20px;
        background:#f8f8f8;
        border-radius:10px;
        display:flex;
        padding-right:20px;
        align-items:center;
        img{
          width:80px;
          height:80px;
          background:#f0f;
          flex-shrink:0;
        }
        .name{
          font-size:24px;
          margin-left:20px;
          flex:1;
        }
        .btn_s2{
          flex-shrink:0;
          padding:0 25px;
          margin:0;
          height:50px;
          border-radius:25px;
          font-size:24px;
        }
      }
      .m-reply{
        margin-top:50px;
        display:flex;
        .label{
          color:#E11A1A;
        }
        .content{
          color:#E11A1A;
        }
      }
    }
  }
}
.add_message_image{
  position:absolute;
  width: 80px;
  height: 80px;
  right:30px;
  bottom:204px;
  background:url(/static/center/add_message.png) 0 0 no-repeat;
  background-size:100% 100%;
}
</style>