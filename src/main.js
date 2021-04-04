import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import axiosInstance from "./config/axios/axios";
import "./assets/el-theme/index.css";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/display.css";

Vue.config.productionTip = false;

//axios
Vue.prototype.$axios = axiosInstance;

//element ui config
Vue.use(ElementUI, { locale });

//ion-icons config
Vue.config.ignoredElements = [/^ion-/];

// disable Element UI async validator form console warnings
const warn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === "string" && args[0].startsWith("async-validator:"))
    return;
  warn(...args);
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
