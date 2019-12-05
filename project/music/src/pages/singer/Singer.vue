<template>
  <div>
    <div class="singer">
      <ul>
        <li v-for="(item,index) in singers" :key="index" ref="test">
          <div class="title">{{item.title}}</div>

          <ol>
            <li class="con" v-for="(sItem,sIndex) in item.list" :key="sIndex">
              <img :src="sItem.Fsinger_url">
              <span>{{sItem.Fsinger_name}}</span>
            </li>
          </ol>
        </li>
      </ul>
      <ul class="slider" 
      @touchstart="touchStart" 
      @touchmove.stop="touchMove" 
      @touchend="touchEnd">
        <li
          v-for="(item,index) in sliderData"
          :key="index"
          :class='selIndex===item?"sel":""'
          @click="sliderClick(item,index)"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getSingerList } from "api/index.js";
import { initSingerData } from "./singer.js";
import Bs from "better-scroll";
export default {
  data() {
    return {
      singers: [],
      selIndex: "热门",
      weizhi:{
        chushi:0,
        index: 0,
        num: 0
      }     
    };
  },
  computed: {
    sliderData() {
      // 侧边栏列表
      let result = this.singers.map((item, index) => {
        return item.title;
      });
      return result;
    }
  },
  methods: {
    jumpDetail() {
      this.$router.push("/singer/detail");
    },
    touchStart(e) {
      console.log(e.touches[0])
      console.log("anxia");
      this.weizhi.chushi = e.touches[0].pageY;
      this.weizhi.index=this.sliderData.indexOf(this.selIndex)
      console.log(this.weizhi)
    },
    touchMove(e) {
      // console.log(e.touches[0]);
      let distanceY = e.touches[0].pageY - this.weizhi.chushi;
      this.weizhi.num = parseInt(distanceY / 20);
      this.moveElement(this.weizhi.num+this.weizhi.index);
    },
    touchEnd() {
      console.log(this.weizhi.num+this.weizhi.index)
      this.moveElement(this.weizhi.num+this.weizhi.index);
      console.log("抬起");
      this.selIndex=this.weizhi.num+this.weizhi.index;
    },
    sliderClick(item,index) {
      this.selIndex = item;     
      this.weizhi.index=index;
      console.log(this.weizhi.index);
      this.moveElement(index);
    },
    moveElement(index) {
      this.bs.scrollToElement(this.$refs.test[index]);
    },
    getTops() {
      console.log(this);
      this.tops = this.$refs.test.map(item => {
        return item.offsetTop;
      });
      const length = this.tops.length;
      this.tops[length] =
        this.tops[length - 1] + this.$refs.test[22].offsetHeight;
    },
    initBs() {
      this.bs = new Bs(".singer", {
        probeType: 3,
        click: true
      });
      this.bs.on("scroll", pos => {
        let y = Math.abs(pos.y); //向上滚动的距离
        let index = 0;
        for (let i = 0; i < this.tops.length; i++) {
          if (y >= this.tops[i] && y < this.tops[i + 1]) {
            index = i;
          }
        }
        this.selIndex = this.sliderData[index];
      });
    }
  },
  created() {
    console.log(1111);
    getSingerList().then(res => {
      let result = initSingerData(res.data.list);
      console.log(result);
      this.singers = result;
      this.singers[0].title = "热门";
      this.$nextTick(() => {
        this.getTops();
      });
    });
  },
  mounted() {
    this.initBs();
  }
};
</script>
<style lang="less">
@import url("~style/index.less");
.singer {
  color: @color;
  .fixed(88, 0, 0, 0, @bkcolor);
  overflow: hidden;
  .title {
    font-size: @fs-xs;
    padding-left: 20px;
    .w(375);
    .h(30);
    .l_h(30);
    background: @sbkcolor;
  }
  .con {
    .h(50);
    .w(375);
    padding: 20px 0 0 30px;
    font-size: @fs-s;
    display: flex;
    img{
      .h(50);
      .w(50);
      border-radius: 50%;
    }
    span{
      margin-left: 20px;     
      .l_h(50);
      .h(50);
    }
  }
  .slider {
    .w(20);
    position: absolute;
    top: 60px;
    right: 0px;
    z-index: 2;
    background: rgb(14, 13, 13);
    padding: 20px 0;
    border-radius: 10px;
    li {
      font-size: @fs-xs;
      overflow: hidden;
      white-space: nowrap;
      letter-spacing: 10px;
      text-align: center;
      padding-left: 4px;
      .w(20);
      .h(20);
      .l_h(18);
    }
    .sel {
      color: @colored;
    }
  }
}
</style>