<template>
    <div class="no_login" :style="{width:viewWidth+'px',height:viewHeight+'px'}">
        <h2>你未登录，请选择登录或者注册</h2>
        <mt-button class="doLogin" type="primary" >登录</mt-button>
        <mt-button class="create" type="danger" @click="create_show">注册</mt-button>
    </div>
</template>


<script>
import Vue from 'vue'
import { Header, Button } from 'mint-ui'

Vue.component(Button.name, Button);

Vue.component(Header.name, Header)

export default {
    name: 'no_login',
    props:['create_show'],
    data() {
        return {
            viewHeight: (document.documentElement.clientHeight)-98,
            viewWidth: document.documentElement.clientWidth

        };
    }
}
</script>

<style scoped>
.no_login {
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: #FFF;
    text-align: center
}
.doLogin{
    display: block;
    width: 100pt;
    margin: 20pt auto;
}
.create{
    display: block;
    width: 100pt;
    margin:20pt auto;
}
</style>

