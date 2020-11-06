<template>
  <div id="pop">
    <div class="module-dialog-layer" style="display: block"></div>
    <div class="module-dialog clear module-dialog-address module-dialog-show">
      <div class="dialog-panel">
        <div class="topbar">
          <div class="dialog-tit clear">
            <h4 class="js-dialog-title">管理收货地址</h4>
          </div>
          <span class="dialog-close" @click="closePop">x</span>
        </div>
        <div class="dialog-con js-dialog-container">
          <div class="animate-layer">
            <div class="dialog-inner js-address-add">
              <div class="save-address-box">
                <div class="address-form">
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input
                        type="text"
                        class="js-verify"
                        placeholder="收货人姓名"
                        v-model="name"
                        maxlength="5"
                      />
                      <div class="verify-error" v-show="nameErr">
                        {{ nameErr }}
                      </div>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input
                        type="text"
                        class="js-verify"
                        placeholder="手机号"
                        v-model="phone"
                      />
                      <div class="verify-error" v-show="phoneErr">
                        {{ phoneErr }}
                      </div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div
                      class="form-item-v3 area-code-w fn-left form-valid-item"
                    >
                      <input
                        type="text"
                        class="js-verify js-address-area-code"
                        placeholder="区号（可选）"
                        v-model="areaCode"
                      />
                      <div class="verify-error"></div>
                    </div>
                    <div
                      class="form-item-v3 telephone-w fn-right form-valid-item"
                    >
                      <input
                        type="text"
                        class="js-verify js-address-telephone"
                        placeholder="固定电话（可选）"
                        v-model="telephone"
                      />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item province-wrapper">
                      <select
                        name="province_code"
                        class="province select-province js-form-province js-verify"
                        v-model="province"
                        @change="getName('provinceName')"
                      >
                        <option value="0" disabled>请选择省份</option>
                        <option
                          v-for="item in provinceList"
                          :key="item.aid"
                          :value="item.aid"
                        >
                          {{ item.atitle }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div
                      class="form-item-v3 select-item city-wrapper fn-left form-focus-item"
                    >
                      <select
                        class="city select-city js-form-city js-verify"
                        v-model="city"
                        @change="getName('cityName')"
                      >
                        <option value="0" disabled>请选择城市</option>
                        <option
                          v-for="item in cityList"
                          :key="item.aid"
                          :value="item.aid"
                        >
                          {{ item.atitle }}
                        </option>
                      </select>
                    </div>
                    <div
                      class="form-item-v3 select-item district-wrapper fn-right form-focus-item"
                    >
                      <select
                        class="city select-city js-form-city js-verify"
                        v-model="area"
                        @change="getName('areaName')"
                      >
                        <option value="0" disabled>请选择区县</option>
                        <option
                          v-for="item in areaList"
                          :key="item.aid"
                          :value="item.aid"
                        >
                          {{ item.atitle }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input
                        type="text"
                        class="js-verify"
                        placeholder="详细地址，如街道名称，楼层，门牌号码等"
                        v-model="adress"
                      />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div
                    class="module-form-row fn-clear"
                    @click="isDefault = !isDefault"
                  >
                    <input type="checkbox" class="hide" />
                    <span
                      class="blue-checkbox"
                      :class="{ 'blue-checkbox-on': isDefault }"
                    ></span
                    >设为默认
                  </div>
                  <!-- disabled-btn -->
                  <div
                    class="dialog-blue-btn big-main-btn js-verify-address"
                    :class="{ 'disabled-btn': checkErr }"
                    @click="saveAdress"
                  >
                    <a>保存</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //地址控制视图传过来要修改的地址信息
  props: ["needchange", "ischange"],
  data() {
    return {
      name: "",
      phone: "",
      areaCode: "",
      telephone: "",
      province: "0",
      provinceName: "",
      city: "0",
      cityName: "",
      area: "0",
      areaName: "",
      adress: "",
      isDefault: false,
      //省市区列表数据
      allListData: [],
      provinceList: [],
      cityList: [],
      areaList: [],
    };
  },
  methods: {
    //保存地址
    saveAdress() {
      let data = {
        name: this.name,
        phone: this.phone,
        areaCode: this.areaCode,
        telephone: this.telephone,
        province: this.province,
        provinceName: this.provinceName,
        city: this.city,
        cityName: this.cityName,
        area: this.area,
        areaName: this.areaName,
        adress: this.adress,
        isDefault: this.isDefault,
      };
      //如果为修改状态,删除旧数据
      if (this.ischange) {
        this.$store.commit("removeAdressData", this.needchange);
      }
      //添加地址数据
      this.$store.commit("saveAdress", data);
      //修改地址组件状态
      this.$store.commit("changeAdressPop", { status: false });
      //如果设定为默认地址，则提交后自动选中
      if (data.isDefault) {
        this.$emit("clickDefaultAdress", data.name);
      }
      //数据初始化
      this.name = "";
      this.phone = "";
      this.areaCode = "";
      this.telephone = "";
      this.province = "";
      this.provinceName = "";
      this.city = "";
      this.cityName = "";
      this.area = "";
      this.areaName = "";
      this.adress = "";
      this.isDefault = false;
      //改变 修改状态
      this.$emit("update:ischange", false);
    },
    //获取省市区名字
    getName(name) {
      var index = event.target.selectedIndex;
      switch (name) {
        case "provinceName":
          this.provinceName = event.target.options[index].text;
          this.cityList = this.allListData.filter(
            (item) => item.pid === event.target.value
          );
          this.city = "0";
          this.area = "0";
          break;
        case "cityName":
          this.cityName = event.target.options[index].text;
          this.areaList = this.allListData.filter(
            (item) => item.pid === event.target.value
          );
          this.area = "0";
          break;
        case "areaName":
          this.areaName = event.target.options[index].text;
          break;
      }
    },
    //关闭
    closePop() {
      this.$store.commit("changeAdressPop", { status: false });
      //数据初始化
      this.name = "";
      this.phone = "";
      this.areaCode = "";
      this.telephone = "";
      this.province = "";
      this.provinceName = "";
      this.city = "";
      this.cityName = "";
      this.area = "";
      this.areaName = "";
      this.adress = "";
      this.isDefault = false;
      // //修改状态
      this.$emit("update:ischange", false);
    },
  },
  //获取省市区列表数据
  async created() {
    let data = await fetch("/static/areas.json").then((res) => res.json());
    this.allListData = data;
    this.provinceList = data.filter((item) => item.pid === "");
    //如果为修改状态，将地址组件中数据变为选择数据，便于修改
    if (this.ischange) {
      this.name = this.needchange.name;
      this.phone = this.needchange.phone;
      this.areaCode = this.needchange.areaCode;
      this.telephone = this.needchange.telephone;
      this.province = this.needchange.province;
      this.provinceName = this.needchange.provinceName;
      //获取到省名更新 市列表
      this.cityList = this.allListData.filter(
        (item) => item.pid === this.province
      );
      this.city = this.needchange.city;
      this.cityName = this.needchange.cityName;
      //获取到市名更新 区列表
      this.areaList = this.allListData.filter((item) => item.pid === this.city);
      this.area = this.needchange.area;
      this.areaName = this.needchange.areaName;
      this.adress = this.needchange.adress;
      this.isDefault = this.needchange.isDefault;
    }
  },
  //表单验证
  computed: {
    nameErr() {
      let name = this.name.trim();
      if (name.length < 2 || name.length > 5) {
        return "姓名不符合规则";
      }
      return "";
    },
    phoneErr() {
      let phone = this.phone.trim();
      if (/^1[35789]\d{9}$/.test(phone)) {
        return "";
      } else {
        return "请输入正确的手机号";
      }
    },
    checkErr() {
      if (
        this.nameErr === "" &&
        this.phoneErr === "" &&
        this.adress.trim() &&
        this.province != 0
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
</style>