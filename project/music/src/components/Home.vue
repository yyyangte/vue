<template>
  <div calss="home">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item) in list" :key="item.id">
          <img v-bind:src="item" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <h3>热门歌单推荐</h3>
  </div>
</template>
<script>
import swiper from '../../static/swiper.min.js'
export default {
  data() {
    return {
      list: [
        "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1877947.jpg",
        "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1873798.jpg",
        "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1875733.jpg",
        "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1870928.jpg",
        "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1875587.jpg"
      ]
      
    };
  },
  created() {
    console.log("home");
  },
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }
};
</script>
<style lang="less">
@import "../../style/swiper.min.css";
@colored: #ffcd32;
.home {
  position: relative;
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
.swiper-container {
  height: 150px;
  margin: 0 auto;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  img {
    height: 150px;
  }
}
h3{
  height:65px;
  line-height: 65px;
  text-align: center;
  font-size:14px;
  color:@colored;
}
</style>