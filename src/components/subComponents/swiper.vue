<template>
    <div class="swiperContainer">
        <mt-swipe :auto="3000">
            <!-- 这个swiperList 是轮播图图片数据，谁使用这个组件，谁给它传这个list -->
            <!-- 所以，需要使用父组件向子组件传值 -->
            <mt-swipe-item v-for="item in swiperList" :key="item.id">
                <img :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props: ["swiperList"], // 通过 父组件 向 子组件 传递过来轮播图数据
}
</script>
<style lang="less">
.swiperContainer{
    .mint-swipe{
        height: 280px;        
        .mint-swipe-indicators {
            .mint-swipe-indicator{
                background-color: #ebedf0;
            }
            .mint-swipe-indicator.is-active{
                opacity: 1;
            }
        }
        .mint-swipe-item{
            background-color: #369;      
            img{
                width: 100%;
                height: 100%;
            }      
        }
    }
}
</style>
