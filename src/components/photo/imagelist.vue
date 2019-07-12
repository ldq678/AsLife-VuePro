<template>
  <div class="imageListContainer">
    <ul
      class="imageList"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="100"
      style="max-height: 100vh; overflow-y: auto;"
    >
      <li v-for="item in list" :key="item.id">
        <!-- 最后改造成 路由链接 -->
        <router-link :to="'/home/imageinfo/' + item.id">
          <img v-lazy="item.img_url">
          <div class="info">
            <h3 class="info_title">{{item.title}}</h3>
            <p class="info_abstract">{{item.abstract}}</p>
          </div>
        </router-link>
      </li>
      <!--底部判断是加载图标还是提示“全部加载”-->
      <li class="more_loading">
        <mt-spinner type="fading-circle" v-show="is_loading_more" 
        class="loading_icon"></mt-spinner>
        <span v-show="finished">已经全部加载</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "imageList",
  data() {
    return {
      list: [],
      isLoading: false,
      is_loading_more: false, //控制 是否显示 ‘loading’的 图标
      finished: false,
      pageindex: 1,
      pagesize: 5
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
        url: "/images/imageslist",
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(response => {
        // 获取后台数据，形如{Status: 0, Msg: 'ok', Data: []}
        var data = response.data;
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
    }
  }
};
</script>
<style lang="less">
.imageListContainer {
  .imageList {
    list-style: none;
    padding: 10px;
    margin: 0;
    li {
      margin-bottom: 8px;
      position: relative;
      img{
        width: 100%;
        height: 260px;
        // vertical-align: middle;
        box-shadow: 0 2px 4px #999;
      }
      img[lazy="loading"] {
        width: 100%;
        height: 260px;
        margin: auto 0;
      }
      .info{
        padding: 5px;
        color: #eee;
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,0.4);
        max-height: 90px;
        .info_title{
          font-size: 14px;
        }
        .info_abstract{
          font-size: 12px;
          color: #eee;
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
