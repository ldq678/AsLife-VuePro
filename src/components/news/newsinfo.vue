<template>
    <div class="newsinfoContainer">   
          <!-- 标题 部分 -->
        <section class="title">
            <h2>{{this.news.title}}</h2>
        </section>
        <!-- 编辑 日期 点击量 部分 -->
        <section class="des">
            <p>
                <span class="author">编辑:{{this.news.author}}</span>
                <span class="add_time">日期:{{this.news.add_time | dateFormat}}</span>
                <span class="click_count">阅读:{{this.news.click_count}}</span>
            </p>
        </section>
        <!-- 图片 部分 -->
        <section class="img">
            <img :src="this.news.img_url" alt="">
        </section>
        <!-- 正文 部分 -->
        <section class="content">
            <div v-html="this.news.content"></div>
        </section>
        <!-- 评论 部分 -->
        <comment :id="this.newsId"></comment>
    </div>
</template>
<script>
import comment from '../subComponents/comment.vue';
export default {
    data(){
        return {
            newsId: this.$route.params.id, //第1步。先把路由传递过来的参数id挂载到组件身上，以方便接下来调用
            news: {},
        }
    },
    methods: {
        loadNewsInfo: function(){
            this.$ajax({
                method: 'get',
                url: '/news/newsinfo',
                params: {
                    newsid : this.newsId,
                }
            }).
            then(response => {
                // console.log(response);
                var data = response.data;
                if(data.Status == 0){
                    this.news = data.Data[0];
                }
            })
        }
    },
    created() {
        this.loadNewsInfo();
    },
    components:{
        comment
    }
}
</script>
<style lang="less">
.newsinfoContainer{
    padding: 15px;
    .title h2{
        padding: 5px 0;
        font-size: 24px;
        color: #333;
    }
    .des{
        font-size: 12px;
        padding-bottom: 20px;  
        p{
            display: flex;
            justify-content: space-between;
        }    
        .author{
            color: #333;
        }
    }
    .img{
        img{
            width: 100%;
        }
    }
    .content{
        font-size: 1.2rem;
        color: #333;
        p{
            color: #666;
            font-size: 1rem;
            text-indent: 20px;            
        }
        img{
            width: 100%; //必须把scoped去掉
        }
    }
}
</style>
