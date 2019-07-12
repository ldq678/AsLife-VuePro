import VueRouter from 'vue-router';
// 导入4个tabbar的二级组件
import homeContainer from './components/tabbar/homeContainer.vue';
import classesContainer from './components/tabbar/classesContainer.vue';
import findContainer from './components/tabbar/findContainer.vue';
import cartContainer from './components/tabbar/cartContainer.vue';
import userContainer from './components/tabbar/userContainer.vue';
// 以下是导入home组件的3级组件
import newsList from './components/news/newslist.vue';
import newsInfo from './components/news/newsinfo.vue';
import imageList from './components/photo/imagelist.vue';
import imageInfo from './components/photo/imageinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsInfo from './components/goods/goodsinfo.vue';

const router = new VueRouter({
    routes: [
        {path:'/', redirect: '/home'},
        {path: '/home', component: homeContainer},
        {path: '/classes', component: classesContainer},
        {path: '/find', component: findContainer},
        {path: '/cart', component: cartContainer},
        {path: '/user', component: userContainer},
        {path: '/home/newslist', component: newsList},
        {path: '/home/newsinfo/:id', component: newsInfo},
        {path: '/home/imagelist', component: imageList},
        {path: '/home/imageinfo/:id', component: imageInfo},
        {path: '/home/goodslist', component: goodslist},
        {path: '/home/goodsinfo/:id', component: goodsInfo, name:'goodsInfo'},
    ],
    linkActiveClass: 'mui-active', //把tabbar中选中项的激活类，设置为mui默认的样式mui-active
})
export default router;