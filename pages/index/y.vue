<template>
	<view class="content">
		<view class="foot_sn">
			<view class="sn_li"> <text class="sn_li_text">满分</text> </view>
			<view class="sn_li"><text class="sn_li_text">0</text> </view>
			<view class="sn_li"><text class="sn_li_text">1</text> </view>
			<view class="sn_li"><text class="sn_li_text">2</text> </view>
			<view class="sn_li"><text class="sn_li_text">3</text> </view>
			<view class="sn_li"><text class="sn_li_text">4</text> </view>
			<view class="sn_li"><text class="sn_li_text">5</text> </view>
			<view class="sn_li"><text class="sn_li_text">6</text> </view>
			<view class="sn_li"><text class="sn_li_text">7</text> </view>
			<view class="sn_li"><text class="sn_li_text">8</text> </view>
			<view class="sn_li"><text class="sn_li_text">9</text> </view>
			<view class="sn_li"><text class="sn_li_text">.</text> </view>
			<view class="sn_li"><text class="sn_li_text">零分</text> </view>
			<view class="sn_li"><text class="sn_li_text">删除</text> </view>
		</view>
		
		
		<view class="shiti">
			<view class="fanhui">
				<image src="../../static/fanhui.png" class="fanhui_img sn_li_text" mode="widthFix"></image>
			</view>
			
			<view class="shiti_top">
				<scroll-view scroll-x="true" >
					<view class="shiti_top_box">
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.1</text></view>
							
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.266</text></view>
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.3</text></view>
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.4</text></view>
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.5</text></view>
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.6</text></view>
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.7</text></view>
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.8</text></view>
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.9</text></view>
						</view>
						<view class="shiti_li">
							<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
							<view class="ti_name"><text class="sn_li_text">一.10</text></view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			
			
			<view class="bot_gn">
				<view class="fenye">
					<view class="fy_li">
						<text class="sn_li_text">上一页</text>
						<text class="sn_li_text">下一页</text>
					</view>
				</view>
			<!-- 	<view class="jindu">
					<text class="sn_li_text2">进度1/260</text>
				</view> -->
			</view>
			
		</view>
	</view>
	
	
</template>

<script>
	
</script>

<style>
page,.content{width: 100%; height: 100%; }
.foot_sn{position: fixed; left: 0; top: 0; width: 60rpx; height: 100%;background-color: #4bc2ac;}
.foot_sn .sn_li{background-color: #4bc2ac;height: 7.1%; box-sizing: border-box; display: flex; align-items: center; justify-content: center;  color: #fff; text-align: center; border-bottom: 1px solid #87fee8;}
.sn_li_text{ transform: rotate(0deg); display:block;  }


.shiti{position: fixed;right: 0; top: 0;  background-color: #4bc2ac; width: 140rpx; overflow: hidden; height: 100%; color: #fff; padding-top: 50rpx; padding-left: 20rpx; box-sizing: border-box;}
.shiti_top{height:65%; width: 100rpx; border: 1rpx solid #87fee8; border-width: 1rpx 0px 0 1rpx;overflow: hidden;  }
.shiti_top_box{width: 100%; height: 100%;background-color: #4CD964;}
.shiti_li{ display: flex; flex-direction: row; height: 100rpx; width: 100%; }
.ti_name{border: 1px solid #87fee8; display: flex;  border-width: 0rpx 1rpx 1rpx 0rpx;align-items: center; justify-content: center;  height: 100%; width: 50rpx; }
.ti_val{border: 1px solid #87fee8; display: flex;  border-width: 0rpx 1rpx 1rpx 0rpx; width: 50rpx;align-items: center; justify-content: center;height: 100%; }

.fanhui{ display: flex; align-items: center; justify-content: center; padding: 10rpx 0; box-sizing: border-box;}
.fanhui_img{width: 45rpx; height: 45rpx; display: block; }

.bot_gn{margin-top: 30rpx;  display: flex; overflow: hidden; position: relative; height: 280rpx; }
.fenye { width:350rpx;display: flex; flex-direction: row; }
.fy_li{ width:150rpx;height:60rpx; display: flex; align-items: center; justify-content: center;}
.jindu{width: 50px; height: 250rpx;background-color: red;  }
.sn_li_text2{ display:block; width: 100rpx;text-overflow: inherit; transform-origin:left bottom;transform: rotate(0deg);}


</style>
