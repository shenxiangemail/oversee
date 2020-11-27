<template>
	<view>
		<view class="top">
			<view class="top-title" :style="topStyle">
				<view class="top-top-left-back" @click="clickLeftBut">
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
					<image src="../../static/yonghu.png"></image><input v-model="loginAccount" placeholder="请输入用户名" maxlength="16" />
				</view>
				<view class="login-bottom-m">
					<image src="../../static/xinmima.png"></image><input type="password" v-model="loginPassword" placeholder="请输入密码" />
				</view>
				<view class="login-but" @click="clickLoginBut">
					登录
				</view>
			</view>
		</view>
	</view>
</template>

<script src="../../common/jquery.js"></script>
<!-- <script src="../../common/security.js"></script> -->

<script>
	import security from '../../common/security.js'
	export default {
		data() {
			return {
				loginAccount: '',
				loginPassword: '',
				publickKey: '',
				publicKeyExponent: '',
				publicKeyModulus: '',
				nonceStr: ''
			}
		},
		methods: {
			clickLeftBut: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			clickLoginBut: function() {
				var that = this;
				if (this.loginAccount == '') {
					uni.showToast({
						title: '用户名不能为空!',
						duration: 2000
					});
					return;
				}
				if (this.loginPassword == '') {
					uni.showToast({
						title: "密码不能为空!",
						duration: 2000
					});
					return;
				}

				this.getPublicKey(1)



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
							this.login();
						}
					});

			},
			login: function() {
				var that = this;
				var key = security.getKeyPair(that.publicKeyExponent, "",
					that.publicKeyModulus);
				var encryptedPwd = security.encryptedString(key, that.loginPassword);
				that.commonApi.loginByPassword(that.loginAccount, encryptedPwd, that.nonceStr).then(
					res => {
						var userInfo = {
							adminName: res.data.data.adminName
						}
						that.$store.commit('login', {
							token: res.data.data.token,
							"userInfo": JSON.stringify(userInfo)
						});

						uni.showToast({
							title: "登录成功！",
							duration: 2000,
							success() {
								setTimeout(function() {
									uni.switchTab({
										url: '../index/index'
									})
								}, 2000);
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
		onLoad() {


		}
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

	.login-bottom {
		border: #e1e1ea solid 1rpx;
		border-radius: 20px;
		background-color: #FFFFFF;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: -30px;
	}

	.login-bottom-y {
		background-color: #f5f6f8;
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 30px;
		display: flex;
		height: 40px;
		align-items: center;
	}

	.login-bottom-y input {
		height: 100%;
		width: 100%;
		text-align: left;
	}

	.login-bottom-y image {
		padding-left: 20px;
		width: 20px;
		height: 20px;
		padding-right: 20px;
	}

	.login-bottom-m image {
		padding-left: 20px;
		padding-right: 20px;
		width: 20px;
		height: 20px;
	}

	.login-bottom-m {
		background-color: #f5f6f8;
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 40px;
		display: flex;
		height: 40px;
		align-items: center;
	}

	.login-bottom-m input {
		height: 100%;
		width: 100%;
		text-align: left;
	}

	.login-but {
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
