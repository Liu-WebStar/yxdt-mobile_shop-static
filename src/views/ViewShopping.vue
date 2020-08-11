<template>
  <div class='goods_container'>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          
          <div class="shoping1">
            <div class="swipper">
              <!-- 顶部悬浮栏 -->
              <div class="top" v-show='tab_header'>
                  <div @click="goBack" class='top_re'><van-icon color="#666666" name="arrow-left" /></div>
                  <ul class='ul_header'>
                    <li @touchstart='change_li'><span class='active' >商品</span></li>
                    <li @click="goDetail"><span>详情</span></li>
                    <li @click="all_comment"><span>评价</span></li>
                    <li @click='change_cs'><span>参数</span></li>
                  </ul>
              </div>
              <div class="go_top" v-show='tab_header' @click="go_top"></div>
              <!-- 顶部左右按钮 -->
              <div class="return" @click="history"></div>
              <div class="share" @click="share"></div>
              <!-- 轮播图组件 -->
              <van-swipe :autoplay="3000"  @change="onChange">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                  <img v-lazy="image" />
                </van-swipe-item>
                <template #indicator>
                  <div class="custom-indicator">
                    {{ current + 1 }}/5
                  </div>
                </template> 
              </van-swipe>
            </div>
            <div class="pd30">
                <div class="login_price">
                  <div class='de_price'>
                    <div class="price_left">
                      <span class='sheep'>￥</span>
                      <span class='perice'>168.00</span>
                    </div>
                  </div>
                  <div class='lg_price'><span class='check'>登录后查看会员价</span><van-icon name="arrow" /></div>
                </div>
                <div class="goods_detail">
                  登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价登录后查看会员价
                </div>
                <div class="code">
                  <span class='bm'>商品编码: YXYZ1078771</span><span>商品货号:YXYZ1078771</span>
                </div>
                <div class="collect">
                  <div class='love' @click="c_love">
                    <span class="store_up" :class="store_up ? 'loves':'loves2'"></span>
                    <span :class="store_up ? 'store_g':'store_r'">{{store_word}}</span>
                  </div>
                  <div class='col'>销量20件</div>
                </div>
            </div>
            <div class="line20"></div>
            <div class="num">
              <div class='r_m'>
                  <span class='all_num'>数量</span>
                  <span @click="cut" class='reduce'>-</span>
                  <input type="text" v-number class="buys" v-model="quantity">
                  <span @click="add" class='medium'>+</span>
              </div>
              <div class="add_num" @click='buy_more'>
                <span class="buy_lot">批量购买</span>
                <span class="buy_right"></span>
              </div>
            </div>
            <div class="line20"></div>
            <div class="serve">
              <div class="address" @click='send_to'>
                <span class='send_to'>送至</span>
                <div class='target_add'>
                  <div class='ellipsis'>北京 北京市 昌平区 一堆地址一堆地址一堆一堆地址一堆一堆地址一堆</div>
                  <div v-if="is_stock" class='confirm_num'>有货</div>
                  <div v-else class='confirm_num_no'>
                    <span class='tips'></span>
                    <span class="no_goods">暂时无货</span>
                  </div>
                </div>
              </div>
              <div class="f_tips">
                <span class='send_to'>服务</span>
                <div class='good_serve'>
                  <div class='yxdt'>由“一线达通”销售并提供售后服务</div>
                  <div class='ten'>
                    <span class='back'></span>
                    <span>十天无理由退货</span>
                    <span class='change'></span>
                    <span>二十天无理由换货</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 用户评论 -->
            <div class="line20"></div>  
            <div class="comment" @click="all_comment">
              <div class="user_comment">
                <div class="all_com">
                  <span class="com_line"></span>
                  <span class="com_s1">用户评价</span>
                  <span class="com_s2">(120)条</span>
                </div>
                <div class="check_com">
                  <span class="look_com">查看全部评价</span>
                  <span class="look_r"></span>
                </div>
              </div>
              <div class="com_desc">
                <div class="head_top">
                  <div class="head_left">
                    <div class='imgs'></div>
                    <div class="level">
                      <div class="name">罗伯特</div>
                      <div class="star">
                        <van-rate
                          v-model="value"
                          :size="12"
                          color="#ffd21e"
                          void-icon="star"
                          void-color="#FF6501"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="date">2020-5-29</div>
                </div>
                <div class="text">非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常</div>
              </div>
            </div>
            <!-- 规格参数 -->
            <div class="line20"></div>  
            <div class="data_all" @click='change_cs'>
              <div class="user_comment">
                <div class="all_com">
                  <span class="com_line"></span>
                  <span class="com_s1">规格参数</span>
                </div>
                <div class="check_com">
                  <span class="look_com">查看全部参数</span>
                  <span class="look_r"></span>
                </div>
              </div>
              <div class="data_type">
                <div class="brand">
                  <span class='type_all'>品牌</span>
                  <span class='type_details'>大幅度的</span>
                </div>
                <div class="brand">
                  <span class='type_all'>品牌</span>
                  <span class='type_details'>幅度达到</span>
                </div>
                <div class="brand">
                  <span class='type_all'>品牌</span>
                  <span class='type_details'>试试试</span>
                </div>
                <div class="brand">
                  <span class='type_all'>品牌</span>
                  <span class='type_details'>ddd</span>
                </div>
              </div>
            </div>
            <!-- 商品详情 -->
            <div class="line20"></div> 
            <div id="anchor" class="details" :class="{no_goods}">
              <div class="user_comment">
                <div class="all_com">
                  <span class="com_line"></span>
                  <span class="com_s1">商品详情</span>
                </div>
              </div>
              <div class="image_all">
                <div><img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt=""></div>
                <div><img src="https://img.yzcdn.cn/vant/apple-2.jpg" alt=""></div>
                <div><img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt=""></div>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      <div class="no_num" v-if="no_goods">
        所选区域暂时无货,请确认送货地址或看看其他商品吧
      </div>
      <div class="bottom">
        <div class="home" @click="jump('首页')">
            <div class='index'></div>
            <div class='shopping_car'>首页</div>
        </div>
        <div class="cart" @click="jump('购物车')">
          <div class='no_cart'></div>
          <div class='shopping_car'>购物车</div>
        </div>
        <div class="btn">
          <span @click="joinCar" :class="{disabled:no_goods}" class="btn1 add_cart">加入购物车</span>
          <span @click="nowBuy" :class="{disabled:no_goods}" class="btn1 buy_now">立即购买</span>
        </div>
      </div>
      <!-- 快捷输入购买数量弹框 -->
      <van-popup v-model="qucik_buy" round position="bottom">
        <div class="van_popup">
          <div class="popup_body">
            <div class='popup'>
              <span class='write'>快捷输入购买数量</span>
              <span class='close'  @click="close_num"></span>
            </div>
            <div class="tab_num">
                <input type="text" placeholder="输入购买数量" :class="{input_f:input_focus}" class="num_value"  @focus='input_f'>
            </div>
            <div class='check_all'>
              <span class="cancel" @click="close_num">取消</span>
              <span class='yes' @click="define">确定</span>
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 参数弹框 -->
      <van-popup v-model="parametric" class='parametric'  position="bottom" >
        <div class="header">
          <span class='all'>查看全部参数</span>
          <span class='close' @click="close_cs"></span>
        </div>
        <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
         <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div> <div class="items">
          <div class='item_all'>
            <span class='item_left'>dddd</span>
            <span class='item_right'>fffffffff</span>
          </div>
        </div>
      </van-popup>
      <!-- 送至弹框 -->
      <van-popup v-model="send_address" class='send_address'  position="bottom" >
        <div class="header">
          <span class='all'>选择地区</span>
          <span class='close' @click='close_area'></span>
        </div>
        <div class="usually">
          <div class="h3">常用地址</div>
          <div class="text">北京大 京大兴北 大兴京大兴北京大兴北京大兴北京大兴北京大兴</div>
        </div>
        <van-area
          :area-list="areaList"
          :columns-placeholder="['请选择', '请选择', '请选择']"
           value="110101"
        />
      </van-popup>
      <!-- 分享弹框 -->
     <van-share-sheet
        v-model="showShare"
        title="分享到"
        :options="options"
        @select="onSelect"
      />
    
    <!-- 全部评论 -->
    <full-modal ref="user_d" v-model="user_discuss" class="user_dis">
      <template slot="header">
        <div class="dis_nav">
          <ul class="dis_nav_ul">
            <li class="dis_nav_li action">
              <span class="dis_s1">全部</span>
            </li>
            <li class="dis_nav_li">
              <span class="dis_s1">好评</span>
              <span class="dis_s2">(20)</span>
            </li>
            <li class="dis_nav_li">
              <span class="dis_s1">中评</span>
              <span class="dis_s2">(20)</span>
            </li>
            <li class="dis_nav_li">
              <span class="dis_s1">差评</span>
              <span class="dis_s2">(20)</span>
            </li>
          </ul>
        </div>
      </template>
      <template slot="body">
        <div class="comment_body">
          <ul class="round_ul" :style="{transform:'translateX(-' + index * 100 + '%)'}">
            <!-- 全部 -->
            <li class="round_li" :style="index==0 ? 'opacity:1':'opacity:0'">
              <ul class="comment_ul">
                <li class="comment_li" v-for="(item,index) in goods_res" :key='index'>
                  <div class="com_desc">
                    <div class="head_top">
                      <div class="head_left">
                        <div class='imgs'></div>
                        <div class="level">
                          <div class="name">{{item.user_name}}</div>
                          <div class="star">
                            <van-rate
                              v-model="value"
                              :size="12"
                              color="#ffd21e"
                              void-icon="star"
                              void-color="#FF6501"
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div class="date">{{item.user_time}}</div>
                    </div>
                    <div class="text">
                      <span class="text_word" :class="text_s1? 's1':''">{{item.user_info}}</span>
                      <div class="comment_btn" @click="change_b(develop)">
                        <span class="change_com">{{develop}}</span>
                        <span class="change_bot" :class="text_s1? 's1':'s2'"></span>
                      </div>
                      </div>
                  </div>
                </li>
              </ul>
            </li>
            <!-- 好评 -->
            <li class="round_li" :style="index==1 ? 'opacity:1':'opacity:0'">
              <ul class="comment_ul">
                <li class="comment_li" v-for="(item,index) in goods_res" :key='index'>
                  <div class="com_desc">
                    <div class="head_top">
                      <div class="head_left">
                        <div class='imgs'></div>
                        <div class="level">
                          <div class="name">{{item.user_name}}1</div>
                          <div class="star">
                            <van-rate
                              v-model="value"
                              :size="12"
                              color="#ffd21e"
                              void-icon="star"
                              void-color="#FF6501"
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div class="date">{{item.user_time}}</div>
                    </div>
                    <div class="text">
                      <span class="text_word" :class="text_s1? 's1':''">{{item.user_info}}</span>
                      <div class="comment_btn" @click="change_b(develop)">
                        <span class="change_com">{{develop}}</span>
                        <span class="change_bot" :class="text_s1? 's1':'s2'"></span>
                      </div>
                      </div>
                  </div>
                </li>
              </ul>
            </li>
            <!-- 中评 -->
            <li class="round_li" :style="index==2 ? 'opacity:1':'opacity:0'">
              <ul class="comment_ul">
                <li class="comment_li" v-for="(item,index) in goods_res" :key='index'>
                  <div class="com_desc">
                    <div class="head_top">
                      <div class="head_left">
                        <div class='imgs'></div>
                        <div class="level">
                          <div class="name">{{item.user_name}}2</div>
                          <div class="star">
                            <van-rate
                              v-model="value"
                              :size="12"
                              color="#ffd21e"
                              void-icon="star"
                              void-color="#FF6501"
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div class="date">{{item.user_time}}</div>
                    </div>
                    <div class="text">
                      <span class="text_word" :class="text_s1? 's1':''">{{item.user_info}}</span>
                      <div class="comment_btn" @click="change_b(develop)">
                        <span class="change_com">{{develop}}</span>
                        <span class="change_bot" :class="text_s1? 's1':'s2'"></span>
                      </div>
                      </div>
                  </div>
                </li>
              </ul>
            </li>
            <!-- 差评 -->
            <li class="round_li" :style="index==3 ? 'opacity:1':'opacity:0'">
              <ul class="comment_ul">
                <li class="comment_li" v-for="(item,index) in goods_res" :key='index'>
                  <div class="com_desc">
                    <div class="head_top">
                      <div class="head_left">
                        <div class='imgs'></div>
                        <div class="level">
                          <div class="name">{{item.user_name}}3</div>
                          <div class="star">
                            <van-rate
                              v-model="value"
                              :size="12"
                              color="#ffd21e"
                              void-icon="star"
                              void-color="#FF6501"
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div class="date">{{item.user_time}}</div>
                    </div>
                    <div class="text">
                      <span class="text_word" :class="text_s1? 's1':''">{{item.user_info}}</span>
                      <div class="comment_btn" @click="change_b(develop)">
                        <span class="change_com">{{develop}}</span>
                        <span class="change_bot" :class="text_s1? 's1':'s2'"></span>
                      </div>
                      </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </template>
    </full-modal>
    <van-popup v-model="share_img">
        SSS
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import { Toast } from 'vant';
import {stopScroll,allowScroll} from "@/utils/methods";
import FullModal from '@/iYxdt/FullModal';

