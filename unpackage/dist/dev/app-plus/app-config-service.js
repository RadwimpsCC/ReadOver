
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/login","pages/yuejuan_detail/yuejuan_detail_x","pages/yuejuan_detail/yuejuan_detail_online","pages/yuejuan/yuejuan","pages/fenxi/index","pages/fenxi/avr","pages/fenxi/gaikuang","pages/fenxi/kaoshi_xq","pages/fenxi/paihang","pages/fenxi/sanlv","pages/yuejuan_ing/yuejuan_ing","pages/index/index","pages/yuejuan_detail/yuejuan_detail","pages/index/original","pages/index/answers","pages/wode/wode"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"aitantao","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#F8F8F8","rpxCalcMaxDeviceWidth":960,"rpxCalcBaseDeviceWidth":375,"rpxCalcIncludeWidth":750},"tabBar":{"color":"#202020","selectedColor":"#ff5d32","borderStyle":"black","backgroundColor":"#ffffff","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/yuejuan/yuejuan","iconPath":"static/images/tab_icon1.png","selectedIconPath":"static/images/tab_icon1_1.png","text":"阅卷中心"},{"pagePath":"pages/fenxi/index","iconPath":"static/images/tab1.png","selectedIconPath":"static/images/tab11.png","text":"分析报告"},{"pagePath":"pages/wode/wode","iconPath":"static/images/tab_icon3.png","selectedIconPath":"static/images/tab_icon3_3.png","text":"个人中心"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"aitantao","compilerVersion":"3.5.3","entryPagePath":"pages/index/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/login","meta":{"isQuit":true,"isNVue":true},"window":{"navigationBarTitleText":"爱探讨阅卷手机版","navigationStyle":"custom"}},{"path":"/pages/yuejuan_detail/yuejuan_detail_x","meta":{},"window":{"navigationBarTitleText":"阅卷任务","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2","navigationStyle":"custom"}},{"path":"/pages/yuejuan_detail/yuejuan_detail_online","meta":{},"window":{"navigationBarTitleText":"在线阅卷任务","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2","navigationStyle":"custom"}},{"path":"/pages/yuejuan/yuejuan","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"navigationBarTitleText":"阅卷任务","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/fenxi/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分析报告","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/fenxi/avr","meta":{},"window":{"navigationBarTitleText":"平均分","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/fenxi/gaikuang","meta":{},"window":{"navigationBarTitleText":"概况","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/fenxi/kaoshi_xq","meta":{},"window":{"navigationBarTitleText":"考试详情","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/fenxi/paihang","meta":{},"window":{"navigationBarTitleText":"排行榜","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/fenxi/sanlv","meta":{},"window":{"navigationBarTitleText":"三率分析","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/yuejuan_ing/yuejuan_ing","meta":{"isNVue":true},"window":{"navigationBarTitleText":"开始阅卷","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/index/index","meta":{"isNVue":true},"window":{"navigationBarTitleText":"爱探讨","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2","navigationStyle":"custom"}},{"path":"/pages/yuejuan_detail/yuejuan_detail","meta":{},"window":{"navigationBarTitleText":"阅卷","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#f5ebe2"}},{"path":"/pages/index/original","meta":{},"window":{"navigationBarTitleText":"原卷查看","enablePullDownRefresh":false}},{"path":"/pages/index/answers","meta":{},"window":{"navigationBarTitleText":"答案查看","enablePullDownRefresh":false}},{"path":"/pages/wode/wode","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarBackgroundColor":"#01b7ab","backgroundColor":"#fff","navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
