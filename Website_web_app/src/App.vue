<template>
  <div id="app">
    <router-view></router-view>  
    <NavBar v-bind:path="router_path" />  
  </div>
</template>

<script>
import Vue from 'vue';
import 'mint-ui/lib/style.css'
import { Button, Cell } from 'mint-ui'
import nav from './components/nav.vue'

Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component("NavBar", nav)


export default {
  name: 'app',
  data() {
    return {
      router_path: this.$route.fullPath
    }
  },
  created() {
  },
  beforeUpdate() {
    this.router_path = this.$route.fullPath
  }

}
</script>

<style>
html,body{
  font-size:62.5%;
}
body{
  margin:0;
  padding-bottom: 65px;
  box-sizing: border-box;
  background-color:#DDD;
}
#app {
  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  font-size:12pt;
}

.nav_bar {
  padding: 0;
  margin: 0;
  list-style: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;

  border-top: 1px solid #AAA;
  background-color: #288dff;
}

.nav_bar .nav_item {
  flex-grow: 1;
}

.nav_bar .nav_item.active {
  background-color: #007eff;
}

.nav_bar .nav_item.active>a {
  color: #FFF;
}

.nav_bar .nav_item>a {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 8px;
  line-height: 1.5em;

  color: #EEE;
}

.nav_bar .nav_item>a .icon {
  display: block;
  margin: 0 auto;
}

.nav_bar .nav_item>a .title {
  display: block;
  margin: 0 auto;
}
</style>
