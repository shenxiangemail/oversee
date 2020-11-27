

// 公共变量

const md5Key = "78R38FA5A3E96EC64G0I";

//内网
// const api_url = "http://192.168.2.14:8899";
//测试
// const api_url = "http://47.97.198.116:10014";

// 正式
const api_url = "https://www.jgdbgroup.com:10014";

const loginByPassword = api_url + '/loginByPassword'; //登录接口
const publicKey = api_url + '/publicKey'; //获取加密公钥
const autoLogin = api_url + '/autoLogin'; //根据token自动登录
const logout = api_url + '/logout'; //账号安全退出
const updatePassword = api_url + '/updatePassword'; //更新密码

const findResponsible = api_url + '/user/findResponsible'; //获取责任人
// 常规任务接口
const addRoutineTaskChild = api_url + '/routineTask/addRoutineTaskChild'; //添加子任务
const addRoutineTaskRemarks = api_url + '/routineTask/addRoutineTaskRemarks'; //添加备注
const approvalRoutineTask = api_url + '/routineTask/approvalRoutineTask'; //任务提交审批
const findTaskByConditions = api_url + '/routineTask/findTaskByConditions'; //根据月份获取具体任务列表
const findTaskYear = api_url + '/routineTask/findTaskYear'; //获取任务年度信息
const findRoutineTaskRemarks = api_url + '/routineTask/findRoutineTaskRemarks'; //获取备注
const findRoutineTaskStatistical = api_url + '/routineTask/findRoutineTaskStatistical'; //获取任务统计
const addUrgingRemarks = api_url + '/routineTask/addUrgingRemarks'; //催办

//临时任务相关接口
const taddRoutineTaskChild = api_url + '/temporaryTask/addTemporaryTaskChild'; //添加子任务
const taddRoutineTaskRemarks = api_url + '/temporaryTask/addTemporaryTaskRemarks'; //添加备注
const tapprovalRoutineTask = api_url + '/temporaryTask/approvalTemporaryTask'; //任务提交审批
const tfindTaskByConditions = api_url + '/temporaryTask/findTaskByConditions'; //根据月份获取具体任务列表
const tfindTaskYear = api_url + '/temporaryTask/findTaskYear'; //获取任务年度信息
const tfindRoutineTaskRemarks = api_url + '/temporaryTask/findTemporaryTaskRemarks'; //获取备注
const tfindRoutineTaskStatistical = api_url + '/temporaryTask/findTemporaryTaskStatistical'; //获取任务统计
const taddUrgingRemarks = api_url + '/temporaryTask/addUrgingRemarks'; //催办


export default{
	md5Key:md5Key,
	loginByPassword:loginByPassword,
	publicKey:publicKey,
	autoLogin:autoLogin,
	logout:logout,
	updatePassword:updatePassword,
	findResponsible:findResponsible,
	addRoutineTaskChild:addRoutineTaskChild,
	addRoutineTaskRemarks:addRoutineTaskRemarks,
	approvalRoutineTask:approvalRoutineTask,
	findTaskByConditions:findTaskByConditions,
	findTaskYear:findTaskYear,
	findRoutineTaskRemarks:findRoutineTaskRemarks,
	findRoutineTaskStatistical:findRoutineTaskStatistical,
	addUrgingRemarks:addUrgingRemarks,
	
	taddRoutineTaskChild:taddRoutineTaskChild,
	taddRoutineTaskRemarks:taddRoutineTaskRemarks,
	tapprovalRoutineTask:tapprovalRoutineTask,
	tfindTaskByConditions:tfindTaskByConditions,
	tfindTaskYear:tfindTaskYear,
	tfindRoutineTaskRemarks:tfindRoutineTaskRemarks,
	tfindRoutineTaskStatistical:tfindRoutineTaskStatistical,
	taddUrgingRemarks:taddUrgingRemarks,
	
}