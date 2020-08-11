<template>
	<div class="cart-body-list">
		<div class="cart-select" :class="{selected:data.select}" @click="data.select=!data.select"></div>
		<img  class="cart-pic" src="" alt="">
		<div class="cart-word-box">
			<div class="cart-word">博文（bowen) 25202皮面笔记本 单本
			装皮面笔记本 单本皮面笔记本 单本 ...</div>
			<div class="cart-word-bottom">
				<div class="cart-word-bottom1">
					<span class="s1">￥</span><span class="s2">128.00</span>
				</div>
				<yxdt-adder v-model="data.num"/>
			</div>
		</div>
	</div>
</template>

<script>
import YxdtAdder from '@/iYxdt/YxdtAdder.vue';

export default {
	props:{
		data:{
			type:Object,
			default:{}
		}
	},
	components:{
		YxdtAdder,
	},
}
</script>

<style scoped lang="scss">
	.cart-body-list{
		margin-bottom:40px;
		height:200px;
		padding:0 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.cart-select{
			width:36px;
			height:36px;
			background:rgba(255,101,1,0);
			border:2px solid rgba(204, 204, 204, 1);
			border-radius:50%;
			box-sizing:border-box;
			&.selected{
				background:url(/mobile_shop/static/center/selected.png) 0 0 no-repeat;
				background-size:100% 100%;
				border:none;
			}
		}
		.cart-pic{
			width:200px;
			height:200px;
			margin-left:30px;
			background:#f00;
		}
		.cart-word-box{
			align-self:flex-start;
			margin-left:20px;
			position:relative;
			height:100%;
			.cart-word{
				width:405px;
				height:57px;
				margin-top:20px;
				font-size:24px;
			}
			.cart-word-bottom{
				position:absolute;
				bottom:20px;
				left:0;
				right:0;
				display: flex;
				justify-content: space-between;
				.cart-word-bottom1{
				color:#FF6501;
				.s1{
					font-size:20px;
				}
				.s2{
					font-size:34px;
					font-weight:bold;
				}
				}
			}
		}
	}
</style>