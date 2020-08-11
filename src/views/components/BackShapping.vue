
<template>
  <div>
    <div class="content">
      <div class="car"></div>
      <div class="back" @click="goBack"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  methods:{
    goBack(){
      var body=$('.search_body').find('.full_modal_body');
      body.animate({scrollTop:0},300);
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    width:76px;
    height:172px;
    display:flex;
    flex-direction: column;
    .car{
      background-image: url('../../assets/image/images/goods/car.png');
      background-size:100% 100%;
      width:76px;
      height:76px;
    }
    .back{
      background-image: url('../../assets/image/images/goods/back.png');
      background-size:100% 100%;
      width:76px;
      height:76px;
      margin-top:20px;
    }
  }
</style>