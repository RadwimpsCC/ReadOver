 let surl = "https://yue.2tt.net/pages/UniAppAction.ashx"; //封装ALERT
//let surl = "http://old.2tt.net/pages/UniAppAction.ashx"; //封装ALERT
let upurl = "http://6.dadun.net/upfile.ashx"; //封装ALERT
let aboutUrl = "http://6.dadun.net/info?id=";
let baseUrl = "https://yue.2tt.net";
export const alert = (str, confirm) => {
	// plus.nativeUI.alert(str, (event) => {
	// 	if (confirm) {
	// 		confirm();
	// 	}
	// });
	uni.showModal({
		content: str,
		showCancel: false,
		success: function(res) {
			if(confirm){
				confirm();
			}
		}
	})

}
export const confirm = (str, confirm, cancel) => {
	uni.showModal({
		content: str,
		success: function(res) {
			if(res.confirm){
				if(confirm){
					confirm();
				}
			}else if(res.cancel){
				if(cancel){
					cancel();
				}
			}
		}
	})
}

//封装提示信息
export const ts = (str) => {
	uni.showToast({
		title: str
	})
}
//获取屏幕键盘高度
export const getkeybordheight = function() {
	var wh = uni.getSystemInfoSync().screenHeight;
	var os = uni.getSystemInfoSync().platform;
	var jph = 0;
	if (os == "ios") {
		if (wh == 896) {
			jph = 346;
		} else if (wh == 812) {
			jph = 335
		} else if (wh == 736) {
			jph = 271
		} else if (wh == 667) {
			jph = 258
		} else if (wh == 568) {
			jph = 216
		}
	} else {
		jph = uni.getSystemInfoSync().windowHeight
	}
	return jph;
}
//异步HTTP访问A
export const dpost = function(cmd, successback, data, xs, failback) {
	var a = new Object();
	a.code = cmd;
	a.token = uni.getStorageSync("token");

	if (typeof(data) != undefined) a.data = data;
	if (xs == 1) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
	}
	var aToStr = JSON.stringify(a);
	uni.request({
		url: surl,
		data: aToStr,
		method: "POST",
		timeout: 20000,
		success: function(res) {
			console.log(res);
			if (xs == 1) {
				uni.hideLoading();
			}
			if (res.data.state == 100) {
				if (failback != null) {
					failback(res.data);
				} else {
					uni.reLaunch({
						url:'/pages/index/login'
					});
				}
			}else {
				successback(res.data);
			}

		},
		fail(e) {

			if (failback != null) {
				failback({
					state: 0,
					msg: "网络异常,请重试"
				});
			} else if (successback) {
				successback({
					state: 0,
					msg: "网络异常,请重试"
				});
			}
			if (xs == 1) {
				uni.hideLoading();
			}
		}
	});
}
//-----
//异步HTTP访问A
export const postme = function(a, successback, xs) {
	if (xs == 1) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
	}
	//var aToStr = a;
	//var aToStr = JSON.stringify(a);
	uni.request({
		url: 'https://yue.2tt.net/wxapi?token=' + uni.getStorageSync("token"),
		data: a,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		method: "POST",
		success: function(res) {
			successback(res.data);
			if (xs == 1) {
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
			}
		},
		fail(e) {
			console.log(JSON.stringify(e));
			if (xs == 1) {
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
			}
		}
	});
}

//剪贴板复制
export const copytext = function(tx) {
	var os = uni.getSystemInfoSync().platform
	if (os == "ios") {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		generalPasteboard.plusCallMethod({
			setValue: tx,
			forPasteboardType: "public.utf8-plain-text"
		});
		generalPasteboard.plusCallMethod({
			valueForPasteboardType: "public.utf8-plain-text"
		});
	} else {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip, "setText", tx);
	}
};

export const getCurrentWebView = () => {
	// #ifdef APP-NVUE
	let pages = getCurrentPages();
	let page = pages[pages.length - 1];
	var currentWebView = page.$getAppWebview();
	return currentWebView;
	// #endif
	return null;
}

//格式化发布时间
export const FormatPubTime = (pubtime) => {
	var pubDate = new Date(pubtime);
	var curDate = new Date();
	let usedTime = curDate - pubDate; // 相差的毫秒数
	usedTime = usedTime / 1000;
	if (usedTime < 60) {
		return parseInt(usedTime) + "秒前";
	} else if (usedTime < 3600) {
		return parseInt(usedTime / 60) + "分钟前";
	} else if (usedTime < 60 * 60 * 24) {
		return parseInt(usedTime / 60 / 60) + "小时前";
	} else if (usedTime < 60 * 60 * 24 * 30) {
		return parseInt(usedTime / 60 / 60 / 24) + "天前";
	} else {
		return pubDate.getFullYear() + "-" + (pubDate.getMonth() + 1) + "-" + pubDate.getDate();
	}
}

export const tz = (url1, type) => {
	if (type == 1) {
		uni.switchTab({
			url: url1
		})
	} else {
		uni.navigateTo({
			url: url1
		})
	}
}

export default {
	baseUrl,
	aboutUrl,
	alert,
	confirm,
	copytext,
	dpost,
	tz,
	postme,
	getkeybordheight,
	getCurrentWebView,
	FormatPubTime
}
