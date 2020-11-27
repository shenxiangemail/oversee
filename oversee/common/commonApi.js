import commonConst from '@/common/commonConst.js'
import md5Util from '@/common/md5.js'

export default {

	//账号密码登录
	loginByPassword: function(loginAccount, loginPassword, nonceStr) {
		var postData = {
			loginAccount: loginAccount,
			loginPassword: loginPassword,
			nonceStr: nonceStr
		}

		return this.agentCommonApi(postData, commonConst.loginByPassword);
	},
	//根据token自动登录
	autoLogin: function(token) {
		var postData = {
			token: token
		}

		return this.agentCommonApi(postData, commonConst.autoLogin);
	},
	//账号安全退出
	logout: function(token) {
		var postData = {
			token: token
		}

		return this.agentCommonApi(postData, commonConst.logout);
	},
	//获取加密公钥
	publicKey: function() {
		var postData = {

		}

		return this.agentCommonApi(postData, commonConst.publicKey);
	},
	//更新密码
	updatePassword: function(token, oldPassword, newPassword, nonceStr) {
		var postData = {
			token: token,
			oldPassword: oldPassword,
			newPassword: newPassword,
			nonceStr: nonceStr
		}

		return this.agentCommonApi(postData, commonConst.updatePassword);
	},

	//获取责任人
	findResponsible: function(token) {
		var postData = {
			token: token
		}
		return this.agentCommonApi(postData, commonConst.findResponsible);
	},
	//添加子任务
	addRoutineTaskChild: function(token, parentId, taskName, deadline, responsible) {
		var postData = {
			token: token,
			parentId: parentId,
			taskName: taskName,
			deadline: deadline,
			responsible: responsible
		}
		return this.agentCommonApi(postData, commonConst.addRoutineTaskChild);
	},

	//添加备注
	addRoutineTaskRemarks: function(token, unionId, content) {
		var postData = {
			token: token,
			unionId: unionId,
			content: content
		}
		return this.agentCommonApi(postData, commonConst.addRoutineTaskRemarks);
	},
	//任务提交审批
	approvalRoutineTask: function(token, unionId, status) {
		var postData = {
			token: token,
			unionId: unionId,
			status: status
		}
		return this.agentCommonApi(postData, commonConst.approvalRoutineTask);
	},
	//根据月份获取具体任务列表
	findTaskByConditions: function(token, year, month, departmentId) {
		var postData = {
			token: token,
			year: year,
			month: month,
			departmentId: departmentId
		}
		return this.agentCommonApi(postData, commonConst.findTaskByConditions);
	},
	//获取任务年度信息
	findTaskYear: function(token) {
		var postData = {
			token: token
		}
		return this.agentCommonApi(postData, commonConst.findTaskYear);
	},
	//获取备注
	findRoutineTaskRemarks: function(token, unionId) {
		var postData = {
			token: token,
			unionId: unionId
		}
		return this.agentCommonApi(postData, commonConst.findRoutineTaskRemarks);
	},
	//获取任务统计
	findRoutineTaskStatistical: function(token, year) {
		var postData = {
			token: token,
			year: year
		}
		return this.agentCommonApi(postData, commonConst.findRoutineTaskStatistical);
	},
	//催办
	addUrgingRemarks: function(token, unionId,level,content) {
		var postData = {
			token: token,
			unionId: unionId,
			level: level,
			content: content
		}
		return this.agentCommonApi(postData, commonConst.addUrgingRemarks);
	},

	/* ------------------------------------临时任务start---------------------------------------- */

	//添加子任务
	taddRoutineTaskChild: function(token, parentId, taskName, deadline, responsible) {
		var postData = {
			token: token,
			parentId: parentId,
			taskName: taskName,
			deadline: deadline,
			responsible: responsible
		}
		return this.agentCommonApi(postData, commonConst.taddRoutineTaskChild);
	},

	//添加备注
	taddRoutineTaskRemarks: function(token, unionId, content) {
		var postData = {
			token: token,
			unionId: unionId,
			content: content
		}
		return this.agentCommonApi(postData, commonConst.taddRoutineTaskRemarks);
	},
	//任务提交审批
	tapprovalRoutineTask: function(token, unionId, status) {
		var postData = {
			token: token,
			unionId: unionId,
			status: status
		}
		return this.agentCommonApi(postData, commonConst.tapprovalRoutineTask);
	},
	//根据月份获取具体任务列表
	tfindTaskByConditions: function(token, year, month, departmentId) {
		var postData = {
			token: token,
			year: year,
			month: month,
			departmentId: departmentId
		}
		return this.agentCommonApi(postData, commonConst.tfindTaskByConditions);
	},
	//获取任务年度信息
	tfindTaskYear: function(token) {
		var postData = {
			token: token
		}
		return this.agentCommonApi(postData, commonConst.tfindTaskYear);
	},
	//获取备注
	tfindRoutineTaskRemarks: function(token, unionId) {
		var postData = {
			token: token,
			unionId: unionId
		}
		return this.agentCommonApi(postData, commonConst.tfindRoutineTaskRemarks);
	},
	//获取任务统计
	tfindRoutineTaskStatistical: function(token, year) {
		var postData = {
			token: token,
			year: year
		}
		return this.agentCommonApi(postData, commonConst.tfindRoutineTaskStatistical);
	},
	//催办
	taddUrgingRemarks: function(token, unionId,level,content) {
		var postData = {
			token: token,
			unionId: unionId,
			level: level,
			content: content
		}
		return this.agentCommonApi(postData, commonConst.taddUrgingRemarks);
	},

	/* ------------------------------------临时任务end---------------------------------------- */



	//公共api请求方法
	agentCommonApi: function(postData, url) {
		uni.showLoading({
			title: '加载中'
		})
		postData.sign = this.setFormData(postData);

		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: postData,
				method: "POST",
				header: {
					'Accept': 'application/json',
					'content-type': 'application/x-www-form-urlencoded' // 默认值
				},
				success(res) {
					uni.hideLoading();
					console.info("接收到成功信息：");
					console.info(res);
					if (res.statusCode != 200) {
						uni.showToast({
							title: '服务异常',
							duration: 2000,
							success() {}
						})
					} else if (res.data.resultCode == '00000') {
						resolve(res)
					} else {
						if (url.indexOf("autoLogin") != -1) {
							resolve(res)
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 2000,
								success() {
									setTimeout(function() {
										if (res.data.resultCode == 'A0230') {
											uni.navigateTo({
												url: '/pages/login/index'
											})
										}
									}, 2000)
								}
							})
						}
					}
				},
				fail(res) {
					uni.hideLoading();
					uni.showToast({
						title: '服务异常',
						duration: 2000,
						success() {}
					})
				}
			});
		})


	},

	//组装上送参数
	setFormData: function(obj) {
		var that = this;
		var newkey = Object.keys(obj).sort();
		var signStr = "";
		for (var i in newkey) {
			var s = newkey[i];
			signStr = signStr + newkey[i] + obj[s];
		}
		var sign = md5Util.md5(signStr + "md5Key" + commonConst.md5Key);
		return sign;
	},
	//获取随机值
	mathRand: function() {
		var num = '';
		var y = 6;
		for (var i = 0; i < 6; i++) {
			num += Math.floor(Math.random() * 10);
		}
		var time = (new Date()).getTime();

		return num + time;
	}

}
