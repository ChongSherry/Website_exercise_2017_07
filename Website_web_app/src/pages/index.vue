<template>
  <div class="list_view" :style="{height:wrapperHeight+'px'}">
    <mt-loadmore :topMethod="loadTop" :bottomMethod="loadBottom" ref="loadmore" :autoFill="autoFill" :bottomAllLoaded="allLoaded">
      <ul class="article_list">
        <li class="article" @click="article_click(item._id)" :key="item._id" v-for="item in list">
          <h2 class="title">{{item.title}}</h2>
          <img class="photo" v-if="item.titleImage" v-bind:src="server_url+'/uploadfile/'+ item.titleImage" alt="item.title" />
          <span class="sub_titile">{{item.subTitle}}</span>
        </li>
      </ul>
    </mt-loadmore>
    <mt-popup v-model="show_content" position="right">
      <Content_view v-if="show_content" :clese_content="clese_content" :show_content_id="show_content_id" />
    </mt-popup>
  </div>
</template>

<script>
import fq from '../base/fetchQuery'
import config from '../config'

import { Loadmore, Popup } from 'mint-ui'
import Vue from 'vue'

import content_view from '../components/content_view'

Vue.component(Loadmore.name, Loadmore)
Vue.component(Popup.name, Popup)
Vue.component("Content_view", content_view)

export default {
  name: 'index',
  data() {
    return {
      server_url: config.server,
      wrapperHeight: 0,
      allLoaded: false,
      autoFill: false,
      //分页参数
      list: [],
      pageNum: 1,
      pageSize: 2,
      count: 0,
      show_content: false,
      show_content_id: ""
    }
  },
  created() {

  },
  methods: {
    article_click(id) {
      this.show_content = true;
      this.show_content_id = id;
    },
    loadTop() {
      this.getPage(1);
    },
    loadBottom() {
      this.getPage(this.pageNum + 1);
    },
    //分页和加载数据的方法
    getPage(pageNum) {
      fq.find(
        fq.ports.server + fq.ports.port.find,
        "content",
        { title: 1, subTitle: 1, titleImage: 1, createTime: 1 },
        {
          show: true,
          draft: false,
          beginTime: { $lt: new Date(Date.now()) }
        },
        {
          isTop: -1, createTime: -1
        },
        pageNum,
        this.pageSize
      ).then((result) => {
        this.count = result.count;
        this.pageNum = result.pageNum;
        if (Number(pageNum) === 1) {
          this.list = result.list;
        } else {
          this.list = this.list.concat(result.list);
        }
        this.$refs.loadmore.onTopLoaded();
      }).catch((error) => {
        this.allLoaded = true;
      });
    },
    clese_content() {
      this.show_content = false;
    }
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - 60;
    this.getPage(this.pageNum);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list_view {
  overflow: scroll;
  box-sizing: border-box;
}

.article_list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.article {
  box-shadow: 4px 7px 3px #888888;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  background-color: #FFF;
  margin: 30px 35px;
  
}

.article .title {
  display: block;
  font-size: 1.5rem
}

.article .photo {
  display: block;
  width: 100%;
  height: auto;
}

.article .sub_title {
  display: block;
}
</style>
