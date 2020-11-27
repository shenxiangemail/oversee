<template>
	<view class="container">
		<!-- <view class="top">
			<view class="top-tip">
				<image src="../../static/sjdp.png" class="top-tip-img"></image>
				<view class="top-tip-title">数据大屏</view>
			</view>
		</view> -->
		<view class="center">
			<template v-for="(item,index) in data">
				<view class="center-content" @click="yearClick(index)">
					<view :class="['center-content-tip-active',{ 'center-content-tip' : yearSelectIndex != index }]">
						<view>{{item}}年</view>
						<view class="center-content-right"></view>
					</view>
					<view class="center-content-center">
						<view :class="['center-content-center-left-active',{ 'center-content-center-left' : yearSelectIndex != index }]">{{item}}年项目进度</view>
						<view @click="toProjectList(item)" class="center-content-center-right-active" :class="['center-content-center-right-active',{ 'center-content-center-right' : yearSelectIndex != index }]">立即进入
							>></view>
					</view>
				</view>
			</template>
		</view>
		<view class="float-button" @click="clickAliyunData"> 

		</view>
		<view v-show="dataLength" class="zanwu">暂无</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				yearSelectIndex: 0
			}
		}, 
		methods: {
			yearClick: function(index) {
				// this.yearSelectIndex = index;
			},
			toProjectList:function(item){
				var token = this.$store.getters.getToken;
				if(token=='' || token ==undefined){
					uni.showToast({
						title:"请先登录",
						duration:2000,
					})
					return;
				}
				uni.navigateTo({
					url:'../unitsList/index?item='+ item
				})
			},
			findTaskYear:function(){
				var that = this;
				// 该页面不需要登录，接口又需要token,所以随便传一个
				var token ='d7a29e6067014a116ddf361c52a79adb';
				this.commonApi.findTaskYear(token).then(
				res => {
					this.data = res.data.data;
				});
			},
			clickAliyunData:function(){
				uni.showToast({
					title:'暂未开通',
					duration:2000
				})
				
				// uni.navigateTo({
				// 	url:'../aliyunData/index'
				// })
			}
		},
		computed:{
			dataLength:function(){
				if(this.data.length < 1){
					return true
				}else{
					return false;
				}
			}
		},
		onShow() {
			this.findTaskYear();
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 10px;
		font-size: 14px;
		line-height: 24px;
	}

	.top {

		background-color: #4960d2;
		height: 100px;
		border: #4960d2 solid 2rpx;
		border-radius: 10rpx;
	}

	.top-tip {
		height: 93px;
		padding-right: 2px;
		background-color: #FFFFFF;
		border: #FFFFFF solid 1rpx;
		border-radius: 10rpx;
		color: #6178ec;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.top-tip-img {
		height: 80rpx;
		width: 80rpx;
	}

	.top-tip-title {
		color: black;
	}

	.center-content {
		height: 100px;
		margin-top: 20px;
		border: #dadada solid 1rpx;
		box-shadow: -10px 10px 8px #f3f3f3;
	}

	.center-content-tip-active {
		height: 25px;
		width: 150rpx;
		color: #FFFFFF;
		background-color: #4e65d6;
		background-image: linear-gradient(to right, #7289fd, #4c63d8);
		padding-left: 20rpx;
		display: flex;
		box-shadow: -2px 3px 2px #9a9a9a;
	}

	.center-content-tip {
		// background-image: linear-gradient(to right, #b7b7b7, #919191) !important;
	}

	.center-content-right {
		width: 0;
		height: 0;
		border-width: 12px 12px 12px 0;
		border-style: solid;
		border-color: transparent white;
		margin-left: auto;
	}

	.center-content-center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 55px;
	}


	.center-content-center-left-active {
		font-size: 20px;
		color: #f84b2d;
		margin-left: auto;
	}

	.center-content-center-left {
		// color: #a7a7a7;
	}

	.center-content-center-right-active {
		border: solid 1rpx;
		border-radius: 20px;
		background-color: #677ef2;
		color: #FFFFFF;
		padding-left: 10px;
		padding-right: 10px;
		height: 30px;
		margin-left: auto;
		margin-right: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(to right, #7289fd, #4e64d7);
	}

	.center-content-center-right {
		// background-image: linear-gradient(to right, #b8b8b8, #919191);
	}

	.float-button {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		// background-color: #7086fb;
		background-image: url(../../static/sjdp.png);
		background-size: cover;
		position: fixed;
		z-index: 1;
		bottom: 50px;
	}
	.zanwu{
		display: flex;
		align-content: center;
		justify-content: center;
		padding-top: 40px;
		font-size: 16px;
		color: #8a8a8a;
	}
</style>
