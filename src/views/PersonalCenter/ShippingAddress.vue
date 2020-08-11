<template>
  <div>
    <!-- 收货地址 -->
    <full-modal 
      v-model="show_component" 
      :footer_height="address_list.length ? 106 : 0"
      :empty="!address_list.length"
      >
      <template slot="header">收货地址</template>
      <div class="address_box" slot="body">
        <van-swipe-cell 
          v-for="(address,key) in address_list" 
          :key="key" 
          :right-width="address.default ? btn_width : btn_width*2"
          >
          <div class="address_list">
            <div class="row_1">
              <div class="default_address" v-if="address.default">默认</div>
              <div class="name">邢晓倩</div>
              <div class="phone">185****2516</div>
            </div>
            <div class="row_2">
              <div class="address">北京市 北京市 西城区 莲花池东路3号天云五金大厦308室 西城区 莲花池东路3号天云五金大厦 西城区</div>
              <div class="action border-left c_999">
                <a @click="edit_address">编辑</a>
              </div>
            </div>
          </div>
          <template #right>
            <div class="swipe-actionbox">
              <div class="act s1" @click="set_default(key)" v-if="!address.default"><div>设为<br/>默认</div></div>
              <div class="act" @click="del_address(key)"><div>删除</div></div>
            </div>
          </template>
        </van-swipe-cell>
        <template v-if="!address_list.length">
          <yxdt-empty img-url="/static/center/empty-address.png" text="暂无任何地址信息哦~"/>
          <a class="btn_s1 empty-btn" @click="add_address">新增收货地址</a>
        </template>
      </div>
      <template slot="footer">
        <a class="btn_s1" @click="add_address">新增收货地址</a>
      </template>
    </full-modal>
    <!-- 删除弹窗 -->
    <shadow-modal 
      v-model="show_del" 
      type="middle"
      :show_cancel="true"
      @ok="save_del"
      >
      <template slot="header">确定取消此地址?</template>
      <template slot="body">删除后,数据不可恢复。</template>
    </shadow-modal>
    <!-- 新增收货地址 -->
    <modal-address 
      v-model="show_add"
      header-text="新增收货地址"
      :address-data="addData"
      />
    <!-- 编辑收货地址 -->
    <modal-address 
      v-model="show_edit"
      header-text="编辑收货地址"
      :address-data="editData"
      />
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import { Toast } from 'vant';
import { remCoefficient } from '@/utils/methods';
// 
import FullModal from "@/iYxdt/FullModal";
import ShadowModal from "@/iYxdt/ShadowModal";
import ModalAddress from "@/views/components/ModalAddress";

export default {
  data(){
    return {
      show_component:false,  // 收货地址
      address_list:[
        {default:true},
        {default:false},
        {default:false}
      ],
      // 
      show_del:false,
      show_add:false,
      show_edit:false,
      // 
      editShowPicker: false,
      picker_columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }],
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }],
            },
          ],
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }],
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }],
            },
          ],
        },
      ],
      // 
      addData:{
        address_id:null,
        name:'',
        phone:'',
        address:'',
        address_detail:'',
        default_checked:false,
      },
      editData:{
        address_id:3,
        name:'1',
        phone:'2',
        address:'福建,厦门,海沧区',
        address_detail:'3',
        default_checked:true,
      },
    }
  },
  computed:{
    btn_width(){
      var w=remCoefficient()*110;
      return w;
    }
  },
  methods:{
    set_default(key){
      this.address_list.forEach((item,index)=>{
        item.default=key==index;
      });
      Toast('默认地址设置成功');
    },
    del_address(key){
      console.log('del_address',key);
      this.show_del=true;
    },
    add_address(){
      console.log('add_address');
      this.addData={
        address_id:null,
        name:'',
        phone:'',
        address:'',
        address_detail:'',
        default_checked:false,
      },
      this.show_add=true;
    },
    edit_address(){
      console.log('edit_address');
      this.show_edit=true;
    },
    // 
    save_del(){
      console.log('save_del');
      Toast('删除成功');
    },
    //
    editPickerConfirm(data_address) {
      this.editData.address = data_address+'';
      this.editShowPicker = false;
    },
  },
  components:{
    FullModal,
    ShadowModal,
    ModalAddress,
  }
}
</script>

<style scoped lang="scss">
.address_box{
  .address_list{
    background:#fff;
    padding:30px;
    .row_1{
      display:flex;
      font-size:30px;
      align-items:center;
      .default_address{
        line-height:34px;
        background:#FF6901;
        border-radius:17px;
        font-size:22px;
        color:#fff;
        padding:0 18px;
        margin-right:20px;
      }
      .phone{
        margin-left:30px;
      }
    }
    .row_2{
      margin-top:15px;
      display:flex;
      align-items:flex-start;
      .address{
        flex:1;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
        font-size:26px;
      }
      .action{
        flex-shrink:0;
        line-height:30px;
        box-sizing:border-box;
        padding-left:21px;
        margin-left:20px;
        a{
          color:#999;
          font-size:26px;
        }
      }
    }
    &+.address_list{
      margin-top:1Px;
    }
  }
}
</style>