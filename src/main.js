import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 
import $ from "jquery";
import vant from "./vant";
// 
import plug from "@/utils/plug";
import '@/assets/styles/swiper.css'
import "@/assets/styles/app.scss";
import "@/assets/styles/border.css";
// 
Vue.use(plug);
// rem h5 适配
import 'amfe-flexible'
// 限制rem大小
document.getElementsByTagName('body')[0].style.fontSize=24/75+'rem';
Vue.$checkRem();
$(window).resize(Vue.$checkRem)
// 
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
