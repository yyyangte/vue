<template >
  <div>
    <ul id="nav">
      <router-link v-for="(item,i) in list" :key="i" tag="li" :to="item.path">
        <span>{{item.con}}</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { id: 0, path: "/recommend", con: "推荐" },
        { id: 1, path: "/singer", con: "歌手" },
        { id: 2, path: "/rank", con: "排行" },
        { id: 3, path: "/search", con: "搜索" }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
@import url("../style/index.less");
#nav {
  background: @bkcolor;
  .w(375);
  .h(44);
  display: flex;
  font-size: @fs-s;
  color: @color;
  flex-direction: row;
  li {
    flex: 1;
    .t_c();
    &.router-link-active {
      span {
        border-bottom: 2px solid @colored;
        color: @colored;
      }
    }
    span {
      .l_h(44);
      vertical-align: middle;
      padding-bottom: 5px;
    }
  }
}
</style>
