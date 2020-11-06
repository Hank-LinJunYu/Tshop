<template>
  <div id="app">
	<boxheader></boxheader>
	<!-- 视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
import boxheader from '@/components/Header';
import {mapState} from 'vuex';

export default {
	components:{
		boxheader
	},
	computed:{
		...mapState(['purchaseList','adressLists'])
	},
	watch:{
		purchaseList:{
			handler(nVal){
				this.$localStorage.set("purchaseDatalist",nVal)
			},
			deep:true
		},
		adressLists:{
			handler(nVal){
				this.$localStorage.set("adressDatalist",nVal)
			},
			deep:true
		}
	}
};
</script>

<style>
</style>