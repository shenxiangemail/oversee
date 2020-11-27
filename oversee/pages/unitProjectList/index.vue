<template>
	<view>
		<uMouthTop ref="uMouthTopRef" v-on:fromUMouthTopValue="fromUMouthTopValue"></uMouthTop>
		<view class="project-top" v-show="JSON.stringify(data) != '{}'">
			<view class="project-top-top">{{data.departmentName}}</view>
			<view class="project-top-center">
				<view class="project-top-center-top">
					<view class="project-top-center-top-left">监督领导：<view>{{data.supervisionLeader}}</view>
					</view>
					<view class="project-top-center-top-right">任务模式：常规任务
					</view>
				</view>
				<view class="project-top-center-top">
					<view class="project-top-center-top-left">责任领导：<view>{{data.responsibleLeader}}</view>
					</view>
					<!-- <view class="project-top-center-top-right">创建时间：<p>{{data.createTime}}</p>
					</view> -->
				</view>
				<!-- <view class="project-top-center-top-left">
					责任人：<view>{{data.principal}}</view>
				</view> -->
			</view>
			<view class="project-top-bottom">
				<view class="circle">
					<view class="circle-content"></view>
				</view>
				<view class="project-top-bottom-left">总任务：<p>{{data.uncompletedCount + data.completedCount}}</p>
				</view>
				<view class="project-top-bottom-center">待完成：<p>{{data.uncompletedCount}}</p>
				</view>
				<view class="project-top-bottom-right">已完成：<p>{{data.completedCount}}</p>
				</view>
			</view>
		</view>

		<template v-for="item,index in data.taskList">
			<view class="project-center">
				<view class="project-center-content">
					<view>
						<view class="circle" style="margin-top: 15px;">
							<view class="circle-content"></view>
						</view>
					</view>
					<view class="project-center-right">
						<view class="project-center-content-title" @click="clickProjectBut(index,item.unionId)" :class="item.colorLevel == 0 ? 'blues' :item.colorLevel == 1 ? 'blue' :item.colorLevel == 2 ? 'yellow' : 'red' ">
							<view class="project-center-content-titleName">{{item.title}}</view>
							<view class="check-style-unequal-width3" v-show="item.isApproval ==1" @click.stop="clickSubmitBut(item)">
								<view class="project-center-content-flag check-style-unequal-width2"></view>
							</view>
							<view class="project-center-right-state" v-show="item.isApproval ==0">
								{{item.status == 3 ? '已完成':item.status == 1 ? '已提交':item.status == 2 ? '审批中':item.status == 0 ? '未完成' : item.status == 6 ? '审批退回' : item.status == 7 ? '提交退回':''}}
							</view>
						</view>
						<view v-show="selected == index">
							<view class="project-center-content-son">
								<view class="project-title" v-show="item.titles !=''">{{item.titles}}</view>
								<view class="project-center-content-son-top">
									<view class="project-center-content-son-persion">
										<view>责任领导：<view>{{item.responsibleLeader }}</view>
										</view>
										<view>责任人：<view>{{item.responsible }}</view>
										</view>
									</view>
									<view class="project-center-content-son-time">
										<view>任务截止日期</view>
										<p>{{item.deadline }}</p>
									</view>
								</view>
							</view>

							<view class="project-center-center">
								<template v-for="item,index in remarks">
									<view class="project-center-center-msg">{{item.gmtCreate }} {{item.createUser }}
										{{item.type}}</view>
									<view class="project-center-center-content"> {{item.content}}</view>
								</template>
								<view v-show="remarksLength" style="text-align: center;;padding-top: 20px;color: #bababa;">无备注</view>
							</view>

							<view class="project-center-bottom">
								<view @click="clickSubtasks(item)" v-show="item.status != 1 && item.status != 2 && item.status != 3 ">
									<image src="../../static/renwu.png"></image>任务
								</view>
								<view @click="clickNoteBut(item)">
									<image src="../../static/beizhu.png"></image>备注
								</view>
								<view @click="clickCuibanBut(item)" v-show="item.status != 3 ">
									<image src="../../static/cuiban.png"></image>催办
								</view>
							</view>
							<view class="project-center-b">
								<view class="project-center-b-left">子任务:<p>{{item.completedCount + item.uncompletedCount}}</p>
								</view>
								<view class="project-center-b-center">待完成:<p>{{item.uncompletedCount}}</p>
								</view>
								<view class="project-center-b-right">已完成:<p>{{item.completedCount}}</p>
								</view>
							</view>
						</view>
						<!-- 子任务 -->
						<template v-for="item,index2 in data.taskList[index].child">
							<view class="project-center" style="margin-top: 20px;" v-show="selected == index">
								<view class="project-center-content">
									<view>
										<view class="circle" style="margin-top: 15px;">
											<view class="circle-content"></view>
										</view>
									</view>
									<view class="son-project-center-right">
										<view class="project-center-content-title" @click="clickSonProjectBut(index2,item.unionId)" :class="item.colorLevel == 0 ? 'blues' :item.colorLevel == 1 ? 'blue' :item.colorLevel == 2 ? 'yellow' : 'red' ">
											<view class="project-center-content-titleName">{{item.title}}</view>
											<view class="check-style-unequal-width3" v-show="item.isApproval ==1" @click.stop="clickSubmitBut(item)">
												<view class="project-center-content-flag check-style-unequal-width2"></view>
											</view>
											<view class="project-center-right-state" v-show="item.isApproval ==0">
												{{item.status == 3 ? '已完成':item.status == 1 ? '已提交':item.status == 2 ? '审批中':item.status == 0 ? '未完成' : item.status == 6 ? '审批退回' : item.status == 7 ? '提交退回':''}}
											</view>
										</view>
										<view v-show="sonSelected == index2">
											<view class="project-center-content-son">
												<view class="project-title" v-show="item.titles !=''">{{item.titles}}</view>
												<view class="project-center-content-son-top">
													<view class="project-center-content-son-persion">
														<view>责任领导：<view>{{data.taskList[index].responsibleLeader }}</view>
														</view>
														<view>责任人：<view>{{item.responsible }}</view>
														</view>
													</view>
													<view class="project-center-content-son-time">
														<view>任务截止日期</view>
														<p>{{item.deadline }}</p>
													</view>
												</view>
											</view>

											<view class="project-center-center">
												<template v-for="item,index in remarkSon">
													<view class="project-center-center-msg">{{item.gmtCreate }} {{item.createUser }}
														{{item.type}}</view>
													<view class="project-center-center-content"> {{item.content}}</view>
												</template>
												<view v-show="remarkSonLength" style="text-align: center;;padding-top: 20px;color: #bababa;">无备注</view>
											</view>

											<view class="project-center-bottom">
												<view @click="clickNoteBut(item)">
													<image src="../../static/beizhu.png"></image>备注
												</view>
												<view @click="clickSonCuibanBut(item,data.taskList[index].responsible)" v-show="item.status != 3 ">
													<image src="../../static/cuiban.png"></image>催办
												</view>
											</view>
											<!-- <view class="project-center-b">
												<view class="project-center-b-left">子任务:<p>{{item.completedCount + item.uncompletedCount}}</p>
												</view>
												<view class="project-center-b-center">待完成:<p>{{item.uncompletedCount}}</p>
												</view>
												<view class="project-center-b-right">已完成:<p>{{item.completedCount}}</p>
												</view>
											</view> -->
										</view>
									</view>
								</view>
							</view>
						</template>

					</view>
				</view>
			</view>
		</template>
		<!-- 弹出留言信息 -->
		<uni-popup ref="popup" type="center">
			<view class="popup-body">
				<view class="popup-body-v">
					<textarea placeholder-class="popup-body-textarea" maxlength=50 @input="popupInputChange" placeholder="请输入备注内容" />
					</view>
				<view class="popup-body-value-l">{{popupTextareaValueLength}}/50</view>
				<view class="popup-body-but" @click="popupTextBut">确认提交</view>
			</view>
		</uni-popup>
		<!-- 弹出审批确认框 -->
		<uni-popup ref="popup2" type="center">
			<view class="popup-body" style="width: 60vw;" >
				<view style="display: flex;"><image src="../../static/close.png" style="width: 20px;height: 20px;margin-left: auto;padding-right: 10px;padding-top: 10px;" @click="clickPopup2Close"></image></view>
				<view style="text-align: center;padding-top: 20px;padding-bottom: 20px;color: #a3a3a3;">{{popupTitle}}</view>
				<view style="display: flex;border-top: #f2f2f2 solid 1rpx;">
					<view style="height: 40px;flex: 1;display: flex;align-items: center;justify-content: center;border-right: #f2f2f2 solid 1rpx;" @click="clickPopup2Cacue">否</view>
					<view style="background-color: #a6a0ff;color: #FFFFFF;height: 40px;flex: 1;display: flex;align-items: center;justify-content: center;" @click="clickPopup2Confit">是</view>
				</view>
				
			</view>
		</uni-popup>
		
		<!-- 弹出催办选择框 -->
		<uni-popup ref="popup3" type="center">
			<view class="popup3_body" style="width: 320px;" >
				<view  class="subtasks-body-top" style="justify-content: center;font-size: 16px;">短信催办</view>
				<view class="subtasks-body-top" @click="clickHeadPersion">
					<view class="subtasks-body-top-title">接收人</view>
					<view class="subtasks-body-top-name">{{headPersion}}</view>
					<view class="check-v">
						<view class="check"></view>
					</view>
				</view>
				<view v-show="isShowHeadPersion">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd persion-center-label" v-for="(item, index) in headItems" :key="item.level">
							<view>{{item.adminName}}</view>
							<view class="persion-center-label-radio">
								<radio :value="item.level" :checked="index === current" />
							</view>
						</label>
					</radio-group>
				</view>
				<view class="popup-body-v">
					<textarea maxlength=50 @input="popup3InputChange" placeholder="请输入发送内容" placeholder-style="font-size: 14px;" style="height: 80px;"/>
					<view class="popup-body-value-l">{{popup3TextareaValueLength}}/50</view>
				</view>
				<view class="subtasks-body-bottom">
					<view class="subtasks-body-bottom-left" @click="updateSelectPersionClose">取消</view>
					<view class="subtasks-body-bottom-right" @click="updateSelectPersion">发送</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uMouthTop from '../../components/u-mouth-top/u-mouth-top.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';

	export default {

		data() {
			
			return {
				data:{},
				selected: -1,
				sonSelected: -1,
				popupTextareaValueLength:0,
				popup3TextareaValueLength:0,
				popupTextareaValue:'',
				popup3TextareaValue:'',
				remarks:[],
				remarkSon:[],
				mouth:'',
				year:'',
				selectUnionid:'',
				selectSonUnionid:'',
				selectRemark:'' ,//选择需要备注项目的unid
				departmentId:"",
				popupTitle:'',
				selectProject:{},//要审批的项目
				
				headSelectItem: {},
				headItems: [],
				headItemsBackup: [],
				currentheadItems: -1,
				headPersion:'',
				isShowHeadPersion:false, //是否显示接收人
			}
		},
		onLoad(options) {
			this.data =this.subTitleString(JSON.parse(options.item));
			this.departmentId = this.data.departmentId;
			this.$refs.uMouthTopRef.fromParentValue(options.mouth);
			this.mouth = options.mouth;
			this.year = options.year;
		},
		onShow() {
			// 获取项目信息
			this.findTaskByConditions();
			// 获取备注
			if(this.selected != -1 && this.selectUnionid !=''){
				this.clickProjectBut(this.selected,this.selectUnionid)
			}
			if(this.sonSelected != -1 && this.selectSonUnionid !=''){
				this.clickSonProjectBut(this.sonSelected,this.selectSonUnionid)
			}
		},
		components: {
			uMouthTop,
			uniPopup
		},
		computed:{
			token:function(){
				return this.$store.getters.getToken;
			},
			remarksLength:function(){
				if(this.remarks.length == 0){
					return true
				}else{
					return false
				}
				
			},
			remarkSonLength:function(){
				if(this.remarkSon.length == 0){
					return true
				}else{
					return false
				}
			}
		},
		methods: {
			subTitleString:function(data){
				for(var i =0 ;i< data.taskList.length;i++){
					data.taskList[i].titles = '';
					var title = data.taskList[i].title;
					if(title.length > 8){
						data.taskList[i].titles = title;
						data.taskList[i].title = title.substring(0,7) +'...';
					}
					for(var j=0 ; j<data.taskList[i].child.length;j++){
						data.taskList[i].child[j].titles='';
						var name = data.taskList[i].child[j].title;
						if(name.length > 8){
							data.taskList[i].child[j].titles = name;
							data.taskList[i].child[j].title = name.substring(0,7) + "...";
						}
						
					}
				}
				return data;
			},
			fromUMouthTopValue: function(data) {
				/* 选择月份 */
				this.mouth = data.id;
				this.findTaskByConditions();
			},
			clickProjectBut: function(index,unionId) {
				var that = this;
				if(this.selected == index){
					this.selected = -1;
					this.selectUnionid='';
				}else{
					this.selectUnionid=unionId;
					this.selected = index;
					this.commonApi.findRoutineTaskRemarks(this.token,unionId).then(
						res => {
							that.remarks = res.data.data;
						}
					);
				}
			},
			clickSonProjectBut: function(index,unionId) {
				var that = this;
				if(this.sonSelected == index){
					this.sonSelected = -1;
					this.selectSonUnionid = '';
				}else{
					this.sonSelected = index;
					this.selectSonUnionid = unionId;
					this.commonApi.findRoutineTaskRemarks(this.token,unionId).then(
						res => {
							that.remarkSon = res.data.data;
						}
					);
				}
			},
			clickSubtasks: function(item) {
				var params = JSON.stringify(item);
				uni.navigateTo({
					url: '../subtasks/index?project=' + params
				})
			},
			popupInputChange:function(event){
				this.popupTextareaValue = event.detail.value;
				this.popupTextareaValueLength = event.detail.value.length;
			},
			popup3InputChange:function(event){
				this.popup3TextareaValue = event.detail.value;
				this.popup3TextareaValueLength = event.detail.value.length;
			},
			clickNoteBut:function(item){
				this.selectRemark = item.unionId;
				this.$refs.popup.open();
			},
			popupTextBut:function(){
				var that = this;
				/* 提交留言 */
				if(this.popupTextareaValue == ""){
					uni.showToast({
						title:"留言内容不能为空!",
						duration:2000
					})
					return ;
				}
				
				this.commonApi.addRoutineTaskRemarks(this.token,this.selectRemark,this.popupTextareaValue).then(
				res => {
					uni.showToast({
						title:'添加成功',
						duration:2000,
						success() {
							setTimeout(function(){
								that.$refs.popup.close();
							},2000);
							// 获取备注
							if(that.selected != -1 && that.selectUnionid !=''){
								that.clickProjectBut(that.selected,that.selectUnionid)
							}
							if(that.sonSelected != -1 && that.selectSonUnionid !=''){
								that.clickSonProjectBut(that.sonSelected,that.selectSonUnionid)
							}
						}
					})
				});
				
			},
			/* 父任务点击催办 */
			clickCuibanBut:function(item){
				this.headItems =[];
				this.headSelectItem = item;
				if(item.supervisionLeader !=null && item.supervisionLeader !=undefined && item.supervisionLeader !=''){
						this.headItems.push({level:1,adminName:item.supervisionLeader});
				}
				if(item.responsibleLeader !=null && item.responsibleLeader !=undefined && item.responsibleLeader !=''
					&& item.responsibleLeader !=item.supervisionLeader){
					this.headItems.push({level:2,adminName:item.responsibleLeader});
				}
				if(item.responsible !=null && item.responsible !=undefined && item.responsible !='' &&
					item.responsible !=item.supervisionLeader && item.responsible !=item.responsibleLeader){
					this.headItems.push({level:3,adminName:item.responsible });
				}
				this.headPersion='';
				this.popup3TextareaValue=''
				this.isShowHeadPersion=false;
				this.$refs.popup3.open();
			},
			/* 子任务点击催办 */
			clickSonCuibanBut:function(item,responsible){
				this.headItems =[];
				this.headSelectItem = item;
				if(this.data.supervisionLeader !=null && this.data.supervisionLeader !=undefined && this.data.supervisionLeader !=''){
						this.headItems.push({level:1,adminName:this.data.supervisionLeader});
				}
				if(this.data.responsibleLeader !=null && this.data.responsibleLeader !=undefined && this.data.responsibleLeader !=''
					&& this.data.responsibleLeader !=this.data.supervisionLeader){
					this.headItems.push({level:2,adminName:this.data.responsibleLeader});
				}
				
				if(responsible !=null && responsible !=undefined && responsible !=''
					&& this.data.responsibleLeader != responsible && this.data.supervisionLeader != responsible){
					this.headItems.push({level:3,adminName:responsible});
				}
				
				
				if(item.responsible !=null && item.responsible !=undefined && item.responsible !='' &&
					item.responsible !=this.data.supervisionLeader && item.responsible !=this.data.responsibleLeader
					&& responsible != item.responsible){
					this.headItems.push({level:4,adminName:item.responsible });
				}
				this.headPersion='';
				this.popup3TextareaValue=''
				this.isShowHeadPersion=false;
				this.$refs.popup3.open();
			},
			findTaskByConditions: function() {
				var that =this;
				this.commonApi.findTaskByConditions(this.token, this.year, this.mouth,this.departmentId).then(
					res => {
						if(res.data.data.length == 0){
							this.data ={}
						}else{
							this.data =this.subTitleString(res.data.data[0]) ;
						}
					})
			},
			clickSubmitBut:function(item){
				this.selectProject = item;
				this.popupTitle = '是否提交审批?';
				if(item.status == 1 || item.status == 2){
					this.popupTitle = '是否审批通过?';
				}
				
				this.$refs.popup2.open();
				
				// uni.showModal({
				// 	title:'确认框',
				// 	content:title,
				// 	cancelText:'否',
				// 	confirmText:'是',
				// 	showCancel:true,
				// 	success: (res) =>{
				// 		if(res.confirm){
				// 			var that = this;
				// 			this.commonApi.approvalRoutineTask(this.token,item.unionId,item.status).then(
				// 			res => {
				// 				uni.showToast({
				// 					title:'操作成功',
				// 					duration:2000
				// 				})
				// 				that.findTaskByConditions();
				// 			})
				// 		}else{
				// 			return;
				// 		}
				// 	}
				// })
			},
			clickPopup2Confit:function(){
				this.$refs.popup2.close();
				var status = 1;
				this.approvalRoutineTask(this.selectProject,status);
			},
			clickPopup2Cacue:function(){
				this.$refs.popup2.close();
				if(this.selectProject.status != 0){
					var status = 0;
					this.approvalRoutineTask(this.selectProject,status);
				}
			},
			approvalRoutineTask:function(item,status){
				var that = this;
				this.commonApi.approvalRoutineTask(this.token,item.unionId,status).then(
				res => {
					uni.showToast({
						title:'操作成功',
						duration:2000
					})
					that.findTaskByConditions();
							})
			},
			clickPopup2Close:function(){
				this.$refs.popup2.close();
			},
			radioChange: function(evt) {
				
				for (let i = 0; i < this.headItems.length; i++) {
					console.info("headPersion: " +evt.target.value)
					console.info("headPersion: " +this.headItems[i].level)
					if (this.headItems[i].level == evt.target.value) {
						this.currentheadItems = i;
						this.headPersion=this.headItems[i].adminName;
						break;
					}
				}
				this.isShowHeadPersion = false;
			},
			clickHeadPersion:function(){
				this.isShowHeadPersion = true;
			},
			updateSelectPersion:function(){
				if(this.headPersion == ''){
					uni.showToast({
						title:'请选择接收人',
						duration:2000
					})
					return;
				}
				if(this.popup3TextareaValue == ''){
					uni.showToast({
						title:'请输入发送内容',
						duration:2000
					})
					return;
				}
				var that = this;
				this.commonApi.addUrgingRemarks(this.token,this.headSelectItem.unionId,this.headItems[this.currentheadItems].level,this.popup3TextareaValue).then(
				res =>{
					uni.showToast({
						title:'发送成功',
						duration:2000,
						success() {
							that.updateSelectPersionClose();
						}
					})
				});
			},
			updateSelectPersionClose:function(){
				this.headPersion='';
				this.popup3TextareaValue=''
				this.isShowHeadPersion=false;
				this.$refs.popup3.close();
			}
		
		}
	}
