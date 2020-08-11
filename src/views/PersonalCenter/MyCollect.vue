<template>
  <div>
    <!-- 我的收藏 -->
    <full-modal 
      v-model="show_component"
      :empty="show_empty"
      >
      <template slot="header">我的收藏</template>
      <template slot="body">
        <yxdt-empty v-show="show_empty" img-url="/static/center/empty-collect.png" text="暂无收藏哦~"/>
        <mescroll-vue v-show="!show_empty" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <ul class="collect-group">
            <li v-for="(news,key) in collect_list" :key="key" class="border-bottom">
              <div class="col_1"><img src="" alt=""></div>
              <div class="col_2">
                <div class="name">博文（bowen） 25202皮面笔记本 单本 25202皮面笔记本 单本</div>
                <div class="info">
                  <div class="price"><span class="s1">￥</span><span class="s2">128.00</span></div>
                </div>
                <div class="action-box">
                  <a class="btn_s2" @click="cancel_collect(key)">取消收藏</a>
                  <a class="btn_s1" @click="add_to_car(key)">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
        </mescroll-vue>
      </template>
    </full-modal>
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
        toTop: { // 配置回到顶部按钮
          src: '/static/mescroll/mescroll-totop.png'
        },
        htmlNodata: '<p class="upwarp-nodata">没有更多商品了~</p>', // 无数据的布局
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      },
      show_component:false,  // 个人设置
      collect_list:[],
      mescroll: null,
      loadingData:false,
    }
  },
  computed:{
    show_empty(){
      return !this.collect_list.length && this.loadingData==false;
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    /* 下拉刷新的回调 */
    downCallback (mescroll) {
      mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
    },

    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page) {
      // 联网加载数据
      this.getListDataFromNet(page.num, page.size, (curPageData) => {
        // 添加列表数据
        if(page.num===1) this.collect_list=[];
        this.collect_list = this.collect_list.concat(curPageData)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess(curPageData.length)
        })
      })
    },

    /* 联网加载列表数据
     在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
     请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
     实际项目以您服务器接口返回的数据为准,无需本地处理分页.
    * */
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
            var collect_list = []
            for (var i = 0; i < pageSize; i++) {
              var upIndex = (pageNum - 1) * pageSize + i + 1
              collect_list.push({title: '【新闻' + upIndex + '】 标题标题标题标题标题标题', content: '内容内容内容内容内容内容内容内容内容内容', id: upIndex})
            }
            if(pageNum==3) collect_list=[];
            successCallback && successCallback(collect_list)
          }
        } catch (e) {
          // 联网失败的回调
          errorCallback && errorCallback()
        }
      }, 1000)
    },
    cancel_collect(){
      console.log('cancel_collect');
      Toast('取消收藏操作成功');
    },
    add_to_car(){
      console.log('add_to_car');
      Toast({
        message: '加入购物车成功',
        icon: '/static/center/success.png',
        className:'toast-image'
      });
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
.collect-group{
  margin-top:20px;
  padding:0 30px;
  background:#fff;
  li{
    padding:30px 0;
    display:flex;
    .col_1{
      flex-shrink:0;
      img{
        width: 200px;
        height: 200px;
        background:#f0f;
        display:block;
      }
    }
    .col_2{
      margin-left:19px;
      display:flex;
      flex-direction:column;
      flex:1;
      overflow:hidden;
      position:relative;
      .name{
        font-size:24px;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
      }
      .info{
        margin-top:20px;
        display:flex;
        .price{
          color:#FF6501;
          line-height:26px;
          height:26px;
          .s1{
            font-size:20px;
          }
          .s2{
            font-size:36px;
          }
        }
      }
      .action-box{
        font-size:0;
        text-align:right;
        position:absolute;
        bottom:0;
        left:0;
        right:0;
        a{
          display:inline-block;
          height:60px;
          line-height:60px;
          padding:0 30px;
          border:1Px solid #ccc;
          border-radius:30px;
          font-size:24px;
          margin:0;
          &+a{
            margin-left:30px;
          }
          &.btn_s2{
            color:#333;
          }
        }
      }
    }
  }
}
</style>