<template>
  <article id="main">
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li><a href="javascript:;" class="active">综合排序</a></li>
          <li><a href="javascript:;" class="">销量排序</a></li>
          <li><a href="javascript:;" class="">价格低到高</a></li>
          <li><a href="javascript:;" class="">价格高到低</a></li>
        </ul>
      </div>
      <div class="gray-box">
        <div class="item-box">
          <item-shop v-for="item in itemDataList" :key="item.id" :list="item"></item-shop>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import itemShop from '@/components/ItemShop';
export default {
  data() {
    return {
      itemDataList: []
    };
  },
  components:{
    itemShop
  },
  async created() {
    //或者使用浏览器的API
    // let res = await fetch("/static/goodData.json");
    // let data =await res.json();
    // console.log(data);

    let { data } = await this.$axios.get("/static/goodData.json");
    this.itemDataList = data.map(item=>{
      return item.spu
    });
    //console.log(this.itemDataList);
  },
};
</script>

<style>
</style>