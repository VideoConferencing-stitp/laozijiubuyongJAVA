import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import Chart from "vue-echarts";

Vue.component('chart', Chart)

Vue.component(VueQrcode.name, VueQrcode);
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')