<template>
  <div>
    <!-- 搜索商品 -->
    <search-goods ref="search_goods"></search-goods>
    <!-- 子站点 -->
    <scene-make ref="Subsite"></scene-make>
    <!-- 首页 -->
    <div class="main_emtirety">
      <!-- 首页搜索 -->
      <div class="main_header">
        <div class="header_top">
          <div class="header_pic"></div>
          <div class="header_search" @click="search">
            <div class="search_img"></div>
            <span class="search_word">搜索商品</span>
          </div>
        </div>
      </div>
      <div class="scroll_lazy">
        <mescroll-vue :up="mescrollUp" @init="mescrollInit">
          <div class="main_content">
            <!-- 轮播图 -->
            <div class="swiper_content">
              <div class="banner_box">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                  <van-swipe-item class="banner1"></van-swipe-item>
                  <van-swipe-item class="banner2"></van-swipe-item>
                  <van-swipe-item class="banner3"></van-swipe-item>
                  <van-swipe-item class="banner4"></van-swipe-item>
                </van-swipe>
              </div>
            </div>
            <!-- 小图标 -->
            <div class="project_sort">
              <ul>
                <li class="sort_li" v-for="(item,index) in goods_res2" :key='index'>
                  <a class="sort_a" @click="subpage(item.sort_word)">
                    <img class="sort_img" :src="item.img_src" alt="">
                    <span class="sort_word">{{item.sort_word}}</span>
                  </a>
                </li>
              </ul>
            </div>
            <!-- 办公区域 -->
            <div class="device_content">
              <div class="device_body">
                <!-- 标题 -->
                <div class="device_top">
                  <div class="title_left">
                    <span class="line"></span>
                    <span class="device_word">办公设备</span>
                  </div>
                  <div class="title_right" @click="more">
                    <span class="more">更多</span>
                    <span class="more_icon"></span>
                  </div>
                </div>
                <!-- 内容 -->
                <div class="goods_list">
                    <ul id="dataList">
                      <li class="goods_li" v-for="(item,index) in goods_res" :key='index'>
                        <a @click="goods_detail">
                          <img class="goods_pic" to="/goods" :imgurl='item.img_src' src="/mobile_shop/static/main/default_image.png" />
                        </a>
                        <div class="goods_info">
                          <a @click="goods_detail" class="goods_word">{{item.goods_name}}</a>
                          <div class="goods_bottom">
                            <div class="goods_price">
                              <span class="s1">￥</span>
                              <span class="s2">{{item.goods_price}}</span>
                            </div>
                            <span class="goods_car"></span>
                          </div>
                        </div>
                      </li>
                    </ul>
                </div>
              </div>
            </div>
            <!-- 品牌 -->
            <div class="brand">
              <div class="brand_body">
                <ul class="brand_ul">
                  <li class="brand_li" v-for="(item,index) in goods_res3" :key="index">
                    <img class="brand_img" :src="item.img_src" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </div>
       <v-footer class="my_footer" :active='0'></v-footer>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VFooter from './ViewFooter'
import $ from 'jquery';
import request from '@/utils/request';
import { Toast } from 'vant';
import {stopScroll,allowScroll} from "@/utils/methods";
// 
import MescrollVue from 'mescroll.js/mescroll.vue';
import SceneMake from '@/views/subpage/SceneMake';
import SearchGoods from '@/views/components/SearchGoods';