export default {
  data() {
    return {
      index:0,
      goods_res:[],
      text_s1:true,
      develop:'展开',
      user_discuss:false,
      no_goods:true,
      is_stock:false,
      quantity:0,
      store_word:'收藏',
      store_up:true,
      share_img:false,
      current:0,
      header_index:0,
      qucik_buy:false,
      value:3,
      isLoading: false,
      input_focus:false,
      tab_header:true,
      parametric:false,
      send_address:false,
      shopping:['商品','详情','评价','参数'],
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/apple-1.jpg',
      ],
      areaList:{
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区',
        }
      },
      showShare: false,
      options: [
        { name: '微信好友', icon: '/static/goods/wechat.png' },
        { name: '朋友圈', icon: '/static/goods/circle.png' },
        { name: '分享链接', icon: '/static/goods/link.png' },
        { name: '分享图片', icon: '/static/goods/load.png' }
      ]
    }
  },
  methods:{
    cut(){
      if(this.quantity<=0){
        return;
      }
      this.quantity-=1;
    },
    add(){
      this.quantity=this.quantity+1;
    },
    c_love(){
      if(this.store_up){
        this.store_up=false;
        this.store_word='已收藏';
      }else{
        this.store_up=true;
        this.store_word='收藏';
      }
    },
    // 全部评论弹框
    all_comment(){
      this.user_discuss=true;
      $('body').css({'overflow':'hidden'});
    },
    goBack(){
      this.$router.go(-1);
    },
    // 返回
    history(){
      this.$router.go(-1);
    },
    onChange(index) {
      this.current = index;
    },
    // 回到顶部
    go_top(){
      $('.hairlines').animate({scrollTop:0},300);
    },
    // 分享
    onSelect(option) {
      if(option.name == '分享图片'){
        this.share_img = true;
      }
      this.showShare = false;
    },
    // 关闭选择地区
    close_area(){
      allowScroll();
      this.send_address = false;
    }, 
    // 关闭快捷购买的弹窗
    close_num(){
      this.qucik_buy = false;
    },
    // 确定快捷购买的弹窗
    define(){
      var val=$('.num_value').val();
      if(val.trim()==''){
        this.qucik_buy = false;
        return;
      }
      this.quantity=val;
      this.qucik_buy = false;
    },
    // 加入购物车
    joinCar(){
      if(this.no_goods){
        return;
      }
      console.log('加入购物车');
    },
    // 立即购买
    nowBuy(){
      if(this.no_goods){
        return;
      }
      console.log('立即购买')
    },
    jump(val){
      if(val=='首页'){
       this.$router.push('/');
      }else if(val=='购物车'){
       this.$router.push('/cart');
      }
    },
    change_b(val){
      if(val=='展开'){
        this.develop='收起';
        this.text_s1=false;
      }else if(val=='收起'){
        this.develop='展开';
        this.text_s1=true;
      }
      
    },
    // 关闭查看全部参数的弹窗
    close_cs(){
      allowScroll();
      this.parametric = false;
    },
    // 分享
    share(){
      this.showShare = true;
    },
    // 回到顶部
    scrollToTop(){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop);
      if(scrollTop>133){
        this.tab_header = true;
      }else{
        this.tab_header = false
      }
    },
    // 回到详情部分
    goDetail(){
      document.getElementById('anchor').scrollIntoView();
      
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    change_li(index){
      this.header_index = index;
    },
    buy_more(){
      this.qucik_buy = true;
    },
    input_f(){
      this.input_focus = true;
      console.log(222)
    },
    change_cs(){
      stopScroll();
      this.parametric = true;
    },
    send_to(){
      stopScroll();
      this.send_address = true;
    }
  },
  watch:{
    user_discuss(n,o){
      if(n==false){
        $('body').css({'overflow':'visible'});
      }
    }
    
  },
  mounted(){
    var _this=this;
    // 全部评论假数据
    var src={
      'success':'true',
      'res':[{'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
            {'user_name':'强尼','user_time':'2020-05-06','user_info':'非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常非常好,很棒啊 !非常好,很棒啊 !非常好,很棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非棒啊!非常'},
      ],
    }
    var json=JSON.stringify(src);
    var res=JSON.parse(json);
    console.log(res);
    _this.goods_res=res.res;

    // 
    // $('.goods_container').click(function(){
    //   allowScroll();
    // })
    $('.dis_nav').find('.dis_nav_li').each(function(i,b){
      $(b).click(function(){
        _this.index=i;
        $('.dis_nav').find('.dis_nav_li').removeClass('action');
        $(this).addClass('action');
      })
    })
    window.addEventListener('scroll', this.scrollToTop)
  },
  components:{
    FullModal
  }
}
</script>

