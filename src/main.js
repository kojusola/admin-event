import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import axios from "axios";
import './assets/el-theme/index.css'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });

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

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')