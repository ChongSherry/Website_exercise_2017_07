<template>
  <div class="hello" :style="{width:viewWidth+'px',height:viewHeight+'px'}">
    <no-login v-if="no_login" :create_show="create_show"></no-login>
    <mt-popup v-model="create" position="right">
      <create-user v-if="create" :close_mod_create="close_mod_create"/>
    </mt-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import NoLogin from '../components/nologin';
import Create_user from '../components/create_user';
import {  Popup } from 'mint-ui'
Vue.component(Popup.name, Popup)
Vue.component("create-user", Create_user);
Vue.component("no-login", NoLogin);
export default {
  name: 'index',
  data() {
    return {
      viewHeight: (document.documentElement.clientHeight) - 98,
      viewWidth: document.documentElement.clientWidth,
      no_login: true,
      create: false
    }
  },
  methods: {
    create_show: function () {
      this.create = true;
    },
    close_mod_create:function(){
      this.create = false;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden
}
</style>
