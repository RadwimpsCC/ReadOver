<template>
	<view class="content">
		<!-- 状态栏 -->
		<!-- <view class="zt"></view> -->
		<!-- 导航 -->
		<view class="dh">
			<view class="dh_top">
				<!-- <view class="top_left">
					<image src="../../static/images/fanhui.png" class="fanghui" @click="back()"></image>
				</view> -->
				<scroll-view scroll-x="true" show-scrollbar="true" :scroll-left="scrollLeft"
					style="width: 550rpx;min-width: 550rpx;margin-left: 20rpx;">
					<view class="ti_list" :style="questionStyle">
						<view v-for="(item,index) in questions" class="ti_li" @click="questionClick(index)"
							:class="questionIndex==index?'current':''">
							<text class="name">{{item.title}}</text>
							<text class="val">{{questionScore[index]<0?(''):(questionScore[index]+'')}}</text>
						</view>   
					</view>
				</scroll-view>


				<view class="top_li" @click="moreClick()">
					<image src="../../static/images/icon4.png" class="top_li_icon"></image>
					<text class="top_li_text">更多</text>
				</view>
			</view>

			<view class="top_bottom">
				<text class="top_btm_text">进度：{{jindu}}</text>
				<navigator open-type="redirect" :url="'yuejuan_detail_x?id='+id" class="top_btm_text">切换横屏</navigator>
				<view class="daohang">
					<view class="dh_li">
						<image src="../../static/images/jiantou_icon2.png" mode="widthFix"></image>
						<text @click="navPrevClick">上一页</text>
					</view>
					<view class="dh_li">
						<image src="../../static/images/jiantou_icon1.png" mode="widthFix"></image>
						<text @click="navNextClick">下一页</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 内容 -->
		<div class="main">
			<movable-area scale-area class="movable-area">
				<movable-view class="movable-view" :direction="movableDir" scale="true" scale-min="1" scale-max="4"
					:scale-value="scale" :style="movableViewStyle">
					<view class="picContent" v-for="(item,index) in papers" :key="index">
						<image :id="'paper'+index" :src="picHost+ item.path" class="pic" mode="widthFix"
							lazy-load="true" @error="imageError" @load="imageLoad($event,index)"
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
								<image src="../../static/images/hj_2.png" class="hjimage_img" mode="widthFix"></image>
							</view>
							<!--错号-->
							<view class="hjshowitem hjimage" @click.stop="hjShowItemClick(index,index2)"
								v-if="item2.type==5" :style="'left:'+item2.left+'px;top:'+item2.top+'px'">
								<image src="../../static/images/hj_3.png" class="hjimage_img" mode="widthFix"></image>
							</view>
							<!--半对-->
							<view class="hjshowitem hjimage" @click.stop="hjShowItemClick(index,index2)"
								v-if="item2.type==6" :style="'left:'+item2.left+'px;top:'+item2.top+'px'">
								<image src="../../static/images/hj_4.png" class="hjimage_img" mode="widthFix"></image>
							</view>
						</block>
					</view>

				</movable-view>
			</movable-area>
		</div>
		<!-- 提交悬浮按钮 -->
		<text class="tijiao" @click="nextClick()">{{questionIndex <(questions.length-1)?'下一步':'提交'}}</text>
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




		<view class="quickscore" :animation="quickScoreAnimationData">
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
		</view>

		<view class="foot_menu">
			<text class="foot_li foot_li_orange" @click="scoreClick(-1)">满分</text>
			<text class="foot_li" @click="scoreClick(0)">0</text>
			<text class="foot_li" @click="scoreClick(1)">1</text>
			<text class="foot_li" @click="scoreClick(2)">2</text>
			<text class="foot_li" @click="scoreClick(3)">3</text>
			<text class="foot_li" @click="scoreClick(4)">4</text>
			<text class="foot_li foot_li_orange" @click="scoreClick(-2)">删除</text>
			<text class="foot_li foot_li_ling" @click="scoreClick(-3)">零分</text>
			<text class="foot_li" @click="scoreClick(5)">5</text>
			<text class="foot_li" @click="scoreClick(6)">6</text>
			<text class="foot_li" @click="scoreClick(7)">7</text>
			<text class="foot_li" @click="scoreClick(8)">8</text>
			<text class="foot_li" @click="scoreClick(9)">9</text>
			<text class="foot_li" @click="scoreClick(-4)">.</text>
		</view>
		<uni-popup ref="popup" type="share">
			<uni-popup-share title="更多" @select="moreSelect"></uni-popup-share>
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
	</view>


</template>

