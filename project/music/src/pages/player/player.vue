<template>
  <div class="player" v-if="songList.length>0">
    <div class="big" v-if="fullScreen">
      <div class="bg">
        <img :src="currentSong.albumUrl" />
      </div>
      <div class="top">
        <img src="~images/down.png" @click.stop="changeSmall" />
        <div>
          <h4>{{currentSong.songorig}}</h4>
          <span>{{currentSong.singername}}</span>
        </div>
        <p></p>
      </div>
      <div class="img">
        <img :src="currentSong.albumUrl" :class="cdClass" />
        <p>{{text}}</p>
      </div>
      <audio
        ref="audio"
        :src="currentSong.musicUrl"
        @canplay="canplay"
        @ended="musicEnd"
        @timeupdate="updatetime"
      ></audio>
      <my-progress
        :startTime="currentTime"
        :endTime="currentSong.interval"
        :changePlayTime="changePlayTime"
      ></my-progress>
      <div class="operators">
        <img :src="loopImg[loopIndex]" @click="changeLoopIndex" alt />
        <img src="~images/left.png" @click="replace(false)" alt />
        <img :src="Img" @click="play" alt />
        <img src="~images/right.png" @click="replace(true)" alt />
        <img src="~images/love.png" alt />
      </div>
    </div>
    <div class="small" v-else @click="changeBig">
      <img :src="currentSong.albumUrl" class="albumImg" />
      <div>
        <h4>{{currentSong.songorig}}</h4>
        <p>{{currentSong.singername}}</p>
      </div>
      <audio
        ref="audio"
        :src="currentSong.musicUrl"
        @canplay="canplay"
        @ended="musicEnd"
        @timeupdate="updatetime"
      ></audio>
      <img :src="Img" @click.stop="play" alt />
      <img src="~images/list.png" alt  @click.stop="isShow(true)"/>
      
    </div>
    <transition name="songList" v-if="songList.length!=0">
        <div class="songList" v-show="show">
          <div class="loop">
            <img :src="loopImg[loopIndex]" @click.stop="changeLoopIndex" alt />
            <span>清空</span>
          </div>
          <div class='listcon' ref="listcon" >
            <div class="slider">
              <ul>
                <li v-for="(item,index) in songList" :key="index">
                  {{item.songorig}}
                </li>
              </ul>
            </div>
          </div>
          <p @click.stop="isShow(false)">关闭</p>
        </div>
      </transition>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import playImg from "../../images/play.png";
