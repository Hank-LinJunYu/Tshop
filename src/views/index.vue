<template>
  <article id="main">
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li v-for="(item, i) in title" :key="i">
            <a
              href="javascript:;"
              :class="{ active: isActive === i }"
              @click="sortShop(i, item)"
              >{{ item }}</a
            >
          </li>
        </ul>
      </div>
      <div class="gray-box">
        <div class="item-box">
          <item-shop
            v-for="item in itemSortDataList"
            :key="item.id"
            :list="item"
          ></item-shop>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import itemShop from "@/components/ItemShop";
export default {
  data() {
    return {
      //请求回的所有商品数据
      itemDataList: [],
      //排序标题
      title: ["综合排序", "销量排序", "价格低到高", "价格高到低"],
      //控制类名
      isActive: 0,
      //排序前的数据(排序后会让请求回的原数据也发生改变,需要一个值储存原来的数据)
      itemOldDataList: [],
      //排序后商品数据
      itemSortDataList: [],
    };
  },
  components: {
    itemShop,
  },
  async created() {
    //或者使用浏览器的API
    // let res = await fetch("/static/goodData.json");
    // let data =await res.json();
    // console.log(data);

    
    let { data } = await this.$axios.get("/static/goodData.json");
     this.itemSortDataList = data.map((item) => {
      return item.spu;
    });
    this.itemOldDataList = data.map((item) => {
      return item.spu;
    });
    this.itemDataList = data.map((item) => {
      return item.spu;
    });

  },
  methods: {
    sortShop(i, item) {
      this.isActive = i;
      switch (item) {
        case "综合排序":
          this.itemSortDataList = this.itemOldDataList;
          break;
        case "价格低到高":
          this.itemSortDataList = this.itemDataList.sort(function (a, b) {
            a = a.sku_info[0].price;
            b = b.sku_info[0].price;
            return a - b;
          });
          break;
        case "价格高到低":
          this.itemSortDataList = this.itemDataList.sort(function (a, b) {
            a = a.sku_info[0].price;
            b = b.sku_info[0].price;
            return b - a;
          });
          break;
        default:
          this.itemSortDataList = this.itemOldDataList;
          break;
      }
    },
  },
};
</script>

<style>
</style>