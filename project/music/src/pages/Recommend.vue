<template>
  <div class="recommend">
    <div class="view-box">
      <div class="content">
        <!-- banner -->
        <div calss="banner">
          <my-banner :bannerlist="bannerList"></my-banner>        
        </div>
        <h3>热门歌单推荐</h3>
        <!-- list -->
        <ul class="songsheet">
          <li v-for="(item,index) in recommentList" :key="index">
            <img :src="item.imgurl" />
            <div>
              <h2>{{item.creator.name}}</h2>
              <p>{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import myBanner from  '../components/my-banner'
import Bs from  'better-scroll'
import { getBanner, getRecommentList } from "../api"
export default {
  components: { myBanner },
  data() {
    return {
      bannerList: [],
      recommentList: []
    }
  },
  methods: {
    initBs(){
      new Bs('.view-box')
    }
  },
  created() {
    getBanner().then((data) => {
      this.bannerList = data.data.slider;
      // console.log(this.bannerList);
    });
    getRecommentList().then((data) => {
      this.recommentList = data.data.list;
      // console.log(this.recommentList);
    });
  },
  mounted() {
    this.initBs();
  }
};
</script>
<style lang="less">
@import url('../style/index.less');
.recommend{
 .fixed(88,0,0,0,@bkcolor);
 .view-box{
   width: 100%;
   height: 100%;
   overflow: hidden;
   .content{
     .w(375);
     .banner{
       .w(375);
       .h(150);
       background: red;

     }
   }
 }
}
.swiper-slide{
  .h(150)
}
.swiper-pagination-bullet-active {
  .w(20);
  border-radius: 4px;
  background-color: rgb(171, 169, 169);
}

h3 {
  .h(65);
  line-height: 65px;
  text-align: center;
  font-size: 14px;
  color: @colored;
  background: @bkcolor;
}
.songsheet {
  li {
    padding: 0 20px 20px;
    display: flex;
    img {
      .h(60);
      .w(60);
    }
    div {
      margin-left: 20px;
      font-size: @fs-s;
      display: flex;
      flex-direction: column;
      h2 {
        margin-top: 4px;
        flex: 1;
        color: #fff;
        .l_h(20);
      }
      p {
        flex: 1;
        color: @color;
        .l_h(20);
      }
    }
  }
}
</style>