<template>
  <div>
    <!-- 我的评论 -->
    <full-modal 
      v-model="show_component"
      :empty="show_empty"
      >
      <template slot="header">我的评论</template>
      <template slot="body">
        <template v-if="show_empty">
          <div>
            <yxdt-empty img-url="/static/center/empty-message.png" text="暂无任何评论哦~"/>
          </div>
        </template>
        <mescroll-vue v-show="!show_empty" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="comment-group">
            <van-swipe-cell v-for="(news,key) in comment_list" :key="key">
              <li class="comment-list">
                <div class="m-file">
                  <img src="" alt="">
                  <div class="name">服务商系统图片.jpg</div>
                </div>
                <div class="m-info">
                  <div class="row-item">
                    <span class="label">评论内容：</span>
                    <span class="content">非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非 常好,很棒啊 ! 非常好,很棒啊!非常好,很棒啊 !非常 好,很棒啊 </span>
                  </div>
                </div>
                <div class="m-time">2020-06-02 12:23:19</div>
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
      </template>
    </full-modal>
    <!-- 删除订单弹窗 -->
    <shadow-modal 
      v-model="show_del" 
      type="middle"
      :show_cancel="true"
      @ok="save_del"
      >
      <template slot="header">确定删除此评论?</template>
      <template slot="body">删除后,数据不可恢复。</template>
    </shadow-modal>
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

export default {
  data(){
    return {
      show_component:false,  // 我的评论
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
      comment_list:[],
      mescroll: null,
      loadingData:false,
      // 
      show_del:false,
    }
  },
  computed:{
    show_empty(){
      return !this.comment_list.length && this.loadingData==false;
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
        if(page.num===1) this.comment_list=[];
        this.comment_list = this.comment_list.concat(curPageData)
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
            var comment_list = []
            for (var i = 0; i < pageSize; i++) {
              var upIndex = (pageNum - 1) * pageSize + i + 1
              comment_list.push({title: '【新闻' + upIndex + '】 标题标题标题标题标题标题', content: '内容内容内容内容内容内容内容内容内容内容', id: upIndex})
            }
            if(pageNum==3) comment_list=[];
            console.log(comment_list);
            successCallback && successCallback(comment_list)
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
    save_del(){
      console.log('save_del');
    }
  },
  components:{
    FullModal,
    ShadowModal,
    MescrollVue,
  }
}
</script>

<style scoped lang="scss">
.comment-group{
  .van-swipe-cell{
    margin-top:20px;
    background:#fff;
    li{
      padding:30px;
      .m-info{
        margin-top:55px;
      }
      .m-time{
        margin-top:18px;
        text-align:right;
        font-size:22px;
        color:#999;
        &.reply{
          margin-top:30px;
        }
      }
      .m-file{
        background:#f8f8f8;
        border-radius:10px;
        display:flex;
        padding-right:30px;
        align-items:center;
        img{
          width:102px;
          height:102px;
          background:#f0f;
          flex-shrink:0;
        }
        .name{
          font-size:24px;
          margin-left:20px;
          flex:1;
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
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
</style>