<template>
	<view>
		<view class="top">
			<view class="top-title" :style="topStyle">
				交工督办系统
			</view>
			<view class="top-center">
				<view class="top-center-content">
					<view></view>
				</view>
				<view class="top-center-bottom">
					<view v-if="loginStatus" class="top-center-bottom-name">{{userInfo.adminName}}</view>
					<view v-if="!loginStatus" class="top-center-bottom-name">未登录</view>
					<view class="top-center-bottom-msg">欢迎使用交工督办系统</view>
				</view>
			</view>
		</view>
		<view class="center">
			<template v-for="item in list">
				<view class="center-content" :key="item.id">
					<view class="center-content-left">
						<image :src="item.imageUrl"></image>
					</view>
					<view class="center-content-right" @click="clickCenterBut(item)">
						<view class="center-content-right-l">{{item.titleName}}</view>
						<view class="center-content-right-r">
							<image src="../../static/rightr.png"></image>
						</view>
					</view>
				</view>
			</template>
		</view>
		<view class="bottom">
			<view v-if="loginStatus" class="bottom-top" @click="loginOutBut">退出登录</view>
			<view v-if="!loginStatus" class="bottom-top" @click="clickLoginBut">登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			var data = [{
					imageUrl: '../../static/my_tongji.png',
					titleName: '任务统计',
					id: 1
				},
				{
					imageUrl: '../../static/jifen.png',
					titleName: '我的积分',
					id: 2
				},
				{
					imageUrl: '../../static/my_paiming.png',
					titleName: '我的排名',
					id: 3
				}, {
					imageUrl: '../../static/my_mima.png',
					titleName: '修改密码',
					id: 4
				}
			]
			return {
				list: data
			}
		},
		methods: {
			clickCenterBut: function(item) {
				// 判断是否登录
				if(!this.loginStatus) {
					uni.showToast({
						title:"请先登录",
						duration:2000
					})
					return
				}
				
				if(item.id == 1){
					uni.navigateTo({
						url:'../taskTotal/index',
					})
				}else if(item.id == 4){
					uni.navigateTo({
						url:'../password/index'
					})
				}else{
					uni.showToast({
						title:'功能暂未开放',
						duration:2000
					})
				}
			},
			clickLoginBut:function(){
				uni.redirectTo({
					url:'../login/index'
				})
			},
			loginOutBut:function(){
				var token = this.$store.getters.getToken;
				this.commonApi.logout(token).then(
				res => {
					this.$store.commit("loginOut")
				});
			}
			
		},
		computed: {
			loginStatus: function() {
				if (Object.keys(this.userInfo) == 0) {
					return false;
				} else {
					return true;
				}
			},
			topStyle: function() {
				// 获取状态栏高度
				let height = this.$store.state.customBar - this.$store.state.statusBar;
				let style = "padding-top:" + this.$store.state.statusBar + "px;height:" + height + 'px;';
				return style;
			},

			userInfo: function() {
				var userInfo = {};
				var user = this.$store.getters.getUserInfo;
				if (user != null && user != '' && user !='{}') {
					userInfo = JSON.parse(user);
				}
				return userInfo;
			}
		},
		components: {
			components: {

			}
		},
		onShow() {

		},
		onLoad() {

		}
	}
</script>

<style>
	.top {
		text-align: center;
		background-color: #E6A23C;
		background: url(~@/static/my_top.jpg);
	}

	.top-title {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 16px;
		color: #FFFFFF;
	}

	.top-center {
		display: flex;
		margin-left: 6vw;
		margin-top: 4vh;
		padding-bottom: 10vh;
		margin-bottom: -25px;
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

	.top-center-content view {
		height: calc(26vw - 4px);
		width: calc(26vw - 4px);
		border-radius: 50%;
		/* background-color: #DD524D; */
		background-image: url(../../static/touxiang.png);
		background-size: cover;
	}

	.top-center-bottom {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
		color: #FFFFFF;
		text-align: left;
		margin-left: 20px;

	}

	.top-center-bottom-name {
		font-size: 18px;
	}

	.top-center-bottom-msg {
		margin-top: 15px;
	}

	.center {
		background-color: #FFFFFF;
		/* height: 40vh; */
		/* width: 90vw; */
		margin-left: 20px;
		border-radius: 15px;
		border: #e5e8fa solid 1px;
		padding-top: 20px;
		padding-bottom: 40px;
		margin-right: 20px;
	}

	.center-content {
		display: flex;
		padding-left: 20px;
		padding-top: 20px;
	}

	.center-content-left image {
		height: 25px;
		width: 25px;
	}

	.center-content-right {
		border-bottom: #f0f0f0 solid 1px;
		height: 40px;
		width: 100%;
		display: flex;
		color: #6e6e6e;
		font-size: 18px;
	}

	.center-content-right-r {
		margin-left: auto;
		margin-right: 20px;
	}

	.center-content-right view image {
		height: 25px;
		width: 25px;

	}

	.center-content-right-l {
		margin-left: 20px;
	}

	.bottom {
		margin-top: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bottom-top {
		height: 10vw;
		width: 40vw;
		color: #FFFFFF;
		background-image: linear-gradient(to right, #7188fc, #475ed0);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10vw;
	}
</style>