<script>
	import yu from '../../yu.js'
	export default {
		data() {
			return {
				id: 0,
				list: [],
				questions: [],
				questionIndex: 0,
				questionScore: [],
				paperid: 0,
				historyId: 0,
				jindu: '',
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
				pageQuickScores: []
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
			this.loadBaseInfo();

		},
		onUnload() {
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
				}
			},
			commonRound(num) {
				return Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2)
			},
			buildPicPath(path) {
				// return this.picHost+path;
				return path;
			},
			imageError(e) {
				console.log(e);
				console.log("imageError" + JSON.stringify(e));
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
				}
				done();
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
					yu.alert("暂无更多试卷");
					return;
				}
				this.loadHistoryById(this.pagePrevId);
			},
			navNextClick() {
				if (this.pageNextId <= 0) {
					yu.alert("暂无更多试卷");
					return;

				}
				this.loadHistoryById(this.pageNextId);
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
							var tempScore = 0;
							for (var j = 0; j < arrScores.length; j++) {
								if (this.questions[i].id == arrScores[j].id) {
									tempScore = arrScores[j].score;
								}
							}
							arrQuestionScores.push(tempScore);
						}
						this.questionScore = arrQuestionScores;


						this.imageHeight = 0;
						this.jindu = result.data.jindu;
						this.questionIndex = 0;
						this.scrollLeft = 0;
						this.questionStyle = "width:" + (this.questions.length * 110) + "rpx";
						this.pagePrevId = result.data.previd;
						this.pageNextId = result.data.nextid;
						this.pageIsNew = result.data.isnew == 1 ? true : false;
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
				this.pageQuickScores.length = 0;
				var maxScore = parseInt(this.questions[this.questionIndex].score);

				for (var i = maxScore; i >= 0; i--) {
					this.pageQuickScores.push(i);
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
			}

		}
	}
</script>

<style>
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
		top: 0rpx;
		left: 0;
		width: 750rpx;
		z-index: 100;
	}

	.dh_top {
		padding: 15rpx 0 15px 20rpx;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		/* justify-content: space-between; */
		justify-content: flex-start;
	}

	.top_left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.dh_top .fanghui {
		width: 45rpx;
		height: 45rpx;
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
		display: flex;
		align-items: center;
		width: 330rpx;
		justify-content: center;
		margin: 0 20rpx;
		box-sizing: border-box;
		align-items: center;
		flex-direction: column;
	}

	.top_li_icon {
		width: 40rpx;
		height: 40rpx;
	}

	.top_li_text {
		color: #fff;
		font-size: 26rpx;
		margin-top: 4rpx;
	}

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
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		/* padding: 20rpx 10rpx 0; */
		text-align: center;
		right: 0;
		bottom: 240rpx;
		background-color: #fc6844;
		border-radius: 100rpx;
		color: #fff;
		font-size: 26rpx;
	}

	.foot_menu {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		background-color: red;
		justify-content: center;
	}

	.foot_li {
		width: 14.28%;
		background-color: #02c2ab;
		color: #fff;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
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
		position: fixed;
		overflow: hidden;
		box-sizing: border-box;
	}

	.movable-view image {
		width: 100%;
	}


	.historycontent {
		background-color: #fff;
		width: 400rpx;
		float: right;
		height: 100vh;
		box-sizing: border-box;
	}

	.historytitle {
		font-size: 36rpx;
		padding: 30rpx;

	}

	.srcoll-view {
		height: calc(100vh - 100rpx);
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.historyitem {
		padding: 15rpx;
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
		height: 40rpx;
		font-size: 30rpx;
		color: #3A3A3A;
	}

	.hjmenu {
		position: fixed;
		bottom: 220rpx;
		left: -460rpx;
		width: 460rpx;
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-end;
		background-color: #eeeeee;
	}

	.hjmenu_item {
		padding: 10rpx 0rpx 5rpx;
		width: 70rpx;
		text-align: center;
	}


	.hjmenu_item_image {
		width: 40rpx;
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
		width: 100rpx;

	}

	.hjimage_img {
		width: 100rpx;
		height: 100rpx;
		margin-left: -50%;
		margin-top: -50%;
	}

	.hjmemu_control {
		position: fixed;
		bottom: 220rpx;
		display: none;
		left: 0;
		width: 40rpx;
	}

	.hjmenu_control_image {
		width: 50rpx;
		height: 50rpx;
	}

	.quickscore_control {
		position: fixed;
		bottom: 150rpx;
		left: 0;
		width: 40rpx;
	}

	.quickscore_control_image {
		width: 50rpx;
		height: 50rpx;
	}

	.quickscore {
		position: fixed;
		bottom: 140rpx;
		left: 0rpx;
		width: 100%;
		height: 80rpx;
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
</style>
