<template>
    <div class="content_view" :style="{width:viewWidth+'px',height:viewHeight+'px'}">
        <mt-header fixed :title="content.title">
            <span slot="left" @click="clese_content">
                <i class="icon iconfont icon-back"></i>
            </span>
        </mt-header>
        <div class="view">
            <h2 class="title">{{content.title}}</h2>
            <div class="info">
                日期时间
                做者
            </div>
            <p class="content_text" v-html="content.contentText"></p>
        </div>
    </div>
</template>


<script>
import Vue from 'vue'
import { Header } from 'mint-ui'

import fq from '../base/fetchQuery'
import config from '../config'

Vue.component(Header.name, Header)

export default {
    name: 'content_view',
    props: ["record", "clese_content", "show_content_id"],
    data() {
        return {
            viewHeight: document.documentElement.clientHeight,
            viewWidth: document.documentElement.clientWidth,
            //文章内容
            content: null

        };
    },
    created() {
        fq.findOne(
            fq.ports.server + fq.ports.port.findOne,
            "content",
            this.show_content_id
        ).then((result) => {
            this.content = result
        }).catch((error) => {

        })
    }
}
</script>

<style scoped>
.content_view {
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: #FFF;
}

.view{
    padding:50px 8px;
}
</style>

