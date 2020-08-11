<template>
  <shadow-modal 
    v-model="value2"
    @ok="save_address"
    >
    <template slot="header">{{headerText}}</template>
    <template slot="body">
      <div class="shadow_add">
        <div class="row">
          <van-field v-model="addressData.name" label="收货人" placeholder="请输入收货人名称" />
        </div>
        <div class="row">
          <van-field v-model="addressData.phone" label="手机号码" placeholder="收货人手机号码" maxLength="11" />
        </div>
        <div class="row">
          <van-field
            readonly
            clickable
            label="所在地址"
            :value="addressData.address"
            placeholder="请选择省/市/区"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" round position="bottom">
            <van-picker 
              show-toolbar 
              title="请选择省/市/区" 
              :columns="picker_columns" 
              @cancel="showPicker = false"
              @confirm="pickerConfirm"
            />
          </van-popup>
        </div>
        <div class="row">
          <van-field v-model="addressData.address_detail" label="详细地址" placeholder="请输入小区/街道门牌/楼层" />
        </div>
        <div class="row">
          <div class="flex-box">
            <div class="item-lable">设为默认地址</div>
            <div class="item-content">
              <van-switch 
                v-model="addressData.default_checked" 
                active-color="#4FD262" 
                inactive-color="#E5E5E5" 
                :size="60/75+'rem'" 
                />
            </div>
          </div>
        </div>
      </div>
    </template>
  </shadow-modal>
</template>

<script>
import ShadowModal from "@/iYxdt/ShadowModal";

export default {
  data(){
    return {
      showPicker: false,
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
    }
  },
  props:{
    value:{
      type:Boolean,
      default:false
    },
    headerText:String,
    addressData:{
      type:Object,
      default(){
        return {
          address_id:null,
          name:'',
          phone:'',
          address:'',
          address_detail:'',
          default_checked:false,
        }
      }
    }
  },
  computed:{
    value2:{
      get(){
        return this.value;
      },
      set(nv){
        this.$emit('input',nv);
      }
    }
  },
  methods:{
    save_address(){
      console.log('save_address');
      console.log(this.addressData);
    },
    pickerConfirm(data_address) {
      this.addressData.address = data_address+'';
      this.showPicker = false;
    },
  },
  components:{
    ShadowModal,
  }
}
</script>

<style scoped lang="scss">
.shadow_add{
  padding:36px 30px;
  .row{
    .van-field{
      height:62px;
      align-items:center;
    }
    &+.row{
      margin-top:28px;
    }
    .flex-box{
      height:62px;
      display:flex;
      align-items:center;
      font-size:28px;
      line-height:28px;
      .item-lable{
        flex-shrink:0;
        width:6em;
        margin-right:12px;
      }
      .item-content{
        flex:1;
        display:flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>