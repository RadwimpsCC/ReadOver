<template>
	<view class="content">
		<view class="box">
			<view class="xq_top">
				<text class="tit">0325初一第一次调研考试</text>
				<text class="dir">考试时间:2021.03.25|联考|10个班级|初一|7科</text>
			</view>
			
			<scroll-view scroll-x="true" class="tab_box">
				<text class="tab_li tab_li_cur">总分</text>
				<text class="tab_li">语文</text>
				<text class="tab_li">数学</text>
				<text class="tab_li">生物</text>
				<text class="tab_li">自治</text>
				<text class="tab_li">地理</text>
			</scroll-view>
			
			
			<view class="total">
				<view class="title_name">
					本校总人数501人
				</view>
				
				<view class="table">
					<view class="tit_box tit_box_cur">
						<view class="tit_li tit_li_name">班级</view>
						<view class="tit_li">联考全体</view>
						<view class="tit_li">本校全体</view>
						<view class="tit_li">1班</view>
						<view class="tit_li">2班</view>
						<view class="tit_li">3班</view>
						<view class="tit_li">4班</view>
						<view class="tit_li">5班</view>
						<view class="tit_li">6班</view>
					</view>
					<view class="table_two">
						<scroll-view scroll-x="true" style="white-space: nowrap;" >
								<view class="tit_box">
									<view class="tit_li tit_li_name">
										<text>前10名</text>
										<text> >30 </text>
									</view>
									<view class="tit_li">12</view>
									<view class="tit_li">3</view>
									<view class="tit_li">1</view>
									<view class="tit_li">2</view>
									<view class="tit_li">3</view>
									<view class="tit_li">4</view>
									<view class="tit_li">5</view>
									<view class="tit_li">6</view>
								</view>
								<view class="tit_box">
									<view class="tit_li tit_li_name">
										<text>前20名</text>
										<text> >30 </text>
									</view>
									<view class="tit_li">12</view>
									<view class="tit_li">3</view>
									<view class="tit_li">1</view>
									<view class="tit_li">2</view>
									<view class="tit_li">3</view>
									<view class="tit_li">4</view>
									<view class="tit_li">5</view>
									<view class="tit_li">6</view>
								</view>
								<view class="tit_box">
									<view class="tit_li tit_li_name">
										<text>前20名</text>
										<text> >30 </text>
									</view>
									<view class="tit_li">12</view>
									<view class="tit_li">3</view>
									<view class="tit_li">1</view>
									<view class="tit_li">2</view>
									<view class="tit_li">3</view>
									<view class="tit_li">4</view>
									<view class="tit_li">5</view>
									<view class="tit_li">6</view>
								</view>
								<view class="tit_box">
									<view class="tit_li tit_li_name">
										<text>前50名</text>
										<text> >555分 </text>
									</view>
									<view class="tit_li">12</view>
									<view class="tit_li">3</view>
									<view class="tit_li">1</view>
									<view class="tit_li">2</view>
									<view class="tit_li">3</view>
									<view class="tit_li">4</view>
									<view class="tit_li">5</view>
									<view class="tit_li">6</view>
								</view>
								<view class="tit_box">
									<view class="tit_li tit_li_name">
										<text>前100名</text>
										<text> >30 </text>
									</view>
									<view class="tit_li">12</view>
									<view class="tit_li">3</view>
									<view class="tit_li">1</view>
									<view class="tit_li">2</view>
									<view class="tit_li">3</view>
									<view class="tit_li">4</view>
									<view class="tit_li">5</view>
									<view class="tit_li">6</view>
								</view>
						</scroll-view>
						
					</view>
					
					
					</view>
				
				
				
				
			</view>
			
			
			
			
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

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
.box{width: 90%; margin:30rpx auto;}
.xq_top{ width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 180rpx; background: url(../../static/images/xq_top.jpg) no-repeat; background-size: 100% 100%; color: #fff;}
.xq_top .tit{font-size: 32rpx; margin-bottom: 15rpx;}
.xq_top .dir{font-size: 26rpx;}

.title_name{margin: 10rpx 0; font-size: 30rpx;}
.tab_box{display: flex; height: 50rpx; white-space: nowrap; justify-content: center; margin: 40rpx 0;}
.tab_li{margin: 0 30rpx; position: relative; font-size: 32rpx;}
.tab_li_cur{color:#007AFF ;}
.tab_li_cur::after{position: absolute; content: ""; bottom: -10rpx; left: 20%; width: 60%; height: 6rpx; background: #007AFF; border-radius: 100rpx;}
.total{margin-top: 40rpx; border: 1rpx solid #f1f1f1; padding: 20rpx 20rpx 30rpx; border-radius: 20rpx; box-sizing: border-box;}
.table{width: 100%;border: 1rpx solid #f1f1f1; border-radius: 20rpx; overflow: hidden; display: flex; position: relative; padding-left: 160rpx; box-sizing: border-box;}
.tit_box_cur{position: absolute; left: 0; top: 0; z-index: 99;}
.tit_box{width: 160rpx; display: inline-block;}
.tit_li{text-align: center; height: 60rpx; color: #333; line-height: 60rpx; border-bottom: 1rpx solid #f1f1f1; font-size: 26rpx;}
.tit_li text:nth-child(2){font-size: 26rpx;}
.tit_li_name{height: 80rpx; line-height: 30rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #f1f1f1;}
.box_two{display: flex; background-color: red; }
.table_two{ white-space: nowrap; overflow: hidden; }




</style>
