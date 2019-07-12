<template>
    <div class="goodsListContainer">
        <ul
            class="goodsList"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="isLoading"
            infinite-scroll-distance="100"
            style="max-height: 100vh; overflow-y: auto;"
        >        
            <li v-for="item in list" :key="item.id">
                <!-- 最后改造成 路由链接 -->
                <!-- <router-link :to="'/home/goodsinfo/' + item.id" tag="div" class="goodsItem"> -->
                <!-- 编程导航 -->
                <!-- 1. 把router-link 换成div -->
                <!-- 2. 给div添加click事件 -->
                <!-- 3. 给路由匹配规则添加 name 属性 -->
                <!-- 4. 在click事件中，使用this.$router.push({name: '', params: {}}) 导航到goodsinfo-->
                <div class="goodsItem" @click="goGoodsInfo(item.id)">
                    <!-- 单条商品记录 -->
                    <div class="item_imgBox">
                        <img :src="item.img_url" alt="">
                    </div>
                    <div class="item_right">
                        <h3 class="title">{{item.title}}</h3>
                        <p class="price">
                            <span class="sellPrice">￥{{item.sell_price}}</span>
                            <span class="marketPrice">原价:￥{{item.market_price}}</span>
                        </p>
                        <p class="stock">库存：{{item.stock}}</p>
                        <button type="button" class="mui-btn mui-btn-danger">立即抢购</button>
                    </div>
                </div>
                <!-- </router-link> -->
            </li>
            <!--底部判断是加载图标还是提示“全部加载”-->
            <li class="more_loading">
                <mt-spinner type="fading-circle" v-show="is_loading_more" class="loading_icon"></mt-spinner>
                <span v-show="finished">已经全部加载</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      isLoading: false,
      is_loading_more: false, //控制 是否显示 ‘loading’的 图标
      finished: false,
      pageindex: 1,
      pagesize: 8
    };
  },
  created(){
    this.loadMore();
  },
  methods: {
    loadMore: function() {
      console.log(this.list.length);
      this.isLoading = true;
      this.$ajax({
        method: "get",
        url: "/goods/goodslist",
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(response => {        
        var data = response.data;
        console.log(data);
        if (data.Status == 0) {
          if (data.Data.length > 0) {
            this.list = this.list.concat(data.Data);
            this.pageindex++;
            this.isLoading = false;
          } else {
            this.isLoading = true;
            this.finished = true;
          }
        } else {
          this.finished = true;
        }
      });
    },
    goGoodsInfo(goodsId){
      this.$router.push({name: 'goodsInfo', params: {id: goodsId}})
    }
  },
  // filters:{
  //   goodsTitleFormater: function(title){
  //     //最长容纳14个汉字
  //     var len = 0;
  //     var en = 0;
  //     for (var i=0; i< title.length; i++) { 
  //       var c = title.charCodeAt(i); 
  //       //单字节加1 
  //       if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
  //         len++;  //英文占1个字符
  //         en++;   //统计英文字母个数
  //       } 
  //       else { 
  //         len += 2; //汉字占2个字符
  //       } 
  //     };
  //     if(len > 28){
  //       var subLen = 16 + en / 2;
  //       title = title.substr(0, subLen) + '...';
  //     }
  //     return title;
  //   }
  // }
}
</script>
<style lang="less">
.goodsListContainer{
    padding: 5px;
    .goodsList{
        list-style: none;
        margin: 0;
        padding: 0;
        .goodsItem{
            position: relative;
            display: flex;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            .item_imgBox{
                position: relative;
                width: 7rem;
                display: inline-block;
                margin-right: 10px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 3%
                }
            }
            .item_right{
              position: relative;
              display: block;
              -webkit-box-flex: 1;
              -webkit-flex: 1;
              flex: 1;
              .title{
                  font-size: 16px;
                  font-family: '微软雅黑';
                  font-weight: bold;
                  padding-bottom: 18px;
                  color: #333;
              }
              .price{
                font-size: 12px;
                color: #888;
                margin: 0;
                .sellPrice{
                    font-size: 18px;
                    font-family: '微软雅黑';
                    font-weight: bold;
                    color: #ce0000;
                    margin-right: 0px;
                }
                .marketPrice{
                    text-decoration: line-through;
                }
              }
              .mui-btn-danger{
                position: absolute;
                bottom: 30px;
                right: 0px;
              }
            }
        }
        li.more_loading {
            font-size: 12px;
            color: #aaa;
            text-align: center;
            border: none;
            .loading_icon {
                position: relative;
                left: 45%;
            }
        }
    }
}
</style>