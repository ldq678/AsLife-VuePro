//使用Vuex步骤：
//1.安装 npm i vuex -S
//2.导入 import Vuex from 'vuex'
//3.注册  Vue.use(Vuex)
//4.创建仓储对象 var store = new Vuex.Store({})
//5.使用 export default store; 把仓储对象暴露出去
//6.在main.js中导入store.js模块 import store from "./store.js";
//7.把仓促对象挂载到Vue实例身上
import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

// 每次启动app的时候，先从本地localstorage中，获取购物车数据
// 然后 用它来初始化 store中的cart信息 
var lsCart = JSON.parse(localStorage.getItem('cart') || '[]');

var store = new Vuex.Store({
    state: { //访问方法： this.$store.state.xxx
        //cart: [] // 购物车，存储结构
        //{id: 商品id, title: 商品名字, price: 价格, 
        // img_url: 图片url，count: 购买数量,stock:库存}
        cart: lsCart
    },
    mutations: { //访问方法： this.$store.commit('方法名', [arg])，
                // arg是唯一的，如果需要传多个数据，可以组织成对象传过去
        addToCart(state, goods){
            //点击加入购入车，把商品信息保存到store中的cart里
            //1. 如果购物车中已经有这个商品了，则更新数量
            //2. 如果购物车中没有该商品，则直接把商品信息push到cart里
            var flag = false; //判断有没有该商品
            state.cart.some(item => {
                if(item.id == goods.id){
                    item.count += parseInt(goods.count);
                    flag = true;
                    return true;
                }
            })
            if(!flag){
                state.cart.push(goods);
            }
            // 每次仓储改变了，都要把数据 持久化到 localstorage中
            // localstorage 是以key：value对 的形式存储数据的，其中value只能是字符串
            // 所以这里的state.cart对象要使用JSON.stringify()转化成字符串
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeGoods(state, goodsId){
            state.cart = state.cart.filter(item => {
                return item.id != goodsId;
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateStore(state, goodsInfo){
        //goodsInfo是在购物车页面中修改购买个数后，即时修改仓储数量
        //goodsInfo：{id: 101, count: 8}
            state.cart.some(item => {
                if(item.id == goodsInfo.id){
                    item.count = goodsInfo.count;
                }
            })
            if(state.cart.length > 0){
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        }
    },
    getters: { //访问方法： this.$store.getters.xxx
        getAllCount(state){
            var total = 0;
            state.cart.forEach(item => {
                total += item.count;
            })
            return total;
            //然后去改造app.vue中，页脚tab栏的购物车气球上的数量
        },
        getTotalPrice(state){
            var total = 0;
            state.cart.forEach(item => {
                total += item.price * item.count;
            })
            return total;
        }
    }
});
export default store;