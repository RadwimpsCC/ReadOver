<script>
	export default {
		globalData: {
			idata: {}
		},
		onLaunch: function() {
			//热更新
			console.log('App Launch');
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				console.log(res.hasUpdate);
			});
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							updateManager.applyUpdate();
						}
					}
				});

			});
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
			});
			//热更新结束
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
