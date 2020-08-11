// <script>
import Vue from "vue";
import $ from "jquery";
import store from "../store";
import { remCoefficient } from '@/utils/methods';

export default {
  install() {
    /* 函数 */
    Vue.$checkRem=()=>{
      var html=document.getElementsByTagName('html')[0];
      var htmlSize=Number(getComputedStyle(html).fontSize.replace('px',''));
      html.style.fontSize=`${htmlSize>75 ? 75 : htmlSize}px`;
    }
    /* 指令 */
    Vue.directive("number", {
      inserted(el, binding) {
        el.oninput = () => {
          el.value = el.value.replace(/[^\d]/g, "");
        };
      }
    });
    Vue.directive("title", {
      inserted: function(el, binding) {
        document.title = el.dataset.title;
      }
    });
    /* 过滤器 */
    Vue.filter("phone", value => {
      return value == undefined
        ? ""
        : value.slice(0, 3) + "****" + value.slice(7);
    });
    Vue.filter("testEmpty",val=>{
      if(val==undefined || val.trim()==''){
        return '--';
      }else{
        return val;
      }
    })
    /* 组件 */
    Vue.component("YxdtLoading",{ // loading组件
      props:{
        show:{
          type:Boolean,
          default:false
        },
        transition:{
          type:Boolean,
          default:true
        },
        no_more:{
          type:Boolean,
          default:false
        },
      },
      render(h){
        var _this=this;
        var show=_this.no_more ? true : _this.show;
        var props={
          staticClass:"yxdt-loading",
          class:{ 
            show:show,
            noTransition:!_this.transition
          },
          style:{
            height:show || !_this.transition ? remCoefficient()*80+'px' : '0px'
          }
        };
        var $content,$rotate,$tip;
        if(_this.no_more){
          $tip=h('div',{
            staticClass:"yxdt-nodata",
          },'没有更多了~');
          $content=h('div',{
            staticClass:"yxdt-loading-content",
          },[$tip]);
        }else{
          $rotate=h('div',{
            staticClass:"yxdt-loading-rotate",
          });
          $tip=h('div',{
            staticClass:"yxdt-loading-tip",
          },'加载中 ...');
          $content=h('div',{
            staticClass:"yxdt-loading-content",
          },[$rotate,$tip]);
        }
        return h(
          'div',
          props,
          [$content]
        )
      }
    })
    Vue.component("YxdtEmpty",{ // empty组件
      props:{
        imgUrl:{
          type:String,
          default:'/mobile_shop/static/center/data-empty.png'
        },
        text:{
          type:String,
          default:'暂无任何订单数据哦~'
        }
      },
      render(h){
        var _this=this;
        var props={ staticClass:"yxdt-empty" }
        
        var $icon_img=h('img',{
          staticClass:"empty-icon",
          domProps:{
            src:_this.imgUrl
          }
        })
        var $icon=h('div',[$icon_img]);
        var $tip=h('div',{
          staticClass:"empty-tip",
        },_this.text);
        return h(
          'div',
          props,
          [$icon,$tip]
        )
      }
    })
    Vue.component("YxdtRate",{ // rate组件
      props:{
        value:{
          type:Number,
          default:0
        }
      },
      render(h){
        var _this=this;
        var props={ staticClass:"yxdt-rate" }
        var $group=[];
        var rate=_this.value;
        for(let i=0;i<5;i++){
          var $list=h('li',{
            class:{ active:i<rate },
            on:{
              click:()=>{
                _this.$emit('input',i+1)
              }
            }
          });
          $group.push($list);
        }
        return h(
          'ul',
          props,
          $group
        )
      }
    })
    Vue.component("ScrollView",{ // 滚动组件
      props:{
        scrollX:{
          type:String,
          default:null
        },
        height:{
          type:Number,
          default:200
        }
      },
      render(h){
        var rc=remCoefficient(); // px/rem
        var px_rem=remCoefficient()*75; // px/rem
        var props={ 
          staticClass:"scroll-view",
          style:{
            height:rc*this.height+'px',
          }
        };
        var $ScrollViewBox=h('div',{
          staticClass:"scroll-view-box",
          style:{
            height:rc*this.height+px_rem+'px',
          }
        },this.$slots.default);
        return h(
          'div',
          props,
          [$ScrollViewBox]
        )
      }
    })
  }
};
