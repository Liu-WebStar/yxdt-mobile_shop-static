<template>
  <div>
    <!-- 全部订单 -->
    <full-modal v-model="show_component" :hideHeader="true">
      <template slot="body">
        <!--标题-->
        <div class="component_header border-bottom c_eee">
          <div class="tabs-warp">
            <div ref="tabsContent" class="tabs-content mescroll-touch-x">
              <div style="display: inline-block"> <!--PC端运行,加上这个div可修复tab-bar错位的问题 -->
                <ul class="tabs" ref="tabs">
                  <li class="tab" v-for="(tab,i) in tabs" :class="{active: i===curIndex}" :key="i" @click="changeTab(i)">{{tab.name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--轮播-->
        <swiper ref="mySwiper" :options="swiperOption">
          <!--全部-->
          <swiper-slide>
            <mescroll-vue ref="mescroll0" :down="getMescrollDown(0)" :up="getMescrollUp(0)" @init="mescrollInit(0,arguments)">
              <ul id="dataListOrder0">
                <my-order-item 
                  v-for="pd in tabs[0].list" 
                  :key="pd.id"
                  :data="pd"
                />
              </ul>
            </mescroll-vue>
          </swiper-slide>
          <!-- 待确定 可不配down-->
          <swiper-slide>
            <mescroll-vue ref="mescroll1" :up="getMescrollUp(1)" @init="mescrollInit(1,arguments)">
              <ul id="dataListOrder1">
                <li class="data-li" v-for="pd in tabs[1].list" :key="pd.id">
                  <img class="pd-img" :src="pd.pdImg"/>
                  <div class="pd-name">{{pd.pdName}}</div>
                  <p class="pd-price">{{pd.pdPrice}} 元</p>
                  <p class="pd-sold">已售{{pd.pdSold}}件</p>
                </li>
              </ul>
            </mescroll-vue>
          </swiper-slide>
          <!-- 待付款-->
          <swiper-slide>
            <mescroll-vue ref="mescroll2" :up="getMescrollUp(2)" @init="mescrollInit(2,arguments)">
              <ul id="dataListOrder2">
                <li class="data-li" v-for="pd in tabs[2].list" :key="pd.id">
                  <img class="pd-img" :src="pd.pdImg"/>
                  <div class="pd-name">{{pd.pdName}}</div>
                  <p class="pd-price">{{pd.pdPrice}} 元</p>
                  <p class="pd-sold">已售{{pd.pdSold}}件</p>
                </li>
              </ul>
            </mescroll-vue>
          </swiper-slide>
          <!-- 待发货-->
          <swiper-slide>
            <mescroll-vue ref="mescroll3" :up="getMescrollUp(3)" @init="mescrollInit(3,arguments)">
              <ul id="dataListOrder3">
                <li class="data-li" v-for="pd in tabs[3].list" :key="pd.id">
                  <img class="pd-img" :src="pd.pdImg"/>
                  <div class="pd-name">{{pd.pdName}}</div>
                  <p class="pd-price">{{pd.pdPrice}} 元</p>
                  <p class="pd-sold">已售{{pd.pdSold}}件</p>
                </li>
              </ul>
            </mescroll-vue>
          </swiper-slide>
          <!-- 待收货-->
          <swiper-slide>
            <mescroll-vue ref="mescroll4" :up="getMescrollUp(4)" @init="mescrollInit(4,arguments)">
              <ul id="dataListOrder4">
                <li class="data-li" v-for="pd in tabs[4].list" :key="pd.id">
                  <img class="pd-img" :src="pd.pdImg"/>
                  <div class="pd-name">{{pd.pdName}}</div>
                  <p class="pd-price">{{pd.pdPrice}} 元</p>
                  <p class="pd-sold">已售{{pd.pdSold}}件</p>
                </li>
              </ul>
            </mescroll-vue>
          </swiper-slide>
          <!-- 已完成-->
          <swiper-slide>
            <mescroll-vue ref="mescroll5" :up="getMescrollUp(5)" @init="mescrollInit(5,arguments)">
              <ul id="dataListOrder5">
                <li class="data-li" v-for="pd in tabs[5].list" :key="pd.id">
                  <img class="pd-img" :src="pd.pdImg"/>
                  <div class="pd-name">{{pd.pdName}}</div>
                  <p class="pd-price">{{pd.pdPrice}} 元</p>
                  <p class="pd-sold">已售{{pd.pdSold}}件</p>
                </li>
              </ul>
            </mescroll-vue>
          </swiper-slide>
        </swiper>
      </template>
    </full-modal>
    <!-- 订单详情 -->
    <order-detail ref="orderDetail"></order-detail>
    <!-- 取消订单弹窗 -->
    <shadow-modal 
      v-model="show_cancel" 
      type="middle"
      :show_cancel="true"
      @ok="save_cancel"
      >
      <template slot="header">确定取消此订单?</template>
      <template slot="body">取消后,订单状态不可以再恢复。</template>
    </shadow-modal>
    <!-- 立即付款弹窗 -->
    <modal-pay 
      v-model="show_pay" 
      :payIndex="payIndex"
      @inputpay="changePay"
      price="2120.00"
      />
    <!-- 催促发货弹窗 -->
    <shadow-modal 
      v-model="show_hasten" 
      type="middle" 
      class="more"
      :show_cancel="true"
      @ok="save_hasten"
      >
      <template slot="header">您的发货请求已收到,我们会加急处理您的请求</template>
      <template slot="body">如需进一步沟通,请拨打免费电话「400-0086-826」与我们联系。</template>
    </shadow-modal>
    <!-- 查看物流弹窗 -->
    <shadow-modal 
      v-model="show_logistics" 
      @ok="save_logistics"
      :okHide="true"
      ok_text="我知道了"
      >
      <template slot="header">查看订单进展</template>
      <template slot="body">
        <yxdt-timeline>
          <yxdt-line-list>2020-06-28  11:36:24  您已确认收货啦啦啦啦啦啦阿拉啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</yxdt-line-list>
          <yxdt-line-list>2020-06-28  11:36:24  商家已发货;  配送员:某某某</yxdt-line-list>
          <yxdt-line-list>2020-06-28  11:36:24  商家已开始配货</yxdt-line-list>
          <yxdt-line-list>2020-06-28  11:36:24  您已成功创建订单</yxdt-line-list>
        </yxdt-timeline>
      </template>
    </shadow-modal>
    <!-- 确认收货弹窗 -->
    <shadow-modal 
      v-model="show_receipt" 
      type="middle"
      :show_cancel="true"
      @ok="save_receipt"
      >
      <template slot="header">请确认货物已收到</template>
      <template slot="body">如有问题收货后可以进行售后申请。</template>
    </shadow-modal>
    <!-- 申请售后弹窗 -->
    <shadow-modal 
      v-model="show_after" 
      type="middle"
      :show_cancel="true"
      ok_text="继续发起"
      @ok="save_after"
      >
      <template slot="header">当前售后仅支持在线发起退货申请</template>
      <template slot="body">如需换货、维修请直接联系客服。</template>
    </shadow-modal>
    <!-- 再次购买弹窗 -->
    <shadow-modal 
      v-model="show_again" 
      :footer_height="106" 
      type="middle"
      class="more"
      :show_cancel="true"
      @ok="save_again"
      >
      <template slot="header">确定将此订单下的商品全部加入购物车?</template>
    </shadow-modal>
    <!-- 删除订单弹窗 -->
    <shadow-modal 
      v-model="show_del" 
      type="middle"
      :show_cancel="true"
      @ok="save_del"
      >
      <template slot="header">确定取消此订单?</template>
      <template slot="body">取消后,数据不可恢复。</template>
    </shadow-modal>
  </div>
</template>

<script>
import $ from "jquery";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MescrollVue from 'mescroll.js/mescroll.vue'
import mockData from '@/mock/pdlist'
// 
import FullModal from "@/iYxdt/FullModal";
import ShadowModal from "@/iYxdt/ShadowModal";
import MyOrderItem from "./MyOrderItem";
import OrderDetail from "./OrderDetail";
import YxdtTimeline from "@/iYxdt/YxdtTimeline";
import YxdtLineList from "@/iYxdt/YxdtLineList";
import ModalPay from "@/views/components/ModalPay";

export default {
  provide(){
    return {
      myOrder:this
    }
  },
  data(){
    return {
      show_component:false,
      tabs: [
        {name: '全部', mescroll: null, list: [], isListInit: false}, 
        {name: '待确认', mescroll: null, list: [], isListInit: false}, 
        {name: '待付款', mescroll: null, list: [], isListInit: false}, 
        {name: '待发货', mescroll: null, list: [], isListInit: false}, 
        {name: '待收货', mescroll: null, list: [], isListInit: false}, 
        {name: '已完成', mescroll: null, list: [], isListInit: false}
      ],
      curIndex: 0, // 当前tab的下标
      tabScrollLeft: 0, // 菜单滚动条的位置
      swiperOption: { // 轮播配置
        on: {
          transitionEnd: () => {
            this.changeTab(this.swiper.activeIndex)
          }
        }
      },
      data_init:false,
      // 
      show_cancel:false,
      show_pay:false,
      payIndex:0,
      show_hasten:false,
      show_logistics:false,
      show_receipt:false,
      show_after:false,
      show_again:false,
      show_del:false,
    }
  },
  components:{
    FullModal,
    swiper, // 轮播组件
    swiperSlide, // 轮播组件
    MescrollVue, // Mescroll组件
    MyOrderItem,
    ShadowModal,
    OrderDetail,
    YxdtTimeline,
    YxdtLineList,
    ModalPay,
  },
  computed: {
    swiper () { // 轮播对象
      return this.$refs.mySwiper.swiper
    },
    curTab(){
      return this.tabs[this.curIndex];
    }
  },
  methods: {
    // mescroll初始化的回调
    mescrollInit (tabIndex, arg) {
      this.tabs[tabIndex].mescroll = arg[0]; // 传入mescroll对象
      this.tabs[tabIndex].mescroll.tabIndex = tabIndex; // 加入标记,便于在回调中取到对应的list
    },
    // 多mescroll的配置,需通过方法获取,保证每个配置是单例
    getMescrollDown (tabIndex) {
      return {
        auto: 0,
        callback: this.downCallback
      }
    },
    // mescroll上拉加载的配置
    getMescrollUp (tabIndex) {
      let emptyWarpId = 'dataListOrder' + tabIndex;
      return {
        auto: false,
        callback: this.upCallback,
        noMoreSize: 4, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          warpId: emptyWarpId, // 父布局的id;
          icon: '/mobile_shop/static/center/data-empty.png', // 图标,默认null
          tip: '暂无任何订单数据哦~', // 提示
          // btntext: '去逛逛 >', // 按钮,默认""
          btnClick: function () { // 点击按钮的回调,默认null
            alert('点击了按钮,具体逻辑自行实现')
          }
        },
        toTop: { // 配置回到顶部按钮
          src: '/mobile_shop/static/mescroll/mescroll-totop.png' // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      }
    },
    // 切换菜单
    changeTab (tabIndex) {
      if (this.curIndex === tabIndex && this.data_init) return; // 避免重复调用
      this.data_init==false ? this.data_init=true : null;
      let curTab = this.tabs[this.curIndex];// 当前列表
      let newTab = this.tabs[tabIndex];// 新转换的列表
      curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
      this.curIndex = tabIndex; // 切换菜单
      this.swiper.slideTo(tabIndex);
      // 菜单项居中动画
      if (curTab.mescroll) {
        let tabsContent = this.$refs.tabsContent;
        let tabDom = tabsContent.getElementsByClassName('tab')[tabIndex];
        let star = tabsContent.scrollLeft;// 当前位置
        let end = tabDom.offsetLeft + tabDom.clientWidth / 2 - document.body.clientWidth / 2; // 居中
        this.tabScrollLeft = end;
        curTab.mescroll.getStep(star, end, function (step) {
          tabsContent.scrollLeft = step; // 从当前位置逐渐移动到中间位置,默认时长300ms
        });
      }
      if (!newTab.isListInit) {
        // 加载列表
        newTab.mescroll.triggerDownScroll();
      } else {
        // 检查新转换的列表是否需要显示回到到顶按钮
        setTimeout(() => {
          let curScrollTop = newTab.mescroll.getScrollTop();
          if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
            newTab.mescroll.showTopBtn();
          } else {
            newTab.mescroll.hideTopBtn();
          }
        }, 30)
      }
    },
    /* 下拉刷新的回调 */
    downCallback (mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      if (mescroll.tabIndex === 0) {
        // loadSwiper();
      } else if (mescroll.tabIndex === 1) {
        // ....
      } else if (mescroll.tabIndex === 2) {
        // ....
      }
      mescroll.resetUpScroll();// 触发下拉刷新的回调,加载第一页的数据
    },
    /* 上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    upCallback (page, mescroll) {
      this.tabs[mescroll.tabIndex].isListInit = true;// 标记列表已初始化,保证列表只初始化一次
      this.getListDataFromNet(mescroll.tabIndex, page.num, page.size, (curPageData) => {
        mescroll.endSuccess(curPageData.length);// 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        if (page.num === 1) this.tabs[mescroll.tabIndex].list = []; // 如果是第一页需手动制空列表
        this.tabs[mescroll.tabIndex].list = this.tabs[mescroll.tabIndex].list.concat(curPageData); // 追加新数据
      }, () => {
        if (page.num === 1) this.tabs[mescroll.tabIndex].isListInit = false;
        mescroll.endErr();// 联网失败的回调,隐藏下拉刷新的状态
      })
    },
    getListDataFromNet (tabIndex, pageNum, pageSize, successCallback, errorCallback) {
      // 延时一秒,模拟联网
      setTimeout(() => {
        try {
          var listData = []
          if (tabIndex === 0) {
            // 全部商品 (模拟分页数据)
            for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
              if (i === mockData.length) break
              listData.push(mockData[i])
            }
          } else {
            // 模拟关键词搜索
            var word = this.tabs[tabIndex].name;
            for (var k = 0; k < mockData.length; k++) {
              if (mockData[k].pdName.indexOf(word) !== -1) {
                listData.push(mockData[k])
              }
            }
          }
          // 回调
          listData.forEach((item,key)=>{
            if(key==1)
              item.goods_list=[{},{},{}];
            else if(key==2)
              item.goods_list=[{},{},{},{},{},{},{}];
            else
              item.goods_list=[{}];
          })
          successCallback(listData);
        } catch (e) {
          // 联网失败的回调
          errorCallback();
        }
      }, 1000)
    },
    // 
    cancel_order(){
      console.log('cancel_order');
      this.show_cancel=true;
    },
    pay_now(){
      console.log('pay_now');
      this.payIndex=0;
      this.show_pay=true;
    },
    hasten(){
      console.log('hasten');
      this.show_hasten=true;
    },
    logistics(){
      console.log('logistics');
      this.show_logistics=true;
    },
    receipt(){
      console.log('receipt');
      this.show_receipt=true;
    },
    after_sale(){
      console.log('after_sale');
      this.show_after=true;
    },
    buy_again(){
      console.log('buy_again');
      this.show_again=true;
    },
    del_order(){
      console.log('del_order');
      this.show_del=true;
    },
    // 
    save_cancel(){
      console.log('save_cancel');
    },
    save_hasten(){
      console.log('save_hasten');
    },
    save_logistics(){
      console.log('save_logistics');
    },
    save_receipt(){
      console.log('save_receipt');
    },
    save_after(){
      console.log('save_after');
    },
    save_again(){
      console.log('save_again');
    },
    save_del(){
      console.log('save_del');
    },
    go_detail(orderId){
      console.log('go_detail');
      this.show_detail(orderId);
    },
    // 订单详情
    show_detail(orderId){
      this.curTab.mescroll.hideTopBtn();
      this.$refs.orderDetail.show_component=true;
    },
    changePay(payIndex){
      console.log('myorder',payIndex);
      this.payIndex=payIndex;
    },
  }
}
</script>

<style scoped lang="scss">
  /*模拟的标题*/
  .component_header{
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 88px;
    background-color: #fff;
    box-sizing:border-box;
  }
  /*菜单*/
  .tabs-warp{
    height: 88px;/*高度比tabs-content小, 目的是隐藏tabs的水平滚动条*/
    overflow: hidden;
    box-sizing: content-box;
    position:relative;
    .tabs-content{
      width: 100%;
      height: 150px;
      overflow-x: auto;
      padding-left:88px;
      box-sizing:border-box;
      .tabs{
        width: 100%;
        white-space: nowrap;
        .tab{
          display: inline-block;
          height: 80px;
          line-height: 80px;
          vertical-align: middle;
          text-align:center;
          font-size:28px;
          color:#666;
          position:relative;
          box-sizing:border-box;
          &+li{
            margin-left:42px;
          }
          &:last-child{
            margin-right:21px;
          }
          &.active{
            color: #333;
            font-weight:bold;
            font-size:32px;
            &:before{
              content:'';
              bottom:0px;
              left:0;
              width:100%;
              height:8px;
              position:absolute;
              background:linear-gradient(90deg,rgba(255,175,3,1),rgba(255,96,0,1));
              box-shadow:0px 2px 4px 0px rgba(255,124,1,0.4);
              border-radius:4px;
            }
          }
        }
      }
    }
  }
  /*列表*/
  .swiper-container{
    position: absolute;
    top: 108px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  /*展示上拉加载的数据列表*/
  .data-li{
    position: relative;
    height: 80px;
    padding: 10px 8px 10px 120px;
    border-bottom: 1Px solid #eee;
    .pd-img{
      position: absolute;
      left: 18px;
      top: 10px;
      width: 80px;
      height: 80px;
    }
    .pd-name{
      font-size: 13px;
      line-height: 20px;
      height: 40px;
      margin-bottom: 10px;
      overflow: hidden;
    }
    .pd-price{
      font-size: 13px;
      color: red;
    }
    .pd-sold{
      font-size: 12px;
      margin-top: 8px;
      color: gray;
    }
  }
</style>