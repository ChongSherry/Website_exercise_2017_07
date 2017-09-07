import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import recommend from '@/pages/recommend'
import sort from '@/pages/sort'
import user from '@/pages/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/sort',
      name: 'sort',
      component: sort
    },
    {
      path: '/user',
      name: 'user',
      component: user
    }
  ]
})
