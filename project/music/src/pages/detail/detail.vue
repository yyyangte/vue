<template>
  <div class="detail">
    <div class="top">
      <img class="back" src="../../images/back.png" @click="back" />
      <span>{{songname}}</span>
    </div>
    <div class="con" :style="background" ref="bg">
      <div class="buofang">
        <div>
          <img src="../../images/play.png" />
          <span>随即播放全部</span>
        </div>
      </div>
      <div class="bk"></div>
    </div>
    <div class="shadow" ref="shadow"></div>
    <div class="view" ref="view">
      <div class="list">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="goPlay(index)">
            <h3>{{item.songorig}}</h3>
            <p>{{item.singername}}·{{item.albumname}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getSongList, getMusicUrl } from "api/index.js";
import { initSongData } from "./detail.js";
import Bs from "better-scroll";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      songname: "",
      background: {
        backgroundImage: ""
      },
      list: [],
      id: this.$route.params.mid
    };
  },
  methods: {
    ...mapMutations(["addSongList", "changeNowIndex"]),
    back() {
      this.$router.go(-1);
    },
    initBs() {
      this.bs = new Bs(".view", {
        click: true,
        probeType: 3
      });
      let bgHeight = this.$refs.bg.clientHeight;
      this.bs.on("scroll", poy => {
        if (poy.y > 0) {
          let precent = 1 + poy.y / bgHeight;
          this.$refs.bg.style.transform = `scale(${precent})`;
          this.$refs.bg.style.zIndex = 1;
        } else {
          let y = poy.y >= -bgHeight ? poy.y : -bgHeight;
          if (Math.abs(poy.y) <= bgHeight - 30) {
            this.$refs.shadow.style.transform = `translate3d(0,${y}px,0)`;
            this.$refs.bg.style.zIndex = 0;
            this.$refs.bg.style.height = "0px";
            this.$refs.bg.style.paddingTop = "70%";
          }
        }
      });
    },
    goPlay(index) {
      this.addSongList(this.list);
      this.changeNowIndex(index);
    }
  },
  created() {
    this.background.backgroundImage = `url('https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.id}.jpg?max_age=2592000')`;
    getSongList(this.id).then(res => {
      this.songname = res.data.singer_name;
      let data = initSongData(res.data.list);
      getMusicUrl(data).then(res => {
        this.list = res;
      });
    });
  },
  mounted() {
    this.initBs();
  }
};
</script>
<style scoped lang='less'>
@import "~style/index.less";
.view {
  .fixed(262, 0, 0, 0, @bkcolor);
}
.detail {
  .fixed(0, 0, 0, 0, @bkcolor);
  .top {
    position: fixed;
    top: 0;
    z-index: 10;
    background: rgb(95, 93, 93);
    .w(375);
    .h(40);
    display: flex;
    .back {
      .h(30);
      .w(30);
      margin-left: 10px;
    }
    span {
      display: inline-block;
      font-size: @fs-l;
      color: #fff;
      .h(40);
      .l_h(40);
      width: 80%;
      text-align: center;
    }
  }
  .shadow {
    .w(375);
    height: 100vh;
    background: @bkcolor;
    position: relative;
    // overflow: hidden;
  }

  .con {
    .w(375);
    .h(262);
    background-repeat: no-repeat;
    background-size: 100% 140%;
    position: relative;
    // overflow: hidden;
    .buofang {
      position: absolute;
      .w(375);
      .h(32);
      left: 30%;
      top: 80%;
      z-index: 10;
      div {
        .w(135);
        .h(30);
        border: 1px solid @colored;
        color: @colored;
        font-size: @fs-xs;
        .l_h(30);
        display: flex;
        justify-content: center;
        border-radius: 15px;

        img {
          .h(25);
          .w(25);
        }
      }
    }
    .bk {
      position: absolute;
      top: 0;
      background: rgba(7, 17, 27, 0.4);
      .h(262);
      .w(375);
    }
  }
  .list {
    .w(375);
    padding-top: 20px;
    padding-bottom: 58px;
    li {
      .w(315);
      .h(44);
      margin-top: 20px;
      padding-left: 30px;
      font-size: @fs-s;
      h3 {
        .h(20);
        .l_h(20);
        color: #fff;
        text-align: left;
        margin-bottom: 4px;
      }
      p {
        .l_h(20);
        color: @color;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>