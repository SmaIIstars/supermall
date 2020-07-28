import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

import FastClick from "fastclick";

import toast from "components/common/toast";

// 解决移动端300ms延迟问题
FastClick.attach(document.body);

Vue.config.productionTip = false;

// 事件总线$bus的赋值
Vue.prototype.$bus = new Vue();

// 安装Toast插件
Vue.use(toast);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
