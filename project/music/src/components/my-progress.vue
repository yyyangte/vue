<template>
  <div class="progress">
    <span>{{startTime|timeFilter}}</span>
    <div class="progress-box" ref='box'>
      <!-- 背景条 -->
      <div class="progress-liner" ></div>     
      <!-- 进度条 -->
      <div class="progress-ed" ref='moved'></div>
      <!-- 滑块 -->
      <div class="progress-div" ref='smalldiv'
        @touchstart = 'touchStart'
        @touchmove = 'touchMove'
      ></div>
    </div>
    <span>{{endTime|timeFilter}}</span>

  </div>
</template>
<script>
import {filter} from 'minimatch';
export default {
  props:['startTime','endTime','changePlayTime'],
  filters:{
    timeFilter(data){
      var data = parseInt(data);
      let m = parseInt(data/60)<10?'0'+parseInt(data/60):parseInt(data/60);
      let s = data%60<10?'0'+data%60:data%60;
      return `${m}:${s}`
    }
  },
  methods:{
    offsetWidth(distance){
      this.$refs.smalldiv.style.transform=`translate3d(${distance}px,0,0)`
      this.$refs.moved.style.width = distance +'px';
    },
    touchStart(){
      this.left = this.$refs.box.getBoundingClientRect().x;
    },
    touchMove(e){
      let x = e.touches[0].pageX-this.left;
      if(x>=0&&x<=this.w-6){
        this.offsetWidth(x);
        let time = (x/this.w)*this.endTime;
        this.changePlayTime(time);
      }
           
    }
  },
  watch:{
    startTime(newTime,oldTime){
      let distance = (newTime/this.endTime)*this.w;
      this.offsetWidth(distance);
    }
  },
  mounted(){
    // console.log(this.$refs.box.getBoundingClientRect())
    this.w = this.$refs.box.getBoundingClientRect().width;
  }
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.progress{
  
  .h(30);
  
  display:flex;
  justify-content: center;
  align-items: center;
  span{
    .w(45);
    text-align: center;
    font-size:@fs-xs;
  }
  .progress-box{
    position:relative;
    .w(240);
    .progress-liner{
      .w(240);
      .h(4);
      border-radius: 2px;
      background: rgba(0,0,0,0.4);
    }
    .progress-ed{
      position: absolute;
      top:0px;
      left:0px;
      .w(0);
      .h(4);
      background: @colored;
    }
    .progress-div{
      position:absolute;
      top:-4px;
      left:-2px;
      .w(8);
      .h(8);
      border-radius: 50%;
      background:yellow;
      border:2px solid #fff;
    }
  }
}
</style>