</script>

<style scoped>
	.project-top {

		margin-left: 10px;
		margin-right: 10px;
		margin-top: 60px;
		margin-bottom: 20px;
		border: #cfcfcf solid 1px;
		border-radius: 10px;
		background-color: #f6f6f6;
		padding-left: 10px;
		padding-right: 10px;
	}

	.project-top-top {
		text-align: center;
		font-size: 20px;
		padding-top: 15px;
		padding-bottom: 15px;
		color: #415fb9;
	}

	.project-top-center {
		font-size: 14px;
		color: #4c3e41;
	}

	.project-top-center-top {
		display: flex;
		margin-bottom: 20px;
	}

	.project-top-center-top view {
		display: flex;
	}

	.project-top-center-top view view {
		font-size: 14px;
		color: #FFFFFF;
		background-color: #377cf6;
		border-radius: 5px;
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 2px;
		padding-bottom: 2px;
	}


	.project-top-center-top-left {
		display: flex;
	}

	.project-top-center-top-left view {
		font-size: 14px;
		color: #FFFFFF;
		background-color: #377cf6;
		border-radius: 5px;
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 2px;
		padding-bottom: 2px;
	}

	.project-top-center-top-right {
		margin-left: auto;
		display: flex;
		align-items: center;

	}

	.project-top-center-top-right p {
		color: #e68429;
		background-color: #f6f6f6;
	}

	.project-top-bottom {
		display: flex;
		align-items: center;
		justify-content: left;
		margin-top: 10px;
		/* margin-left: 10px; */
		margin-bottom: 20px;
		color: ##000000;
		align-items: center;
	}

	.project-top-bottom view p {
		font-size: 24px;
	}

	.project-top-bottom-left {
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: 10px;
	}

	.project-top-bottom-left p {
		color: #4cacec;
	}

	.project-top-bottom-center {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.project-top-bottom-center p {
		color: #da8f4a;
	}

	.project-top-bottom-right {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.project-top-bottom-right p {
		color: #5fa55b;
	}

	.circle {
		background-color: #FFFFFF;
		border: #4a5cd9 solid 1.5px;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.circle-content {
		background-color: #4a5cd9;
		border-radius: 50%;
		width: 9px;
		height: 9px;
	}

	.project-center {
		margin-left: 10px;
		margin-right: 10px;
		margin-bottom: 20px;
	}

	.project-center-content {
		margin-left: 10px;
		display: flex;
		/* align-items: center; */
	}

	.project-center-right {
		border: #c1c1c1 solid 1rpx;
		border-radius: 20px;
		margin-left: 10px;
		width: calc(100vw - 70px);
		background-color: #f6f6f6;
		flex: 1;

	}
	.son-project-center-right {
		border: #c1c1c1 solid 1rpx;
		border-radius: 20px;
		margin-left: 10px;
		width: calc(100vw - 140px);
		background-color: #f6f6f6;
		flex: 1;

	}

	.project-center-content-title {
		border-radius: 20px;
		display: flex;
		width: 100%;
		height: 50px;
		align-items: center;

	}

	.project-center-content-titleName {
		color: #FFFFFF;
		margin-left: 20px;
		font-size: 18px;
		margin-right: auto;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.project-center-content-flag {
		/* margin-left: auto; */
		color: #FFFFFF;
		margin-right: 20px;
	}

	.project-center-content-son {
		padding-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.project-center-content-son-top {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #797979;
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

	.project-center-content-son-time {
		margin-left: auto;

	}

	.project-center-content-son-time view {
		margin-bottom: 10px;

	}

	.project-center-content-son-time p {
		color: #f19f63;
	}

	.project-center-center {
		/* display: flex; */
		color: #797979;
		margin-left: 10px;
		max-height: 225px;
		overflow-y: scroll;
		min-height: 200px;
	}

	.project-center-center-content {
		border-bottom: #c8c8c8 solid 1px;
		padding-left: 10px;
		padding-bottom: 10px;
		padding-top: 5px;
		margin-right: 10px;
		font-size: 14px;
		word-wrap: break-word;

	}

	.project-center-center-msg {
		font-size: 12px;
		margin-left: 10px;
		padding-top: 10px;
	}

	.project-center-bottom {
		color: #3842b5;
		display: flex;
		font-size: 18px;
		border-top: #c3c3c3 solid 1px;
		/* border-bottom: #c3c3c3 solid 1px; */
		padding-top: 10px;
		padding-bottom: 10px;
		justify-content: space-around;
		align-items: center;
	}

	.project-center-bottom view {
		align-items: center;
		display: flex;
	}

	.project-center-bottom view image {
		width: 17px;
		height: 17px;
	}

	.project-center-b {
		display: flex;
		margin-top: 10px;
		margin-bottom: 30px;
		justify-content: flex-end;
		font-size: 14px;
		color: #434343;
	}

	.project-center-b-left {
		display: flex;
	}

	.project-center-b-left p {
		color: #49a5f1;
		padding-left: 10px;
		padding-right: 15px;
	}

	.project-center-b-center {
		display: flex;
	}

	.project-center-b-center p {
		color: #d98d43;
		padding-left: 10px;
		padding-right: 15px;
	}

	.project-center-b-right {
		display: flex;
	}

	.project-center-b-right p {
		color: #56a54d;
		padding-left: 10px;
		padding-right: 10px;
	}
	
	
	.popup-body{
		/* margin-bottom: 10px;
		margin-left: 10px; */
		background-color: #FFFFFF;
		font-size: 16px;
		color: #1f2026;
	}
	
	.popup-body-v{
		padding: 10px;
	}
	.popup-body-but{
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: #efeff0 solid 1px;
		height: 50px;
		color: #232323;
		text-align: center;
	}
	.popup-body-value-l{
		display: flex;
		justify-content: flex-end;
		padding-bottom: 10px;
		padding-right: 20px;
		color: #666666;
		font-size: 13px;
	}
	
	/* 对号 */
	.check-style-unequal-width {
	        width: 6px;
	        height: 22px;
	        border-color: #FFFFFF;
	        border-style: solid;
	        border-width: 0 2px 2px 0;
	        transform: rotate(45deg);
	        margin-bottom:8px;
	    }
	/*圆圈中对号*/
	.check-style-unequal-width2 {
	        width: 6px;
	        height: 18px;
	        border-color: #d6d6d6;
	        border-style: solid;
	        border-width: 0 2px 2px 0;
	        transform: rotate(45deg);
	        margin-bottom:8px;
			margin-left: 12px;
			margin-top: 5px;
			opacity: 0.3;
	    }
	.check-style-unequal-width3{
			background-color: #FFFFFF;
			border-radius: 50%;
			/* margin-left: auto; */
			margin-right: 10px;
			width: 32px;
			height: 32px;
	}
	
	.project-center-right-state{
		font-size: 12px;
		color: #000000;
		background-color: #FFFFFF;
		padding: 5px;
		border-radius: 10px;
		/* margin-left: auto; */
		margin-right: 10px;
	}
	.project-title{
		text-align: center;
		padding-bottom: 10px;
		padding-left: 10px;
		padding-right: 10px;
		color: #797979;
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
	
	.persion-center-label-radio {
		margin-left: auto;
		margin-right: 10px;
	}
	.subtasks-body-top {
		display: flex;
		align-items: center;
		border-bottom: #efefef solid 1px;
		height: 45px;
		margin-left: 10px;
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
	.check-v {
		border-radius: 50%;
		background-color: #4377f9;
		margin-right: 16px;
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
	
	.popup3_body{
		background-color: #FFFFFF;
		font-size: 14px;
		color: #1f2026;
		border-radius: 10px;
	}
	
	.subtasks-body-bottom {
		bottom: 10px;
		height: 50px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.subtasks-body-bottom-left {
		height: 100%;
		flex: 1;
		font-size: 16px;
		color: #000000;
		background-color: #FFFFFF;
		border: #eeeeee solid 1px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.subtasks-body-bottom-right {
		height: 100%;
		flex: 1;
		background-color: #4087f1;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
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
	
</style>
