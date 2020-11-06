<template>
  <div id="main">
    <div class="content clear">
      <div class="account-wrapper">
        <div class="account-sidebar">
          <div class="avatar gray-box clear">
            <div class="js-account-sidebar-info">
              <img
                src="http://static.smartisanos.cn/account/asset/img/default-user-avatar.png"
              />
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <li class="">
                  <a
                    href="javascript:;"
                    @click="$router.push({ name: 'order' })"
                    >我的订单</a
                  >
                </li>
                <li class="current">
                  <a
                    href="javascript:;"
                    @click="$router.push({ name: 'addresscontrol' })"
                    >收货地址</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <div class="account-address">
            <div class="gray-box clear">
              <div class="title pre-title">
                <h2 class="fn-left">收货信息</h2>
                <span class="gray-blue-btn js-add-address"
                  ><a class="add" @click="changeAdressPop({ status: true })"
                    >添加新地址</a
                  ></span
                >
              </div>
              <div
                class="box-inner clear"
                v-for="item in adressLists"
                :key="item.name"
              >
                <div class="address-list-item default-item" data-id="765532">
                  <div class="name fn-left">
                    <div class="name-cell">{{ item.name }}</div>
                  </div>
                  <div class="detail fn-left">
                    <div class="detail-cell">
                      {{ item.provinceName }}
                      {{ item.cityName }}
                      {{ item.areaName }}
                      {{ item.adress }}
                    </div>
                  </div>
                  <div class="operation fn-right">
                    <div class="operation-cell">
                      <a
                        class="gray-edit-btn js-edit-address"
                        @click="changeThisAddress(item)"
                        >修改</a
                      >
                      <span class="red-del-btn js-del-address">
                        <a @click="removeAdressData({ thisItem: item })">删除</a
                        ><em>删除</em>
                      </span>
                    </div>
                  </div>
                  <div class="default fn-right">
                    {{ item.isDefault ? "(默认地址)" : "" }}
                  </div>
                  <div class="telephone fn-right">{{ item.phone }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <adress-pop v-if="isAdressPop" :needchange="needChangeItem" :ischange.sync="isChange"></adress-pop>
  </div>
</template>

<script>
import adressPop from "@/components/AdressPop";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    adressPop,
  },
  data() {
    return {
        //要修改的地址
        needChangeItem:[],
        //是否为修改状态
        isChange:false
    };
  },
  computed: {
    ...mapState(["adressLists", "isAdressPop"]),
  },
  methods: {
    ...mapMutations(["removeAdressData", "changeAdressPop"]),
    changeThisAddress(thisItem) {
      this.$store.commit("changeAdressPop", { status: true });
      this.needChangeItem = thisItem;
      this.isChange = true;
    },
  },
};
</script>

<style lang='less'>
.account-address .address-list-item .default {
  height: 75px;
}
</style>