import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入element-ui 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入 vant 
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 引入路由配置的参数,并注入Vue 实例
import router from './routes'

//把 axios 写入Vue的原型，成为Vue的属性 在任何地方都可以使用了
import axios from 'axios';
Vue.prototype.$axios = axios;
const backend_axios=axios.create({
  baseURL: "http://47.97.41.248:1907"
})
Vue.prototype.$backend_axios = backend_axios;
new Vue({
  router,   //注入实例
  render: h => h(App),
}).$mount('#app')
