(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/easy-select/easy-select"],{"05e7":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n="easy-select",i=137,o=33,s=10,r=14,u=s+r,a="_easyWindowHeight",c={medium:{width:"240px",height:"40px"},small:{width:"200px",height:"30px"},mini:{width:"160px",height:"30px"}},l={name:n,props:{windowHeight:{type:[Number,String],default:0},placeholder:{type:String,default:"请选择"},value:{type:String,default:"双皮奶"},size:{type:String,default:"medium"},options:{type:Array,default:function(){return[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}]}}},data:function(){return{showOptions:!1,boundingClientRect:{},currentSelect:{},optionsGroupTop:"auto",optionsGroupMargin:""}},computed:{showSuffix:function(){return this.showOptions?"showOptions":"no-showOptions"},easySelectSize:function(){var t=this.size.toLowerCase();return t in c?{width:c[t].width,height:c[t].height}:{}}},mounted:function(){var e=this,n=t.createSelectorQuery().in(this);n.select(".easy-select").boundingClientRect((function(t){e.boundingClientRect=t})).exec();try{if(!this.windowHeight){var i=t.getStorageSync(a);if(i)return void(this.easyWindowHeight=i);var o=t.getSystemInfoSync();this.easyWindowHeight=o.windowHeight,t.setStorageSync(a,this.easyWindowHeight)}}catch(s){}},methods:{trigger:function(e){var n=this,r=t.createSelectorQuery().in(this);r.select(".easy-select").fields({rect:!0},(function(t){var e=t.top,r=t.bottom,a=Math.min(i+s,n.options.length*o+u);r=Number(n.windowHeight||n.easyWindowHeight)-(e+n.boundingClientRect.height),r<a?(n.optionsGroupDirection="up",n.optionsGroupTop=-a-12+"px",n.optionsGroupMargin="0"):(n.optionsGroupDirection="down",n.optionsGroupTop="auto",n.optionsGroupMargin="10px 0 0 0"),n.showOptions=!n.showOptions})).exec()},select:function(t){this.showOptions=!1,this.currentSelect=t,this.$emit("selectOne",t)},hideOptions:function(){this.showOptions=!1}}};e.default=l}).call(this,n("543d")["default"])},"8ae8":function(t,e,n){"use strict";n.r(e);var i=n("940d"),o=n("8f87");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("926f");var r,u=n("f0c5"),a=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"246b5c6d",null,!1,i["a"],r);e["default"]=a.exports},"8f87":function(t,e,n){"use strict";n.r(e);var i=n("05e7"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},"926f":function(t,e,n){"use strict";var i=n("c747"),o=n.n(i);o.a},"940d":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.easySelectSize]));t.$mp.data=Object.assign({},{$root:{s0:n}})},s=[]},c747:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/easy-select/easy-select-create-component',
    {
        'components/easy-select/easy-select-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8ae8"))
        })
    },
    [['components/easy-select/easy-select-create-component']]
]);
