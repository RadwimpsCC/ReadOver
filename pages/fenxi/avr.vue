<template>
	<view class="content">
		<view class="box">
			<view class="xq_top" v-if="myidata !=null">
				<text class="tit">{{myidata.title}}</text>
				<text class="dir">考试时间:{{myidata.starttime}}|{{myidata.gradename}}</text>
			</view>
			<scroll-view scroll-x="true" class="tab_box">
				<text :class="suid ==0?'tab_li tab_li_cur':'tab_li'" @click="getmyinfo(0)">总分</text>
				<text @click="getmyinfo(item.id)" :class="suid ==item.id?'tab_li tab_li_cur':'tab_li'"
					v-for="(item,index) in slist" :key="index">{{item.name}}</text>
			</scroll-view>
			<view class="total">
				<view class="titleBox">
					<text class="name">班级</text>
					<text class="rightText">本校平均分/平均分排名</text>
				</view>
				<view class="total_cont" v-if="lk.avg_lk != null">
					<view class="cont_tit">
						<text class="name">联考</text>
						<view class="tit_right">
							<text class="cur">{{lk.avg_lk}}</text>
							<!-- 					<text class="dft">/{{lk.per}}</text> -->
						</view>
					</view>
					<view class="cont_jindu">
						<progress :percent="(lk.avg_lk/ts) * 100" activeColor="#30b6fb" active stroke-width="6"
							border-radius="4" />
					</view>
				</view>

				<view class="total_cont" v-if="lk.avg_xn != null">
					<view class="cont_tit">
						<text class="name">本校</text>
						<view class="tit_right">
							<text class="cur">{{lk.avg_xn}}</text>
							<!-- 		<text class="dft">/{{xn.per}}</text> -->
						</view>
					</view>
					<view class="cont_jindu">
						<progress :percent=" (lk.avg_xn/ts) * 100" activeColor="#30b6fb" active stroke-width="6"
							border-radius="4" />
					</view>
				</view>

				<block v-for="(item,index) in alllist" :key="index">
					<view class="total_cont">
						<view class="cont_tit">
							<text class="name">{{item.name}}</text>
							<view class="tit_right">
								<text class="cur">{{item.avgscores}}</text>
								<!-- 			<text class="dft">/{{item.nu}}</text> -->
							</view>
						</view>
						<view class="cont_jindu">
							<progress :percent="(item.avgscores/ts)* 100" activeColor="#30b6fb" active stroke-width="6"
								border-radius="4" />
						</view>
					</view>
				</block>

			</view>



		</view>

		<view class="zt" @click="qiehuan()">
			切换
		</view>

	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				ts: 1,
				suid: 0,
				bs: '及格率',
				lk: {},
				xn: {},
				type: 0,
				slist: [],
				eid: 0,
				alllist: [],
				myidata: {}
			}
		},
		onLoad(op) {
			if (op != null) {
				this.myidata = getApp().globalData.idata;
				this.ts = this.myidata.totalscore;
				this.eid = op.id;
				this.getmyinfo();
				this.getallsubject();
			}
		},
		methods: {
			qiehuan() {
				this.type += 1;
				if (this.type > 2) this.type = 0;
				let t = this.type;
				if (t == 0) {
					this.bs = '及格率';
				} else if (t == 1) {
					this.bs = '优秀率';
				} else if (t == 2) {
					this.bs = '低分率';
				}
				this.getmyinfo();
			},
			getallsubject() {
				let a = new Object();
				a.cmd = 'subjects';
				a.eid = this.eid;
				console.log(a);
				yu.postme(a, (data) => {
					console.log(JSON.stringify(data));
					if (data.msg.length == 0) {
						this.slist = data.list;
						//console.log(this.alllist);
					} else {
						yu.alert(data.err_msg);
					}
				})
			},
			getmyinfo(s) {
				if (s != null) this.suid = s;
				let a = new Object();
				a.cmd = 'avgrpt';
				a.eid = this.eid;
				a.type = this.type; //
				a.subjectid = this.suid;
				console.log(a);
				yu.postme(a, (data) => {
					console.log(JSON.stringify(data));
					if (data.msg.length == 0) {
						this.lk = data;

						this.alllist = data.list;
						console.log(this.lk);
					} else {
						yu.alert(data.err_msg);
					}
				})

				if (s != null && s != 0) {
					this.slist.forEach((x) => {
						if (x.id == s) {
							this.ts = x.totalscore;
						}
					})
				} else {
					this.ts = this.myidata.totalscore;
				}

			}
		}
	}
</script>

<style>
	.zt {
		position: fixed;
		right: 20rpx;
		font-size: 30rpx;
		bottom: 140rpx;
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		background-color: #31a7ef;
		border-radius: 100rpx;
	}

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

	.tab_box {
		display: flex;
		justify-content: center;
		height: 50rpx;
		white-space: nowrap;
		margin: 40rpx 0;
	}

	.tab_li {
		margin: 0 30rpx;
		position: relative;
		font-size: 32rpx;
	}

	.tab_li_cur {
		color: #007AFF;
	}

	.tab_li_cur::after {
		position: absolute;
		content: "";
		bottom: -10rpx;
		left: 20%;
		width: 60%;
		height: 6rpx;
		background: #007AFF;
		border-radius: 100rpx;
	}
</style>
