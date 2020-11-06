<template>
  <!-- 弹出购物车组件 -->
  <li
    :class="{ 'nav-cart': true, active: isPurchase }"
    @mouseleave="hideShoppingCar({ status: false })"
    @mouseenter="changePurchase({ status: true })"
  >
    <a href="javascript:;">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num" :class="{ 'cart-num': totalCount.num }">
      <i>{{ totalCount.num }}</i>
    </span>
    <div class="nav-cart-wrapper">
      <div class="nav-cart-list">
        <div class="empty" v-if="!purchaseList.length">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full" v-else>
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for="item in purchaseList" :key="item.itemId">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img :src="item.itemImg" />
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <router-link
                            :to="{
                              name: 'productdetails',
                              params: { id: item.itemId },
                            }"
                            >{{ item.itemTitle }}</router-link
                          >
                        </h4>
                        <p class="attrs">
                          <span>{{ item.itemColor }}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span
                          ><span class="price-num">{{ item.itemPrice }}</span
                          ><span class="item-num">x {{ item.itemNum }}</span>
                        </h6>
                      </div>
                    </div>
                    <div
                      class="del-btn"
                      @click="delShopList({ itemId: item.itemId })"
                    >
                      删除
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>
              共 <strong class="ng-binding">{{ totalCount.num }}</strong> 件商品
            </p>
            <h5>
              合计：<span class="price-icon">¥</span
              ><span
                class="price-num ng-binding"
                ng-bind="cartMenu.totalPrice"
                >{{ totalCount.price }}</span
              >
            </h5>
            <h6>
              <a
                ng-href="http://www.smartisan.com/shop/#/cart"
                href="http://www.smartisan.com/shop/#/cart"
              ></a>
              <router-link class="nav-cart-btn" to="/shoppingcarinterface"
                >去购物车</router-link
              >
            </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物小球 -->
    <transition
      name="ball"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="addcart-mask" v-show="ball.isShow">
        <img class="mask-item" />
      </div>
    </transition>
  </li>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["purchaseList", "isPurchase", "ball"]),
    ...mapGetters(["totalCount"]),
  },
  created() {
    console.log(this.purchaseList);
  },
  methods: {
    ...mapMutations(["changePurchase", "delShopList"]),
    ...mapActions(["hideShoppingCar"]),
    beforeEnter(el) {
      //el为小球div
      //获取点击按钮的位置，作为移动起始点
      let btnPosition = this.ball.ballEl.getBoundingClientRect();
      //获取购物车图片的位置，作为移动结束点
      let shopCarPosition = document
        .querySelector(".nav-cart")
        .getBoundingClientRect();
      //计算两者位置差
      let x = shopCarPosition.left - btnPosition.left - btnPosition.width / 2;
      let y = btnPosition.top - shopCarPosition.top - btnPosition.height / 2;
      //通过让小球外面的div和里面img分别 纵向/横向位移实现 整体斜线运动
      //再通过控制两者位移速度差异，实现整体抛物线运动
      el.style.transform = "translateY(" + y + "px)";
      //获取小球div里面img，设置样式
      let ballImg = document.querySelector(".mask-item");
      ballImg.style.transform = "translateX(-" + x + "px)";
      ballImg.src = this.ball.img;
      ballImg.width = 20;
      ballImg.height = 20;
      ballImg.style.borderRadius = "50%";
    },
    enter(el) {
      //display:none-->block-->none 这个过程没有过度效果,一瞬间完成,所以通过offsetHeight导致浏览器重绘,
      //实现 抛物线完成后再消失 , 也可以通过settimeout来实现
      el.offsetHeight;
      this.$nextTick(() => {
        el.style.transform = "translate(0,0)";
        document.querySelector(".mask-item").style.transform = "translate(0,0)";
      });
    },
    afterEnter(el) {
      this.$store.commit("changeBallShow", { status: false });
    },
  },
};
</script>

<style>
.ball-enter-active {
  transition: 0.5s cubic-bezier(0.15, 0.69, 0.6, 1.29);
}
.ball-enter-active .mask-item {
  transition: 0.5s cubic-bezier(0, 0, 1, 1);
}
.addcart-mask {
  position: relative;
  z-index: 40;
}
</style>