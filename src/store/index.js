import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //购买商品的列表
        purchaseList: JSON.parse(window.localStorage.getItem('purchaseDatalist')) || [],
        //超出限额弹出框状态
        isOver: false,
        //购物车组件的出现
        isPurchase: false,
        //购物车组件的出现的定时器
        smallTimer: null,
        //提交的勾选的订单
        checkedShopList:JSON.parse(window.localStorage.getItem('checkedShopList')) || [],
        //地址组件的出现
        isAdressPop: false,
        //所有地址列表
        adressLists: JSON.parse(window.localStorage.getItem('adressDatalist')) || [],
        //提交订单的地址和发票信息
        nowAddressData:JSON.parse(window.localStorage.getItem('nowAddressData')) || {},
        //购物小球的信息
        ball: {
            ballEl: null,
            isShow: false,
            img: ''
        }
    },
    getters: {
        //计算属性，计算商品的总金额和总数量
        totalCount(state) {
            let num = 0;
            let price = 0;
            state.purchaseList.forEach(item => {
                num += item.itemNum;
                price += item.itemNum * item.itemPrice;
            })
            return { num, price };
        },
        //计算属性，计算勾选订单的总金额和总数量
        totalCheckOutCount(state) {
            let num = 0;
            let price = 0;
            state.checkedShopList.forEach(item => {
                num += item.itemNum;
                price += item.itemNum * item.itemPrice;
            })
            return { num, price };
        }
    },
    mutations: {
        //添加购物车商品列表
        pushShoppingCar(state, { itemId, itemImg, itemTitle, itemColor, itemPrice, itemNum, itemLimitNum }) {
            let includes = state.purchaseList.some(item => item.itemId === itemId);
            //查看是否属于已添加商品
            if (includes) {
                //比较现有商品数量和要添加的数量是否超出限额
                let nowNum = state.purchaseList.find(item => item.itemId === itemId).itemNum;
                if (itemNum > itemLimitNum - nowNum) {
                    //达到限额弹出提示框
                    state.isOver = true;
                    state.purchaseList.find(item => item.itemId === itemId).itemNum = itemLimitNum;
                } else {
                    state.purchaseList.find(item => item.itemId === itemId).itemNum += itemNum;
                    //点击添加商品时，购物小球出现
                    state.ball.isShow = true;
                    state.ball.img = itemImg;
                    state.ball.ballEl = event.path[0];
                }
            } else {
                state.purchaseList.push({ itemId, itemImg, itemTitle, itemColor, itemPrice, itemNum, itemLimitNum });
                //点击添加商品时，购物小球出现
                state.ball.isShow = true;
                state.ball.img = itemImg;
                state.ball.ballEl = event.path[0];
            }
            //添加商品弹出购物车组件
            state.isPurchase = true;
        },
        //改变超出限额弹出框状态
        changeIsOver(state, { status }) {
            state.isOver = status;
        },
        //改变购物车组件出现状态
        changePurchase(state, { status }) {
            clearTimeout(state.smallTimer);
            state.isPurchase = status;
        },
        //改变购物车组件隐藏状态
        changePurchaseHiden(state, { status }) {
            state.isPurchase = status;
        },
        //删除某个商品列
        delShopList(state, { itemId }) {
            let index = state.purchaseList.findIndex(item => item.itemId === itemId);
            state.purchaseList.splice(index, 1)
        },
        //购物清单界面增减商品数量
        changeItemNum(state, { itemId, count }) {
            let list = state.purchaseList.find(item => item.itemId === itemId);
            //加
            if (count <= list.itemLimitNum - list.itemNum && count > 0) {
                list.itemNum += count;
            }
            //减
            if (count < 0 && list.itemNum > 1) {
                list.itemNum += count;
            }
        },
        //提交的勾选的订单
        checkOut(state, { list }) {
            state.checkedShopList = list;
            window.localStorage.setItem("checkedShopList",JSON.stringify(state.checkedShopList))
        },
        //改变订单地址组件出现状态
        changeAdressPop(state, { status }) {
            state.isAdressPop = status
        },
        //储存所有地址
        saveAdress(state, data) {
            //判断数据是否完全一样
            let res = state.adressLists.some(item => {
                if (item.name === data.name && item.phone === data.phone && item.adress === data.adress) {
                    return true
                } else {
                    return false
                }
            })
            if (res) {
                this.$message.error('重复的地址信息！')
            } else {
                if (data.isDefault) {
                    state.adressLists.forEach(item => { item.isDefault = false });
                    state.adressLists.push(data);
                } else {
                    state.adressLists.push(data);
                }
            }
        },
        //删除某个地址
        removeAdressData(state, { thisItem }) {
            let idx = state.adressLists.findIndex(item => item === thisItem);
            state.adressLists.splice(idx, 1);
        },
        //储存当前订单地址和发票信息
        saveNowAddress(state, data) {
            state.nowAddressData = data
            window.localStorage.setItem("nowAddressData",JSON.stringify(state.nowAddressData))
        },
        //运动完改变小球状态
        changeBallShow(state, { status }) {
            state.ball.isShow = status;
        }
    },
    actions: {
        //延迟隐藏购物车组件
        hideShoppingCar(store, payload) {
            store.state.smallTimer = setTimeout(() => {
                store.commit('changePurchaseHiden', payload)
            }, 300);
        }
    },
    modules: {}
})