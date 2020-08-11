<template>
    <div class="yxdt-adder">
        <div class="btn" @click="changeNum(-1)">-</div>
        <div class="cw2">
        <input v-model="value" maxLength="4">
        </div>
        <div class="btn" @click="changeNum(1)">+</div>
    </div>
</template>

<script>
import {Toast} from "vant";

export default {
    props:{
        value:{
            type:Number,
            default:1
        }
    },
    methods:{
        changeNum(add){
            var num=this.value+add;
            if(num>0){
                this.$emit('input',num);
            }else{
                Toast('最少购买一件');
            }
        }
    }
}
</script>

<style scoped lang="scss">
.yxdt-adder{
    width:142px;
    height:36px;
    border:1Px solid rgba(221,221,221,1);
    border-radius:18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:4px;
    box-sizing:border-box;
    font-size:0;
    .btn{
        width: 30px;
        height: 30px;
        border-radius:50%;
        background:#F5F5F5;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:26px;
    }
    .cw2{
        flex:1;
        input{
            width:100%;
            text-align:center;
            border:none;
        }
    }
}
</style>