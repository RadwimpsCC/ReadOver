<template>
	<view class="content">
		<view class="box">
			<view class="xq_top" v-if="myidata !=null">
				<text class="tit">{{myidata.title}}</text>
				<text class="dir">考试时间:{{myidata.starttime}}|{{myidata.gradename}}</text>
			</view>
			<view class="total">
				<view class="titleBox">
					<text class="name">总人数</text>
					<text class="rightText">学科总人数/本校参考人数</text>
				</view>
				<block v-for="(item,index) in alllist" :key="index">
					<view class="total_cont">
						<view class="cont_tit">
							<text class="name">{{item.subject_name}}</text>
							<view class="tit_right">
								<text class="cur">{{item.exam_students + item.miss_students}}</text>
								<text class="dft">/{{item.exam_students}}</text>
							</view>
						</view>
						<view class="cont_jindu">
							<progress :percent="(item.exam_students/(item.exam_students + item.miss_students)) * 100"
								activeColor="#30b6fb" active stroke-width="6" border-radius="4" />
						</view>
					</view>
				</block>

			</view>

			<view class="total">
				<view class="titleBox">
					<text class="name">平均分</text>
					<text class="rightText">本校平均分/满分</text>
				</view>
				<block v-for="(item,index) in alllist" :key="index">
					<view class="total_cont">
						<view class="cont_tit">
							<text class="name">{{item.subject_name}}</text>
							<view class="tit_right">
								<text class="cur">{{item.avg_score}}</text>
								<text class="dft">/{{item.totalscore}}</text>
							</view>
						</view>
						<view class="cont_jindu">
							<progress :percent="(item.avg_score/item.totalscore) * 100" activeColor="#f4a419" active
								stroke-width="6" border-radius="4" />
						</view>
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
				myidata: '',
				eid: 0,
				alllist: []
			}
		},
		onLoad(op) {
			if (op != null) {
				this.myidata = getApp().globalData.idata;
				this.eid = op.id;
				this.getmyinfo();

			}
		},
		methods: {
			getmyinfo() {
				let a = new Object();
				a.cmd = 'xjrpt1';
				a.eid = this.eid;
				console.log(a);
				yu.postme(a, (data) => {
					console.log(JSON.stringify(data));
					if (data.code == 0) {
						this.alllist = data.data;
						console.log(this.list);
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

	.total {
		margin-top: 40rpx;
		border: 1rpx solid #f1f1f1;
		padding: 20rpx 20rpx 30rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
	}

	.titleBox {
		display: flex;
		justify-content: space-between;
		padding: 0 0 15rpx;
		border-bottom: 1rpx solid #f1f1f1;
	}

	.titleBox .name {
		font-size: 32rpx;
		color: #333;
	}

	.titleBox .rightText {
		font-size: 26rpx;
		color: #666;
	}

	.total_cont {
		margin-top: 20rpx;
	}

	.cont_tit {
		display: flex;
		justify-content: space-between;
	}

	.cont_tit .name {
		font-size: 30rpx;
		color: #666;
	}

	.tit_right {
		font-size: 26rpx;
		color: #666;
	}

	.tit_right .cur {
		color: #333;
	}

	.cont_jindu {
		margin-top: 10rpx;
		width: 100%;
		border-radius: 100rpx;
		overflow: hidden;
	}
</style>
