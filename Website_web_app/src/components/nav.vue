<template>
    <ul class="nav_bar">
        <li v-bind:class="path=='/'?'nav_item active':'nav_item'">
            <router-link to="/">
                <span class="icon iconfont icon-home"></span>
                <span class="title">首页</span>
            </router-link>
        </li>
        <li class="nav_item" v-bind:class="path=='/recommend'?'nav_item active':'nav_item'">
            <router-link to="/recommend">
                <span class="icon iconfont icon-appreciate"></span>
                推荐
            </router-link>
        </li>
        <li class="nav_item"  v-bind:class="path=='/sort'?'nav_item active':'nav_item'">
            <router-link to="/sort">
                <span class="icon iconfont icon-list"></span>
                分类
            </router-link>
        </li>
        <li class="nav_item"  v-bind:class="path=='/user'?'nav_item active':'nav_item'">
            <router-link to="/user">
                <span class="icon iconfont icon-people"></span>
                用户
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'nav_bar',
    props:["path"],
    created(){
    },
    
}
</script>

<style>

</style>
