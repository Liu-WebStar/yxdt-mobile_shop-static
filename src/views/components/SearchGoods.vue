<template>
  <div class="main">
    <goods-list ref="goods_seach"></goods-list>
    <full-modal v-model="search_goods_list">
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
        <!-- 热门搜索/历史搜索 -->
        <div>
          <div v-if='key_word' class="search_key">
            <!-- 热门搜索 -->
            <div class="hot_search">
              <div class="hot_word">热门搜索</div>
              <div class="hot_keyword">
                <ul>
                  <li @click="goodsList" class="action"><a href="#">办公文具</a></li>
                  <li @click="goodsList"><a href="#">办公文具</a></li>
                  <li @click="goodsList"><a href="#">办公文具</a></li>
                  <li @click="goodsList"><a href="#">办公文具</a></li>
                  <li @click="goodsList"><a href="#">办公文具</a></li>
                  <li @click="goodsList"><a href="#">办公文具</a></li>
                  <li @click="goodsList"><a href="#">办公文具</a></li>
                  <li @click="goodsList"><a href="#">办公文具</a></li>
                </ul>
              </div>
            </div>
            <!-- 历史搜索 -->
            <div class="history_search">
              <div class="history_word">
                <span class="h_word">历史搜索</span>
                <span class="del_pic" @click="del"></span>
              </div>
              <div class="history_keyword">
                <ul>
                  <li @click="goodsList" class="action"><span v-if="is_del" @click="dell" class="del_pic">x</span><a href="#">办公文具</a></li>
                  <li @click="goodsList"><span v-if="is_del" @click="dell" class="del_pic">x</span><a href="#">办公文具</a></li>
                  <li @click="goodsList"><span v-if="is_del" @click="dell" class="del_pic">x</span><a href="#">办公文具</a></li>
                  <li @click="goodsList"><span v-if="is_del" @click="dell" class="del_pic">x</span><a href="#">办公文具</a></li>
                  <li @click="goodsList"><span v-if="is_del" @click="dell" class="del_pic">x</span><a href="#">办公文具</a></li>
                  <li @click="goodsList"><span v-if="is_del" @click="dell" class="del_pic">x</span><a href="#">办公文具</a></li>
                  <li @click="goodsList"><span v-if="is_del" @click="dell" class="del_pic">x</span><a href="#">办公文具</a></li>
                  <li @click="goodsList"><span v-if="is_del" @click="dell" class="del_pic">x</span><a href="#">办公文具</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if='key_word2'>
            <div class="no_search">
              <span class="no_pic"></span>
              <span class="word1">未搜索到任何相关内容</span>
              <span class="word2">换个关键词试试吧~</span>
            </div>
          </div>
        </div>
      </template>
    </full-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import FullModal from '@/iYxdt/FullModal';
import GoodsList from '@/views/components/GoodsList';
import {stopScroll,allowScroll} from "@/utils/methods";

export default {
  data() {
    return {
      search_close:false,
      key_word:true,
      key_word2:false,
      search_goods_list:false,
      is_del:false,
    }
  },
  methods:{
    dell(){
      console.log('删除');
    },
    del(){
      console.log('清除');

    },
    goodsList(){
      this.$refs.goods_seach.goods_screen_list=true;
    },
    cSearch(){
      var val=$('.ferret_input').val();
      this.onSearchIcon(val);
    },
    onSearchIcon(val){
      console.log(val);
      $('[name="search_input"]').val('');
      this.$refs.goods_seach.goods_screen_list=true;
    },
    onSearchIcon2(e){
      var val=$('[name="search_input"]').val();
      this.search_close=true;
      if(e.keyCode == 13){
        this.onSearchIcon(val);
        this.search_close=false;
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
    }
  },
  created(){
    if(this.search_goods_list)  stopScroll();
    else  allowScroll();
  },
  components:{
    FullModal,
    GoodsList,
  }
}
</script>

<style lang="scss" scoped>
  .main{
    margin:0 30px;
    position:relative;
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
    // 热门/历史
    .search_key{
      margin:0 30px;
      .hot_search{
        .hot_word{
          font-size:30px;
          color:#343434;
          font-weight:bold;
        }
        .hot_keyword{
          margin-top:30px;
          ul{
            display:flex;
            flex-wrap: wrap;
            li{
              background:#f6f6f6;
              height:50px;
              line-height: 50px;
              border-radius: 24px;
              margin-right:20px;
              &:nth-child(n+5){
                margin-top:20px;
              }
              &.action{
                background:#FF6501;
                a{
                  color:#fff;
                }
              }
              a{
                display: block;
                padding:0 20px;
                font-size:24px;
                color:#666;
              }
            }
          }
        }
      }
      .history_search{
        margin-top:72px;
        .history_word{
          display: flex;
          justify-content: space-between;
          .h_word{
            font-size:30px;
            color:#343434;
            font-weight: bold;
            display: inline-block;
            vertical-align: middle;
          }
          .del_pic{
            display: inline-block;
            background-image: url('../../assets/image/images/search/shanchu .png');
            background-size:100% 100%;
            width:27px;
            height:30px;
            vertical-align: middle;
          }
        }
        .history_keyword{
          margin-top:42px;
          ul{
            display:flex;
            flex-wrap: wrap;
            li{
              border-radius: 24px;
              height:50px;
              line-height: 50px;
              background:#f6f6f6;
              margin-right:20px;
              position:relative;
              &:nth-child(n+5){
                margin-top:20px;
              }
              &.action{
                background:#FF6501;
                a{
                  color:#fff;
                }
              }
              .del_pic{
                display: inline-block;
                font-size:20px;
                height:20px;
                line-height: 20px;
                position:absolute;
                top:0;
                right:0;
              }
              a{
                display:block;
                font-size:24px;
                color:#666;
                padding:0 20px;
              }
            }
          }
        }
      }
    }
    .no_search{
      width:300px;
      text-align: center;
      margin: 0 auto;
      margin-top:calc((100Vh - 88px)/4);
      .no_pic{
        display:inline-block;
        background-image: url('../../assets/image/images/search/no_search.png');
        background-size:100% 100%;
        width:300px;
        height:300px;
      }
      .word1{
        font-size:24px;
        color:#999;
        display: block;
      }
      .word2{
        font-size:24px;
        color:#666;
        display:block;
        margin-top:22px;
      }
    }
  }

</style>