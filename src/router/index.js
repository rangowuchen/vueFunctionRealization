import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Grid from 'vue-js-grid'
Vue.use(Router)
Vue.use(Grid)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Grid',
      name: 'Grid',
      //安装网格(https://github.com/euvl/vue-js-grid)
      component: function (resolve) { require(['@/pages/vuejsGrid.vue'], resolve) },
    }
  ]
})
