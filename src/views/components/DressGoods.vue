<template>
  <div>
    <div class="dress_panel">
      <div class="dress_shade" :style="{left:show ? '0%' : '100%'}">
        <div class="dress_body" :style="{left:show ? '1.14667rem' : '100%'}">
          <div class="dress_body_content">
            <!-- 品牌 -->
            <div class="brank_father">
              <div class="brank">品牌</div>
              <div class="brank_title">
                <ul>
                  <li class="brank_li active">
                    <a href="#" class="brank_a">
                      <span class="brank_span">外星人ALIENWARE</span>
                    </a>
                  </li>
                  <li class="brank_li">
                    <a href="#" class="brank_a">
                      <span class="brank_span">外星人ALIENWARE</span>
                    </a>
                  </li>
                  <li class="brank_li">
                    <a href="#" class="brank_a">
                      <span class="brank_span">外星人ALIENWARE</span>
                    </a>
                  </li>
                  <li class="brank_li">
                    <a href="#" class="brank_a">
                      <span class="brank_span">外星人ALIENWARE</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 分类 -->
            <div class="sort_father">
              <div class="sort">分类</div>
                <div class="sort_title">
                  <ul>
                    <li class="sort_li active">
                      <a href="#" class="sort_a">
                        <span class="sort_span">便携式计算机</span>
                      </a>
                    </li>
                    <li class="sort_li">
                      <a href="#" class="sort_a">
                        <span class="sort_span">台式一体机</span>
                      </a>
                    </li>
                    <li class="sort_li">
                      <a href="#" class="sort_a">
                        <span class="sort_span">笔记本电脑</span>
                      </a>
                    </li>
                    <li class="sort_li">
                      <a href="#" class="sort_a">
                        <span class="sort_span">便携式计算机</span>
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
            <!--价格 -->
            <div class="price_father">
              <div class="price">价格</div>
                <div class="price_title">
                  <ul>
                    <li class="price_li active">
                      <a href="#" class="price_a">
                        <span class="price_span">0-2000</span>
                      </a>
                    </li>
                    <li class="price_li">
                      <a href="#" class="price_a">
                        <span class="price_span">2000-4000</span>
                      </a>
                    </li>
                    <li class="price_li">
                      <a href="#" class="price_a">
                        <span class="price_span">4000-6000</span>
                      </a>
                    </li>
                    <li class="price_li">
                      <a href="#" class="price_a">
                        <span class="price_span">12000-15000</span>
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
            <!-- 按钮 -->
            <div class="btn">
              <a class="btn1 res" @click="reset">
                <span>重置</span>
              </a>
              <a class="btn1 define" @click='define'>
                <span>确定</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:false,
    }
  },
  methods:{
    reset(){
      console.log('重置');
    },
    define(){ //确定
      this.show=false;
    }
  },
  components:{
  }
}
</script>

<style lang="scss" scoped>
  .dress_panel{
    .dress_shade{
      transition: left 0.2s ease-in-out;
      position:absolute;
      top:0;
      left:100%;
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.6);
      box-sizing: border-box;
      z-index: 20;
      .dress_body{
        transition: left 0.2s ease-in-out;
        position:absolute;
        top:0;
        left:86px;
        bottom:0;
        right:0;
        width:100%;
        height:100%;
        background:#fff;
        z-index: 21;
        .dress_body_content{
          width:100%;
          height:100%;
          margin:0 30px;
          position:relative;
          overflow-y:scroll;
          // 品牌
          .brank_father{
            margin-top:30px;
            .brank{
              font-size:26px;
              color:#333;
              font-weight:bold;
            }
            .brank_title{
              ul{
                display: flex;
                flex-wrap: wrap;
                .brank_li{
                  width:188px;
                  height:64px;
                  margin-right:20px;
                  background:#f6f6f6;
                  border-radius: 32px;
                  text-align: center;
                  margin-top:30px;
                  &.active{
                    border:2px solid #FF6901;
                    background:#FFE8D8;
                    .brank_a{
                      .brank_span{
                        color:#FF6901;
                      }
                    }
                  }
                  .brank_a{
                    display:block;
                    .brank_span{
                      display: block;
                      color:#666;
                      font-size:20px;
                    }
                  }
                }
              }
            }
          }
          // 分类
          .sort_father{
            .sort{
              font-size:26px;
              color:#333;
              font-weight:bold;
              margin-top:60px;
            }
            .sort_title{
              ul{
                display: flex;
                flex-wrap: wrap;
                .sort_li{
                  width:188px;
                  height:64px;
                  line-height:64px;
                  margin-right:20px;
                  background:#f6f6f6;
                  border-radius: 32px;
                  text-align: center;
                  margin-top:30px;
                  &:nth-child(n+4){
                    margin-top:20px;
                  }
                  &.active{
                    border:2px solid #FF6901;
                    background:#FFE8D8;
                    .sort_a{
                      .sort_span{
                        color:#FF6901;
                      }
                    }
                  }
                  .sort_a{
                    display:block;
                    .sort_span{
                      display: block;
                      color:#666;
                      font-size:20px;
                    }
                  }
                }
              }
            }
          }
          // 价格
          .price_father{
            .price{
              font-size:26px;
              color:#333;
              font-weight:bold;
              margin-top:60px;
            }
            .price_title{
              ul{
                display: flex;
                flex-wrap: wrap;
                .price_li{
                  width:188px;
                  height:64px;
                  line-height:64px;
                  margin-right:20px;
                  background:#f6f6f6;
                  border-radius: 32px;
                  text-align: center;
                  margin-top:30px;
                  &:nth-child(n+4){
                    margin-top:20px;
                  }
                  &.active{
                    border:2px solid #FF6901;
                    background:#FFE8D8;
                    .price_a{
                      .price_span{
                        color:#FF6901;
                      }
                    }
                  }
                  .price_a{
                    display:block;
                    .price_span{
                      display: block;
                      color:#666;
                      font-size:20px;
                    }
                  }
                }
              }
            }
          }
          // 按钮
          .btn{
            position:absolute;
            bottom:30px;
            .btn1{
              display: inline-block;
              width:282px;
              height:76px;
              border-radius: 38px;
              border:2px solid #ccc;
              text-align: center;
              line-height: 76px;
              span{
                font-size:30px;
              }
              &.res{
                margin-right:40px;
                span{
                  color:#333;
                }
              }
              &.define{
                background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
                box-shadow:0px 4px 12px 0px rgba(254,121,37,0.4);
                span{
                  color:#fff;
                }
              }
            }
          }
        }
      }
    }
  }
</style>