export default {
  data() {
    return {
      images: [
        '@/assets/image/banner/banner.png',
        '@/assets/image/banner/banner2.png',
        '@/assets/image/banner/banner.png',
        '@/assets/image/banner/banner2.png',
      ],
      goods_seach:false,
      goods_res:[],
      goods_res2:[],
      goods_res3:[],
      
      list: [],
      loading: false,
      finished: false,
      // 
      mescrollUp: {
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 5 // 每页数据的数量
        },
        noMoreSize: 10, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // toTop: {
        //   src: '/mobile_shop/static/mescroll/mescroll-totop.png' // 回到顶部按钮的图片路径,支持网络图
        // },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: 'dataList', // 父布局的id;
          // icon: './static/mescroll/mescroll-empty.png', // 图标,支持网络图
          tip: '暂无相关数据~', // 提示
          // btntext: '去逛逛 >', // 按钮,默认""
          // btnClick () { // 点击按钮的回调,默认null
          //   alert('点击了按钮,具体逻辑自行实现')
          // }
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        },
        dataList: [], // 列表数据
      },
    }
  },
  methods:{
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      console.log(page);
      console.log(mescroll);
      // 模拟联网
      this.getListDataFromNet(page.num, page.size, (arr) => {
        // 如果是第一页需手动制空列表
        if (page.num === 1) this.dataList = []
        // 把请求到的数据添加到列表
        this.dataList = this.dataList.concat(arr)
        console.log(this.dataList);
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }, () => {
        // 联网异常,隐藏上拉和下拉的加载进度
        mescroll.endErr()
      })
    },
    getListDataFromNet (pageNum, pageSize, successCallback, errorCallback) {
      // 延时一秒,模拟联网
      setTimeout(() => {
        // axios.get("xxxxxx", {
        //   params: {
        //     num: page.num, //页码
        //     size: page.size //每页长度
        //   }
        // }).then((response)=> {
        var listData = []
        // pdType 全部商品0; 奶粉1; 图书2;
          // 全部商品 (模拟分页数据)
          for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
            // if (i === mockData.length) break
            // listData.push(mockData[i])
            console.log(55);
          }
        // 回调
        successCallback(listData)
        // }).catch((e)=> {
        //   //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        //   errorCallback&&errorCallback()
        // })
      }, 1000)
    },
    // 
    goodsAjax(){
      var src={
        'success':'true',
        'res':[
                {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
                'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
                'goods_price':'2112.00'},
                {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
                'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
                'goods_price':'2112.00'},
                {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
                'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
                'goods_price':'2112.00'},
                {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
                'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
                'goods_price':'2112.00'},
                {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
                'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
                'goods_price':'2112.00'},
                {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
                'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
                'goods_price':'2112.00'},
                {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
                'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
                'goods_price':'2112.00'},
                {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
                'goods_name':'联想 (Lenovo) K4-IML 14英寸笔记本电脑一年联想 (Lenovo) K4-IML 14英寸笔记本电脑一年',
                'goods_price':'2112.00'},
              ]
      }
      var json=JSON.stringify(src);
      var res=JSON.parse(json);
      this.goods_res=res.res;
    },
    goods_detail(){
      this.$router.push('/goods');
    },
    more(){
      console.log('更多');
    },
    search(){
      this.$refs.search_goods.search_goods_list=true;
    },
    subpage(val){
      if(val=='场景采购'){
        this.$refs.Subsite.scene_make=true;
      }else if(val=='解决方案'){
        this.$refs.Subsite.total_solution=true;
      }else if(val=='合作申请'){
        this.$refs.Subsite.application_coop=true;
      }else if(val=='关于我们'){
        this.$refs.Subsite.about_us=true;
      }
    }
  },
  mounted(){
    stopScroll();
    this.goodsAjax();
    // 品牌假数据
    // 商品列表假数据
    var src3={
      'success':'true',
      'res':[
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png'},
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png'},
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png'},
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png'},
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png'},
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png'},
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png'},
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png'},
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png'},
      ]
    }
    var json3=JSON.stringify(src3);
    var res3=JSON.parse(json3);
    this.goods_res3=res3.res;
    // 首页小图标假数据
    var src2={
      'success':'true',
      'res':[
            {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
              'sort_word':'场景采购'
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
              'sort_word':'解决方案'
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
              'sort_word':'合作申请'
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
              'sort_word':'关于我们'
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
              'sort_word':'福利专区'
              },
               {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
              'sort_word':'扶贫馆'
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
              'sort_word':'扶贫馆'
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
              'sort_word':'大大大大'
              },
      ]
    }
    var json2=JSON.stringify(src2);
    var res2=JSON.parse(json2);
    console.log(res2.res.length);
    var str={'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
              'sort_word':'更多'};
    if(res2.res.length>=8){
      res2.res.splice(7,0,str);
      var arr=res2.res.slice(0,8);
      this.goods_res2=arr;
      console.log(arr);
    }else{
      this.goods_res2=res2.res;
    }
    // 商品列表假数据
    
  },
  beforeDestroy(){
    allowScroll();
  },
  components: {
    VFooter,
    SearchGoods,
    MescrollVue,
    SceneMake,  //场景采购
  }
}
</script>

