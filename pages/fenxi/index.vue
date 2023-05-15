<template>
	<view class="content">
		<view class="box">
			<view class="total">
				<view class="lk">
					<view class="sn">
						{{idata.count_lk}}<label>场</label>
					</view>
					<view class="text">
						联考考试
					</view>
				</view>
				<view class="xn">
					<view class="sn">
						{{idata.count_xk}}<label>场</label>
					</view>
					<view class="text">
						校内考试
					</view>
				</view>
			</view>

			<view class="so">
				<input type="text" value="" placeholder="搜索考试名字" class="so_input" placeholder-style="font-size:30rpx" />
				<image src="../../static/images/so.png" mode="widthFix" class="so_btn"></image>
			</view>

			<view class="js">
				<view class="js_li">
					<text class="js_li_text">全体</text>
					<image src="../../static/images/jiantou.png" mode="widthFix" class="js_jiantou"></image>
				</view>
				<view class="js_li">
					<text class="js_li_text">全部</text>
					<image src="../../static/images/jiantou.png" mode="widthFix" class="js_jiantou"></image>
				</view>
			</view>

			<view class="ks_list">
				<block v-for="(item,index) in list" :key="index">
					<view @click="changeke(item.id)" class="ks_li">
						<view class="ks_li_tit">
							{{item.title}}
						</view>
						<view class="ks_li_btm">
							时间:{{item.starttime}}|年级:{{item.gradename}}|学校:{{item.schools}}|满分:{{item.totalscore}}|科目:{{item.subjects}}
						</view>
						<!-- 考试类别 -->
						<image :src="item.isunion == 1?'../../static/images/lk.png':'../../static/images/xn.png'"
							mode="widthFix" class="lk_img"></image>
					</view>
				</block>


			</view>



		</view>



	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				idata: {},
				list: [],
			}
		},
		onLoad() {
			this.getmyinfo();
		},
		methods: {
			changeke(sid) {
				this.list.forEach((x) => {
					if (x.id == sid) {
						getApp().globalData.idata = x;
					}
				});
				yu.tz('kaoshi_xq?id=' + sid);
			},
			getmyinfo() {
				let a = new Object();
				a.cmd = 'exams';
				a.p = 1;
				a.ps = 10;
				console.log(a);
				yu.postme(a, (data) => {
					console.log(JSON.stringify(data));
					if (data.msg.length == 0) {
						this.idata = data;
						this.list = data.list;
						//console.log(this.alllist);
					} else {
						yu.alert(data.err_msg);
					}
				})
			}
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
		width: 94%;
		margin: 30rpx auto;
	}

	.total {
		display: flex;
		justify-content: space-between;
	}

	.lk {
		width: calc(50% - 15rpx);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180rpx;
		background: url(../../static/images/lk_bg.png) no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}

	.xn {
		width: calc(50% - 15rpx);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180rpx;
		background: url(../../static/images/xn_bg.png) no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}

	.lk .sn {
		display: flex;
		font-size: 62rpx;
		justify-content: center;
		align-items: center;
		height: 50rpx;
	}

	.lk .sn label {
		font-size: 30rpx;
		display: block;
		margin-top: 20rpx;
	}

	.lk .text {
		font-size: 32rpx;
		margin-top: 10rpx;
	}

	.xn .sn {
		display: flex;
		font-size: 62rpx;
		justify-content: center;
		align-items: center;
		height: 50rpx;
	}

	.xn .sn label {
		font-size: 30rpx;
		display: block;
		margin-top: 20rpx;
	}

	.xn .text {
		font-size: 32rpx;
		margin-top: 10rpx;
	}

	.so {
		width: 100%;
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		align-items: center;
		padding: 0 20rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #ededed;
		border-radius: 100rpx;
		margin: 40rpx auto;
	}

	.so_input {
		width: calc(100% - 60rpx);
	}

	.so_btn {
		width: 40rpx;
		height: 40rpx;
	}

	.js {
		display: flex;
		justify-content: center;
	}

	.js_jiantou {
		width: 20rpx;
		height: 20rpx;
	}

	.js_li {
		margin: 0 40rpx;
	}

	.js_li_text {
		margin-right: 10rpx;
		color: #2c69cd;
	}

	.ks_list {
		margin-top: 40rpx;
	}

	.ks_li {
		border: 1px solid #d3d3d3;
		border-radius: 20rpx;
		padding: 25rpx 0 25rpx 70rpx;
		position: relative;
		margin-bottom: 30rpx;
	}

	.ks_li_tit {
		font-size: 32rpx;
	}

	.ks_li_btm {
		font-size: 25rpx;
		color: #636363;
	}

	.lk_img {
		position: absolute;
		width: 40rpx;
		top: 0;
		left: 16rpx;
		z-index: 33;
	}
</style>
