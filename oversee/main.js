import Vue from 'vue'
import App from './App'
import hxNavbar from "./components/hx-navbar/hx-navbar"
import store from './store/index.js'
import commonConst from './common/commonConst.js'  //引入公共变量js
import commonApi from './common/commonApi.js'  //引入公共Api
import security from './common/security.js'
import md5 from './common/md5.js'  //引入公共Api


Vue.component('hx-navbar',hxNavbar)
Vue.prototype.$store = store
Vue.prototype.commonConst = commonConst;
Vue.prototype.commonApi = commonApi;
Vue.prototype.security = security; 
Vue.prototype.md5 = md5;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
