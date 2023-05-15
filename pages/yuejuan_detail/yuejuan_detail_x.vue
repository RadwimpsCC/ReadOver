<template>
	<view class="content">
		<!-- 状态栏 -->
		<!-- <view class="zt"></view> -->
		<!-- 导航 -->
		<view class="dh">
			<view>
				<!-- <view class="top_left">
					<image src="../../static/images/fanhui.png" class="fanghui" @click="back()"></image>
				</view> -->
				<!-- 			<scroll-view scroll-x="true" show-scrollbar="true" :scroll-left="scrollLeft"
					style="width: 350rpx;min-width: 300rpx;margin-left: 20rpx;">
					<view class="ti_list" :style="questionStyle">
						<view v-for="(item,index) in questions" class="ti_li" @click="questionClick(index)"
							:class="questionIndex==index?'current':''">
							<text class="name">{{item.title}}</text>
							<text class="val">{{questionScore[index]<0?(''):(questionScore[index]+'')}}</text>
						</view>
					</view>
				</scroll-view> -->
				<view class="top_li">
					<view class="top_li_left">
						<image @click="back()" src="../../static/images/fanhui.png" mode="widthFix" class="fanghui"></image>
						<view class="jindu_box">
							<image src="../../static/images/new_yue_icon2.png" mode="widthFix" class="jidu_icon"></image>
							<text class="jindu">进度：{{jindu}}</text>
						</view>
						<view class="jindu_box">
							<image src="../../static/images/new_yue_icon3.png" mode="widthFix" class="jidu_icon"></image>
							<text class="avg">平均分：{{avg}}</text>
						</view>
					</view>
					
					<view class="top_li_right">
						
						<view class="yeBox">
							<view class="ye_li" @click="navPrevClick">
								<image src="../../static/images/new_yue_icon4.png" class="top_li_icon"></image>
								<text class="ye_li_text" >上一页</text>
							</view>
							<view class="ye_li" @click="navNextClick" >
								<image src="../../static/images/new_yue_icon5.png" class="top_li_icon"></image>
								<text class="ye_li_text">下一页</text>
							</view>
						</view>
						
						
					
						<view class="yeBox">
							<view class="ye_li"  @click="rotateClick" >
								<image src="../../static/images/new_yue_icon6.png" class="top_li_icon"></image>
								<text class="ye_li_text" >翻转</text>
							</view>
							
							<view class="ye_li"  @click="yinanClick" >
								<image src="../../static/images/new_yue_icon7.png" class="top_li_icon"></image>
								<text class="ye_li_text" >疑难卷</text>
							</view>
							<view class="ye_li"  @click="geifenClick()">
								<image src="../../static/images/new_yue_icon8.png" class="top_li_icon"></image>
								<text class="ye_li_text">常用给分</text>
							</view>
							
							<view class="ye_li"  @click="moreClick()">
								<image src="../../static/images/new_yue_icon9.png" class="top_li_icon"></image>
								<text class="ye_li_text">设置</text>
							</view>
							
							
						</view>
						
						
						
						
						
						
					

						<!-- <text class="dafenban_btn" @click="boo =!boo">打分版</text> -->
						
						<!-- 			<navigator open-type="redirect" :url="'yuejuan_detail?id='+id" style="margin-left: 15rpx;">切换竖屏
						</navigator> -->
						
					</view>
				</view>
			</view>
		</view>

		<!-- 内容 -->
		<div class="main">
			<!-- 打分版 -->
			<view class="dafenban_box">
				<scroll-view scroll-y="true" class="stscroll">
					<view class="shiti_li" v-for="(item,index) in pageQuickScores" :key="index"
						@click="quickScoreItemClick(index)" :class="questionScore[questionIndex]==item?'shiti_li_cur':''">
						<view class="ti_val"> <text class="sn_li_text">{{item}}</text></view>
					</view>
				</scroll-view>
			</view>
			<!-- 试题题目列1表 -->

			<view class="shiti">
				<scroll-view scroll-y="true" class="stscroll">
					<view class="shiti_itme" :class="questionIndex==index?'shiti_itme_cur':''" v-for="(item,index) in questions" @click="questionClick(index)">
						<view class="ti_val"> <text class="sn_li_text">{{item.title}}</text></view>
						<view class="ti_name"><text
								class="sn_li_text">{{questionScore[index]<0?(' '):(questionScore[index]+'')}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 		<view style="position: fixed;top:20rpx;width:40rpx;height: 100%;color: white;font-size: 14rpx;">
				<scroll-view scroll-y="true" class="stscroll">
					<view class="shiti_li">
						<view class="ti_val"> <text class="sn_li_text"> 222</text></view>
						<view class="ti_name"><text class="sn_li_text">一.1</text></view>
					</view>
				</scroll-view>
			</view> -->
			<movable-area scale-area class="movable-area"
				style="margin-left: 90rpx; width: 600rpx;height: 100%;margin-top: 20rpx;">
				<movable-view class="movable-view" :direction="movableDir" scale="true" scale-min="1" scale-max="4"
					:scale-value="scale" :style="movableViewStyle">
					<view class="picContent" v-for="(item,index) in papers" :key="index">
						<image :id="'paper'+index" :src="picHost+ item.path" class="pic" mode="widthFix"
							lazy-load="true" @error="paperImageError($event,index)" @load="imageLoad($event,index)"
							@touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
							@touchcancel="touchcancel" style="display: block;">
						</image>
						<block v-for="(item2,index2) in pageHjItems[index]" :key="index2">
							<!-- 边框 -->
							<view class="hjshowitem biankuang" @click.stop="hjShowItemClick(index,index2)"
								v-if="item2.type==1"
								:style="'left:'+item2.left+'px;top:'+item2.top+'px;width:'+item2.width+'px;height:'+item2.height+'px'">
							</view>
							<!--文字-->

							<view class="hjshowitem wenzi" @click.stop="hjShowItemClick(index,index2)"
								v-if="item2.type==2" :style="'left:'+item2.left+'px;top:'+item2.top+'px'">
								<text class="wenzi_text">{{item2.text}}</text>
							</view>
							<!--横线-->
							<view class="hjshowitem hengxian" @click.stop="hjShowItemClick(index,index2)"
								v-if="item2.type==3"
								:style="'left:'+item2.left+'px;top:'+item2.top+'px;width:'+item2.width+'px'">
							</view>
							<!--对号-->
							<view class="hjshowitem hjimage" @click.stop="hjShowItemClick(index,index2)"
								v-if="item2.type==4" :style="'left:'+item2.left+'px;top:'+item2.top+'px'">
								<image src="../../static/images/hj_2.png" class="hjimage_img"></image>
							</view>
							<!--错号-->
							<view class="hjshowitem hjimage" @click.stop="hjShowItemClick(index,index2)"
								v-if="item2.type==5" :style="'left:'+item2.left+'px;top:'+item2.top+'px'">
								<image src="../../static/images/hj_3.png" class="hjimage_img" ></image>
							</view>
							<!--半对-->
							<view class="hjshowitem hjimage" @click.stop="hjShowItemClick(index,index2)"
								v-if="item2.type==6" :style="'left:'+item2.left+'px;top:'+item2.top+'px'">
								<image src="../../static/images/hj_4.png" class="hjimage_img"></image>
							</view>
						</block>
					</view>

				</movable-view>
			</movable-area>
		</div>
		<!-- 提交悬浮按钮 -->
		<text class="tijiao" @click="nextClick()" v-if="boo">{{questionIndex <(questions.length-1)?'下一步':'提交'}}</text>
		<!-- 底部 -->
		<view class="hjmenu" :animation="hjMenuAnimationData">
			<!-- <view :class="'hjmenu_item '+ (pageHjSelectIndex==1?'hjmenu_item_current':'')" @click="hjMenuClick(1)">
				<text :class="'hjmenu_item_text '+ (pageHjSelectIndex==1?'hjmenu_item_text_current':'')">画框</text>
			</view> -->
			<view :class="'hjmenu_item '" @click="hjMenuClick(2)">
				<!-- <text :class="'hjmenu_item_text '+ (pageHjSelectIndex==2?'hjmenu_item_text_current':'')">文字</text> -->
				<image
					:src="pageHjSelectIndex==2?'../../static/images/hj_icon_2_1.png':'../../static/images/hj_icon_2.png'"
					class="hjmenu_item_image" mode="widthFix"></image>
			</view>
			<!-- <view :class="'hjmenu_item '+ (pageHjSelectIndex==3?'hjmenu_item_current':'')" @click="hjMenuClick(3)">
				<text :class="'hjmenu_item_text '+ (pageHjSelectIndex==3?'hjmenu_item_text_current':'')">划线</text>
			</view> -->
			<view :class="'hjmenu_item '" @click="hjMenuClick(4)">
				<image
					:src="pageHjSelectIndex==4?'../../static/images/hj_icon_4_1.png':'../../static/images/hj_icon_4.png'"
					class="hjmenu_item_image" mode="widthFix"></image>
			</view>
			<view :class="'hjmenu_item '" @click="hjMenuClick(5)">
				<image
					:src="pageHjSelectIndex==5?'../../static/images/hj_icon_5_1.png':'../../static/images/hj_icon_5.png'"
					class="hjmenu_item_image" mode="widthFix"></image>
			</view>
			<view :class="'hjmenu_item '" @click="hjMenuClick(6)">
				<image
					:src="pageHjSelectIndex==6?'../../static/images/hj_icon_6_1.png':'../../static/images/hj_icon_6.png'"
					class="hjmenu_item_image" mode="widthFix"></image>
			</view>
			<view :class="'hjmenu_item '" @click="hjMenuClick(7)">
				<image
					:src="pageHjSelectIndex==7?'../../static/images/hj_icon_7_1.png':'../../static/images/hj_icon_7.png'"
					class="hjmenu_item_image" mode="widthFix"></image>
			</view>
			<view :class="'hjmenu_item '" @click="hjMenuClick(8)">
				<image
					:src="pageHjSelectIndex==8?'../../static/images/hj_icon_8_1.png':'../../static/images/hj_icon_8.png'"
					class="hjmenu_item_image" mode="widthFix"></image>
			</view>
		</view>
		<view class="hjmemu_control" @click="hjmenuControlClick">
			<image :src="pageHjMenuState?'../../static/images/hj_5.png':'../../static/images/hj_6.png'"
				class="hjmenu_control_image" mode="widthFix"></image>
		</view>




		<!-- 		<view class="quickscore" :animation="quickScoreAnimationData">
			<scroll-view scroll-x="true" style="width: 100%;">
				<view class="quickscore_item" hover-class="quickscore_item_hover">
					<text class="quickscore_item_text" v-for="(item,index) in pageQuickScores" :key="index"
						@click="quickScoreItemClick(index)">{{item}}</text>
				</view>

			</scroll-view>
		</view>

		<view class="quickscore_control" @click="quickScoreControlClick">
			<image :src="pageQuickScoreState?'../../static/images/hj_5.png':'../../static/images/hj_6.png'"
				class="quickscore_control_image" mode="widthFix"></image>
		</view> -->

		<view class="foot_menu" v-if="boo">
			<text class="foot_li foot_li_orange" @click="scoreClick(-1)">满分</text>
			<text class="foot_li foot_li_ling" @click="scoreClick(-3)">零分</text>
			<text class="foot_li" @click="scoreClick(0)">0</text>
			<text class="foot_li" @click="scoreClick(1)">1</text>
			<text class="foot_li" @click="scoreClick(2)">2</text>
			<text class="foot_li" @click="scoreClick(3)">3</text>
			<text class="foot_li" @click="scoreClick(4)">4</text>
			<text class="foot_li" @click="scoreClick(5)">5</text>
			<text class="foot_li" @click="scoreClick(6)">6</text>
			<text class="foot_li" @click="scoreClick(7)">7</text>
			<text class="foot_li" @click="scoreClick(8)">8</text>
			<text class="foot_li" @click="scoreClick(9)">9</text>
			<text class="foot_li" @click="scoreClick(-4)">.</text>
			<text class="foot_li foot_li_orange" @click="scoreClick(-2)">删除</text>
		</view>

		<view class="score_show" v-if="pageTotalScore>=0">
			{{pageTotalScore}}
		</view>


		<uni-popup ref="popup" type="share">
			<uni-popup-share type="1" title="设置" @select="moreSelect"></uni-popup-share>
		</uni-popup>
		<uni-popup ref="popuphistory" type="top" :animation="false">
			<view class="historycontent">
				<view class="historytitle">
					阅卷历史
				</view>
				<scroll-view scroll-y="true" class="srcoll-view" lower-threshold="100" @scrolltolower="historyBottom">
					<view>
						<view class="historyitem" v-for="(item,index) in historys" :key="index"
							@click="historyItemClick(item.historyid)">
							<view class="historyitem_view"><text class="historyitem_text">{{item.ordernum}}</text>
							</view>
							<view class="historyitem_view"><text class="historyitem_text">{{item.score}}分</text></view>
						</view>
					</view>
					<uni-load-more iconType="auto" :status="status" />
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 输入对话框 -->
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="备注文字" value="" placeholder="请输入备注文字" @confirm="dialogInputConfirm">
			</uni-popup-dialog>
		</uni-popup>


		<uni-popup ref="quickScoreSetting" type="top" :animation="false">
			<view class="qksetting_content" :style="'height:'+(screenHeight-1)+'px'">
				<view class="qksetting_dh">
					<image src="../../static/images/fanhui_icon.png" class="qksetting_fanhui" @click="closeQkSetting">
					</image>
					<text class="qksetting_dh_text">打分设置</text>
					<text class="qksetting_fanhui_text"></text>
				</view>
				<view class="qksetting_df_cont">
					<view class="qksetting_df_tit">
						<text class="qksetting_df_tit_name">查看步长</text>
					</view>
					<view class="qksetting_df_list">
						<text class="qksetting_df_li" @click="qkSettingStepClick(1)"
							:class="pageScoreSettingStep==1?'qksetting_df_li_cur':''">1</text>
						<text class="qksetting_df_li" @click="qkSettingStepClick(2)"
							:class="pageScoreSettingStep==2?'qksetting_df_li_cur':''">2</text>
						<text class="qksetting_df_li" @click="qkSettingStepClick(3)"
							:class="pageScoreSettingStep==3?'qksetting_df_li_cur':''">3</text>
						<text class="qksetting_df_li" @click="qkSettingStepClick(4)"
							:class="pageScoreSettingStep==4?'qksetting_df_li_cur':''">4</text>
						<text class="qksetting_df_li" @click="qkSettingStepClick(5)"
							:class="pageScoreSettingStep==5?'qksetting_df_li_cur':''">5</text>
						<text class="qksetting_df_li" @click="qkSettingStepClick(0.5)"
							:class="pageScoreSettingStep==0.5?'qksetting_df_li_cur':''">0.5</text>
						<text class="qksetting_df_li" @click="qkSettingStepClick(1.5)"
							:class="pageScoreSettingStep==1.5?'qksetting_df_li_cur':''">1.5</text>
					</view>
					<view class="qksetting_df_tit">
						<text class="qksetting_df_tit_name">常用给分</text>
						<text class="qksetting_df_tit_subText">（点击分数设置一键打分的分数排序）</text>
					</view>
					<view class="qksetting_df_list">
						<scroll-view scroll-x="true" class="srcoll-view"
							style="width:100%;white-space: nowrap;padding: 0;height: auto;">
							<text class="qksetting_df_li" @click="scoreSettingScoreClick(item)"
								v-for="(item,index) in pageScoreSettingScores" :key="index"
								:class="pageScoreSettingChangYongs.indexOf(item)>=0?'qksetting_df_li_cur':''">{{item}}</text>

						</scroll-view>

					</view>
					<view class="qksetting_df_tit">
						<text class="qksetting_df_tit_name">给分排序</text>
					</view>
					<view class="qksetting_gf_list">
						<scroll-view scroll-x="true" class="srcoll-view"
							style="width:100%;white-space: nowrap;padding: 0;height: auto;">
							<text class="qksetting_gf_li" @click="scoreSettingChangYongClick(index)"
								v-for="(item,index) in pageScoreSettingChangYongs" :key="index">{{item}}</text>
						</scroll-view>
					</view>

				</view>


				<view class="qksetting_btn">
					<text class="qksetting_queren_btn" @click="scoreSettingConfirm">确认</text>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="dialog_yinan" type="center" :animation="false">
			<view class="yinan_content">
				<view class="yinan_dh_text">
					标记疑难卷
				</view>
				<scroll-view scroll-y="true" :style="'max-height:'+(screenHeight-50)+'px'">
					<view class="yinan_df_cont">
						<view class="yinan_df_tit">
							<text class="yinan_df_tit_name">试卷疑难类型</text>
						</view>
						<view class="yinan_df_list">
							<text class="yinan_df_li" v-for="(item,index) in pageYiNanTypes"
								:class="index==pageYiNanIndex?'yinan_df_li_cur':''"
								@click="yinanTypeClick(index)">{{item}}</text>
						</view>
						<view class="yinan_df_tit">
							<text class="yinan_df_tit_name">附加异常描述</text>
						</view>
						<view class="yinan_yichang">
							<textarea v-model="pageYiNanInput" placeholder="请输入描述内容" class="yinan_yc_text"
								maxlength="200" />
						</view>

						<view class="yinan_btnBox">
							<text class="yinan_btn_li" @click="closeYiNan()">取消</text>
							<text class="yinan_btn_li yinan_btn_li_cur" @click="submitYiNan()">确定</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="dialog_rotate" type="center" :animation="false">
			<view class="rotate_content">
				<view class="rotate_dh_title">
					选择要旋转的图片序号
				</view>
				<scroll-view scroll-y="true" :style="'max-height:'+(screenHeight-100)+'px'">
					<view class="rotate_list">
						<view class="yinan_df_list" style="text-align: center;">
							<text class="yinan_df_li" v-for="(item,index) in pagePaperServerSize"
								:class="index==pageRotateIndex?'yinan_df_li_cur':''"
								@click="rotateIndexClick(index)">第{{index+1}}张试卷</text>
						</view>
						<view class="yinan_btnBox">
							<text class="yinan_btn_li" @click="closeRotateDialog()">取消</text>
							<text class="yinan_btn_li yinan_btn_li_cur" @click="submitRotate()">确定</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

	</view>


</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				boo: false,
				id: 0,
				list: [],
				questions: [],
				questionIndex: 0,
				questionScore: [],
				paperid: 0,
				historyId: 0,
				jindu: '',
				avg: '',
				papers: [],
				picHost: "",
				scrollLeft: 0,
				questionStyle: "",
				scale: 1,
				imageHeight: 0,
				screenWidth: 0,
				screenHeight: 0,
				movableViewStyle: "",
				lastClickTime: 0,
				originals: [],
				answers: [],
				status: 'more',
				historyPage: 0,
				historyPageCount: 0,
				historys: [],
				pagePrevId: 0,
				pageNextId: 0,
				pageIsNew: false,
				pagePaperWidth: [],
				movableDir: "all",
				pageHjItems: [],
				pageHjSelectIndex: -1,
				hjStartPos: null,
				pagePaperEditIndex: -1,
				pageHjEditIndex: -1,
				pageHjInputPos: null,
				pagePaperServerSize: [],
				pageHjMenuState: false,
				hjMenuAnimationData: '',
				quickScoreAnimationData: '',
				pageQuickScoreState: true,
				pageQuickScores: [],
				pageStepScore: 1, //步长
				pageScoreSettingStep: 1,
				pageScoreSettingScores: [], //给分设置中分值数据
				pageScoreSettingChangYongs: [], //常用分值
				pageChangYongScores: [], //常用分值
				pageTotalScore: -1, //分值显示
				pageYiNanTypes: ["图像模糊", "答题错位", "没有图像", "图像颠倒","切割不全", "其他问题"],
				pageYiNanIndex: 0,
				pageYiNanInput: '',
				pageRotateIndex: 0,
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = parseInt(option.id);
			}
			this.animation = uni.createAnimation();
			this.quickAnimation = uni.createAnimation();
			setTimeout(() => {
				const res = uni.getSystemInfoSync();
				this.screenWidth = res.windowWidth;
				this.screenHeight = res.windowHeight;
			}, 300);
			setTimeout(() => {
				uni.hideKeyboard();
			}, 1000);
			this.loadBaseInfo();
			// #ifdef APP-PLUS
			plus.screen.lockOrientation("landscape-primary");
			// #endif

		},

		onUnload() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif

			this.hjMenuAnimationData = '';
		},
		methods: {
			loadBaseInfo() {
				yu.dpost(103, (result) => {
					if (result.state == 1) {
						this.questions = result.question;
						this.originals = result.originals;
						this.answers = result.answers;
						this.resetQuestionScore();
						this.loadPaper();
					} else {
						yu.alert(result.msg, () => {
							uni.navigateBack({

							});
						});
					}
				}, {
					id: this.id
				}, 1);
			},
			back() {
				uni.navigateBack();
			},

			questionClick(index) {
				if (this.questionIndex == index) {
					return;
				}
				this.questionIndex = index;
				this.changeQuickScores();
			},
			resetQuestionScore() {
				var arrQuestionScores = [];
				this.questions.forEach((item, index) => {
					arrQuestionScores.push(-1);
				});
				this.questionScore = arrQuestionScores;
			},
			loadPaper() {
				yu.dpost(104, (result) => {
					if (result.state == 1) {
						this.papers.length = 0;
						// this.papers.push.apply(this.papers, result.papers);
						this.pagePaperWidth.splice(0, this.pagePaperWidth.length);
						this.pageHjItems.splice(0, this.pageHjItems.length);
						this.pagePaperServerSize.splice(0, this.pagePaperServerSize.length);
						result.papers.forEach((item, index) => {
							this.papers.push({
								path: item.path + "&t=" + Date.parse(new Date())
							});						
							this.pagePaperWidth.push({
								width: 0,
								height: 0
							});
							this.pageHjItems.push([]);
							this.pagePaperServerSize.push(item.size);
						});
						this.pageIsNew = true;
						this.imageHeight = 0;
						this.paperid = result.paperid;
						this.historyId = result.historyId;
						this.jindu = result.jindu;
						this.avg = result.avg;
						this.resetQuestionScore();
						this.questionIndex = 0;
						this.scrollLeft = 0;
						this.questionStyle = "width:" + (this.questions.length * 110) + "rpx";
						this.pagePrevId = result.previd;
						this.pageNextId = result.nextid;
						this.changeQuickScores();
						// this.$forceUpdate();
					} else {
						this.jindu = result.jindu;
						this.pagePrevId = result.previd;
						this.pageNextId = result.nextid;
						this.questionStyle = "width:" + (this.questions.length * 110) + "rpx";
						yu.alert(result.msg, () => {
							// uni.navigateBack({});
						});
					}
				}, {
					id: this.id
				}, 1);
			},
			paperPicClick(index) {
				// 预览图片
				uni.previewImage({
					urls: [this.picHost + this.papers[index].path]
				});

			},
			scoreClick(score) {
				var maxScore = this.questions[this.questionIndex].score;
				var curValue = this.questionScore[this.questionIndex];
				switch (score) {
					case -1: //满分					
						this.questionScore.splice(this.questionIndex, 1, maxScore);
						this.nextClick();
						break;
					case -2: //删除
						this.questionScore.splice(this.questionIndex, 1, -1);
						break;
					case -3: //零分
						this.questionScore.splice(this.questionIndex, 1, 0);
						this.nextClick();
						break;
					case -4: //点
						if (isNaN(curValue)) {
							this.questionScore.splice(this.questionIndex, 1, "0.");
						} else {
							curValue = parseFloat(curValue);
							if (curValue < 0) {
								curValue = "0.";
							} else {
								curValue = parseInt(curValue) + ".";
							}
							this.questionScore.splice(this.questionIndex, 1, curValue);
						}
						break;
					default: //其它分值点击
						if (isNaN(curValue)) {
							this.questionScore.splice(this.questionIndex, 1, 0);
						} else {
							if (parseFloat(curValue) < 0) {
								curValue = score;
							} else {
								curValue = curValue + "" + score;
							}
							if (parseFloat(curValue) > this.questions[this.questionIndex].score) {
								curValue = this.questions[this.questionIndex].score;
							}
							this.questionScore.splice(this.questionIndex, 1, parseFloat(curValue));
						}
						break;
				}
			},
			nextClick() { //下一小题标记
				//判断输入的分值
				if (this.questionScore[this.questionIndex] > this.questions[this.questionIndex].score) {
					yu.alert("该分值超出题目总分");
					return;
				}
				if (this.questionIndex >= (this.questions.length - 1)) {
					this.doSubmit();
				} else {
					this.questionIndex++;
					if ((this.scrollLeft + uni.upx2px(110) * (this.questionIndex + 1)) > uni.upx2px(550)) {
						this.scrollLeft = uni.upx2px(110) * this.questionIndex;
					}
					this.changeQuickScores();

				}
			},
			doSubmit() { //提交成绩操作			
				var arrScores = [];
				var totalScore = 0;
				var arrUnWriteQuestions = [];
				this.questions.forEach((item, index) => {
					var inputScore = 0;
					if (isNaN(this.questionScore[index])) {
						arrUnWriteQuestions.push(item.title);
						inputScore = 0;
					} else {
						inputScore = parseFloat(this.questionScore[index]);
						if (inputScore < 0) {
							arrUnWriteQuestions.push(item.title);
							inputScore = 0;
						} else if (inputScore > item.score) {
							inputScore = item.score;
						}

					}
					arrScores.push({
						id: item.id,
						score: inputScore
					});
					totalScore = this.commonRound(totalScore + inputScore);
				});
				var arrHenJis = [];
				this.pageHjItems.forEach((item, index) => {
					item.forEach((item2, index2) => {
						var pos = {
							left: this.convertHenjiSize(index, item2.left, false),
							top: this.convertHenjiSize(index, item2.top, false),
						};
						var mark = {};
						switch (item2.type) {
							case 1: //画框
								mark = {
									width: this.convertHenjiSize(index, item2.width, false),
									height: this.convertHenjiSize(index, item2.height, false)
								};
								break;
							case 2: //文字
								mark = {
									text: item2.text
								};
								break;
							case 3: //划线
								mark = {
									width: this.convertHenjiSize(index, item2.width, false)
								};
								break;
						}
						arrHenJis.push({
							index: index,
							type: item2.type,
							pos: pos,
							mark: mark
						});
					});
				});
				if (arrUnWriteQuestions.length > 0) {
					yu.confirm("题目" + (arrUnWriteQuestions.join("、")) + "还未进行阅卷,是否继续提交?", () => {
						//进行分值保存
						yu.dpost(105, (result) => {
							if (result.state == 1) {
								if (this.pageIsNew) {
									this.loadPaper();
								} else {
									this.loadHistoryById(this.pageNextId);
								}
							} else {
								yu.alert(result.msg);
							}
						}, {
							id: this.id,
							historyid: this.historyId,
							scores: arrScores,
							henji: arrHenJis
						}, 1);
					});

				} else {
					//进行分值保存
					yu.dpost(105, (result) => {
						if (result.state == 1) {
							this.pageTotalScore = totalScore;
							setTimeout(() => {
								this.pageTotalScore = -1;
								if (this.pageIsNew) {
									this.loadPaper();
								} else {
									this.loadHistoryById(this.pageNextId);
								}
							}, 300);

						} else {
							yu.alert(result.msg);
						}
					}, {
						id: this.id,
						historyid: this.historyId,
						scores: arrScores,
						henji: arrHenJis
					}, 1);
				}
			},
			commonRound(num) {
				return Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2)
			},
			buildPicPath(path) {
				// return this.picHost+path;
				return path;
			},
			paperImageError(e, index) {
			// 	console.log(e);
			// 	// console.log("imageError" + JSON.stringify(e));
			
			// 	this.papers.splice(index,1,{
			// 		path:"../../static/images/error_1.jpg"
			// 	});
			// 		console.log(this.papers);
			},
			imageLoad(e, index) {
				var imgWidth = e.detail.width;
				var imgHeight = e.detail.height;
				this.pagePaperWidth.splice(index, 1, {
					width: imgWidth,
					height: imgHeight
				});
				var showHeight = imgHeight / imgWidth * 750;
				this.imageHeight += showHeight;
				this.movableViewStyle = "height:" + this.imageHeight + "rpx";
			},
			movableClick() {
				let curTime = new Date().getTime();
				let lastTime = this.lastClickTime;
				//两次点击间隔小于300ms, 认为是双击
				let diff = curTime - lastTime;
				if (diff < 300) { //双击操作
					this.lastClickTime = 0;
					if (this.scale >= 4) {
						this.scale = 1;
					} else {
						this.scale++;
					}
				} else {
					this.lastClickTime = curTime;
				}
			},
			moreClick() {
				this.$refs.popup.open()
			},
			moreSelect(e, done) {
				switch (e.index) {
					case 0:
						if (this.originals.length == 0) {
							yu.alert("原卷未上传");
							done();
							return;
						}
						uni.navigateTo({
							url: '../index/original?pics=' + encodeURIComponent(JSON.stringify(this.originals))
						})
						break;
					case 1:
						if (this.answers.length == 0) {
							yu.alert("答案未上传");
							done();
							return;
						}
						uni.navigateTo({
							url: '../index/answers?pics=' + encodeURIComponent(JSON.stringify(this.answers))
						})
						break;
					case 2: //查看历史记录
						this.historys.length = 0;
						this.$refs.popuphistory.open();
						this.loadHistory();
						break;
					case 3: //打分设置
						var jsonScoreSettings = this.loadStorageScoreSetting();
						this.pageScoreSettingStep = jsonScoreSettings.step;
						this.pageScoreSettingChangYongs = jsonScoreSettings.scores;
						this.changeScoreSettingScores();
						//刷新常用分值显示
						this.$refs.quickScoreSetting.open();
						break;
					case 4: //标疑难卷
						//刷新常用分值显示
						this.$refs.dialog_yinan.open();
						break;
					case 5: //开启关闭打分版
						this.boo = !this.boo;
						break;
					case 6: //切换竖屏
						uni.redirectTo({
							url: 'yuejuan_detail?id=' + this.id
						});
						break;
				}
				done();
			},
			closeQkSetting() {
				this.$refs.quickScoreSetting.close();
			},
			historyBottom(e) {
				if (this.status != "more") { //当前不是加载中或没有更多
					return;
				}
				this.loadHistory(1);
			},
			loadHistory(type) {
				var requestPage = 0;
				if (type == null || type == 0) {
					requestPage = 1;
					type = 0;
				} else {
					if (this.historyPage >= this.historyPageCount) {
						return;
					}
					requestPage = this.historyPage + 1;
				}
				this.status = "loading";
				yu.dpost(107, (result) => {
					console.log(result);
					if (result.state == 1) {
						if (type == 0) {
							this.historys.length = 0;
						}
						this.historys.push.apply(this.historys, result.data.list);
						this.historyPage = result.data.page;
						this.historyPageCount = result.data.pagecount;
						if (this.historyPage >= this.historyPageCount) {
							this.status = "noMore";
						} else {
							this.status = "more";
						}
					} else {
						yu.alert(result.msg);
						this.status = "noMore";
					}
				}, {
					page: requestPage,
					id: this.id
				}, 1);
			},
			navPrevClick() {
				if (this.pagePrevId <= 0) {
					yu.alert("当前试卷已是最早阅卷");
					return;
				}
				this.loadHistoryById(this.pagePrevId);
			},
			navNextClick() {
				if (this.pageIsNew) {
					if (this.pageNextId <= 0) {
						yu.alert("当前试卷已是最新试卷")
						return;
					}
				} else {
					if (this.pageNextId <= 0) {
						yu.alert("当前试卷已是最新阅卷记录");
						return;
					}
				}
				this.loadHistoryById(this.pageNextId);
			},
			rotateClick() { //旋转的操作
				if (this.pagePaperServerSize.length == 1) {
					yu.confirm("是否确定颠倒图片?", () => {
						this.pageRotateIndex = 0;
						this.submitRotate();
					})
				} else {
					this.pageRotateIndex = 0;
					this.$refs.dialog_rotate.open();
				}

			},
			loadHistoryById(historyid) {
				yu.dpost(108, (result) => {
					if (result.state > 0) {
						this.historyId = historyid;
						this.papers.length = 0;
						this.pagePaperWidth.splice(0, this.pagePaperWidth.length);
						this.pageHjItems.splice(0, this.pageHjItems.length);
						this.pagePaperServerSize.splice(0, this.pagePaperServerSize.length);



						// this.papers.push.apply(this.papers, result.papers);
						result.data.papers.forEach((item, index) => {
							this.papers.push({
								path: item.path + "&t=" + Date.parse(new Date())
							});
							this.pagePaperWidth.push({
								width: 0,
								height: 0
							});
							this.pageHjItems.push([]);
							this.pagePaperServerSize.push(item.size);
						});
						this.pageIsNew = result.data.isnew == 1 ? true : false;
						//设置分值
						var tempServerScores = result.data.scores;
						var arrScores = new Array();
						if (tempServerScores.length > 0) {
							try {
								arrScores = JSON.parse(tempServerScores);
							} catch (e) {}
						}
						var arrQuestionScores = [];
						for (var i = 0; i < this.questions.length; i++) {
							var tempScore = -1;
							for (var j = 0; j < arrScores.length; j++) {
								if (this.questions[i].id == arrScores[j].id) {
									tempScore = this.pageIsNew ? -1 : arrScores[j].score;
								}
							}
							arrQuestionScores.push(tempScore);
						}
						this.questionScore = arrQuestionScores;


						this.imageHeight = 0;
						this.jindu = result.data.jindu;
						this.avg = result.data.avg;
						this.questionIndex = 0;
						this.scrollLeft = 0;
						this.questionStyle = "width:" + (this.questions.length * 110) + "rpx";
						this.pagePrevId = result.data.previd;
						this.pageNextId = result.data.nextid;

						this.changeQuickScores();
					} else {
						yu.alert(result.msg);
					}
				}, {
					id: this.id,
					historyid: historyid
				}, 1)
			},
			historyItemClick(id) {
				this.$refs.popuphistory.close()
				this.loadHistoryById(id);
			},
			touchstart(e) {
				if (this.pageHjSelectIndex >= 0 && this.hjStartPos == null) { //痕迹处理			
					if (this.pageHjSelectIndex >= 7) { //仅处理擦除之前的内容
						return;
					}
					this.hjStartPos = {
						left: e.changedTouches[0].pageX,
						top: e.changedTouches[0].pageY,
						identifier: e.changedTouches[0].identifier
					};
					//获取相对于试卷图片的坐标
					uni.createSelectorQuery().select("#" + e.currentTarget.id).boundingClientRect().exec((ret) => {
						const rect = ret[0]
						if (rect) { //判断是否需要记录坐标
							var hjLeft = e.changedTouches[0].pageX - rect.left;
							var hjTop = e.changedTouches[0].pageY - rect.top;
							this.pagePaperEditIndex = parseInt(e.currentTarget.id.substr(5));
							if (this.pageHjSelectIndex == 2) { //文字特殊处理
								this.pageHjInputPos = {
									left: hjLeft,
									top: hjTop
								};
								//弹出输入框
								this.$refs.dialogInput.open()
							} else {
								//添加节点
								this.pageHjItems[this.pagePaperEditIndex].push({
									type: this.pageHjSelectIndex,
									baseleft: hjLeft,
									basetop: hjTop,
									left: hjLeft,
									top: hjTop,
									width: 0,
									height: 0,
									state: 0
								});
								this.pageHjEditIndex = this.pageHjItems[this.pagePaperEditIndex].length - 1;
							}

						}
					});
				}
			},
			touchmove(e) {
				if (this.pageHjSelectIndex >= 0 && this.hjStartPos != null && e.changedTouches[0].identifier == this
					.hjStartPos.identifier) { //痕迹移动处理
					if (this.pageHjSelectIndex == 1 || this.pageHjSelectIndex == 3) { //画框及划线
						var moveX = e.changedTouches[0].pageX - this.hjStartPos.left;
						var moveY = e.changedTouches[0].pageY - this.hjStartPos.top;
						var editHjInfo = this.pageHjItems[this.pagePaperEditIndex][this.pageHjEditIndex];
						var hjLeft = moveX > 0 ? editHjInfo.baseleft : (editHjInfo.baseleft + moveX);
						var hjTop = this.pageHjSelectIndex == 3 ? editHjInfo.basetop : (moveY > 0 ? editHjInfo.basetop : (
							editHjInfo.basetop + moveY));
						var hjWidth = Math.abs(moveX);
						var hjHeight = this.pageHjSelectIndex == 3 ? 0 : Math.abs(moveY);
						this.$set(this.pageHjItems[this.pagePaperEditIndex][this.pageHjEditIndex], "left", hjLeft);
						this.$set(this.pageHjItems[this.pagePaperEditIndex][this.pageHjEditIndex], "top", hjTop);
						this.$set(this.pageHjItems[this.pagePaperEditIndex][this.pageHjEditIndex], "width", hjWidth);
						this.$set(this.pageHjItems[this.pagePaperEditIndex][this.pageHjEditIndex], "height", hjHeight);
					}

				}
			},
			touchcancel(e) {
				// this.movableDir = "all";
				this.hjStartPos = null;
			},
			touchend(e) {
				// this.movableDir = "all";
				this.hjStartPos = null;
			},
			hjMenuClick(index) {
				if (index == 8) {
					for (var i = 0; i < this.pageHjItems.length; i++) {
						this.pageHjItems[i].splice(0, this.pageHjItems[i].length);
					}
					this.pageHjSelectIndex = -1;
					return;
				}
				if (this.pageHjSelectIndex == index) {
					this.pageHjSelectIndex = -1;
				} else {
					this.pageHjSelectIndex = index;
				}
			},
			hjShowItemClick(index, index2) {
				if (this.pageHjSelectIndex == 7) { //擦除操作
					this.pageHjItems[index].splice(index2, 1);
				}
			},
			/**
			 * 输入对话框的确定事件
			 */
			dialogInputConfirm(done, val) {
				if (val.length == 0) {
					done();
					return;
				}
				//添加节点
				this.pageHjItems[this.pagePaperEditIndex].push({
					type: 2,
					baseleft: this.pageHjInputPos.left,
					basetop: this.pageHjInputPos.top,
					left: this.pageHjInputPos.left,
					top: this.pageHjInputPos.top,
					text: val
				});
				this.pageHjEditIndex = this.pageHjItems[this.pagePaperEditIndex].length - 1;
				done();
			},
			convertHenjiSize(index, size, isBase) {
				var showWidth = 0;
				if (this.pagePaperWidth[index].width > this.screenWidth) {
					showWidth = parseFloat(this.screenWidth);
				} else {
					showWidth = parseFloat(this.pagePaperWidth[index].width);
					if (showWidth == 0) {
						showWidth = parseFloat(this.screenWidth);
					}
				}
				var baseWidth = parseFloat(this.pagePaperServerSize[index].width);

				if (isBase) { //原尺寸
					return parseFloat(size) * showWidth / baseWidth;
				} else {
					return parseFloat(size) * baseWidth / showWidth;
				}
			},
			hjmenuControlClick() {
				this.pageHjMenuState = !this.pageHjMenuState;
				if (this.pageHjMenuState) { //展开
					this.animation.translateX(uni.upx2px(460)).step()
					this.hjMenuAnimationData = this.animation.export()

				} else {
					this.animation.translateX(-uni.upx2px(460)).step()
					this.hjMenuAnimationData = this.animation.export()
				}
			},
			quickScoreControlClick() {
				this.pageQuickScoreState = !this.pageQuickScoreState;
				if (this.pageQuickScoreState) { //展开																	
					this.quickAnimation.translateX(0).step();
					this.quickScoreAnimationData = this.quickAnimation.export();

				} else {
					this.quickAnimation.translateX(0 - this.screenWidth * 0.8).step()
					this.quickScoreAnimationData = this.quickAnimation.export();
				}
			},
			changeQuickScores() {
				var jsonScoreSetting = this.loadStorageScoreSetting();
				this.pageChangYongScores = jsonScoreSetting.scores;
				this.pageStepScore = jsonScoreSetting.step;
				this.pageQuickScores.length = 0;
				var maxScore = parseInt(this.questions[this.questionIndex].score);
				console.log(maxScore);
				//先添加常用的
				for (var i = 0; i < this.pageChangYongScores.length; i++) {
					if (this.pageChangYongScores[i] >= 0 && this.pageChangYongScores[i] <= maxScore) {
						this.pageQuickScores.push(this.pageChangYongScores[i]);
					}
				}

				for (var i = maxScore; i >= 0; i -= this.pageStepScore) {
					if (this.pageQuickScores.indexOf(i) < 0) {
						this.pageQuickScores.push(i);
					}
				}
				if (this.pageQuickScores.indexOf(0) < 0) {
					this.pageQuickScores.push(0);
				}
			},
			quickScoreItemClick(index) {
				var curValue = this.pageQuickScores[index];
				if (isNaN(curValue)) {
					this.questionScore.splice(this.questionIndex, 1, 0);
				} else {
					if (parseFloat(curValue) < 0) {
						curValue = 0;
					} else {
						curValue = parseFloat(curValue);
					}
					if (parseFloat(curValue) > this.questions[this.questionIndex].score) {
						curValue = this.questions[this.questionIndex].score;
					}
					this.questionScore.splice(this.questionIndex, 1, parseFloat(curValue));
				}
				this.nextClick();
			},
			qkSettingStepClick(step) {
				this.pageScoreSettingStep = step;
				this.changeScoreSettingScores();
				this.pageChangYongScores.length = 0;
			},
			changeScoreSettingScores() {
				this.pageScoreSettingScores.length = 0;
				var maxScore = parseInt(this.questions[this.questionIndex].score);
				for (var i = 0; i <= maxScore; i += this.pageScoreSettingStep) {
					this.pageScoreSettingScores.push(i);
				}
				if (this.pageScoreSettingScores.indexOf(maxScore) < 0) {
					this.pageScoreSettingScores.push(maxScore);
				}
			},
			loadStorageScoreSetting() { //加载存储的分值设置
				try {
					const value = uni.getStorageSync('score_setting_' + this.questions[this.questionIndex].id);
					if (value) {
						return JSON.parse(value);
					} else {
						return {
							step: 1,
							scores: []
						};
					}
				} catch (e) {
					return {
						step: 1,
						scores: []
					};
				}
			},
			scoreSettingScoreClick(item) {
				var curIndex = this.pageScoreSettingChangYongs.indexOf(item);
				if (curIndex >= 0) {
					this.pageScoreSettingChangYongs.splice(curIndex, 1);
				} else {
					this.pageScoreSettingChangYongs.push(item);
				}
			},
			scoreSettingChangYongClick(index) {
				this.pageScoreSettingChangYongs.splice(index, 1);
			},
			scoreSettingConfirm() { //进行设置的保存
				try {
					const value = uni.setStorageSync('score_setting_' + this.questions[this.questionIndex].id, JSON
						.stringify({
							step: this.pageScoreSettingStep,
							scores: this.pageScoreSettingChangYongs
						}));
				} catch (e) {}
				this.$refs.quickScoreSetting.close();
				//进行页面刷新				
				this.changeQuickScores();
			},
			yinanTypeClick(index) {
				this.pageYiNanIndex = index;
			},
			closeYiNan() {
				this.$refs.dialog_yinan.close();
			},
			submitYiNan() {
				yu.dpost(109, (result) => {
					if (result.state == 1) {
						this.pageYiNanIndex = 0;
						this.pageYiNanInput = "";
						this.$refs.dialog_yinan.close();
						yu.alert(result.msg, () => {
							if (this.pageIsNew) {
								this.loadPaper();
							} else {
								this.loadHistoryById(this.pageNextId);
							}
						});

					} else {
						yu.alert(result.msg);
					}
				}, {
					id: this.historyId,
					title: this.pageYiNanTypes[this.pageYiNanIndex],
					content: this.pageYiNanInput
				}, 1);
			},
			closeRotateDialog() {
				this.$refs.dialog_rotate.close();
			},
			rotateIndexClick(index) {
				this.pageRotateIndex = index;
			},
			submitRotate() {
				yu.dpost(110, (result) => {
					if (result.state == 1) {
						this.$refs.dialog_yinan.close();
						yu.alert(result.msg, () => {
							if (this.pageIsNew) {
								this.loadPaper();
							} else {
								this.loadHistoryById(this.historyId);
							}
						});
					} else {
						yu.alert(result.msg);
					}
				}, {
					id: this.id,
					index: this.pageRotateIndex,
					historyid: this.historyId
				}, 1);
			},geifenClick(){
				var jsonScoreSettings = this.loadStorageScoreSetting();
				this.pageScoreSettingStep = jsonScoreSettings.step;
				this.pageScoreSettingChangYongs = jsonScoreSettings.scores;
				this.changeScoreSettingScores();
				//刷新常用分值显示
				this.$refs.quickScoreSetting.open();
			},yinanClick(){
				//刷新常用分值显示
				this.$refs.dialog_yinan.open();
			}

		}
	}
