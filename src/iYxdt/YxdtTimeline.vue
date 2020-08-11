<template>
  <div class="yxdt-timeline">
    <slot></slot>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss">
.yxdt-timeline{
  margin:30px;
  .yxdt-line-list{
    color:#999;
    font-size:26px;
    line-height:36px;
    display:flex;
    .list-icon{
      width:38px;
      flex-shrink:0;
      position:relative;
      background:url(/static/center/ddd.png) 9px 0 repeat-y;
      padding-top:8px;
      &:before{
        content:'';
        width:18px;
        height:18px;
        border-radius:50%;
        background:#ddd;
        display:block;
      }
    }
    .list-text{
      padding-bottom:30px;
      flex:1;
    }
    &:first-child{
      color:#333;
      .list-icon{
        padding-top:0;
        margin-top:8px;
        &:before{
          background:#FF7A24;
        }
      }
    }
    &:last-child{
      align-items:flex-start;
      .list-text{
        padding:0;
      }
    }
  }
}
</style>