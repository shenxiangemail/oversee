<template>
	<view>
		<view class="top">
			<view class="top-title" :style="topStyle"  @click="clickLeftBut">
				<view class="top-top-left-back">
					<image src="../../static/left_back.png"></image>
				</view>
			</view>
			<view class="top-center">
				<view class="top-center-bottom">
					欢迎使用交工督办系统
				</view>
			</view>
			<view class="login-bottom">
				<view class="login-bottom-y">
					<image src="../../static/yonghu.png"></image><input type="password" v-model="oldPassword" placeholder="请输入旧密码" />
				</view>
				<view class="login-bottom-center">
					<image src="../../static/mima.png"></image><input type="password"  v-model="newPassword" placeholder="请输入新密码" />
				</view>
				<view class="login-bottom-m">
					<image src="../../static/xinmima.png"></image><input type="password"  v-model="newPassword2" placeholder="请确认新密码" />
				</view>
				<view class="login-but" @click="clickSubmitBut">
					确认修改
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import security from '../../common/security.js'
	export default {
		data() {
			return {
				oldPassword:'',
				newPassword:'',
				newPassword2:'',
				publickKey: '',
				publicKeyExponent: '',
				publicKeyModulus: '',
				nonceStr: ''
			}
		},
		methods: {
			clickSubmitBut:function(){
				if (this.oldPassword == '') {
					uni.showToast({
						title: '旧密码不能为空!',
						duration: 2000
					});
					return;
				}
				if (this.newPassword == '') {
					uni.showToast({
						title: "新密码不能为空!",
						duration: 2000
					});
					return;
				}
				if (this.newPassword != this.newPassword2) {
					uni.showToast({
						title: "新密码不一致!",
						duration: 2000
					});
					return;
				}
					this.getPublicKey(1)
				
			},
			clickLeftBut:function(){
				uni.navigateBack({
					delta:2000
				})
			},
			/* 获取公钥 */
			getPublicKey: function(flag) {
				var that = this;
				// 获取公钥
				var res = that.commonApi.publicKey().then(
					res => {
						that.publicKeyExponent = res.data.data.publicKeyExponent;
						that.publicKeyModulus = res.data.data.publicKeyModulus;
						that.nonceStr = res.data.data.nonceStr;
						if (flag == 1) {
							this.updatePassword();
						}
					});
			
			},
			updatePassword: function() {
				var that = this;
				var key = security.getKeyPair(that.publicKeyExponent, "",
					that.publicKeyModulus);
				var encryptedPwd = security.encryptedString(key, that.newPassword);
				var oldEncryptedPwd = security.encryptedString(key, that.oldPassword);
				var token = this.$store.getters.getToken;
				that.commonApi.updatePassword(token,oldEncryptedPwd, encryptedPwd, that.nonceStr).then(
					res => {
						// that.$store.commit('login', {
						// 	token: res.data.data.token,
						// 	"userInfo": ''
						// });
						uni.showToast({
							title: res.data.message,
							duration: 2000,
							success() {
								setTimeout(function(){
									uni.switchTab({
										url: '../my/index'
									})
								},2000)
							}
						})
					})
			}
		},
		computed: {
			topStyle: function() {
				// 获取状态栏高度
				let height = this.$store.state.customBar - this.$store.state.statusBar;
				let style = "padding-top:" + this.$store.state.statusBar + "px;height:" + height + 'px;';
				return style;
			},
		},
	}
</script>

<style>
	.top {
		text-align: center;
		background-color: #E6A23C;
		background: url(~@/static/login_back.jpg);
		background-size: cover;
		height: 40vh;
	}

	.top-title {
		text-align: center;
		display: flex;
		align-items: center;
		font-weight: 600;
		font-size: 16px;
		color: #FFFFFF;
	}

	.top-top-left-back {
		display: flex;
		justify-content: flex-start;
		margin-left: 10px;
	}

	.top-top-left-back image {
		width: 20px;
		height: 20px;
	}

	.top-center {
		display: flex;
		margin-top: 10vh;
		padding-bottom: 10vh;
		margin-bottom: -25px;
		justify-content: center;
		font-size: 24px;
		color: #FFFFFF;
	}

	.top-center-content {
		height: 26vw;
		width: 26vw;
		border-radius: 50%;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;

	}
	
	.login-bottom{
		border: #e1e1ea solid 1rpx;
		border-radius: 20px;
		background-color: #FFFFFF;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: -30px;
	}
	
	.login-bottom-y{
		background-color: #f5f6f8;
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 20px;
		display: flex;
		height: 40px;
		align-items: center;
	}
	.login-bottom-center{
		background-color: #f5f6f8;
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 20px;
		display: flex;
		height: 40px;
		align-items: center;
	}
	.login-bottom-center image{
		padding-left: 20px;
		width: 20px;
		height: 20px;
		padding-right: 20px;
	}
	.login-bottom-center input{
		height: 100%;
		width: 100%;
		text-align: left;
	}
	.login-bottom-y input{
		height: 100%;
		width: 100%;
		text-align: left;
	}
	.login-bottom-y image{
		padding-left: 20px;
		width: 20px;
		height: 20px;
		padding-right: 20px;
	}
	.login-bottom-m image{
		padding-left: 20px;
		padding-right: 20px;
		width: 20px;
		height: 20px;
	}
	.login-bottom-m{
		background-color: #f5f6f8;
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 40px;
		display: flex;
		height: 40px;
		align-items: center;
	}
	.login-bottom-m input{
		height: 100%;
		width: 100%;
		text-align: left;
	}
	.login-but{
		height: 40px;
		width: 100%;
		display: flex;
		color: #FFFFFF;
		font-size: 18px;
		background-color: #6880ea;
		border-radius: 10px;
		justify-content: center;
		align-items: center;
	}
</style>
