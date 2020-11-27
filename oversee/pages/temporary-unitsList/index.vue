<template>
	<view>
		<uMouthTop v-on:fromUMouthTopValue="fromUMouthTopValue"></uMouthTop>
		<view class="projectList-body">
			<template v-for="(item,index) in listData">
				<view class="container" :key="index">
					<view class="top" @click="toUnitProjectList(item)">
						<view class="top-left" :class="item.colorLevel == 0 ? 'blues' :item.colorLevel == 1 ? 'blue' :item.colorLevel == 2 ? 'yellow' : 'red' ">{{Math.round(item.completedCount * 100 /(item.completedCount + item.uncompletedCount )) }}%</view>
						<view class="top-center">{{item.departmentName}}</view>
						<!-- <view class="top-bottom">{{item.type}}</view> -->
					</view>
					<view class="center">
						
						
						<view class="project-center-content-son-persion">
							<view>监督领导：<view>{{item.supervisionLeader }}</view>
							</view>
							<view>责任领导：<view>{{item.responsibleLeader }}</view>
							</view>
						</view>
					</view>
					<view class="bottom">
						<view class="bottom-left">总任务：<p>{{item.uncompletedCount + item.completedCount}}</p>
						</view>
						<view class="bottom-center">待完成：<p>{{item.uncompletedCount}}</p>
						</view>
						<view class="bottom-right">已完成：<p>{{item.completedCount}}</p>
						</view>
					</view>
				</view>
			</template>
		</view>
		<view v-show="listDataLength" class="zanwu">暂无</view>
	</view>
</template>

<script>
	import uMouthTop from '../../components/u-mouth-top/u-mouth-top.vue';
	export default {
		data() {

			return {
				listData: [],
				selectMouth: 1, //默认选中的月份
				year: ''
			}
		},
		onLoad(options) {
			this.year = options.item;
		},
		components: {
			uMouthTop
		},
		methods: {
			fromUMouthTopValue: function(data) {
				/* 选择月份 */
				this.$data.selectMouth = data.id;
				this.findTaskByConditions();
			},
			toUnitProjectList(item) {
				var params = JSON.stringify(item);
				uni.navigateTo({
					url: '../temporary-unitProjectList/index?item=' + params + '&mouth='+ this.selectMouth  + '&year='+ this.year 
				})
			},
			findTaskByConditions: function() {
				var token = this.$store.getters.getToken;
				this.commonApi.tfindTaskByConditions(token, this.year, this.selectMouth,'').then(
					res => {
						this.listData = res.data.data;
					})
			}
		},
		onShow() {
			this.findTaskByConditions();
		},
		computed:{
			listDataLength:function(){
				if(this.listData.length < 1){
					return true
				}else{
					return false;
				}
			}
		}

	}
</script>

<style>
	.projectList-body {
		margin-top: 0px;
		margin-left: 10px;
		margin-right: 10px;
		padding-top: 60px;
		margin-bottom: 40px;
	}

	.container {
		border: #cdcdcd solid 1px;
		border-radius: 10px;
		margin-top: 10rpx;
		/* height: 220px; */
		background-color: #f6f6f6;
	}

	.top {
		height: 68px;
		border-radius: 68px;
		background-color: #485fd1;
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}

	.top-left {
		height: 58px;
		width: 58px;
		border-radius: 50%;
		margin-left: 5px;
		margin-right: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* flex-shrink:0; */
		margin-right: auto;
		font-size: 20px;
	}

	.top-center {
		width: calc(100vw - 68px);
		margin-left: 5px;
		font-size: 16px;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 16px;
		flex: 1;
	}

	.top-bottom {
		width: 60px;
		margin-left: auto;
		font-size: 12px;
		height: 55%;
		background-color: #fbdc60;
		color: #000000;
		border-radius: 10px;
		margin-right: 20px;
		padding-left: 5px;
		padding-right: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center
	}

	.center {
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 20px;
		font-size: 14px;
		color: #646464;

	}

	.center-top {
		display: flex;
	}

	.center-top-left {}

	.center-top-right {
		margin-left: auto;
	}

	.center-center {
		display: flex;
	}

	.center-center-left {}

	.center-center-right {
		margin-left: auto;
	}

	.bottom {
		display: flex;
		align-items: center;
		justify-content: left;
		margin-top: 20px;
		margin-left: 10px;
		margin-bottom: 20px;
		color: #7c7c7c;
		align-items: center;
	}

	.bottom view p {
		font-size: 24px;
	}

	.bottom-left {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.bottom-left p {
		color: #4cacec;
	}

	.bottom-center {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.bottom-center p {
		color: #da8f4a;
	}

	.bottom-right {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.bottom-right p {
		color: #5fa55b;
	}
	
	.project-center-content-son-persion {}
	
	.project-center-content-son-persion view {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	
	.project-center-content-son-persion view view {
		font-size: 14px;
		color: #FFFFFF;
		background-color: #377cf6;
		border-radius: 5px;
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 2px;
		padding-bottom: 2px;
		margin-bottom: 0px;
	}
	
	.red{
		background-color:#db2f21;
		border: #db2f21;
	}
	.blue{
		background-color:#27e41b;
		border: #27e41b;
	}
	.blues{
		background-color:#8fa6f2;
		border: #8fa6f2;
	}
	.yellow{
		background-color:#f79316d9;
		border: #f79316d9;
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
