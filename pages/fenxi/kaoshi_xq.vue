<template>
	<view class="content">
		<view class="box">
			<view class="xq_top" v-if="myidata !=null">
				<text class="tit">{{myidata.title}}</text>
				<text class="dir">考试时间:{{myidata.starttime}}|{{myidata.gradename}}</text>
			</view>
			<view class="xq_list">
				<navigator :url="'gaikuang?id='+eid" hover-class="none" class="xq_li">
					<image src="../../static/images/xq_icon1.png" mode="widthFix" class="xq_icon"></image>
					<text class="xq_text">总概况</text>
				</navigator>
				<navigator :url="'paihang?id='+eid" hover-class="none" class="xq_li">
					<image src="../../static/images/xq_icon2.png" mode="widthFix" class="xq_icon"></image>
					<text class="xq_text">排行榜</text>
				</navigator>
				<navigator :url="'avr?id='+eid" hover-class="none" class="xq_li">
					<image src="../../static/images/xq_icon3.png" mode="widthFix" class="xq_icon"></image>
					<text class="xq_text">平均分</text>
				</navigator>
				<navigator :url="'sanlv?id='+eid" hover-class="none" class="xq_li">
					<image src="../../static/images/xq_icon4.png" mode="widthFix" class="xq_icon"></image>
					<text class="xq_text">三率分析</text>
				</navigator>
		<!-- 		<navigator url="" hover-class="none" class="xq_li">
					<image src="../../static/images/xq_icon5.png" mode="widthFix" class="xq_icon"></image>
					<text class="xq_text">名次分析</text>
				</navigator> -->


			</view>



		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				myidata: {},
				eid: 0,
				title: 'Hello'
			}
		},
		onLoad(op) {

			if (op != null) {
				//console.log(getApp().globalData.idata);
				this.myidata = getApp().globalData.idata;
				this.eid = op.id;

			}

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.box {
		width: 90%;
		margin: 30rpx auto;
	}

	.xq_top {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180rpx;
		background: url(../../static/images/xq_top.jpg) no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}

	.xq_top .tit {
		font-size: 32rpx;
		margin-bottom: 15rpx;
	}

	.xq_top .dir {
		font-size: 26rpx;
	}

	.xq_list {
		display: flex;
		flex-flow: row wrap;
		margin-top: 30rpx;
	}

	.xq_li {
		width: calc(50% - 15rpx);
		margin: 0 20rpx 20rpx 0;
		display: flex;
		align-items: center;
		background-color: #f8f8f8;
		height: 140rpx;
		border-radius: 20rpx;
	}

	.xq_icon {
		width: 75rpx;
		height: 75rpx;
		margin-left: 30rpx;
	}

	.xq_text {
		font-size: 32rpx;
		color: #666;
		margin-left: 20rpx;
	}

	.xq_list .xq_li:nth-child(2n) {
		margin-right: 0rpx;
	}
</style>