</script>

<style>
	.stscroll {
		width: 100%;
		height: 100%;
	}

	.ti_list {
		display: flex;
		border: 1rpx solid #fff;
		border-width: 0px 0px 0px 1px;
		box-sizing: border-box;
	}

	.ti_list .ti_li {
		text-align: center;
		width: 110rpx;
		display: flex;
		flex-direction: column;
	}

	.shiti {
		position: fixed;
		top: 55px;
		left: 35rpx;
		width: 50rpx;
		height: calc(100% - 55px);
		color: white;
		font-size: 13rpx;
		text-align: center;
		z-index: 999;
	}

	.ti_list .ti_li .name {
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 30rpx;
		padding: 8rpx 0;
		color: #fff;
		text-align: center;
		box-sizing: border-box;
		border: 1rpx solid #fff;
		border-width: 1rpx 1rpx 1rpx 0;
		height: 60rpx;
		white-space: nowrap;
	}

	.ti_list .ti_li .val {
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		padding: 8rpx 0;
		box-sizing: border-box;
		border: 1rpx solid #fff;
		border-width: 0 1rpx 1rpx 0;
		height: 50rpx;
		lines: 1;
		text-overflow: ellipsis;
	}

	.ti_list .ti_li.current .val {
		background-color: #fff;
		color: #01b7ab;
	}

	.dafenban_btn {
		padding-left: 20rpx;
	}

	.dafenban_box {
		position: fixed;
		top: 55px;
		right: 0rpx;
		width: 60rpx;
		height: calc(100% - 55px);
		color: white;
		font-size: 14rpx;
		text-align: center; background-color: #f5f5f5; padding: 0 6rpx; box-sizing: border-box;
	}
	.jindu_box{display: flex; align-items: center; margin-right: 4rpx; }
	.jindu {
		margin-left: 5rpx; font-size: 14rpx; max-width: 140rpx; display:block;  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
	}
	.jidu_icon{width: 22px; height: 22px;}
	.avg {
		margin-left: 5rpx;
		margin-right: 10rpx;font-size: 13rpx;
	}

	.content {
		padding: 200rpx 0 260rpx;
		align-items: center;
		box-sizing: border-box;
		justify-content: center;
	}

	/* .zt {
		background-color: #01b7ab;
		display: flex;
		height: 60rpx;
		position: fixed;
		top: 0rpx;
		left: 0;
		width: 750rpx;
	}
 */
	.dh {
		background-color: #01b7ab;
		position: fixed;  
		padding-left: 30rpx;
		top: 0rpx;
		box-sizing: border-box;
		left: 0;
		height: 55px;
		line-height: 55px;
		width: 100%;
		z-index: 100;
	}



	.top_left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
