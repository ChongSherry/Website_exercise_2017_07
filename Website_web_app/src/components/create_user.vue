<template>
    <div class="create_user" :style="{width:viewWidth+'px',height:viewHeight+'px'}">
        <mt-header fixed :title="title" class="header_create">
            <span slot="left" @click="close_mod_create">
                <i class="icon iconfont icon-back"></i>
            </span>
        </mt-header>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="user_id" class="top"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="eq_password"></mt-field>
        <mt-field label="昵称" placeholder="请输入昵称" type="url" v-model="name"></mt-field>
        <span class="sex-main">性别</span>
        <mt-radio title="" v-model="sex" :options="option" align="left"></mt-radio>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
        <mt-field label="电话" placeholder="请输入电话" type="number" v-model="phone"></mt-field>
        <mt-button class="create_ajax" type="primary">注册</mt-button>
    
    </div>
</template>


<script>
import Vue from 'vue'
import { Header, Field, Radio } from 'mint-ui'

Vue.component(Field.name, Field);
Vue.component(Header.name, Header);
Vue.component(Radio.name, Radio);

export default {
    name: 'create_user',
    props: ['close_mod_create'],
    data() {
        return {
            viewHeight: document.documentElement.clientHeight,
            viewWidth: document.documentElement.clientWidth,
            title: "用户注册",
            eq_password: "",
            option: [{
                label: '女',
                value: '0',
            },
            {
                label: '男',
                value: '1'
            }],
            // form 表单
            user_id: "",
            password: "",
            name: "",
            sex: "",//false 0 女 true 1 男
            email: "",
            phone: ""
        };
    }
}
</script>

<style scoped>
.create_user {
    
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: #FFF;
    font-size: 14pt;
    font-weight: 600;
    text-align: left;
}

.header_create {
    box-shadow: 0px 2px #888;
}

.icon {
    padding-left: 10px;
}

.sex-main {
    font-size: 13pt;
    font-weight: 600;
    display: inline-block;
    height: 48px;
    padding: 10px;
    line-height: 48px;
}

.top {
    margin-top: 48px;
}
.create_ajax{
    display: block;
    margin: 10px auto;
}
</style>

