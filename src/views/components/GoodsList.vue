<template>
  <!-- 搜索 -->
  <div class="main">
    <full-modal v-model="goods_screen_list" class="search_body">
      <template slot="header">
        <!-- 搜索 -->
        <div class="search_content">
          <div class="sort_search_box">
            <img class="ferret" src="@/assets/image/images/search/ferret.png" alt="" />
            <input @blur="onChange" @keydown="onSearchIcon2($event)" name="search_input" class="ferret_input" type="search" placeholder="搜索商品" />
            <img v-if="search_close" @click="close" class="search_close" src="@/assets/image/center/close_2.png" alt="" />
          </div>
          <div @click="cSearch" class="search_word">搜索</div>
        </div>
      </template>
      <template slot="body">
        <!-- 商品筛选 -->
        <div class="goods_list_entirety">
          <div class="goods_title">
            <!-- 销量 -->
            <div v-if="volume_s" class="sales" @click="volume('top')">
              <span class="sales_word">销量</span>
              <div class="sales_tip">
                <span class="top action"></span>
                <span class="bottom"></span>
              </div>
            </div>
            <div v-else class="sales" @click="volume('bottom')">
              <span class="sales_word">销量</span>
              <div class="sales_tip">
                <span class="top"></span>
                <span class="bottom action"></span>
              </div>
            </div>
            <!-- 价格 -->
            <div v-if="price_s" class="sales sales_box" @click="price('top')">
              <span class="sales_word">价格</span>
              <div class="sales_tip">
                <span class="top action"></span>
                <span class="bottom"></span>
              </div>
            </div>
            <div v-else class="sales sales_box" @click="price('bottom')">
              <span class="sales_word">价格</span>
              <div class="sales_tip">
                <span class="top"></span>
                <span class="bottom action"></span>
              </div>
            </div>
            <!-- 上架时间 -->
            <div v-if="time_s" class="sales sales_box" @click="goTime('top')">
              <span class="sales_word">上架时间</span>
              <div class="sales_tip">
                <span class="top action"></span>
                <span class="bottom"></span>
              </div>
            </div>
            <div v-else class="sales sales_box" @click="goTime('bottom')">
              <span class="sales_word">上架时间</span>
              <div class="sales_tip">
                <span class="top"></span>
                <span class="bottom action"></span>
              </div>
            </div>
            <div class="dress">
              <span class="dress_pic" :class="{one}" @click="change('one')"></span>
              <span class="dress_pic" :class="{two}" @click="change('two')"></span>
              <div class="dress_content" @click="dress">
                <span class="dress_word">筛选</span>
                <span class="dress_img"></span>
              </div>
            </div>
          </div>
          <div class="search_goods">
            <!-- body -->
            <div class="goods_content">
              <ul>
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="van_box">
                  <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                  >
                    <li v-for="(item,index) in goods_res" :key="index" :class="show_rank ? 'goods_li_one' : 'goods_li_two'"> 
                      <a class="goods_pic">
                        <div class="yx_autarky">
                          <span class="yx_word">一线自营</span>
                        </div>
                        <img v-lazy="item.img_src" alt="">
                      </a>
                      <div class="goods_info">
                        <a class="goods_word">{{item.goods_name}}</a>
                        <div class="goods_bottom">
                          <div class="goods_price">
                            <span class="s1">￥</span>
                            <span class="s2">{{item.goods_price}}</span>
                          </div>
                          <span class="goods_car"></span>
                        </div>
                      </div>
                    </li>
                  </van-list>
                </van-pull-refresh>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </full-modal>
    <!-- 筛选 -->
    <dress-goods ref="dress_goods"></dress-goods>
    <back-shapping class="back_shapping" v-if="goods_screen_list"></back-shapping>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import FullModal from '@/iYxdt/FullModal';
