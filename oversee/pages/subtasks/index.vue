<template>
	<view>
		<view class="subtasks-body" v-show="!selectPersion">
			<view class="subtasks-body-b">
				<view class="subtasks-body-top">
					<view class="subtasks-body-top-title">任务名称</view>
					<view class="subtasks-body-top-name"><input v-model="title" placeholder="请输入" /></view>
				</view>
				<view class="subtasks-body-top">
					<view class="subtasks-body-top-title">截止日期</view>
					<view class="subtasks-body-top-name">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<!-- <view class="uni-input">{{date}}</view> -->
							<view style="display: flex;align-items: center;">
								<input v-model="date" placeholder="请选择" style="width: 100%;" />
								<view class="check-v">
									<view class="check"></view>
								</view>
							</view>
						</picker>
					</view>

				</view>
				<view class="subtasks-body-top" @click="clickPersion">
					<view class="subtasks-body-top-title">责任人</view>
					<view class="subtasks-body-top-name">{{persion}}</view>
					<view class="check-v">
						<view class="check"></view>
					</view>
				</view>
			</view>
			<view class="subtasks-body-bottom">
				<view class="subtasks-body-bottom-left" @click="closeBut">取消</view>
				<view class="subtasks-body-bottom-right" @click="createTaskBut">创建</view>
			</view>
		</view>

		<!-- 选取负责人视图 -->
		<view v-show="selectPersion">
			<view class="persion-top">
				<image src="../../static/select.png"></image>
				<input placeholder="请输入搜索关键词" v-model="selectValue" @input="changeSelectValue" />
			</view>
			<view class="persion-center">
				<view class="uni-list persion-center-content">
					<radio-group @change="radioChange" >
						<label class="uni-list-cell uni-list-cell-pd persion-center-label" v-for="(item, index) in items" :key="item.unionId">
							<view>{{item.adminName}}</view>
							<view class="persion-center-label-radio">
								<radio :value="item.unionId" :checked="index === current" />
							</view>
						</label>
					</radio-group>
					<view class="substasks_radio_bottom"></view>
				</view>
			</view>
			<view class="subtasks-body-bottom">
				<view class="subtasks-body-bottom-left" @click="updateSelectPersion">取消</view>
				<view class="subtasks-body-bottom-right" @click="updateSelectPersion">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});


			return {
				title: '',
				date: currentDate,
				selectPersion: false, //控制是否显示负责人页面
				items: [],
				itemsBackup: [],
				currentItems: -1,
				selectValue: '',
				persion:'',
				project:{}
			}
		},
		onLoad(options) {
			this.project = JSON.parse(options.project);
		},
		onShow() {
			//获取负责人
			this.findResponsible();
		},
		methods: {
			closeBut: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			clickPersion: function() {
				this.selectPersion = true;
			},
			updateSelectPersion: function() {
				this.selectPersion = false;
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					console.info("unionId: " + JSON.stringify(evt.target))
					if (this.items[i].unionId === evt.target.value) {
						this.currentItems = i;
						this.persion=this.items[i].adminName;
						break;
					}
				}
			},
			createTaskBut: function() {
				if (this.title == '') {
					uni.showToast({
						title: '子任务名称不能为空！',
						duration: 2000,
						success() {}
					})
					return;
				}

				if (this.persion == '') {
					uni.showToast({
						title: '负责人不能为空！',
						duration: 2000,
						success() {}
					})
					return;
				}
				this.addRoutineTaskChild();
				
			},
			findResponsible: function() {
				var that = this;
				var token = this.$store.getters.getToken;
				this.commonApi.findResponsible(token).then(
					res => {
						that.items = res.data.data;
						that.itemsBackup = res.data.data;
					});
			},
			changeSelectValue: function() {
				console.info(this.selectValue)
				var datas = []
				for (var i = 0; i < this.items.length; i++) {
					if (this.items[i].adminName.indexOf(this.selectValue) != -1) {
						datas.push(this.items[i]);
					}
				}
				this.items = datas;
				if(this.selectValue == ''){
					this.items = this.itemsBackup;
				}
			},
			addRoutineTaskChild:function(){
					var token = this.$store.getters.getToken;
					this.commonApi.addRoutineTaskChild(token,this.project.unionId,this.title,this.date,this.items[this.currentItems].unionId).then(
					res => {
						uni.showToast({
							title:"添加成功",
							duration:2000,
							success() {
								setTimeout(function(){
									uni.navigateBack({
										delta:1
									})
								},2000)
							}
						})
					})
			}
		},
		computed: {
			
		}
	}
</script>

<style>
	.subtasks-body {
		border-top: #efefef solid 1px;
		font-size: 14px;
		margin-top: 20px;
	}

	.subtasks-body-top {
		display: flex;
		align-items: center;
		border-bottom: #efefef solid 1px;
		height: 45px;
		margin-left: 20px;
		margin-right: 10px;
		color: #434343;
	}

	.subtasks-body-top-title {
		margin-right: 10px;
		width: 100px;
		color: #000000;
	}

	.subtasks-body-top-name {
		width: 100%;
	}

	.subtasks-body-bottom {
		position: fixed;
		bottom: 10px;
		height: 50px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.subtasks-body-bottom-left {
		margin: 10px;
		height: 100%;
		flex: 1;
		font-size: 16px;
		color: #000000;
		background-color: #FFFFFF;
		border: #eeeeee solid 1px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
	}

	.subtasks-body-bottom-right {
		margin-right: 10px;
		height: 100%;
		flex: 1;
		background-color: #4087f1;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
	}

	.check {
		border-radius: 50%;
		width: 20px;
		height: 20px;
		color: #FFFFFF;
		transition: color .25s;
		position: relative;
	}

	.check::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 12px;
		margin-left: -6px;
		margin-top: -1rpx;
		border-top: 2rpx solid;

	}

	.check::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		height: 12px;
		margin-left: -1rpx;
		margin-top: -6px;
		border-left: 2rpx solid;
	}

	.check-v {
		border-radius: 50%;
		background-color: #4377f9;
		margin-right: 10px;
	}

	.persion-top {
		background-color: #f7f8fa;
		height: 35px;
		display: flex;
		align-items: center;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 20px;
		border-radius: 3px;
		font-size: 14px;
	}

	.persion-top image {
		width: 30px;
		height: 30px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.persion-top input {
		width: 100%;
	}

	.persion-center-label {
		display: flex;
		align-items: center;
		border-bottom: #f4f4f6 solid 1px;
		margin-left: 25px;
		margin-right: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.persion-center-content {}

	.persion-center {
		border-top: #f4f4f6 solid 1px;
		margin-top: 10px;
	}

	.persion-center-label-radio {
		margin-left: auto;
		margin-right: 10px;
	}
	.substasks_radio_bottom{
		height: 120px;
	}
</style>
