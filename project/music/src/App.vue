<template>
  <div id="app">
    <div id="top">
      <img src="./images/icon.png" />
      <span>Chicken Music</span>
      <img src="./images/bussiness-man.png" />
    </div>
    <ul id="nav">
      <li v-for="(item,i) in list" :key="item.id" @click="jump(item.event,i)">
        <span :class='index==i?"border":""'>{{item.con}}</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      list: [
        { event: "/home", con: "推荐" },
        { event: "/singer", con: "歌手" },
        { event: "/rank", con: "排行" },
        { event: "/search", con: "搜索" }
      ],
      
    };
  },
  methods: {
    jump(path, index) {
      this.$router.replace(path);
      this.index = index;
    }
  }
};
// http://ustbhuangyi.com/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.5402899308050058    首页列表请求地址
// https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=jp1   歌手页列表
// https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=jp1     排行列表
// https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=jp2     搜索列表
</script>
<style lang="less">
@import "../style/reset.css";
@backcolor: #222;
@color: rgb(155, 152, 152);
@colored: #ffcd32;

#app {
  width: 100%;
  background: @backcolor;
}
#top {
  height: 44px;
  text-align: center;
  img:nth-of-type(1) {
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
  }
  span {
    display: inline-block;
    color: @colored;
    line-height: 44px;
    font-size: 18px;
    vertical-align: top;
  }
  img:nth-of-type(2) {
    height: 28px;
    float: right;
    margin: 10px 10px 0 0;
  }
}
#nav {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    flex: 1;
    text-align: center;
    list-style: none;
    span {
      padding-bottom: 5px;
      color: @color;
    }
  }
}
.border {
  border-bottom: 2px solid @colored;
  color: @colored !important;
}
</style>