import Vue from "vue";
import VueRouter from "vue-router";
import ViewMain from '../views/ViewMain.vue'; //首页
import ViewShopping from '../views/ViewShopping.vue'; //购物车
import ViewSort from '../views/ViewSort.vue'; //分类
import ViewSearch from '../views/ViewSearch.vue'; //分类列表
import PersonalCenter from '../views/PersonalCenter.vue';  //个人中心
import ViewCart from '../views/ViewCart.vue';  //购物车列表页
import OrderSettle from '@/views/cart/OrderSettle.vue';  //确认订单
import OrderSubmit from '@/views/cart/OrderSubmit.vue';  //订单提交


Vue.use(VueRouter);

const routes = [
  {
    // 首页
    path: "/",
    name: "ViewMain",
    component: ViewMain
  },
  {
    // 分类
    path: "/sort",
    name: "ViewSort",
    component: ViewSort
  },
  {
    // 列表页
    path: "/search",
    name: "ViewSearch",
    component: ViewSearch
  },
  {
    // 详情页
    path: "/goods",
    name: "ViewShopping",
    component: ViewShopping
  },
  {
    // 个人中心
    path: "/center",
    name: "PersonalCenter",
    component: PersonalCenter
  },
  {
    // 购物车
    path: "/cart",
    name: "ViewCart ",
    component: ViewCart 
  },
  {
    // 确认订单
    path: "/order_settle",
    name: "OrderSettle",
    component: OrderSettle 
  },
  {
    // 订单提交
    path: "/order_submit",
    name: "OrderSubmit",
    component: OrderSubmit 
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
