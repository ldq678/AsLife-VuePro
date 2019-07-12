<template>
  <div class="imageInfoContainer">
    <!-- 顶部，基础信息 -->
    <section class="top">
      <h3 class="title">{{imgInfo.title}}</h3>
      <p class="subinfo">
        <span>发布者:{{imgInfo.author}}</span>
        <span>{{imgInfo.add_time | dateFormat}}</span>
        <span>阅读量:{{imgInfo.click_count}}</span>
      </p>      
    </section>
    <!-- 简介 -->
    <section class="abstract">
        <p v-html="imgInfo.abstract"></p>
    </section>
    <!-- 缩略图区 -->
    <!-- 这里使用Vue的一个插件，叫vue-preview。
    使用前需要先安装 npm i vue-preview -S -->
    <!-- 然后使用 import 导入进来 -->
    <section class="thumbs">
        <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
    </section>
    <!-- 评论子组件 -->
    <section class="cmt">
        <comment :id="this.imgId"></comment>
    </section>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
//导入 评论 子组件
import comment from '../subComponents/comment.vue'

export default {
    data() {
        return {
            imgId: this.$route.params.id,
            imgInfo: {},
            thumbsList: [],
        };
    },
    methods: {
        getImageInfo() {//获取图片详情。不包含缩略图
            this.$ajax({
                method: "get",
                url: "/images/imageinfo",
                params: {
                    imgid: this.imgId
                }
            }).then(response => {
                // console.log(response.data)
                var data = response.data
                if (data.Status == 0) {
                    // 注意，从服务器过来的数据 Data 是个数组
                    this.imgInfo = data.Data[0]
                } else {
                    Toast('获取图片信息失败！');
                }
            });
        },
        getThumbsList(){
            this.$ajax({
                method: "get",
                url: "/thumbs/" + this.imgId,
            }).then(response => {
                // console.log(response.data)
                var data = response.data
                if (data.Status == 0) {        
                    data.Data.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        item.src = item.img_url;
                        item.msrc = item.img_url;
                    });            
                    this.thumbsList = data.Data
                    console.log(this.thumbsList)
                } else {
                    Toast('获取图片信息失败！');
                }
            });
        },
        // handleClose(){
        //     console.log('关闭了')
        // }
    },
    created(){
        this.getImageInfo();
        this.getThumbsList();
    },
    components:{
        comment,
    }
};
</script>
<style lang="less">
.imageInfoContainer{
    padding: 10px;
    .top{
        border-bottom: 1px solid #bbb;
        .title{
            font-size: 20px;
            color: #333;
            font-family: '微软雅黑';
            text-align: center;
        }
        .subinfo{
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            margin: 0;
            font-size: 14px;
        }
    }
    .abstract{
        text-indent: 2em;
        font-size: 14px;
        color: #444;
        padding: 15px;
    }
    .thumbs{
        .imgPrev{
            .my-gallery{
                figure{
                    display: inline-block;
                    margin: 8px;
                }
                img{
                    width: 80px;
                    height: 60px;
                }
            }
        }
    }
}
</style>
