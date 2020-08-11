<template>
    <div class="search_goods">
      <div class="input_search">
        <div class="arr_left"><van-icon name="arrow-left" /></div>
        <div class="arr_ct">
          <input type="text">
          <span class='close'>x</span>
        </div>
        <div class="arr_right">搜索</div>
      </div>
      <div class="search_header">
        <div class="find"></div>
        <div class="list">
          <ul class='ul'>
            <li>
              <span class='num active'>销量</span>
              <div class='arrow'>
                <div class="top active"><van-icon name="arrow-up" /></div >
                <div  class="bottom"><van-icon name="arrow-down" /></div>
              </div>
            </li>
            <li>
              <span class='num'>价格</span> 
              <div class='arrow'>
                <div class="top"><van-icon name="arrow-up" /></div >
                <div  class="bottom"><van-icon name="arrow-down" /></div>
              </div>
            </li>
            <li>
              <span class='num'>上架时间</span>
              <div class='arrow'>
                <div class="top"><van-icon name="arrow-up" /></div >
                <div class="bottom"><van-icon name="arrow-down" /></div>
              </div>
            </li>
          </ul>
          <div @click='filter' class='filter'>筛选</div>
        </div>
      </div>
      <div class="search_container">
        <div class="images">
          <div class="text">
            <span class="yxzy">一线自营</span>
          </div>
        </div>
        <div class="desc">
          <div class="word">一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营</div>
          <div class="add">
            <span class='price'>¥22222</span>
            <span class='icon'><van-icon name="cart-o" /></span>
          </div>
        </div>
      </div>
       <div class="search_container">
        <div class="images">
          <div class="text">
            <span class="yxzy">一线自营</span>
          </div>
        </div>
        <div class="desc">
          <div class="word">一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营</div>
          <div class="add">
            <span class='price'>¥22222</span>
            <span class='icon'><van-icon name="cart-o" /></span>
          </div>
        </div>
      </div>
       <div class="search_container">
        <div class="images">
          <div class="text">
            <span class="yxzy">一线自营</span>
          </div>
        </div>
        <div class="desc">
          <div class="word">一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营</div>
          <div class="add">
            <span class='price'>¥22222</span>
            <span class='icon'><van-icon name="cart-o" /></span>
          </div>
        </div>
      </div>
       <div class="search_container">
        <div class="images">
          <div class="text">
            <span class="yxzy">一线自营</span>
          </div>
        </div>
        <div class="desc">
          <div class="word">一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营一线自营</div>
          <div class="add">
            <span class='price'>¥22222</span>
            <span class='icon'><van-icon name="cart-o" /></span>
          </div>
        </div>
      </div>
      <!-- 右侧弹出筛选条件 -->
      <van-popup v-model="filter_search" position="right" class='right_model'>
         <div class="pd10">
            <div class="types">
              品牌
            </div>
            <div class="items">
              <span>fffffff</span>
              <span>fffffff</span>
              <span>ffffddddddddddddddd ddddd f</span>
            </div>
         </div>
         <div class="pd10">
            <div class="types">
              品牌
            </div>
            <div class="items">
              <span>fffffff</span>
              <span>fffffff</span>
              <span>ffffddddddddddddddd d fff</span>
            </div>
         </div>
         <div class="pd10">
            <div class="types">
              品牌
            </div>
            <div class="items">
              <span>fffffff</span>
              <span>fffffff</span>
              <span>fcccccccccccccccc</span>
            </div>
         </div>
         <div class="reset">
           <span>重置</span>
           <span class='confrim'>确定</span>
         </div>
      </van-popup>
    </div>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';

Vue.use(Popup);
export default {
  data() {
    return {
     filter_search:false
    }
  },
  methods:{
    filter(){
      this.filter_search = true
    }
   
  },
  mounted(){
   
  }
}
</script>

<style lang="scss" scoped>
  .search_goods{
    position: relative;
    .input_search{
      display: flex;
      height: 88px;
      .arr_left{
        width: 79px;
        height: 100%;
        text-align: center;
        line-height: 78px;
      }
      .arr_ct{
        position: relative;
        flex: 1;
        margin: 14px 0px;
        background:rgba(246,246,246,1);
        input{
          width: 100%;
          height: 100%;
          outline: none;
          border-radius:30px;
        }
        .close{
          position: absolute;
          right: 20px;
          top: 20px;
          color: red;
        }
      }
      .arr_right{
        width: 110px;
        height: 100%;
        line-height: 78px;
        text-align: center;
        color: #666666;
        font-size:26px
      }
    }
    .search_header{
      .list{
        height: 70px;
        line-height: 70px;
        display: flex;
        ul{
          display: flex;
          height: 100%;
          li{
            display: flex;
            text-align: center;
            padding-left: 50px;
            .num{
              font-size:26px;
              font-weight:400;
              color: #333333;
              &.active{
                font-weight: 500;
                border-bottom: 2px solid #FF6501;
              }
            }
            .arrow{
              height: 100%;
              margin-left: 10px;
              .top,.bottom{
                height: 36px;
                font-size: 12px;
                line-height: 57px;
                &.active{
                  color: #FF6501;
                }
              }
              .bottom{
                line-height: 2px;
              }
            }
          }
        }
        .filter{
          flex: 1;
          text-align: right;
          font-size: 26px;
          padding-right: 30px;
        }
      }
    }
    .search_container{
      padding:10px 30px;
      background:white;
      margin-bottom: 20px;
      display: flex;
      .images{
        width:240px;
        flex-shrink: 0;
        height: 240px;
        background: red;
        position: relative;
        margin-right: 30px;
        .yxzy{
          position: absolute;
          width: 90px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: white;
          font-size:20px;
          left: 0px;
          top: 1Px;
          background: #FF8F5D;
          border-radius:10px 0px 10px 0px;
        }
      }
      .desc{
        flex: 1;
        .word{
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:36px;
          height: 64px;
          margin: 20px 0px;
          margin-bottom: 116px;
          overflow: hidden;
          word-break: break-all;
          word-wrap: break-word;
          white-space: unset;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .add{
          display: flex;
          .price{
            flex: 1;
            font-size:22px;
            font-weight:bold;
            color:rgba(255,105,1,1);
          }
         .icon{
            width: 36px;
            height: 36px;
            display: inline-block;
          }
        }
      }
    }
    .right_model{
      width: 664px;
      height: 100%;
      .pd10{
        padding:0px 10px;
        .types{
          height: 87px;
          line-height: 87px;
          padding-left: 20px;
          font-weight:600;
          color:rgba(51,51,51,1)
        }
        .items{
          width: 645px;
          display: flex;
          span{
            width: 188px;
            height: 64px;
            background:rgba(246,246,246,1);
            border-radius:32px;
            color: #666;
            font-size:20px;
            display:flex;
            flex-wrap:wrap;
            justify-content: center;
            align-items: center;
            margin: 0px 0px 20px 20px;
          }
        }
      }
      .reset{
        padding: 30px;
        height: 76px;
        position: absolute;
        bottom: 0px;
        span{
          width: 278px;
          line-height: 76px;
          text-align: center;
          border:2px solid rgba(204,204,204,1);
          border-radius:38px;
          font-size:30px;
          font-weight:400;
          background: white;
          display: inline-block;
          color:#333333;
          margin-right:40px;
          &.confrim{
            background: linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
            box-shadow:0px 4px 12px 0px rgba(254,121,37,0.4);
            color: white;
            margin-right: 0px;
          }
        }
      }
    }
  }
</style>