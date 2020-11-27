<template>
	<view>
		<view class="top">
			<view class="top-top" :style="topStyle">
				<view class="top-top-left-back" @click="clickLeftBut">
					<image src="../../static/left_back.png"></image>
				</view>
				<view class="top-title">
					任务统计
				</view>
			</view>
			<view class="top-center">
				<view class="top-center-content-left" @click="useOutClickSide">
					<easy-select ref="easySelect" :value="selecValue" @selectOne="selectOne" :options="title" :size="medium">
					</easy-select>
				</view>
				<view class="top-center-content-right" @click="useOutClickSide">
					<easy-select ref="easySelect" :value="currentYear" @selectOne="selectYear" :options="yearList" :size="medium">
					</easy-select>
				</view>
				<view></view>
			</view>
			<view style="display: flex;height: 10vw;background-color: #ffffff;width: 100%;position: absolute;margin-top: -5vw;z-index: -3;">
				<view style="flex: 1;border-radius: 50%;background-color: #738bf5;"></view>
				<view style="flex: 8;"></view>
				<view style="flex: 1;border-radius: 50%;background-color: #546bde;"> </view>
			</view>
			<view style="overflow-y: scroll;">
				<view class="task-bottom">
					<template v-for="item,index in list">
						<view class="task-bottom-content">
							<view class="center-content-tip-active">
								<view>{{item.month}}月</view>
								<view class="center-content-right"></view>
							</view>
							<view class="task-bottom-content-c">
								<view class="task-bottom-content-l">{{item.total - item.completed}}</view>
								<view class="task-bottom-content-center">{{item.completed}}</view>
								<view class="task-bottom-content-r">{{item.total}}</view>
							</view>
							<view class="task-bottom-content-b">
								<view>待办任务</view>
								<view>已完成</view>
								<view>累计任务</view>
							</view>
						</view>
					</template>
					<view v-show="listLength" class="task-bottom-content task-bottom-content-zanwu">暂无</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import easySelect from '../../components/easy-select/easy-select.vue'
	export default {
		data() {
			var title = [{
				value: "常规任务",
				label: "常规任务"
			}, {
				value: "临时任务",
				label: "临时任务"
			}];

			/* 获取年份 */
			//年份  
			var date = new Date();
			//获取当前年份
			var currentYear = date.getFullYear();
			return {
				title: title,
				selecValue: title[0].label,
				yearList: [],
				currentYear: currentYear,
				list: [] //任务总计集合
			}
		},
		methods: {
			bindChange: function() {

			},
			selectOne: function(options) {
				this.selecValue = options.label
				if (this.selecValue == "常规任务") {
					//常规任务
					this.findRoutineTaskStatistical();
				} else {
					//临时任务
					this.tfindRoutineTaskStatistical();
				}
			},
			selectYear: function(options) {
				this.currentYear = options.label;
				if (this.selecValue == "常规任务") {
					//常规任务
					this.findRoutineTaskStatistical();
				} else {
					//临时任务
					this.tfindRoutineTaskStatistical();
				}
			},
			useOutClickSide: function() {
				this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions()
			},
			clickLeftBut: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取年份
			findTaskYear: function() {
				this.commonApi.findTaskYear(this.token).then(
					res => {
						var years = res.data.data;
						var yearlist = [];
						for (var i = 0; i < years.length; i++) {
							var object = {
								value: years[i],
								label: years[i]
							}
							yearlist.push(object);
						}
						this.yearList = yearlist;
					});
			},
			// 获取常规任务统计
			findRoutineTaskStatistical: function() {
				this.commonApi.findRoutineTaskStatistical(this.token, this.currentYear).then(
					res => {
						this.list = res.data.data;
					})
			},
			//临时任务
			tfindRoutineTaskStatistical: function() {
				this.commonApi.tfindRoutineTaskStatistical(this.token, this.currentYear).then(
					res => {
						this.list = res.data.data;
					})
			},
		},
		computed: {
			topStyle: function() {
				// 获取状态栏高度
				let height = this.$store.state.customBar - this.$store.state.statusBar;
				let style = "padding-top:" + this.$store.state.statusBar + "px;height:" + height + 'px;';
				return style;
			},
			token: function() {
				return this.$store.getters.getToken;
			},
			listLength: function() {
				if (this.list.length < 1) {
					return true;
				} else {
					return false;
				}
			}
		},
		components: {
			easySelect
		},
		onShow() {
			//获取年份 
			this.findTaskYear();
			//获取常规任务统计
			this.findRoutineTaskStatistical();
		}
	}
</script>

<style>
	.top {
		text-align: center;
		background-image: linear-gradient(to right, #7188fd, #546bde);
		/* background: url(~@/static/task-total-back.png); */
		background-size: cover;
	}

	.top-top {
		display: flex;
		align-items: center;
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

	.top-title {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 16px;
		color: #FFFFFF;
		width: 100%;
		margin-right: 30px;
		text-align: center;
		letter-spacing: 1px;
	}

	.top-center {
		display: flex;
		margin-top: 20px;
		align-items: center;
		justify-content: center;
		padding-bottom: 60px;

	}

	.top-center-content-left {
		flex: 1;
		margin-left: 30px;
		margin-right: 10px;
		color: #FFFFFF;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.top-center-content-right {
		flex: 1;
		margin-left: 10px;
		margin-right: 30px;
		color: #FFFFFF;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.task-bottom {
		background-color: #FFFFFF;
		position: absolute;
		margin-top: -30px;
		margin-left: 10px;
		margin-right: 10px;
		border-radius: 5px;
		overflow-y: scroll;

	}

	.task-bottom-content {
		border-radius: 5px;
		border: #e6eaf7 solid 1rpx;
		width: calc(100vw - 20px);
		margin-bottom: 10px;
	}

	.center-content-tip-active {
		height: 25px;
		width: 110rpx;
		color: #FFFFFF;
		background-color: #4e65d6;
		background-image: linear-gradient(to right, #7289fd, #4c63d8);
		padding-left: 20rpx;
		display: flex;
		box-shadow: -2px 3px 2px #9a9a9a;
		margin-top: 10px;
	}

	.center-content-right {
		width: 0;
		height: 0;
		border-width: 12px 12px 12px 0;
		border-style: solid;
		border-color: transparent white;
		margin-left: auto;
	}

	.task-bottom-content-c {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		font-size: 24px;
		margin-top: 10px;
	}

	.task-bottom-content-l {
		color: #d01a03;
		text-align: center;
	}

	.task-bottom-content-center {
		color: #47ab2c;
		text-align: center;
	}

	.task-bottom-content-r {
		color: #748cf5;
		text-align: center;
	}

	.task-bottom-content-b {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		margin-top: 5px;
		margin-bottom: 20px;
		color: #808080;
	}

	.task-bottom-content-b view {
		text-align: center;
	}

	.task-bottom-content-zanwu {
		height: calc(100vh - 600px);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #838383;
	}
</style>
