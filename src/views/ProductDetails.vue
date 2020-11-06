<template>
  <div id="main">
    <div class="store-content item">
      <div class="item-box">
        <div class="gallery-wrapper">
          <div class="gallery">
            <div class="thumb">
              <ul>
                <li class="on bigImg"><img :src="itemData.ali_image" /></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="banner">
          <div class="sku-custom-title">
            <div class="params-price">
              <span
                ><em>¥</em><i>{{ itemData.price * this.num }}</i></span
              >
            </div>
            <div class="params-info">
              <h4>{{ itemData.title }}</h4>
              <h6>{{ itemData.sub_title }}</h6>
            </div>
          </div>
          <div class="sku-dynamic-params-panel">
            <div class="sku-dynamic-params clear">
              <span class="params-name">颜色</span>
              <ul class="params-colors">
                <li
                  v-for="item in itemData.spec_json"
                  :key="item.spec_id"
                  :class="{ cur: item.spec_value_id === colorId }"
                  v-show="item.image"
                  @click="changeColor(item.spec_value_id)"
                >
                  <a>
                    <i><img :src="item.image" /></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="sku-dynamic-params clear">
              <div class="params-name">数量</div>
              <div class="params-detail clear">
                <div class="item-num js-select-quantity">
                  <span
                    :class="{ down: true, 'down-disabled': num == 1 }"
                    @click="delNum"
                    >-</span
                  >
                  <span class="num">{{ num }}</span>
                  <span
                    :class="{
                      up: true,
                      'up-disabled': num == this.itemData.limit_num,
                    }"
                    @click="addNum"
                    >+</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="sku-status">
            <div class="cart-operation-wrapper clearfix">
              <span class="blue-title-btn js-add-cart" @click="pushShoppingCar"
                ><a>加入购物车</a></span
              >
              <span class="gray-title-btn" @click="goShoppingCarInterface">                  
                  <a>现在购买</a>
                  </span>
            </div>
          </div>
        </div>
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
  data() {
    return {
      //储存所有请求数据
      allItemData:[],
      // 渲染当前页面
      itemData: {},
      // 用于切换图片
      itemSpuData: {},
      //用于切换颜色
      colorId: "",
      //用于购物车商品数量
      num: 1,
    };
  },
  async created() {
    let { data } = await this.$axios.get("/static/itemData.json");
    this.allItemData = data;
    this.itemData = data.find((item) => item.sku_id === this.$route.params.id);
    this.itemSpuData = data.filter(
      (item) => item.title === this.itemData.title
    );
    this.colorId = this.itemData.color_id;
    //console.log(data);
    //console.log(this.itemData);
    //console.log(this.itemSpuData);
  },
  watch: {
    //路由变化，当前页面数据变化
    $route:{
      handler(to){
        this.itemData = this.allItemData.find((item) => item.sku_id === to.params.id);
      }
    },
    //颜色选择变化，当前页面数据变化
    colorId: {
      handler() {
        this.itemData = this.itemSpuData.find(
          (item) => item.color_id === this.colorId
        );
        this.num = 1;
        this.number = 0;
      }
    },
  },
  methods: {
    //切换颜色
    changeColor(colorid){
      this.colorId = colorid;
      this.$nextTick(()=>{
        //this.$router.push('/productdetails/'+this.itemData.sku_id)
        this.$router.push({name:'productdetails',params:{id:this.itemData.sku_id}})
      })
    },
    //增加数量
    addNum() {
      if (this.num < this.itemData.limit_num) {
        this.num++;
      }
    },
    //减少数量
    delNum() {
      if (this.num > 1) {
        this.num--;
      }
    },
    //添加到购物车
    pushShoppingCar() {
      if (this.number > this.itemData.limit_num) {
      } else {
        let colorName = this.itemData.spec_json.find(
          (item) => item.spec_value_id === this.colorId
        ) || '';
        let data = {
          itemId: this.itemData.sku_id,
          itemImg: this.itemData.ali_image,
          itemTitle: this.itemData.title,
          itemColor: colorName.item_value,
          itemPrice: this.itemData.price,
          itemNum: this.num,
          itemLimitNum: this.itemData.limit_num
        };
        this.$store.commit("pushShoppingCar", data);
      }
    },
    //点击现在购买
    goShoppingCarInterface(){
      this.pushShoppingCar();
      this.$router.push({name:'shoppingcarinterface'});
    }
  },
};
</script>

<style lang='less'>
.bigImg {
  img {
    width: 400px;
    height: 400px;
  }
}
</style>