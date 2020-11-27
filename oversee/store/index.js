import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		loginState: false,
		token: "",
		userInfo: "",
		statusBar: 0, //状态栏高度
		customBar: 0, //状态栏加导航栏高度
	},
	mutations: {
		login(state, object) {
			state.token = object.token;
			state.userInfo = object.userInfo;
			uni.setStorageSync("token", object.token);
			uni.setStorageSync("userInfo", object.userInfo);
			state.loginState = true;
		},
		loginOut(state) {
			state.token = "";
			state.userInfo = "";
			uni.setStorageSync("token", "");
			uni.setStorageSync("userInfo", "");
			state.loginState = true;
		},

		setStatusAndCustomBar(state, object) {
			state.statusBar = object.statusBar;
			state.customBar = object.customBar;
		}
	},
	getters: {
		getToken(state) {
			if (state.token == '') {
				state.token = uni.getStorageSync("token");
			}
			return state.token;
		},
		getUserInfo(state) {
			if (state.userInfo == '') {
				state.userInfo = uni.getStorageSync("userInfo");
			}
			return state.userInfo;
		}
	},


})
export default store
