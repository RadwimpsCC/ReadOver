<template>
	<view class="ul">
		<view class="li" v-for="(item,index) in pics" :key="index">
			<image :src="picHost+item" 
			class="item_img" mode="widthFix" lazy-load="true" fade-show="true" ></image>
		</view>
	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				pics:[],
				picHost:yu.baseUrl
			}
		},
		onLoad(option) {
			if(option.pics){
				this.pics=JSON.parse(decodeURIComponent(option.pics));
			}
		},
		methods: {
		}
	}
</script>

<style>
	.ul{
		box-sizing: border-box;width: 100%;
		flex-direction: column;
	}
	.li{
		box-sizing: border-box;width: 100%;
	}
	.item_img{
		width: 100%;
	}
	
</style>
