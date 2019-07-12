<template>
    <div class="appContainer">
        <!-- header : MUI -- NavBar -->
        <header id="header" class="mui-bar mui-bar-nav">
            <a v-if="showBack" @click="goback" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">安师生活--爱安师爱生活</h1>
		</header>
        <!-- 中间的二级组件容器 -->
        <!-- 一定要注意一定要加上mui-content的样式否则你的内容会被头部覆盖掉 -->
        <div class="mui-content">
            <transition>
                <keep-alive include="newsList,imageList">
                    <router-view></router-view>
                <!--这里是会被缓存的组件-->
                </keep-alive>
            </transition>
        </div>
        <!-- footer:tabbar -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/classes">
				<span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
				<span class="mui-tab-label">分类</span>
			</router-link>
            <router-link class="mui-tab-item" to="/find">
				<span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
				<span class="mui-tab-label">发现</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}}</span>
                </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>			
			<router-link class="mui-tab-item" to="/user">
				<span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
    </div>
</template>
<script>

export default {
    data(){        
        return {
            showBack: false ,//是否显示 回退箭头，默认不显示
        }
    },
    created(){
        if(this.$route.path == '/home'){
           this.showBack = false;
        }else{
            this.showBack = true;
        }
    },
    watch: { //监听路由，如果是首页，则不显示 回退箭头；否则，显示回退箭头
        '$route.path': function(newValue, oldValue){
            // console.log(newValue);
            if(newValue == '/home'){
                this.showBack = false;
            }else{
                this.showBack = true;
            }
        }
    },
    methods:{
        goback: function(){
            //这里要特别注意。在vue-router中，$route和$router是不同的。
            //$route是管路由传参的。
            //$router是管URL的
            //这里是$router;
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less" scoped>
html{
    height: 100%;
    overflow: hidden;
    body{
        height: 100%;
        overflow: auto;
    }
}
    .appContainer{
        // padding-top: 44px;
        padding-bottom: 50px;
        // 解决组件切换动画师，产生滚动条的问题
        overflow-x: hidden; 
        .mui-bar-nav{
            background-color: #ce0000; 
            .mui-action-back{
                color: #eee;
            }
            .mui-title{        
                color: #eee;
                font-size: 20px;
                font-weight: bold;
                font-family: "微软雅黑";      
            }      
        }
        .mui-bar-tab{
            border-top: 1px solid #ccc;
            overflow: hidden;
            .mui-active{
                color:#ce0000;
            }
        }
    }
    // .v-enter, .v-leave-to{
    //     opacity: 0;
    //     transform: translateX(100%);
    // }

    // 解决组件切换动画效果，组件从左侧离开
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        //以下一行样式，解决进入的组件从下往上跳的问题
        position: absolute;
    }
    .v-enter-active, .v-leave-active{
        transition: all 0.3s ease;
    }
</style>