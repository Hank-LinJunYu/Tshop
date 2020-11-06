import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决路由重复点击的报错 vue-router的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}


const routes = [{
        path: "/",
        name: "index",
        component: () =>
            import ( /* webpackChunkName: 'views'*/ '@/views/index'),
    },
    {
        path: "/productdetails/:id",
        name: "productdetails",
        component: () =>
            import ( /* webpackChunkName: 'views'*/ '@/views/ProductDetails'),
    },
    {
        path: "/shoppingcarinterface",
        name: "shoppingcarinterface",
        component: () =>
            import ( /* webpackChunkName: 'views'*/ '@/views/ShoppingCarInterface'),
    },
    {
        path: "/checkout",
        name: "checkout",
        component: () =>
            import ( /* webpackChunkName: 'views'*/ '@/views/CheckOut'),
    },
    {
        path: "/payment",
        name: "payment",
        component: () =>
            import ( /* webpackChunkName: 'views'*/ '@/views/Payment'),
    },
    {
        path: "/order",
        name: "order",
        component: () =>
            import ( /* webpackChunkName: 'views'*/ '@/views/Order'),
    },
    {
        path: "/addresscontrol",
        name: "addresscontrol",
        component: () =>
            import ( /* webpackChunkName: 'views'*/ '@/views/AddressControl'),
    }
]

const router = new VueRouter({
    mode: "hash",
    routes
})

export default router