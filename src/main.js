import Vue from "vue";
import App from "./App.vue";
import va from "../packages/index";

Vue.config.productionTip = false;
Vue.use(va);
new Vue({
  render: h => h(App)
}).$mount("#app");
