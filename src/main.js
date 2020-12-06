import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import axios from "axios";
import './assets/el-theme/index.css'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/display.css'

Vue.config.productionTip = false;

//element ui config
Vue.use(ElementUI, { locale });

//ion-icons config
Vue.config.ignoredElements = [/^ion-/]

//baseUrl
const http = axios.create({
    baseURL: "http://localhost:3000",
});
Vue.prototype.$http = http;

// interceptor
http.interceptors.request.use(config => {
    config.headers["auth-token"] = localStorage.getItem("user-token");
    return config;
});

// disable Element UI async validator form console warnings
const warn = console.warn;
console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].startsWith('async-validator:')) return
    warn(...args)
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')