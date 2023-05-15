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


			<!-- 			<view class="total">
				<view class="titleBox">
					<text class="name">联考排名前5学生</text>
				</view>

				<view class="table">
					<view class="table_tit">
						<text class="table_tit_li">姓名</text>
						<text class="table_tit_li">班级</text>
						<text class="table_tit_li">分数</text>
						<text class="table_tit_li">排名(学校/班级)</text>
					</view>
					<block v-for="(item,index) in alllist" :key="index">
						<view class="table_tit table_tit_two">
							<text class="table_tit_li">{{item.student_name}}</text>
							<text class="table_tit_li">{{item.student_classname}}</text>
							<text class="table_tit_li">{{item.sumscores}}</text>
							<text class="table_tit_li">{{item.nu_school}}/{{item.nu_class}}</text>
						</view>
					</block>
				</view>
			</view> -->



			<view class="total">
				<view class="titleBox">
					<text class="name">联考总人数{{row}}人</text>
					<view class="inputBox">
						<view class="so">
							<input type="text" v-model="key" class="so_input" placeholder="搜索学生"
								placeholder-style="font-size:28rpx" />
							<image @click="getmyinfo()" src="../../static/images/so.png" class="so_btn"
								mode="aspectFill">
							</image>
						</view>
					</view>
				</view>

				<view class="table">
					<view class="table_tit">
						<text class="table_tit_li">姓名</text>
						<text class="table_tit_li">班级</text>
						<text class="table_tit_li">分数</text>
						<text class="table_tit_li">排名(学校/班级)</text>
					</view>
					<block v-for="(item,index) in alllist" :key="index">
						<view class="table_tit table_tit_two">
							<text class="table_tit_li">{{item.student_name}}</text>
							<text class="table_tit_li">{{item.student_classname}}</text>
							<text class="table_tit_li">{{item.sumscores}}</text>
							<text class="table_tit_li">{{item.nu_school}}/{{item.nu_class}}</text>
						</view>
					</block>

				</view>

				<view class="page">
					<image src="../../static/images/left.png" mode="widthFix" class="left_btn" @click="qian()"></image>
					<text class="">{{nowpage}}/{{allpage}}</text>
					<image src="../../static/images/right.png" mode="widthFix" class="left_btn" @click="hou()"></image>
				</view>

			</view>





		</view>



	</view>
</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				myidata: {},
				slist: [],
				key: '',
				allpage: 0,
				nowpage: 1,
				row: 0,
				eid: 0,
				alllist: [],
				suid: 0
			}
		},
		onLoad(op) {
			if (op != null) {
				this.myidata = getApp().globalData.idata;
				this.eid = op.id;
				this.getmyinfo();
				this.getallsubject();
			}
		},
		methods: {

			hou() {
				if (this.nowpage + 1 > this.allpage) return yu.alert2('最后一页了');
				this.nowpage += 1;
				this.getmyinfo();

			},
			qian() {
				if (this.nowpage - 1 < 1) return;
				this.nowpage -= 1;
				this.getmyinfo();
			},
			getmyinfo(s) {
				if (s != null) this.suid = s;
				let a = new Object();
				a.cmd = 'phb';
				a.eid = this.eid;
				a.keys = this.key;
				a.subjectid = this.suid;
				a.p = this.nowpage;
				a.ps = 10;
				console.log(a);
				yu.postme(a, (data) => {
					console.log(data);
					if (data.msg.length == 0) {
						this.row = data.rows;
						this.nowpage = data.page;
						this.allpage = data.pagecount;
						this.alllist = data.list;

					} else {
						yu.alert(data.err_msg);
					}
				})
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

	.tab_box {
		display: flex;
		height: 50rpx;
		white-space: nowrap;
		justify-content: center;
		margin: 40rpx 0;
	}

	.tab_li {
		margin: 0 30rpx;
		position: relative;
		font-size: 28rpx;
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
		align-items: center;
		padding: 0 0 15rpx;
		border-bottom: 1rpx solid #f1f1f1;
	}

	.titleBox .name {
		font-size: 32rpx;
		color: #333;
	}

	.titleBox .inputBox {
		font-size: 26rpx;
		color: #666;
		width: 240rpx;
	}

	.so {
		width: 100%;
		display: flex;
		height: 50rpx;
		line-height: 50rpx;
		align-items: center;
		padding: 0 10rpx 0 10rpx;
		box-sizing: border-box;
		background-color: #f1f1f1;
		border-radius: 100rpx;
	}

	.so_input {
		width: calc(100% - 30rpx);
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.so_btn {
		width: 30rpx;
		height: 30rpx;
		padding: 10rpx;
	}

	.table {
		width: 100%;
		border: 1rpx solid #f1f1f1;
	}

	.table .table_tit {
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		background-color: #f1f1f1;
	}

	.table_tit .table_tit_li {
		font-size: 27rpx;
		width: 130rpx;
		text-align: center;
		display: block;
	}

	.table_tit .table_tit_li:last-child {
		width: 240rpx;
	}

	.table .table_tit_two {
		background-color: #fff;
		border-bottom: 1rpx solid #f1f1f1;
	}

	.table .table_tit_two:last-child {
		border: none;
	}

	.left_btn {
		width: 40rpx;
		height: 40rpx;
		margin: 0 20rpx;
	}

	.page {
		width: 100%;
		justify-content: center;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}

	.table_tit_two .table_tit_li {
		color: #333;
	}
</style>