.top_li_right{display: flex; margin-right: 100rpx;}
.yeBox{ height: 43rpx; line-height: 43rpx; margin-right: 5rpx; border: 1px solid rgb(115,220,208); border-radius: 10rpx; display: flex; }
.ye_li{padding: 0px 6rpx; height: 43rpx; line-height: 43rpx; box-sizing: border-box; position: relative; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;}
.ye_li::after{ position: absolute; top: 10rpx; right: 0rpx; content: ''; width: 1px; height: 30px; background-color: rgb(115,220,208);}
.ye_li:last-child::after{width: 0;}
.ye_li_text{height: 18rpx; font-size: 12rpx; width: 100%; line-height: 18rpx;}
	.fanghui {
		width: 24rpx;
		height: 24rpx;
	}

	.top_caidan {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 40rpx;
	}

	.cd_text {
		color: #fff;
		font-size: 32rpx;
	}

	.xiala {
		width: 25rpx;
		height: 25rpx;
		margin-left: 10rpx;
	}

	.top_list {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		align-items: center;
	}

	.top_li {
		font-size: 16rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		/* width: 600rpx; */
		width: 100%;
		justify-content: space-between;
		box-sizing: border-box;
		align-items: center;
		flex-direction: row;

	}
	.top_li_left{display: flex;	align-items: center;}
	.top_li_icon {
		width: 18rpx;
		height: 18rpx;
	}

	.shiti_li {border: #d5d5d5 solid 1px; background-color: #fff; border-radius: 6rpx; margin-top: 5rpx; color: #fff;
	}
	.shiti_li_cur{background-color: #ff6527; color: #fff; border: none;}

	.shiti_li .ti_name {
		border: #FFFFFF solid 1px;
		background-color: #999999;
		line-height: 26rpx;
		height: 26rpx;
	}

	.shiti_li .ti_name2 {
		border: #FFFFFF solid 1px;
		background-color: #FFBE00;
		line-height: 26rpx;
		height: 26rpx;
	}

	.shiti_li .ti_val {
		height: 45rpx;
		line-height: 45rpx; color: #000; font-size: 16rpx; 
	}
	.shiti_li_cur .ti_val {color: #fff;}
	

	.shiti_itme{border: #dfdfdf solid 1px; background-color: #fff; border-radius: 6rpx; margin-top: 5rpx; color: #fff;}
	.shiti_itme .ti_name {
		height: 26rpx;
		line-height: 26rpx; color: #333; font-size: 14rpx;  border-radius: 6rpx;
	}
	.shiti_itme .ti_val {
		height: 26rpx;
		line-height: 26rpx; color: #333; font-size: 14rpx;background-color: #dfdfdf; border-radius: 6rpx;
	}
	.shiti_itme .ti_name2 {
		height: 26rpx;
		line-height: 26rpx; color: #333; font-size: 14rpx; border-radius: 6rpx;
	}
	
	.shiti_itme_cur{border: #ff6527 solid 1px; background-color: #ff6527;}
	.shiti_itme_cur .ti_val{ background-color: #ff6527;color: #fff;}
	.shiti_itme_cur .ti_name{background-color: #fff; border-radius: 0 0 6px 6px; color: #333; }
	
	
	.top_bottom {
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 20rpx 6px;
		box-sizing: border-box;
		height: 50rpx;
		width: 100%;
	}

	.daohang {
		display: flex;
	}

	.daohang .dh_li {
		margin: 0 15rpx;
		display: flex;
		align-items: center;
	}

	.daohang .dh_li image {
		width: 24rpx;
		margin-right: 5rpx;
	}

	.top_bottom .top_btm_text {
		color: #fff;
		margin-right: 20rpx;
		font-size: 26rpx;
	}

	.pic {
		width: 100%;
	}


	.picContent {
		position: relative;
	}

	.tijiao {
		position: fixed;
		width: 80rpx;
		height: 30rpx;
		line-height: 30rpx;
		/* padding: 20rpx 10rpx 0; */
		text-align: center;
		right: 10rpx;
		bottom: 45rpx;
		background-color: #fc6844;
		border-radius: 100rpx;
		color: #fff;
		font-size: 16rpx;
	}

	.foot_menu {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 40rpx;
		line-height: 40rpx;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	.foot_li {
		width: 7.14%;
		background-color: #02c2ab;
		color: #fff;
		height: 100%;
		text-align: center;
		border: 1rpx solid #78fffc;
		border-width: 0 1rpx 1rpx 0;
		box-sizing: border-box;

	}

	.foot_li_orange {
		background-color: #ef9559;
	}

	.foot_li_ling {
		background-color: #fb6942;
	}

	.movable-view {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		height: 100%;
		min-width: 100%;
		text-align: center;
	}

	.movable-area {
		height: calc(100% - 420rpx);
		width: 100%;
		top: 30rpx;
		position: fixed;
		overflow: hidden;
		box-sizing: border-box;
	}

	.movable-view image {
		width: 100%;
	}


	.historycontent {
		background-color: #fff;
		width: 200rpx;
		float: right;
		height: 100vh;
		box-sizing: border-box;
	}

	.historytitle {
		text-align: center;
		font-size: 14rpx;
		padding-top: 25rpx;

	}

	.srcoll-view {
		height: calc(100vh - 100rpx);
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.historyitem {
		padding: 9rpx;
		border-bottom: 1px solid #e0e0e0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.historyitem_view {
		display: block;
	}

	.historyitem_text {
		display: block;
		height: 20rpx;
		font-size: 14rpx;
		color: #3A3A3A;
	}

	.hjmenu {
		position: fixed;
		bottom: 40rpx;
		left: -460rpx;
		width: 460rpx;
		padding-left: 30rpx;
		display: flex;
		height: 30rpx;
		flex-flow: row wrap;
		justify-content: flex-end;
		background-color: #eeeeee;
	}

	.hjmenu_item {
		padding: 8rpx 0rpx 5rpx;
		height: 28rpx;
		width: 70rpx;
		text-align: center;
	}


	.hjmenu_item_image {
		width: 20rpx;
		/* height: 40rpx; */
	}

	.hjshowitem {
		position: absolute;
	}

	.biankuang {
		border: 3rpx solid #FF0000;
		width: 6rpx;
		height: 6rpx;
		left: 0;
		top: 0;
	}

	.wenzi {
		height: auto;
		left: 0;
		top: 0;
	}

	.wenzi_text {
		font-size: 30rpx;
		color: #ff0000;
	}

	.wenzi_img {
		width: 44rpx;
		height: 44rpx;
		/* background-color: #FB6942; */
	}

	.hengxian {
		left: 0;
		top: 0;
		width: 6rpx;
		height: 3rpx;
		border-top: 3rpx solid #FF0000;
	}

	.hjimage {
		left: 100rpx;
		top: 100rpx;
		/* width: 100rpx; */

	}

	.hjimage_img {
		width: 60px !important;
		height: 60px !important;
		margin-left: -50%;
		margin-top: -50%;
	}

	.hjmemu_control {
		position: fixed;
		bottom: 40rpx;
		left: 0;
		width: 40rpx;
	}

	.hjmenu_control_image {
		width: 20rpx;
		height: 20rpx;
	}

	.quickscore_control {
		position: fixed;
		bottom: 30rpx;
		left: -460;
		width: 20rpx;
	}

	.quickscore_control_image {
		width: 20rpx;
		height: 20rpx;
	}

	.quickscore {
		position: fixed;
		bottom: 30rpx;
		left: -460rpx;
		width: 100%;
		height: 20rpx;
		display: flex;
		padding: 18rpx 15rpx 10rpx 55rpx;
		box-sizing: border-box;
		flex-flow: column wrap;
		justify-content: flex-start;
		background-color: #eeeeee;
	}

	.quickscore_item {
		box-sizing: border-box;
		white-space: nowrap;
	}

	.quickscore_item_hover {
		color: #fff;
	}


	.quickscore_item_text {
		font-size: 30rpx;
		line-height: 45rpx;
		width: 90rpx;
		background-color: #f18241;
		height: 45rpx;
		display: inline-block;
		text-align: center;
		color: #fff;
		margin-right: 15rpx;
		border-radius: 8rpx;
	}


	.qksetting_content {
		padding: 40px 0;
		background: #ffffff;
		box-sizing: border-box;
		position: relative;
	}

	.qksetting_dh {
		width: 100%;
		border-bottom: 1px solid #ddd;
		position: fixed;
		font-size: 16px;
		top: 0;
		left: 0;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 2px 0;
		box-sizing: border-box;
	}

	.qksetting_fanhui {
		width: 20px;
		height: 20px;
		margin-left: 20px;
		;
	}

	.qksetting_fanhui_text {
		color: #2C69CD;
	}

	.qksetting_df_cont {
		margin: 10px 0;
		padding: 0 40px;
		box-sizing: border-box;
	}

	.qksetting_df_tit {
		font-size: 14px;
	}

	.qksetting_df_list {
		margin: 10px 0 20px;
		height: 38px;
	}

	.qksetting_df_li {
		width: 38px;
		background: #f1f1f1;
		height: 38px;
		line-height: 38px;
		margin-right: 5px;
		border-radius: 4px;
		display: inline-block;
		text-align: center;
		border: 1px solid #ccc;
	}

	.qksetting_df_li_cur {
		border: 1px solid #02afff;
		background-color: #edf9ff;
	}

	.qksetting_df_tit_subText {
		color: #666;
		font-size: 13px;
	}

	.qksetting_btn {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 4px 0;
		text-align: center;
	}

	.qksetting_queren_btn {
		width: 60%;
		height: 35px;
		line-height: 35px;
		font-size: 15px;
		background-color: #007AFF;
		color: #fff;
		display: block;
		margin: 0 auto;
		border-radius: 100px;
	}

	.qksetting_gf_list {
		margin: 10px 0 20px;
		height: 32px;
	}

	.qksetting_gf_li {
		width: 32px;
		background: #0ec896;
		height: 32px;
		font-size: 13px;
		border-radius: 100px;
		color: #fff;
		line-height: 32px;
		margin-right: 15px;
		display: inline-block;
		text-align: center;
	}


	.score_show {
		position: fixed;
		left: calc(50% - 30px);
		top: calc(50% - 30px);
		font-size: 60px;
		font-family: 'STXingkai', 'KaiTi';
		font-weight: bold;
		color: #ad0303;
		text-align: center;
	}


	.yinan_content {
		padding-bottom: 10px;
		background-color: #fff;
		overflow: auto;
	}

	.yinan_dh_text {
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #f1f1f1;
	}

	.yinan_df_cont {
		margin: 10px 0;
		padding: 0 10px;
		box-sizing: border-box;
	}

	.yinan_df_tit {
		font-size: 14px;
	}

	.yinan_df_list {
		margin: 20px 0 20px;
	}

	.yinan_df_li {
		height: 33px;
		line-height: 33px;
		margin-right: 5px;
		margin-bottom: 5px;
		padding: 0 5px;
		color: #333;
		font-size: 14px;
		border-radius: 4px;
		display: inline-block;
		text-align: center;
		border: 1px solid #ccc;
	}

	.yinan_df_li_cur {
		border: 1px solid #02afff;
		color: #02afff;
	}

	.yinan_yichang {
		margin-top: 10px;
	}

	.yinan_yc_text {
		border: 1px solid #ccc;
		font-size: 13px;
		border-radius: 4px;
		height: 100px;
		padding: 5px;
		box-sizing: border-box;
		width: 100%;
	}

	.yinan_btnBox {
		margin-top: 10px;
		display: flex;
		justify-content: center;
	}

	.yinan_btn_li {
		width: 35%;
		display: block;
		font-size: 14px;
		border: 1px solid #02afff;
		margin-right: 20px;
		border-radius: 4px;
		color: #02afff;
		height: 33px;
		line-height: 33px;
		text-align: center;
	}

	.yinan_btn_li_cur {
		border: 1px solid #02afff;
		color: #fff;
		background-color: #02afff;
	}

	.rotate_content {
		padding-bottom: 10px;
		background-color: #fff;
		overflow: auto;
		width: 400rpx;
	}

	.rotate_dh_title {
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #f1f1f1;
	}

	.rotate_list {
		margin: 10px 0;
		padding: 0 10px;
		box-sizing: border-box;
	}
</style>