import stopImg from "../../images/stop.png";
import loop0 from "../../images/loop.png";
import loop1 from "../../images/loop1.png";
import loop2 from "../../images/loop2.png";
import MyProgress from "components/my-progress.vue";
import { getLyric } from "api/index";
import Lyric from "lyric-parser";
import { Base64 } from "js-base64";
import BS from "better-scroll";
export default {
  components: { MyProgress },
  data() {
    return {
      playing: true,
      Img: stopImg,
      loopImg: [loop0, loop1, loop2],
      loopIndex: 0,
      currentTime: 0,
      text: "暂无歌词",
      show:false,
      myList:[],
    };
  },
  computed: {
    ...mapState(["songList", "fullScreen", "nowIndex"]),
    ...mapGetters(["currentSong"]),
    cdClass() {
      return this.playing ? "play" : "play paused";
    }
  },
  methods: {
    ...mapMutations(["toggleScreen", "changeNowIndex"]),
    initBS(){
      console.log()
      if(this.$refs.listcon){
        this.bs=new BS(this.$refs.listcon,{
          click: true,
        
        })
      }
    },
    changeSmall() {
      this.toggleScreen(false);
    },
    changeBig() {
      this.toggleScreen(true);
    },
    canplay() {
      if (!this.audio) {
        this.audio = this.$refs.audio;
      }
      if (this.playing) {
        this.audio.play();
      }
    },
    musicEnd() {
      this.playing = true;
      // console.log("end");
      this.musicLoop(this.loopIndex);
    },
    musicLoop(loopState) {
      switch (loopState) {
        case 0:
          this.replace(true);
          break;
        case 1:
          this.audio.play();
          break;
        case 2:
          let length = this.songList.length;
          let index = parseInt(Math.random() * length);
          this.changeNowIndex(index);
          break;
      }
    },
    play() {
      if (this.audio) {
        if (!this.playing) {
          this.audio.play();
          this.playing = true;
          this.Img = stopImg;
        } else {
          this.audio.pause();
          this.playing = false;
          this.Img = playImg;
        }
      }
      this.lyricObj.togglePlay();
    },
    replace(bool) {
      let nowIndex = this.nowIndex;
      let next = 0;
      if (this.loopIndex !== 2) {
        if (bool) {
          next = ++nowIndex;
          if (next == this.songList.length - 1) {
            next = 0;
          }
        } else {
          next = --nowIndex;
          if (next == -1) {
            next = this.songList.length - 1;
          }
        }
      } else {
        next = parseInt(this.songList.length * Math.random());
      }
      this.changeNowIndex(next);
      this.playing = true;
      this.Img = stopImg;
    },
    changeLoopIndex() {
      if (++this.loopIndex == this.loopImg.length) {
        this.loopIndex = 0;
      }
    },
    updatetime(e) {
      this.currentTime = e.target.currentTime;
    },
    changePlayTime(time) {
      if (this.audio) {
        this.audio.currentTime = time;
        this.lyricObj.seek(time * 1000);
      }
    },
    isShow(bool){
      this.show=bool;
      // console.log(this.songList)
      // console.log(this.$refs.listcon)
    }
  },
  watch: {
    currentSong(newValue, oldValue) {
      if (this.lyricObj) {
        this.lyricObj.stop();
        this.lyricObj = null;
      }
      let songmid = newValue.songmid;
      if (this.audio) {
        this.audio.src = newValue.musicUrl;
        // 解决更改不了歌曲的bug
      }
      getLyric(songmid).then(res => {
        let string = Base64.decode(res.lyric);
        this.lyricObj = new Lyric(string, text => {
          this.text = text.txt;
        });
        this.lyricObj.play();
      });
    }
  },
  updated(){
    this.initBS()
  }
};
</script>
<style lang="less" scoped>
@import url("~style/index.less");
.player {
  .big {
    .fixed(0, 0, 0, 0, rgba(0, 0, 0, 1));
    z-index: 4;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -5;
      img {
        width: 100%;
        height: 100%;
        filter: blur(20px);
      }
    }
    .top {
      display: flex;
      img {
        .h(60);
        .w(60);
      }
      div {
        flex: 1;
        color: rgb(233, 230, 230);
        text-align: center;
        h4 {
          .l_h(40);

          font-size: @fs-l;
        }
        span {
          float: left;
          .w(255);
          text-align: center;
          .l_h(20);
          font-size: @fs-s;
        }
      }
      p {
        .w(60);
        .h(60);
      }
    }
    .img {
      .w(375);
      .h(420);
      padding-top: 20px;
      text-align: center;
      img {
        .w(300);
        .h(300);
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid hsla(0, 0%, 100%, 0.1);
        &.play {
          animation: rotate 15s linear infinite;
        }
        &.paused {
          animation-play-state: paused;
        }
      }
      p {
        padding-top: 30px;
        color: antiquewhite;
        font-size: @fs-s;
      }
    }
    .operators {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .h(80);
      .w(375);
      img {
        .h(50);
        &:nth-of-type(3) {
          .h(60);
        }
      }
    }
  }
  .small {
    position: fixed;
    bottom: 0;
    .h(60);
    z-index: 4;
    background: #333;
    .w(375);
    align-items: center;
    justify-content: space-around;
    display: flex;
    .albumImg {
      margin-left: 20px;
      margin-right: 10px;
      .w(40);
      .h(40);
      border-radius: 50%;
    }
    div {
      flex: 1;
      .w(205);
      .h(42);

      h4 {
        font-size: @fs-s;
        .l_h(20);
        color: #fff;
      }
      p {
        font-size: @fs-xs;
        .l_h(20);
        color: rgb(130, 128, 128);
      }
    }
    img {
      .w(50);
      .h(50);
    }
    
  }
  .songList{
      .h(430);
      width:375px;
      bottom:0;
      background: #333;
      position: absolute;
      z-index:10;
      .loop{
        margin: 0 auto;
        .w(300);
        display: flex;
        justify-content: space-between;
        img{
          .w(50);
        }
        span{
          font-size: 20px;
        }
      }
      .listcon{
        font-size: @fs-s;
        color:#999;
        .w(375);
        .h(330);
        overflow: hidden;
        ul{
          li{
            .h(40);
            .l_h(40);

          }
        }
      }
      p{
        background: #222;
        text-align: center;
        .h(50);
        .l_h(50);
        font-size:@fs-m;
      }
    }
    .songList-enter-active,.sonList-leave-active{
      transition:all .2s;
    }
    .songList-enter,.songList-leave-to{
      bottom:-500px;
    }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>