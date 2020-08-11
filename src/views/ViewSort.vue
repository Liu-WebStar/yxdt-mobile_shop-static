<template>
  <div class='sort_container'>
    <div class="sort_body">
      <!-- 搜索 -->
      <div class="sort_search">
        <div class="sort_search_top">
          <div class="sort_search_pic">
            <img src="@/assets/image/images/search/fanhui.png" alt="">
          </div>
          <div class="sort_search_box">
            <img class="ferret" src="@/assets/image/images/search/ferret.png" alt="">
            <input @keydown="onSearchIcon2($event)" class="ferret_input" type="search" placeholder="搜索商品">
          </div>
        </div>
      </div>
      <!-- 选项栏 -->
      <div class="sort_content">
        <!-- 左边 -->
        <div class="sort_left" ref='sort_left'>
          <ul class='first_type' v-for="(item,index) in first_type" :key='index'>
            <li class='items' :class='{active:index == tab_index}' @touchstart='change_type(index,item.id)'>
              <div class="items_div">
                <span class="items_line"></span>
                <span class="items_word">{{item.type}}</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 右边 -->
        <div class="sort_right" >
          <div v-for="(item,index) in second_type" :key='index'>
            <div class="title">{{item.Title}}</div>
            <div class="title_item">
              <ul class="title_ul">
                <li class="title_li">
                  <a class="title_a" @touchstart='goods_detail'>{{item.Title_item}}</a>
                </li>
                <li class="title_li">
                  <a class="title_a" @touchstart='goods_detail'>{{item.Title_item}}</a>
                </li>
                <li class="title_li">
                  <a class="title_a" @touchstart='goods_detail()'>{{item.Title_item}}</a>
                </li>
                <li class="title_li">
                  <a class="title_a" @touchstart='goods_detail()'>{{item.Title_item}}</a>
                </li>
                <li class="title_li">
                  <a class="title_a" @touchstart='goods_detail()'>{{item.Title_item}}</a>
                </li>
                <li class="title_li">
                  <a class="title_a" @touchstart='goods_detail()'>{{item.Title_item}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <goods-list ref='goods_list'></goods-list>
    <v-footer :active='1'></v-footer>
  </div>
</template>

<script>
import $ from 'jquery';
import request from "@/utils/request";
import {stopScroll,allowScroll} from "@/utils/methods";
// 
import VFooter from '@/views/ViewFooter';
import GoodsList from '@/views/components/GoodsList';

export default {
  data() {
    return {
      tab_index:0,
      first_type:[],
      second_type:[],
      id:0,
    }
  },
  methods:{
    onSearchIcon(val){
      console.log(val);
      $('.ferret_input').val('');
      this.$refs.goods_list.goods_screen_list=true;
    },
    onSearchIcon2(e){
      if(e.keyCode == 13){
        var val=$('.ferret_input').val();
        this.onSearchIcon(val);
      }
    },
    change_type(index,id){
      this.tab_index = index;
      this.id = id;
      this.getData2(this.id)
    },
    getData(){
       request.post("http://mengxuegu.com:7300/mock/5f055842baa97b36f53efdd9/example/first-type").then(res => {
       if(res.data){
         this.first_type = res.data.result;
       }
      });
      
    },
    getData2(id){
      request.post("http://mengxuegu.com:7300/mock/5f055842baa97b36f53efdd9/example/types",'id=1').then(res => {
        console.log(res);
        this.second_type = res.data.result;
      });
    },
    goods_detail(){
      this.$router.push('/goods');
    }
  },
  created(){
    this.getData();
    this.getData2();
    console.log(window.screen.availHeight);
  },
  mounted(){
     var a = this.$refs.sort_left.offsetHeight
     console.log(a)
     this.$refs.goods_list.back_shapping=false;
     stopScroll();;
  },
  destroyed(){
    allowScroll();;
  },
  components:{
    VFooter,
    GoodsList
  }
}
</script>

<style lang="scss" scoped>
  .sort_container{
    .sort_body{
      // 搜索
      .sort_search{
        position:absolute;
        z-index: 1;
        top: 0;
        width:750px;
        height:88px;
        background: #fff;
        .sort_search_top{
          margin-left:27px;
          margin-right:30px;
          height:88px;
          background:#fff;
          // 返回图片
          .sort_search_pic{
            display: inline-block;
            vertical-align: middle;
            width:25px;
            height:40px;
            background:#fff;
            margin-top:12px;
            img{
              display:block;
              width:25px;
              height:40px;
            }
          }
          // 搜索框
          .sort_search_box{
            width:641px;
            height:60px;
            display:inline-block;
            background: #f6f6f6;
            border-radius:30px;
            vertical-align: middle;
            box-sizing: border-box;
            margin-left:27px;
            position: relative;
            margin-top:14px;
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
              width:579px;
              height:60px;
              margin-left:62px;
              border-radius: 30px;
              &::-webkit-search-cancel-button{
                -webkit-appearance: none;
              }
            }
          }
        }
      }
      // 选项栏
      .sort_content{
        display: flex;
        background:#f8f8f8;
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 130px;
        .sort_left{
          width: 180px;
          flex-shrink: 0;
          overflow-y: auto;
          .first_type{
            width:180px;
            .items{
              text-align: center;
              font-size:26px;
              font-weight:400;
              color:#333333;
              height: 25px;
              line-height: 25px;
              background:#fff;
              padding-top:30px;
              padding-bottom: 30px;
              position: relative;
              &.active{
                font-weight:bold;
                font-size:30px;
                background:#f8f8f8;
                .items_div{
                  .items_line{
                    display: inline-block;
                    position: absolute;
                    left:0;
                    top:30px;
                    width:8px;
                    height:30px;
                    background:#FF6501;
                  }
                  .items_word{
                    height: 30px;
                    line-height: 30px;
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
        .sort_right{
          flex: 1;
          background: #f8f8f8;
          margin-right:30px;
          margin-left:20px;
          overflow-y: auto;
          .title{
            color: #333333;
            font-size:24px;
            font-weight:600;
            height: 24px;
            line-height: 24px;
            margin-top:40px;
            width: 100%;
          }
          .title_item{
            .title_ul{
              font-size:0;
              .title_li{
                display: inline-block;
                height:50px;
                line-height: 50px;
                margin-top: 20px;
                .title_a{
                  display: block;
                  background:white;
                  border-radius:24px;
                  margin-right: 20px;
                  text-align: center;
                  line-height: 50px;
                  color: #666666;
                  font-weight:400;
                  padding: 14px 20px;
                  font-size:24px;
                  height: 23px;
                  line-height: 23px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>