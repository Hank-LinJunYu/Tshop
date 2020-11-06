<template>
  <div id="main" class="hander-car">
    <div class="store-content">
      <div class="cart-box">
        <div class="title">
          <h2>购物清单</h2>
        </div>
        <div class="cart-inner">
          <div :class="{ 'empty-label': true, hide: purchaseList.length }">
            <h3>您的购物车中还没有商品</h3>
            <a class="link" href="javascript:;" @click="$router.push('/')">现在选购</a>
          </div>
          <div>
            <div
              :class="{ 'cart-table-title': true, hide: !purchaseList.length }"
            >
              <span class="name">商品信息</span>
              <span class="operation">操作</span>
              <span class="subtotal">小计</span>
              <span class="num">数量</span>
              <span class="price">单价</span>
            </div>
            <div :class="{ 'cart-table': true, hide: !purchaseList.length }">
              <div class="cart-group">
                <!--购物列表-->
                <div
                  class="cart-top-items"
                  v-for="item in itemCheckLists"
                  :key="item.itemId"
                >
                  <div class="cart-items">
                    <div class="items-choose">
                      <span
                        :class="{
                          'blue-checkbox-new': true,
                          'checkbox-on': item.isCheck,
                        }"
                        @click="checkItem(item.itemId)"
                        ><a></a
                      ></span>
                    </div>
                    <div class="items-thumb">
                      <img :src="item.itemImg" />
                      <a href="javascript:;" target="_blank"></a>
                    </div>
                    <div class="name hide-row">
                      <div class="name-table">
                        <a href="javascript:;" target="_blank">{{
                          item.itemTitle
                        }}</a>
                        <ul class="attribute">
                          <li>{{ item.itemColor }}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="operation">
                      <a
                        class="items-delete-btn"
                        @click="delShopList(item.itemId)"
                      ></a>
                    </div>
                    <div class="subtotal">
                      ¥ {{ item.itemPrice * item.itemNum }}
                    </div>
                    <div class="item-cols-num">
                      <div class="select js-select-quantity">
                        <span
                          :class="{
                            down: true,
                            'down-disabled': item.itemNum === 1,
                          }"
                          @click="
                            changeItemNum({ itemId: item.itemId, count: -1 })
                          "
                          >-</span
                        >
                        <span class="num">
                          <input
                            type="text"
                            style="display: inline-block"
                            :value="item.itemNum"
                          />
                          <!-- 这是什么鬼↓ -->
                          <ul>
                            <li>1</li>
                            <li>2</li>
                          </ul>
                          <!-- 这是什么鬼↑ -->
                        </span>
                        <span
                          :class="{
                            up: true,
                            'up-disabled': item.itemNum === item.itemLimitNum,
                          }"
                          @click="
                            changeItemNum({ itemId: item.itemId, count: 1 })
                          "
                          >+</span
                        >
                      </div>
                    </div>
                    <div class="price">¥ {{ item.itemPrice }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          :class="{
            'cart-bottom-bg': true,
            'fix-bottom': true,
            hide: !purchaseList.length,
          }"
        >
          <div class="cart-bar-operation">
            <div>
              <div class="choose-all js-choose-all">
                <span
                  class="blue-checkbox-new"
                  :class="{ 'checkbox-on': isCheckAll }"
                  @click="checkAll"
                  ><a></a
                ></span>
                全选
              </div>
              <div class="delete-choose-goods" @click="delCheckShopDatas">删除选中的商品</div>
            </div>
          </div>
          <div class="shipping">
            <div class="shipping-box">
              <div class="shipping-total shipping-num">
                <h4 class="">
                  已选择 <i>{{ checkCount.totalCount }}</i> 件商品
                </h4>
                <h5>
                  共计 <i>{{ checkCount.allTotalCounts }}</i> 件商品
                </h5>
              </div>
              <div class="shipping-total shipping-price">
                <h4 class="">
                  应付总额：<span>￥</span><i>{{ checkCount.totalPrice }}</i>
                </h4>
                <h5 class="shipping-tips">应付总额不含运费</h5>
              </div>
            </div>
            <span
              class="jianguo-blue-main-btn big-main-btn js-checkout"
              :class="{'disabled-btn':itemCheckLists.every(item=>!item.isCheck)}"
              @click="checkOut"
              ><router-link to="/checkout">现在结算</router-link></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      //存放添加到购物清单中的，且勾选的商品
      itemCheckLists: [],
      //存放勾选中商品的数量、价格
      checkCount: {},
      //点击全选
      isCheckAll: true,
    };
  },
  created() {
    this.itemCheckLists = this.purchaseList.map((item) => {
      return {
        ...item,
        isCheck: true,
      };
    });
  },
  watch: {
    purchaseList: {
      handler() {
        this.itemCheckLists = this.purchaseList.map((item) => {
          return {
            ...item,
            isCheck: true,
          };
        });
        this.getCheckCount();
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapState(["purchaseList"]),
  },
  methods: {
    ...mapMutations(["changeItemNum"]),
    //计算勾选商品金额和数量和总商品数量，方便下面复用
    getCheckCount() {
      let totalCount = 0;
      let totalPrice = 0;
      let allTotalCounts = 0;
      this.itemCheckLists.forEach((item) => {
        if (item.isCheck) {
          totalCount += item.itemNum;
          totalPrice += item.itemNum * item.itemPrice;
        }
        allTotalCounts += item.itemNum;
      });
      this.checkCount = {
        totalCount,
        totalPrice,
        allTotalCounts,
      };
    },
    //勾选商品
    checkItem(id) {
      let idx = this.itemCheckLists.findIndex((item) => item.itemId === id);
      this.itemCheckLists[idx].isCheck = !this.itemCheckLists[idx].isCheck;
      this.getCheckCount();
      //如果存在一个未勾选，全选按钮为false
      this.isCheckAll = this.itemCheckLists.every((item) => item.isCheck);
    },
    //删除按钮
    delShopList(id) {
      this.$store.commit("delShopList", { itemId: id });
      let index = this.itemCheckLists.findIndex((item) => item.itemId === id);
      this.itemCheckLists.splice(index, 1);
      this.getCheckCount();
    },
    //删除所有选中商品
    delCheckShopDatas(){
      //过滤出所有选中商品
      let items = this.itemCheckLists.filter(item=>item.isCheck);
      items.forEach(item=>{
        this.$store.commit("delShopList", { itemId: item.itemId });
      })
    },
    //全选
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.itemCheckLists.forEach((item) => {
        item.isCheck = this.isCheckAll;
      });
      this.getCheckCount();
    },
    //提交勾选的商品订单
    checkOut(){
      let list = this.itemCheckLists.filter(item=>item.isCheck);
      this.$store.commit('checkOut',{list});
    }
  },
};
</script>

<style>
</style>