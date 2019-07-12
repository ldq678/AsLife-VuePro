//导入 vue
import Vue from 'vue';

//导入vue-router模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import app from './App.vue'

//导入路由模块
import router from './router.js';

import axios from 'axios'; //导入axios
axios.defaults.baseURL = 'http://www.barteam.cn:8086';  //配置根域名
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded' //设置axios 发出post跨域请求
}
Vue.prototype.$ajax = axios;  //把axios挂载到Vue的原型上

//导入MUI框架，该框架不能通过npm安装，
//只能把他的dist文件直接拷贝过来，放到lib目录下，并重命名为mui
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';

//引入Mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

//引入第3方的 moment ，帮我们做日期的格式化：npm i moment -S
import Moment from 'moment';
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD  HH:MM'){
    return Moment(dataStr).format(pattern);
})

//导入 图片预览 组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// //使用Vuex步骤：
// //1.安装 npm i vuex -S
// //2.导入 import Vuex from 'vuex'
// //3.注册  Vue.use(Vuex)
// //4.创建仓储对象 var store = new Vuex.Store({})
// //5.把仓促对象挂载到Vue实例身上
// import Vuex from 'vuex';
// Vue.use(Vuex);
// var store = new Vuex.Store({
//     state: { //访问方法： this.$store.state.xxx
//         cart: [] // 购物车，存储结构{id: 商品id, title: 商品名字, price: 价格, img_url: 图片url，count: 购买数量}
//     },
//     mutations: { 
//     },
//     getters: { //访问方法： this.$store.getters.xxx

//     }
// });
import store from "./store.js";

var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    router,
    store
})

