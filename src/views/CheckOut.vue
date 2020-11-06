<template>
  <div id="main">
    <div class="content page-order-checkout checkout">
      <div class="js-checkout-address-box">
        <div class="gray-box clear">
          <div class="title columns-title pre-title">
            <h2>收货信息</h2>
          </div>
          <div class="box-inner js-checkout-address-panel">
            <div class="address-common-table js-multiple-address-panel">
              <ul class="address-item-list clear js-address-item-list">
                <!-- 新增地址 -->
                <li
                  class="js-choose-address"
                  v-for="item in adressLists"
                  :key="item.adress"
                  @click="changeAdress(item.name)"
                  :class="{ 'selected-address-item': isName === item.name }"
                >
                  <div class="address-item">
                    <div class="name-section">{{ item.name }}</div>
                    <div class="mobile-section">{{ item.phone }}</div>
                    <div class="detail-section">
                      {{ item.provinceName }} {{ item.cityName }}
                      {{ item.areaName }}<br />
                      {{ item.adress }}
                    </div>
                  </div>
                  <div class="operation-section">
                    <span class="update-btn js-edit-address">修改</span>
                    <span class="delete-btn js-delete-address">删除</span>
                  </div>
                </li>
                <!-- 新增地址 -->
                <li
                  class="add-address-item js-add-address"
                  @click="changeAdressPop({ status: true })"
                >
                  <p>使用新地址</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="gray-box">
        <div class="title">
          <h2>发票信息</h2>
        </div>
        <div class="box-inner invoice-box js-invoice-box">
          <p class="invoice-detail">发票类型：电子发票</p>
          <div class="invoice-detail">
            发票抬头：
            <div class="radio-box">
              <label>
                <input type="radio" class="hide" />
                <span
                  class="blue-radio blue-radio-on"
                  ref="person"
                  @click.self="clickPerson"
                  ><a></a
                ></span>
                个人
              </label>
              <label>
                <input type="radio" class="hide" />
                <span class="blue-radio" ref="unit" @click.self="clickUnit"
                  ><a></a
                ></span>
                单位
              </label>
            </div>
            <div
              class="module-form-row form-item fn-hide js-invoice-title"
              ref="invoice"
            >
              <div class="module-form-item-wrapper no-icon small-item">
                <input
                  v-model="invoiceData.head"
                  type="text"
                  class="js-verify"
                  ref="head"
                  placeholder="请填写公司发票抬头"
                />
              </div>
            </div>
          </div>
          <p class="invoice-detail">发票内容：购买商品明细</p>
          <p class="invoice-label">
            电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据。电子发票打印后可以用于企业报销。
          </p>
        </div>
      </div>
      <div class="gray-box">
        <div class="title pre-title">
          <h2>购物清单</h2>
        </div>
        <div class="box-inner ui-goods-cart">
          <div class="gray-sub-title cart-table-title">
            <span class="name">商品名称</span>
            <span class="subtotal">小计</span>
            <span class="num">数量</span>
            <span class="price">单价</span>
          </div>
          <div class="cart-table">
            <div class="cart-group js-cart-group">
              <div
                class="cart-items"
                v-for="item in checkedShopList"
                :key="item.itemId"
              >
                <div class="items-thumb">
                  <a href="javascript:;" target="_blank"
                    ><img :src="item.itemImg"
                  /></a>
                </div>
                <div class="name hide-row">
                  <div class="name-cell">
                    <a
                      href="javascript:;"
                      :title="item.itemTitle"
                      target="_blank"
                      >{{ item.itemTitle }} ({{ item.itemColor }})</a
                    >
                  </div>
                </div>
                <div class="subtotal">
                  <div class="subtotal-cell">
                    ¥ {{ item.itemNum * item.itemPrice }}
                  </div>
                </div>
                <div class="goods-num">{{ item.itemNum }}</div>
                <div class="price">¥ {{ item.itemPrice }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-inner">
          <div class="order-discount-line">
            <p>
              商品总计： <span>¥ {{ totalCheckOutCount.price }}</span>
            </p>
            <p>
              运费： <span>+ ¥ 0.00</span>
            </p>
            <p class="discount-line js-discount-cash">
              <em>现金券</em>： <span> - 0.00 </span>
            </p>
          </div>
        </div>
        <div class="box-inner">
          <div class="last-payment clear">
            <span
              class="jianguo-blue-main-btn big-main-btn payment-blue-bt fn-right js-checkout"
              @click="goToPayment"
            >
              <a>提交订单</a>
            </span>
            <span class="prices fn-right"
              >应付金额：
              <em>¥ {{ totalCheckOutCount.price  }}</em></span
            >
          </div>
        </div>
      </div>
    </div>
    <adress-pop
      v-if="isAdressPop"
      @clickDefaultAdress="clickDefaultAdress"  
    ></adress-pop>
  </div>
</template>

<script>
import adressPop from "@/components/AdressPop";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    adressPop,
  },
  data() {
    return {
      //控制选择地址的变量
      isName: "",
      //存放选中的地址信息
      nowAdress: "",
      //存放发票信息
      invoiceData: {
        head: "",
        title: "个人",
      },
    };
  },
  computed: {
    ...mapState(["checkedShopList", "isAdressPop", "adressLists"]),
    ...mapGetters(["totalCheckOutCount"]),
  },
  created(){
    //初始化页面时，选择默认地址
    this.isName = this.adressLists.find(item=>item.isDefault).name;
  },
  methods: {
    //修改地址组件的状态
    ...mapMutations(["changeAdressPop"]),
    //发票信息点击个人
    clickPerson(e) {
      e.target.classList.add("blue-radio-on");
      this.$refs.unit.classList.remove("blue-radio-on");
      this.$refs.invoice.style.display = "none";
    },
    //发票信息点击单位
    clickUnit(e) {
      e.target.classList.add("blue-radio-on");
      this.$refs.person.classList.remove("blue-radio-on");
      this.$refs.invoice.style.display = "block";
      this.invoiceData.title = "单位";
    },
    //改变订单地址
    changeAdress(name) {
      this.isName = name;
    },
    //如果提交的是默认地址，则自动选中  子传父
    clickDefaultAdress(name) {
      this.isName = name;
    },
    //提交订单到确认支付
    goToPayment() {
      if (this.isName) {
        this.$router.push("/payment");
        //提交订单将当前地址与发票信息提交vuex
        let data = {
          addressData: this.nowAdress,
          invoice:this.invoiceData,
          time:new Date().toLocaleDateString()
        };
        this.$store.commit("saveNowAddress", data);
      }else{
        this.$message.error('请选择正确的送货地址');
      }
    },
  },
  watch: {
    //监听isName的变化，储存当前地址
    isName: {
      handler(nVal) {
        this.nowAdress = this.adressLists.find((item) => item.name === nVal);
      },
    },
  },
};
</script>

<style>
</style>