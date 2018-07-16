import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
Vue.use(Router)

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
    },
    {
      path: '/formItem',
      name: 'formItem',
      //iview组件距离待完善
      component: function (resolve) { require(['@/pages/formItem.vue'], resolve) },
    }
  ]
})
