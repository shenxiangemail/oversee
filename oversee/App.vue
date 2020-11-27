<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			//自动登录
			var that =this;
			var token = this.$store.getters.getToken;
			if(token!='' && token != undefined){
				this.commonApi.autoLogin(token).then(
				res => {
					
					if(res.data.resultCode == '00000'){
						var userInfo={
							adminName:res.data.data.adminName
						}
						that.$store.commit('login', {
							token: res.data.data.token,
							"userInfo": JSON.stringify(userInfo)
						});
					}else{
						// 清除之前的登录信息
						this.$store.commit("loginOut");
					}
				});
			}
			
		},
		onShow: function() {
			console.log('App Show'); 
			uni.getSystemInfo({
			    success: (e, any) => { 
			      // this.compareVersion(e.SDKVersion, '2.5.0')
			      let statusBar = 0
			      let customBar = 0
			      
			      // #ifdef MP
			      statusBar = e.statusBarHeight
			      customBar = e.statusBarHeight + 45
			      if (e.platform === 'android') {
			        this.$store.commit('SET_SYSTEM_IOSANDROID', false)
			        customBar = e.statusBarHeight + 50
			      }
			      // #endif
			      
			      
			      // #ifdef MP-WEIXIN
			      statusBar = e.statusBarHeight
			      // @ts-ignore
			      const custom = wx.getMenuButtonBoundingClientRect()
			      customBar = custom.bottom + custom.top - e.statusBarHeight
			      // #endif
			
			
			      // #ifdef MP-ALIPAY
			      statusBar = e.statusBarHeight
			      customBar = e.statusBarHeight + e.titleBarHeight
			      // #endif
			
			
			      // #ifdef APP-PLUS
			      console.log('app-plus', e)
			      statusBar = e.statusBarHeight
			      customBar = e.statusBarHeight + 45
			      // #endif
			
			
			      // #ifdef H5
			      statusBar = 0
			      customBar = e.statusBarHeight + 45
			      // #endif
				  
				  console.info(statusBar);
				  console.info(customBar);
			
				// 这里你可以自己决定存放方式，建议放在store中，因为store是实时变化的
			      this.$store.commit('setStatusAndCustomBar', {statusBar,customBar})
			      // this.$store.commit('SET_CUSTOM_BAR', customBar)
			      // this.$store.commit('SET_SYSTEM_INFO', e)
			    }
			})
			
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
	
	
</style>
