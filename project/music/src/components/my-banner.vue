<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" 
          v-for="(item,index) in bannerlist" 
          :key="index">
        <img :src="item.picUrl" />       
      </div>  
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  props: {
    bannerlist: {
      type: Array,
      default: []
    }
  },
  methods: {
    initBanner() {
      new Swiper(".swiper-container", {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: 3000,
        pagination: '.swiper-pagination',      
      });
    }
  },
  watch:{
    bannerlist(newValue,oldValue){
      this.$nextTick(()=>{
        this.initBanner()       
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../node_modules/swiper/dist/css/swiper.css");
@import url('../style/index.less');


img {
  .w(375)
}

</style>