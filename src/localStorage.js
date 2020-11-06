// 封装localStorage函数
import Vue from 'vue';
const localStorage = {
    set(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val));
    },
    get(key) {
        return JSON.parse(window.localStorage.getItem(key));
    }
}
export default {
    install() {
        Vue.prototype.$localStorage = localStorage
    }
}