<template>
    <div class="commentContainer">
        <div class="commentHeader">
            <h5>观点</h5>           
        </div>

        <div class="commentlist">
            <ul>
                <li v-for="item in list" :key="item.id">
                    <p>
                        <span class="mui-icon mui-icon-contact"></span>
                        <span class="user">匿名用户</span>
                        <span class="add_time">{{item.add_time | dateFormat}}</span>
                    </p>
                    <P class="content">{{item.content}}</P>
                </li>
            </ul>
            <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined mui-btn-block" @click="loadMoreComments">加载更多评论</button> 
        </div>
        <div class="comment">
            <p><span>发表我的观点</span> <span @click="postComment">发送</span></p>
            <textarea class="txtMsg" rows="3" placeholder="优质的观点将在前排展示" v-model="msg"></textarea>          
        </div>
    </div>
</template>
<script>
import {Toast, Popup} from "mint-ui";
import qs from 'qs';
export default {
    data: function(){
        return {
            pageindex: 1,
            pagesize: 10,
            list: [],            
            msg: '',
        }
    },
    methods: {
        getCommnets(){
            this.$ajax({
                method: 'get',
                url: 'comment',
                params: {
                    srcid: this.id,
                    pageindex: this.pageindex,
                    pagesize: this.pagesize
                }
            }).
            then(response => {
                // console.log(response.data)
                console.log(this.id)
                var data = response.data;
                if(data.Status == 0){
                    if(data.Data.length > 0){
                        this.list = this.list.concat(data.Data);
                    }else{
                        Toast({
                            message: '没有更多评论了',
                            duration: 3000
                        })
                    }
                }else
                {
                    Toast('请求评论失败')
                }
            })
        },
        loadMoreComments(){
            this.pageindex++;
            this.getCommnets();
        },
        postComment(){
            if(this.msg.length > 0){
                var time = new Date().toLocaleTimeString();
                this.$ajax({
                    method: 'post',
                    url: 'comment',
                    data: qs.stringify({
                        //通过路由参数this.$route.params.id，能拿到被评论对象的id
                        //也可以通过组件间传值的props属性，拿到被评论对象id
                        srcId : this.id, 
                        content: this.msg,
                        add_time: new Date()
                    })
                }).
                // this.$ajax.post('comment', qs.stringify({
                //     "srcId" : this.$route.params.id, //通过路由参数，就能拿到被评论对象的id
                //     "content": this.msg,
                //     "add_time": new Date()
                // })).
                then(response => {
                    // console.log(response.data);
                    this.list.unshift({id:'', content: this.msg, srcId: this.id, add_time: new Date()});
                    this.msg = '';
                });
            }else{
                Toast({
                    message: '不能发表空评论！',
                    duration: 3000,
                    position: 'bottom',
                })
            }
        }
    },
    props:["id"],
    created(){
        this.getCommnets();
    }
}
</script>
<style lang="less">
.commentContainer{
    .commentHeader{
        padding: 10px 0 5px 0;
        border-bottom: 1px solid #ddd;
        h5{
            border-left: 5px solid #ce0000;
            padding-left: 10px;
            font-size: 18px;
            font-family: '微软雅黑';
            font-weight: bold;
            color: #333;
            
        }
    }
    .commentlist{
        ul{
            list-style: none;
            padding: 0;
            li{
                padding: 0;
                margin: 0;

                p{
                    padding: 5px 0;
                    margin: 0;
                    font-size: 14px;;
                    span.user{
                        padding-right: 20px;
                        font-family: '微软雅黑';
                        color: darkgoldenrod;
                    }                    
                }
                p.content{
                    padding-left: 28px;
                    font-size: 14px;
                    border-bottom: 1px solid #ddd;
                }
            }
        }
        .mui-btn{
            padding: 5px 0;
        }
    }
    .comment{
        p{
            display: flex;
            justify-content: space-between;            
            span{
                padding: 5px 10px;
            }
        }
        .txtMsg{
            color: #444;
            font-size: 14px;
        }
    }
}
</style>
