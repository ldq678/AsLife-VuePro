<template>
  <div class="newsListContainer">
    <!-- 使用 Mint-UI的 Infinite scroll控件，实现上滑 加载数据 -->
    <!-- v-infinite-scroll="loadMore" 此属性用来设置AJAX请求数据的方法 -->
    <!-- infinite-scroll-disabled="isLoading" 属性用来设置该控件是否还继续
    响应上滑请求数据。true表示已加载完所有数据，上滑不再响应loadMore事件 -->
    <!-- infinite-scroll-distance="10" 用来设置距离底部的距离有多远时，
    触发AJAX请求下一页 -->
    <!-- style="max-height: 100vh; overflow-y: auto;" 这一句必须加，
    否则不能实现上滑触发loadMore -->
    <ul
      class="newsList"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="10"
      style="max-height: 100vh; overflow-y: auto;"
    >
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <p class="news_title">{{item.title}}</p>
          <p class="news_des">
            <span class="author">{{item.author}}</span>
            <span class="add_time">{{item.add_time | dateFormat}}</span>
            <span class="click_count">阅读:{{item.click_count}}</span>
          </p>
        </router-link>
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
  name: "newsList",
  data() {
    return {
      list: [],
      isLoading: false, //Infinite scroll控件所需属性，用来控制是否处于加载状态
      is_loading_more: false, //控制 是否显示 ‘loading’的 图标
      finished: false, //控制 是否显示 “已经全部加载”
      pageindex: 1,
      pagesize: 10
    };
  },
  methods: {
    loadMore: function() {
      console.log(this.list.length);
      this.isLoading = true;
      this.is_loading_more = true;
      this.$ajax({
        method: "get",
        url: "/news/newslist",
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(response => {
        // 获取后台数据，形如{Status: 0, Msg: 'ok', Data: []}
        var data = response.data;
        // console.log(data);
        if (data.Status == 0) {
          if (data.Data.length > 0) {
            this.list = this.list.concat(data.Data);
            this.pageindex++;
            this.isLoading = false;
          } else {
            this.isLoading = true;
            this.finished = true;
          }
          this.is_loading_more = false;
        } else {
          this.finished = true;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.newsListContainer {
  .newsList {
    list-style: none;
    padding: 0px 16px;
    li {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      p {
        margin: 0;
      }
      p.news_title {
        font-size: 16px;
        color: #333;
      }
      p.news_des {
        padding-top: 5px;
        font-size: 12px;
        color: #aaa;
        display: flex;
        justify-content: space-between;
        span {
          margin-right: 5px;
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