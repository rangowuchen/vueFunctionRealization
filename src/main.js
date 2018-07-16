// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入组件vue-js-grid
import Grid from 'vue-js-grid'
Vue.use(Grid)
// 导入ui组件库 iview
import iView from 'iview';
import 'iview/dist/styles/iview.css'; // 导入样式
Vue.use(iView);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