<style lang="scss" scoped>
  .main_emtirety{
    height: 100%;
    //搜索 
    .main_header{
      width:100%;
      height:80px;
      background:#fff;
      .header_top{
        padding-top:20px;
        margin-left:30px;
        margin-right:30px;
        height:60px;
        display:flex;
        justify-content:space-between;
        .header_pic{
          width:196px;
          height: 49px;
          background-image: url('../assets/image/logo/logo.png');
          background-size:100% 100%;
        }
        .header_search{
          width:454px;
          height:60px;
          background:rgba(246,246,246,1);
          border-radius:30px;
          line-height: 60px;
          .search_img{
            display: inline-block;
            width:30px;
            height:30px;
            margin-left:20px;
            vertical-align:middle;
            background-image: url('../assets/image/images/search/ferret.png');
            background-size:100% 100%;
          }
          .search_word{
            display: inline-block;
            color:#999;
            font-size:26px;
            margin-left:12px;
            vertical-align:middle;
          }
        }
      }
    }
    .scroll_lazy{
      position: absolute;
      top:100px;
      left:0;
      right:0;
      bottom:100px;
      .main_content{
        height:100%;
        overflow: hidden;
        // 轮播图
        .swiper_content{
          width:100%;
          height:300px;
          margin-bottom:50px;
          .banner_box{
            width:690px;
            height:300px;
            box-sizing:border-box;
            margin:0 auto;
            .my-swipe {
              .van-swipe-item {
                color: #fff;
                font-size: 20px;
                line-height: 300px;
                text-align: center;
                border-radius: 30px;
                &.banner1{
                  background-image: url('../assets/image/banner/banner.png');
                  background-size:100% 100%;
                  height: 300px;
                }
                &.banner2{
                  background-image: url('../assets/image/banner/banner2.png');
                  background-size:100% 100%;
                  height: 300px;
                }
                &.banner3{
                  background-image: url('../assets/image/banner/banner.png');
                  background-size:100% 100%;
                  height: 300px;
                }
                &.banner4{
                  background-image: url('../assets/image/banner/banner2.png');
                  background-size:100% 100%;
                  height: 300px;
                }
              }
            }
          }
        }
        // 项目分类
        .project_sort{
          height:auto;
          width:100%;
          ul{
            display: flex;
            flex-wrap:wrap;
            .sort_li{
              width:25%;
              height:134px;
              text-align: center;
              &:nth-child(n+5){
                margin-top:30px;
              }
              .sort_a{
                width:100%;
                height: 134px;
                display: inline-block;
                .sort_img{
                  display: block;
                  width:100px;
                  height:84px;
                  margin:0 auto;
                }
                .sort_word{
                  display: block;
                  font-size:26px;
                  color:#333;
                  line-height:25px;
                  margin-top:24px;
                }
              }
            }
          }
        }
        // 办公区域
        .device_content{
          width:100%;
          height: auto;
          margin-top:94px;
          .device_body{
            margin:0 30px;
            // 标题
            .device_top{
              height: 36px;
              line-height: 36px;
              display: flex;
              justify-content: space-between;
              .title_left{
                .device_word{
                  display: inline-block;
                  vertical-align: middle;
                  font-size:32px;
                  color:#333;
                  margin-left:20px;
                }
                .line{
                  width:8px;
                  height:36px;
                  background:#ff6501;
                  border-radius: 4px;
                  display:inline-block;
                  vertical-align: middle;
                  margin-bottom: 3px;
                }
              }
              .title_right{
                .more{
                  font-size:22px;
                  color:#999;
                  display: inline-block;
                  vertical-align: middle;
                  margin-right: 10px;
                }
                .more_icon{
                  display: inline-block;
                  vertical-align: middle;
                  background-image: url('../assets/image/images/main/more.png');
                  background-size:100% 100%;
                  width: 16px;
                  height:25px;
                }
              }
            }
            // 内容
            .goods_list{
              width:750px;
              height: auto;
              ul{
                &::after{
                  clear: both;
                  content:'';
                  display: block;
                }
                .goods_li{
                  width:340px;
                  height:450px;
                  box-shadow:0px 0px 21px 0px rgba(20,53,124,0.1);
                  border-radius:10px;
                  margin-right: 10px;
                  float: left;
                  margin-top:20px;
                  .goods_pic{
                    display: inline-block;
                    width:340px;
                    height:296px;
                  }
                  .goods_info{
                    .goods_word{
                      padding:0 20px;
                      color:#333;
                      font-size:26px;
                      display:-webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 2;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                    .goods_bottom{
                      margin-top:10px;
                      display:flex;
                      justify-content: space-between;
                      .goods_price{
                        display: inline-block;
                        color:#ff6501;
                        font-weight: bold;
                        margin-left:20px;
                        line-height: 36px;
                        .s1{
                          font-size: 14px;
                        }
                        .s2{
                          font-size: 22px;
                        }
                      }
                      .goods_car{
                        display: inline-block;
                        background-image:url('../assets/image/images/main/goods_car.png');
                        background-size:100% 100%;
                        width:36px;
                        height:36px;
                        margin-top:10px;
                        margin-right: 20px;
                      }
                    }
                  }
                }
              }
            }
          }
          
        }
        // 品牌
        .brand{
          clear: both;
          width:750px;
          height:104px;
          margin-top:12px;
          overflow: hidden;
          .brand_body{
            width:750px;
            margin: 0 0 0 30px;
            overflow-x: auto;
            .brand_ul{
              width: 2000px;
              height:114px;
              display:flex;
              .brand_li{
                width:200px;
                height:104px;
                margin-right: 20px;
                display: inline-block;
                box-shadow:0px 0px 21px 0px rgba(20,53,124,0.1);
                border-radius: 10px;
                .brand_img{
                  display: block;
                  width:160px;
                  height:64px;
                  margin:20px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>