import BackShapping from '@/views/components/BackShapping';
import request from '@/utils/request';
import DressGoods from '@/views/components/DressGoods'
export default {
    data() {
      return {
        goods_screen_list:false,
        value: '',
        show_rank:true,
        one:'',
        two:true,
        goods_res:[],
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        search_close:false,
        volume_s:true,
        price_s:true,
        time_s:true,
      }
    },
    methods: {
      volume(val){
        if(val=='top'){
          this.volume_s=false;
          console.log('上');
        }else if(val=='bottom'){
          this.volume_s=true;
          console.log('下');
        }
      },
      price(val){
        if(val=='top'){
          this.price_s=false;
          console.log('上');
        }else if(val=='bottom'){
          this.price_s=true;
          console.log('下');
        }
      },
      goTime(val){
        if(val=='top'){
          this.time_s=false;
          console.log('上');
        }else if(val=='bottom'){
          this.time_s=true;
          console.log('下');
        }
      },
      close(){
        $('[name="search_input"]').val('');
        this.search_close=false;
      },
      onChange(){
        var val=$('.ferret_input').val();
        if(val==''){
          this.search_close=false;
        }
      },
      onLoad() {
        setTimeout(() => {
          if (this.refreshing) {
            this.refreshing = false;
          }
          
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          this.loading = false;

          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 1000);
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      cSearch(){
        var val=$('[name="search_input"]').val();
        this.onSearchIcon(val);
      },
      onSearchIcon(val){
        console.log(val);
        $('[name="search_input"]').val('');
      },
      onSearchIcon2(e){
        var val=$('[name="search_input"]').val();
        this.search_close=true;
        if(e.keyCode == 13){
          this.onSearchIcon(val);
          this.search_close=false;
        }
      },
      change(str){ //排版
        if(str=='one'){
          console.log(1);
          this.show_rank=false;
          this.one=true;
          this.two=false;
        }else if(str=='two'){
          console.log(2);
          this.show_rank=true;
          this.one=false;
          this.two=true;
        }
      },
      dress(){ //筛选
        this.$refs.dress_goods.show=true;
      },
    },
    mounted(){
      var src={
        'success':'true',
        'res':[
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'              
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'              
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'              
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'              
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-3.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'              
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'              
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-1.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'              
              },
              {'img_src':'https://b.yzcdn.cn/vant/sku/shoes-2.png',
                'goods_name':'联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑一联想 (Lenovo) K4-IML14英寸笔记本电脑一年电脑一年电脑一年电脑',
                'goods_price':'20012.00'              
              },
        ]
      }
      var json=JSON.stringify(src);
      var res=JSON.parse(json);
      this.goods_res=res.res;
    },
    components:{
      FullModal,
      BackShapping,
      DressGoods,
    }
}
</script>

<style lang="scss" scoped>
  // 搜索商品相关
  .main{
    margin:0 30px;
    position: relative;
    // 搜索
    .search_content{
      .sort_search_box{
        width:561px;
        height:60px;
        display:inline-block;
        background: #f6f6f6;
        border-radius:30px;
        vertical-align: middle;
        box-sizing: border-box;
        margin-left:27px;
        position: relative;
        .ferret{
          display: inline-block;
          position:absolute;
          width:30px;
          height:30px;
          left:20px;
          top: 15px;
        }
        .ferret_input{
          display: block;
          border: 0;
          border-radius: 30px;
          padding-top:4px;
          width:499px;
          height:60px;
          margin-left:62px;
          &::-webkit-search-cancel-button{
            -webkit-appearance: none;
          }
        }
        .search_close{
          display: inline-block;
          position:absolute;
          width:30px;
          height:30px;
          top:15px;
          right:20px;
        }
      }
      .search_word{
        position:absolute;
        display: inline-block;
        color:#333;
        font-size:26px;
        height:25px;
        line-height: 25px;
        top:32px;
        right:30px;
      }
    }
    // 商品列表
    .goods_list_entirety{
      .goods_title{
        position:absolute;
        top: 88px;
        z-index: 2;
        height:70px;
        line-height:70px;
        width:100%;
        background:#fff;
        .sales{
          display: inline-block;
          margin-left: 20px;
          height:70px;
          &.sales_box{
            margin-left:80px;
          }
          .sales_word{
            font-size:26px;
            color:#333;
            display: inline-block;
            vertical-align: middle;
            margin-right:10px;
          }
          .sales_tip{
            display: inline-flex;
            flex-direction: column;
            vertical-align: middle;
            margin-top:2px;
            .top{
              display: inline-block;
              background-image: url('../../assets/image/images/search/shang.png');
              background-size:100% 100%;
              width:10px;
              height:7px;
              margin-bottom:4px;
              &.action{
                background-image: url('../../assets/image/images/search/shang_hover.png');
              }
            }
            .bottom{
              display: inline-block;
              background-image: url('../../assets/image/images/search/xia.png');
              background-size:100% 100%;
              width:10px;
              height:7px;
              &.action{
                background-image: url('../../assets/image/images/search/xia_hover.png');
              }
            }
          }
        }
        .dress{
          display: inline-block;
          margin-left:73px;
          height:25px;
          .dress_pic{
            display: inline-block;
            background-image: url('../../assets/image/images/search/kapianshipailie.png');
            background-size:100% 100%;
            width:22px;
            height:22px;
            vertical-align: middle;
            margin-right: 20px;
            &.two{
              display: none;
            }
            &.one{
              display: none;
            }
          }
          .dress_content{
            display: inline-flex;
            vertical-align: middle;
            border-left:1Px solid #bfbfbf;
            height:25px;
            .dress_word{
              display: block;
              font-size: 26px;
              color:#333;
              font-weight: bold;
              margin-left:20px;
              height:25px;
              line-height: 25px;
            }
            .dress_img{
              margin-left:11px;
              display: inline-block;
              background-image: url('../../assets/image/images/search/huabanfuben.png');
              background-size:100% 100%;
              width:23px;
              height:22px;
            }
          }
        }
      }
      //
      .search_goods{
        width:100%;
        margin-top:70px;
        .goods_content{
          width:100%;
          height: auto;
          ul{
            margin: 0 30px;
            &::after{
              clear: both;
              content:'';
              display:block;
            }
            // 一行一个
            .goods_li_one{
              width: 100%;
              height:240px;
              display: flex;
              position: relative;
              margin-bottom:10px;
              .goods_pic{
                .yx_autarky{
                  width:120px;
                  height:40px;
                  background:#FF8F5D;
                  border-radius:10px 0px 10px 0px;
                  text-align: center;
                  line-height: 40px;
                  position:absolute;
                  top:0;
                  left:0;
                  .yx_word{
                    color:#fff;
                    font-size:20px;
                  }
                }
                img{
                  display: inline-block;
                  width:240px;
                  height:240px;
                  margin-right:20px;
                }
              }
              .goods_info{
                width: 423px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .goods_word{
                  margin-top:20px;
                  color:#333;
                  font-size:26px;
                  display:-webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .goods_bottom{
                  margin-bottom:20px;
                  display:flex;
                  justify-content: space-between;
                  .goods_price{
                    display: inline-block;
                    color:#ff6501;
                    font-weight: bold;
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
                    background-image:url('../../assets/image/images/main/goods_car.png');
                    margin-top:10px;
                    background-size:100% 100%;
                    width:36px;
                    height:36px;
                  }
                }
              }
            }
            // 一行二个
            .goods_li_two{
              position: relative;
              width:335px;
              height:450px;
              float: left;
              &:nth-child(2n-1){
                margin-right: 20px;
              }
              .goods_pic{
                .yx_autarky{
                  width:120px;
                  height:40px;
                  background:#FF8F5D;
                  border-radius:10px 0px 10px 0px;
                  text-align: center;
                  line-height: 40px;
                  position:absolute;
                  top:0;
                  left:0;
                  .yx_word{
                    color:#fff;
                    font-size:20px;
                  }
                }
                img{
                  display: inline-block;
                  width:335px;
                  height:296px;
                }
              }
              .goods_info{
                .goods_word{
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
                    background-image:url('../../assets/image/images/main/goods_car.png');
                    margin-top:10px;
                    background-size:100% 100%;
                    width:36px;
                    height:36px;
                  }
                }
              }
            }

          }
        }
      }
    }
    // 组件
    .back_shapping{
      position:absolute;
      right:30px;
      bottom:104px;
      z-index: 30;
    }
  }
</style>