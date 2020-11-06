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
                <li class="current"><a href="javascript:;" @click="$router.push({name:'order'})">我的订单</a></li>
                <li class=""><a href="javascript:;" @click="$router.push({name:'addresscontrol'})">收货地址</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <div class="account-order">
            <div class="gray-box">
              <div class="title columns-title pre-title">
                <h2>我的订单</h2>
                <div class="gray-btn-menu sort-status-menu">
                  <span class="label"><i class="arrow"></i> 全部状态 </span>
                  <ul class="menu-list">
                    <li class="selected">
                      <a href="javascript:;">全部状态</a>
                    </li>
                    <li class=""><a href="javascript:;">未完成</a></li>
                    <li class=""><a href="javascript:;">已完成</a></li>
                    <li class=""><a href="javascript:;">已关闭</a></li>
                  </ul>
                </div>
                <div class="gray-btn-menu sort-time-menu -gray-btn-menu-on">
                  <span class="label"><i class="arrow"></i> 最近三个月 </span>
                  <ul class="menu-list">
                    <li class="selected">
                      <a href="javascript:;">最近三个月</a>
                    </li>
                    <li class=""><a href="javascript:;">今年内</a></li>
                    <li class=""><a href="javascript:;">2016年</a></li>
                    <li class=""><a href="javascript:;">2015年</a></li>
                  </ul>
                </div>
              </div>
              <div class="js-list-inner">
                <div class="box-inner order-cart order-list-cart clear">
                  <div class="gray-sub-title cart-title">
                    <span class="date">{{nowAddressData.time}}</span>
                    <span class="order-id">
                      订单号： <a href="javascript:;">170619703723305</a>
                    </span>
                    <span class="order-detail"
                      ><a href="javascript:;">查看详情&gt;</a>
                    </span>
                    <span class="sub-total">应付总额</span>
                    <span class="num">数量</span>
                    <span class="price">单价</span>
                  </div>
                  <div class="cart">
                    <div 
                    v-for="item in checkedShopList"
                    :key="item.itemId"
                    class="cart-items clear">
                      <div class="prod-info clear">
                        <div class="items-thumb">
                          <a href="javascript:;" target="_blank"
                            ><img
                              :src="item.itemImg"
                          /></a>
                        </div>
                        <div class="items-params clear">
                          <div class="name vh-center">
                            <a
                              href="javascript:;"
                              target="_blank"
                              :title="item.itemTitle"
                              >{{item.itemTitle}} ({{item.itemColor}})</a
                            >
                          </div>
                          <div class="detail"></div>
                        </div>
                        <div class="num">{{item.itemNum}}</div>
                        <div class="price">¥ {{item.itemPrice}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="prod-operation">
                    <div class="total">¥ {{totalCheckOutCount.price}}</div>
                    <div class="status">
                      <a class="blue-small-btn js-payment-order">现在付款</a>
                    </div>
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
import {mapGetters, mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['nowAddressData','checkedShopList']),
        ...mapGetters(['totalCheckOutCount'])
    }
};
</script>

<style>
</style>