<template>
  <!-- 首页每个商品的组件 -->
  <div class="item">
    <div>
      <div class="item-img">
        <img
          :alt="list.name"
          :src="list.sku_info[changeItem].ali_image"
          style="opacity: 1"
        />
      </div>
      <h6>{{ list.shop_info.spu_title }}</h6>
      <h3>{{ list.shop_info.spu_sub_title }}</h3>
      <div class="params-colors">
        <ul class="colors-list">
          <li
            v-for="(each, i) in list.sku_info"
            :key="each.sku_id"
            @click="changeItem = i"
            v-show="each.spec_json[0].image"
          >
            <a href="javascript:;" :class="{ active: changeItem === i }"
              ><img :src="each.spec_json[0].image"
            /></a>
          </li>
        </ul>
      </div>
      <div class="item-btns clearfix">
        <span class="item-gray-btn"
          ><router-link
            :to="'/productdetails/' + list.sku_info[changeItem].sku_id"
            >查看详情</router-link
          ></span
        ><span class="item-blue-btn" @click="pushShoppingCar">加入购物车 </span>
      </div>
      <div class="item-price clearfix">
        <i>¥</i><span>{{ list.sku_info[changeItem].price }}</span>
      </div>
      <div class="discount-icon">false</div>
      <div class="item-cover">
        <router-link
          :to="'/productdetails/' + list.sku_info[changeItem].sku_id"
        ></router-link>
      </div>
    </div>
    <count-over></count-over>
  </div>
</template>

<script>
import countOver from "@/components/CountOver";
export default {
  components: {
    countOver,
  },
  props: ["list"],
  data() {
    return {
      //当前选择颜色的下标，控制类名，也控制图片
      changeItem: 0,
    };
  },
  methods: {
    //添加到购物车
    pushShoppingCar() {
      console.log(this.list);
      let colorName = this.list.sku_info[this.changeItem].spec_json[0]
        .show_name;
      let data = {
        itemId: this.list.sku_info[this.changeItem].sku_id,
        itemImg: this.list.sku_info[this.changeItem].ali_image,
        itemTitle: this.list.sku_info[this.changeItem].title,
        itemColor: colorName,
        itemPrice: this.list.sku_info[this.changeItem].price,
        itemNum: 1,
        itemLimitNum: this.list.sku_info[this.changeItem].limit_num,
      };
      this.$store.commit("pushShoppingCar", data);
    },
  },
};
</script>

<style>
</style>