<style lang="scss" scoped>

.goods_container{
  width: 100%;
  height: 100%;
  .top{
    padding:0px 32px 0px 40px;
    height: 84px;
    position: absolute;
    top: 0px;
    width: 200%;
    z-index: 15;
    background: white;
    display: flex;
    .top_re{
      width:30px;
      height: 100%;
      margin-right: 30px;
      font-size: 40px;
      line-height:100px;
    }
    .ul_header{
      display: flex;
      font-size: 28px;
      li{
        width:104px ;
        text-align: center;
        padding-top:20px;
        margin: 0px 25px;
        font-weight: 600;
        span{
          padding-bottom: 12px;
          &.active{
            color: #FF6501;
            border-bottom: 3px solid #FF6501;
          }
        }
      }
    }
  }
  .go_top{
    width: 76px;
    height: 76px;
    background: url('../assets/image/images/goods/back.png');
    background-size: 100% 100%;
    position: absolute;
    right: 30px;
    bottom:130px;
    z-index: 22;
  }
  .line20{
    width: 100%;
    height: 20px;
    background: #f8f8f8;
    background: red;
  }
  .swipper{
    height: 750px;
    width: 100%;
    position: relative;
    .return{
      position: absolute;
      left: 20px;
      top: 14px;
      width:56px;
      height:56px;
      background:url('../assets/image/images/goods/return.png');
      background-size: 100% 100%;
      z-index: 3;
    }
     .share{
      position: absolute;
      right: 20px;
      top: 14px;
      width:56px;
      height:56px;
      background:url('../assets/image/images/goods/share.png');
      background-size: 100% 100%;
      z-index: 3;
    }
    .custom-indicator {
      position: absolute;
      width:80px;
      height:40px;
      background:rgba(0,0,0,1);
      opacity:0.3;
      border-radius:20px;
      right: 30px;
      bottom: 20px;
      font-size:20px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:40px;
      text-align: center;
    }
    img{
      width: 100%;
      height: 750px;
    }
  }
  // 商品信息
  .pd30{
    padding: 0px 30px;
    .login_price{
      width: 100%;
      height: 28px;
      line-height: 28px;
      margin-top:28px;
      margin-bottom:30px;
      display: flex;
      .de_price{
        color: #FF6501;
        flex: 1;
        .price_left{
          height: 28px;
          line-height: 28px;
          display:flex;
          .sheep{
            display: block;
            font-size:20px;
          }
          .perice{
            display: block;
            font-size:38px;
            height: 29px;
            line-height: 29px;
          }
        }
        .sheep{
          font-size:12px;
        }
        .perice{
          font-size:20px;
        }
      }
      .lg_price{
        width:225px;
        font-size:22px;
        color: #999999;
        display: flex;
        align-items: center;
      }
    }
    .goods_detail{
      height:80px;
      line-height: 40px;
      font-size:32px;
      font-weight:bold;
      color: #333333;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .code{
      height: 23px;
      line-height: 23px;
      margin-top:12px;
      color: #FF6901;
      font-size: 24px;
      .bm{
        margin-right: 30px;
      }
    }
    .collect{
      overflow: hidden;
      margin-top:30px;
      margin-bottom: 30px;
      font-size:24px;
      font-weight:400;
      color:#999999;
      height: 23px;
      line-height: 23px;
      .love{
        float: left;
        display: flex;
        align-items: center;
        .store_up{
          display: inline-block;
          width:26px;
          height:24px;
          line-height: 24px;
          &.loves{
            background:url('../assets/image/images/goods/love.png');
            background-size: 100% 100%;
          }
          &.loves2{
            background:url('../assets/image/images/goods/love_hover.png');
            background-size: 100% 100%;
          }
        }
        .store_g{
          color:#999;
        }
        .store_r{
          color:#FF6901;
        }
        span{
          margin-left: 10px;
        }
      }
      .col{
        float: right;
      }
    }
  }
  // 数量
  .num{
    color: #333;
    padding: 0px 30px;
    font-size: 24px;
    display:flex;
    justify-content: space-between;
    margin-top:30px;
    margin-bottom: 30px;
    .r_m{
      .all_num{
        margin-right: 40px;
        font-size: 26px;
        font-weight: 600;
        color: #333333;
        display: inline-block;
        height: 25px;
        line-height: 25px;
        vertical-align: middle;
      }
      .reduce,.medium{
        font-size: 22px;
        display: inline-block;
        width:36px;
        height:36px;
        border:1Px solid #cccccc;
        border-radius:50%;
        line-height: 36px;
        text-align: center;
        vertical-align: middle;
      }
      .buys{
        display: inline-block;
        vertical-align: middle;
        margin:0px 30px;
        width:90px;
        border:0;
      }
    }
    .add_num{
      height:21px;
      line-height: 21px;
      margin-top:8px;
      .buy_lot{
        display: inline-block;
        vertical-align: middle;
        color: #999;
        font-size:22px;
        height:21px;
        line-height: 21px;
      }
      .buy_right{
        display: inline-block;
        background-image: url('../assets/image/images/goods/goods_right.png');
        background-size: 100% 100%;
        width:10px;
        height:19px;
        vertical-align: middle;
      }
    }
  }
  // 送至/服务
  .serve{
    padding: 0px 30px;
    .address,.f_tips{
      display: flex;
      .send_to{
        display:inline-block;
        width: 53px;
        height:25px;
        line-height: 25px;
        font-weight:bold;
        color:#333;
        margin-right: 40px;
        margin-top: 36px;
        font-size:26px;
      }
      .target_add{
        flex: 1;
        margin-top: 36px;
        .ellipsis{
          font-size:26px;
          color: #333;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          height: 25px;
          line-height: 28px;
        }
        .confirm_num{
          color: #FF6901;
          font-size: 24px;
          margin-top: 20px;
          height: 23px;
          line-height: 23px;
        }
        .confirm_num_no{
          margin-top: 20px;
          display: flex;
          align-items: center;
          .tips{
            width: 26px;
            height: 26px;
            display: inline-block;
            margin-right: 10px;
            background-image: url('../assets/image/images/goods/tips.png');
            background-size: 100% 100%;
          }
          .no_goods{
            display: inline-block;
            text-indent: -2px;
            font-size: 24px;
            height: 23px;
            line-height: 23px;
            color: #FF6901;
          }
        }
      }
    }
    .address{
      padding-bottom:34px;
      border-bottom: 1Px solid #f6f6f6;
      border-bottom: 1Px solid red;
    }
    .f_tips{
      margin-bottom:38px;
      .good_serve{
        .yxdt{
          margin-top:36px;
          font-size: 26px;
          display:inline-block;
          height:25px;
          line-height: 25px;
          }
        .ten{
          display: flex;
          align-items: center;
          margin-top:18px;
          .back,.change{
            width:26px;
            height:26px;
            display: inline-block;
            margin-right: 12px;
            &+span{
              color:#666666;
              font-size:24px;
              margin-right: 24px;
              display: inline-block;
              height:23px;
              line-height: 23px;
            }
          }
          .back{
            background-image: url('../assets/image/images/goods/goback.png');
            background-size: 100% 100%;
          }
          .change{
            background: url('../assets/image/images/goods/change.png');
            background-size: 100% 100%;
          }
        }
      }  
    }
  }
  // 评论
  .comment{
    padding:0 30px;
    .user_comment{
      padding-top:40px;
      margin-bottom:22px;
      display:flex;
      justify-content: space-between;
      .all_com{
        height:29px;
        line-height: 29px;
        span{
          display: inline-block;
          vertical-align: bottom;
          color:#333;
          &.com_line{
            width:8px;
            height:30px;
            background:linear-gradient(0deg,rgba(253,104,45,1),rgba(255,139,15,1));
            border-radius:4px;
            margin-right:14px;
          }
          &.com_s1{
            font-size:30px;
            height:29px;
            line-height: 29px;
            font-weight: bold;
            margin-right:12px;
          }
          &.com_s2{
            font-size:26px;
            height:25px;
            line-height:25px;
          }
        }
      }
      .check_com{
        height: 21px;
        line-height:21px;
        .look_com{
          display:inline-block;
          vertical-align: middle;
          color: #999;
          font-size: 22px;
          height:21px;
          line-height: 21px;
          margin-right: 10px;
        }
        .look_r{
          background-image: url('../assets/image/images/goods/goods_right.png');
          background-size:100% 100%;
          display: inline-block;
          vertical-align: middle;
          width:10px;
          height:19px;
        }
      }
    }
    .com_desc{
      width:690px;
      background:#F8F8F8;
      border-radius:10px;
      padding-bottom:30px;
      .head_top{
        margin-top:20px;
        margin-bottom:20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .head_left{
          display: flex;
          .imgs{
            width:50px;
            height:50px;
            border-radius:50%;
            background-image: url('../assets/image/images/goods/difine_pic.png');
            background-size:100% 100%;
            margin-right: 12px;
          }
          .level{
            flex: 1;
            .name{
              font-size: 20px;
              height: 20px;
              line-height: 20px;
              color:#666;
              margin-top:2px;
            }
            .star{
              display: inline-block;
            }
          }
        }
        .date{
          height:16px;
          line-height: 16px;
          color:#999;
          font-size: 20px;
        }
      }
      .text{
        padding-bottom:18px;
        height:60px;
        line-height: 30px;
        color: #333;
        font-size: 26px;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  // 规格
  .data_all{
    padding:0 30px;
    .user_comment{
      padding-top:46px;
      margin-bottom:22px;
      display:flex;
      justify-content: space-between;
      .all_com{
        height:29px;
        line-height: 29px;
        span{
          display: inline-block;
          vertical-align: bottom;
          color:#333;
          &.com_line{
            width:8px;
            height:30px;
            background:linear-gradient(0deg,rgba(253,104,45,1),rgba(255,139,15,1));
            border-radius:4px;
            margin-right:14px;
          }
          &.com_s1{
            font-size:30px;
            height:29px;
            line-height: 29px;
            font-weight: bold;
            margin-right:12px;
          }
        }
      }
      .check_com{
        height: 21px;
        line-height:21px;
        .look_com{
          display:inline-block;
          vertical-align: middle;
          color: #999;
          font-size: 22px;
          height:21px;
          line-height: 21px;
          margin-right: 10px;
        }
        .look_r{
          background-image: url('../assets/image/images/goods/goods_right.png');
          background-size:100% 100%;
          display: inline-block;
          vertical-align: middle;
          width:10px;
          height:19px;
        }
      }
    }
    .data_type{
      .brand{
        height:26px;
        line-height: 26px;
        padding-bottom: 30px;
        .type_all{
          display: inline-block;
          vertical-align: middle;
          font-size:26px;
          height:26px;
          line-height: 26px;
          color:#666;
          margin-right: 37px;
        }
        .type_details{
          display: inline-block;
          vertical-align: middle;
          height:26px;
          line-height: 26px;
          color:#343434;
          font-size:26px;
        }
      }
    }
  }
  // 详情
  .details{
    padding:40px 30px 0px;
    &.no_goods{
      margin-bottom:60px;
    }
    .user_comment{
      display:flex;
      justify-content: space-between;
      .all_com{
        height:30px;
        line-height: 30px;
        span{
          display: inline-block;
          vertical-align: bottom;
          color:#333;
          &.com_line{
            width:8px;
            height:30px;
            background:linear-gradient(0deg,rgba(253,104,45,1),rgba(255,139,15,1));
            border-radius:4px;
            margin-right:14px;
          }
          &.com_s1{
            font-size:30px;
            height:29px;
            line-height: 29px;
            font-weight: bold;
            margin-right:12px;
          }
        }
      }
    }
    .image_all{
      div{
        img{
          width: 100%;
          height: 600px;
        }
      }
    }
  }
  .no_num{
    width:100%;
    height:60px;
    font-size:24px;
    font-weight:400;
    background:#FFE8D8;
    line-height:60px;
    color: #FF6901;
    position: absolute;
    text-align: center;
    bottom: 100px;
    z-index: 12;
  }
  .bottom{
    width: 100%;
    padding-left:30px;
    position: absolute;
    bottom: 0px;
    z-index: 20;
    display: flex;
    background: white;
    padding-top:12px;
    padding-bottom:12px;
    .home,.cart{
      text-align: center;
      height:75px;
      .shopping_car{
        margin-top: 10px;
        color: #686868;
        font-size:20px;
        height:19px;
        line-height: 19px;
      }
    }
    .home{
      margin-right:85px;
      .index{
        width: 44px;
        height: 45px;
        background-image: url('../assets/image/images/goods/no_cart.png');
        background-size: 100% 100%;
        margin:0 auto;
      }
    }
    .cart{
      margin-right:50px;
      .no_cart{
        width: 44px;
        height: 45px;
        background-image: url('../assets/image/images/goods/index.png');
        background-size: 100% 100%;
        margin:0 auto;
      }
    }
    .btn{
      display:flex;
      height:76px;
      line-height: 76px;
      .btn1{
        display: inline-block;
        width:220px;
        height:76px;
        line-height: 76px;
        text-align: center;
        border-radius:38px;
        font-size:30px;
        box-sizing: border-box;
        &.add_cart{
          box-shadow:0px 0px 7px 1Px rgba(20,53,124,0.05);
          border:2px solid #FF6901;
          color: #FF6901;
          margin-right:20px;
          &.disabled{
            border:0;
            background:#ccc;
            color:#fff;
          }
        }
        &.buy_now{
          background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
          box-shadow:0px 4px 12px 0px rgba(254,121,37,0.4);
          color:#fff;
          &.disabled{
            background:#ccc;
            color:#fff;
            box-shadow: unset;
          }
        }
      }
    }
  }
  .van_popup{
    margin-left:30px;
    margin-right:30px;
    .popup_body{
      .popup{
        display: flex;
        justify-content: space-between;
        .write{
          display: inline-block;
          height:32px;
          line-height: 32px;
          font-weight:bold;
          color:#333333;
          margin-top:30px;
          margin-bottom:30px;
        }
        .close{
          margin-top:27px;
          display: inline-block;
          height: 36px;
          width: 36px;
          background-image: url('../assets/image/images/search/close.png');
          background-size: 100% 100%;
        }
      }
      .tab_num{
        height: 80px;
        margin-top:30px;
        width: 690px;
        .num_value{
          width: 690px;
          height:80px;
          box-sizing:border-box;
          border:1Px solid #ddd;
          border-radius: 10px;
          text-indent:21px;
          &.input_f{
          border: 1Px solid #FF6901;
          &::-webkit-input-placeholder{
            font-size:26px;
            color:#999;
          }
        }
        }
      }
      .check_all{
        text-align: center;
        height: 80px;
        line-height:80px;
        margin-top:47px;
        margin-bottom:30px;
        span{
          width: 210px;
          height: 80px;
          border-radius:40px;
          display:inline-block;
          font-size:30px;
          line-height: 80px;
          &.cancel{
            border:2px solid #cccccc;
            color:#666;
          }
          &.yes{
            margin-left: 40px;
            background:linear-gradient(-90deg,rgba(253,104,45,1),rgba(255,139,15,1));
            box-shadow:0px 4px 12px 0px rgba(254,121,37,0.4);
            color: white;
          }
        }
      }
    }
  }
  .parametric,.send_address{
    height: 655px;
    max-height: 655px;
    background: white;
    width: 100%;
    border-radius:30px 30px 0px 0px;
    overflow-y: auto;
    .header{
      height:90px;
      line-height: 90px;
      padding-left: 30px;
      background:rgba(248,248,248,1);
      display: flex;
      .all{
        flex: 1;
        font-size:32px;
        color: #333333;
        font-weight: 600;
      }
      .close{
        width: 30px;
        height: 30px;
        display: inline-block;
        margin-top: 20px;
        margin-right: 20px;
        background: url('../assets/image/images/search/close.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .usually{
      padding: 10px 30px 10px 30px;
      background:rgba(255,246,238,1);
      border-radius:10px;
      width: 100%;
      height: 166px;
      box-sizing:border-box;
      margin-top: 30px;
      .h3{
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        font-size:26px;
        color: #333333;
      }
      .text{
        font-size:26px;
        color:rgba(255,105,1,1);
        height: 64px;
        overflow: hidden;
      }
    }
    .items{
      padding:10px 30px;
      display: flex;
      font-size: 26px;
      .item_all{
        .item_left{
          width: 120px;
          line-height: 40px;
          color: #666;
          display: inline-block;
        }
        .item_right{
          flex: 1;
          display: inline-block;

          color: #333333;
        }
      }
    }
  }
  // 全部评论header
  .user_dis{
    .dis_nav{
      margin-left:33px;
      .dis_nav_ul{
        padding-top:19px;
        display: flex;
        .dis_nav_li{
          margin-right:20px;
          padding:14px 19px;
          display: inline-block;
          height:23px;
          line-height: 23px;
          border:2px solid transparent;
          &.action{
            border:2px solid #FF6901;
            background:#FFE8D8;
            color:#FF6901;
            border-radius: 25px;
          }
          .dis_s1,.dis_s2{
            color:#666;
            font-size:24px;
            display: inline-block;
            height:23px;
            line-height: 23px;
          }
        }
      }
    }
    // body
    .comment_body{
      margin:0 30px;
      .round_ul{
        display:flex;
        transition: all 0.3s ease-in-out;
        .round_li{
          flex-shrink: 0;
          transition: all 0.3s ease-in-out;
          .comment_ul{
            .comment_li{
              .com_desc{
                width:690px;
                background:#F8F8F8;
                border-radius:10px;
                .head_top{
                  margin-top:30px;
                  margin-bottom:10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .head_left{
                    display: flex;
                    .imgs{
                      width:50px;
                      height:50px;
                      border-radius:50%;
                      background-image: url('../assets/image/images/goods/difine_pic.png');
                      background-size:100% 100%;
                      margin-right: 12px;
                    }
                    .level{
                      flex: 1;
                      .name{
                        font-size: 20px;
                        height: 20px;
                        line-height: 20px;
                        color:#666;
                        margin-top:2px;
                      }
                      .star{
                        display: inline-block;
                      }
                    }
                  }
                  .date{
                    height:16px;
                    line-height: 16px;
                    color:#999;
                    font-size: 20px;
                  }
                }
                .text{
                  .text_word{
                    color: #333;
                    font-size: 26px;
                    &.s1{
                      overflow: hidden;
                      display: -webkit-box;
                      text-overflow: ellipsis;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                    }
                  }
                  .comment_btn{
                    height:22px;
                    line-height: 22px;
                    text-align: right;
                    margin-top:19px;
                    .change_com{
                      display: inline-block;
                      height:22px;
                      line-height: 22px;
                      font-size:24px;
                      color:#FF6901;
                      margin-right:10px;
                    }
                    .change_bot{
                      display:inline-block;
                      width:14px;
                      height:8px;
                      &.s1{
                        background-image: url('../assets/image/images/goods/change_b.png');
                        background-size:100% 100%;
                      }
                      &.s2{
                        background-image: url('../assets/image/images/goods/change_t.png');
                        background-size:100% 100%;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

}
</style>
<style lang="scss">
.van-popup{
  .van-share-sheet__title{
    font-size:32px;
    color: #333333;
    height: 32px;
    line-height: 32px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .van-share-sheet__options{
    margin-bottom: 25px;
    .van-share-sheet__option{
      width:25%;
      .van-share-sheet__icon{
        width: 100px;
        height: 100px;
      }
      .van-share-sheet__name{
        font-size:26px;
        color:rgba(51,51,51,1);
        margin-top: 18px;
      }
    }
  }
  .van-share-sheet__cancel::before{
    display: none;
  }
  .van-share-sheet__cancel{
    height: 80px;
    line-height: 80px;
    font-size:32px;
    color: #333333;
  }
}
</style>