import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
    // ----------------引入router----------------
import router from './router'
// ----------------引入vuex------------------
import store from './store'
// ----------------引入CSS-------------------
import '@/assets/css/reset.css';
import '@/assets/css/account.css';
import '@/assets/css/address-pop.css';
import '@/assets/css/address.css';
import '@/assets/css/cart.css';
import '@/assets/css/checkout.css';
import '@/assets/css/goodsList.css';
import '@/assets/css/header.css';
import '@/assets/css/item.css';
import '@/assets/css/order.css';
import '@/assets/css/payment.css';
import '@/assets/css/prompt.css';
// ----------------引入axios------------------
import axios from 'axios';
Vue.prototype.$axios = axios;
// ----------------引入localStorage-----------
import localStorage from './localStorage';
Vue.use(localStorage);
//引入elementUI
import './elementUI'




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')