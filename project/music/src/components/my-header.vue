<template>
<div id="top">
      <img src="../images/icon.png" />
      <span>Chicken Music</span>
      <img src="../images/bussiness-man.png" />
    </div>
</template>
<script>
export default {
  //import  img from   "../assets/logo.png" 用return写图片
}
</script>
<style lang="less" scoped>
@import url('../style/index.less');
#top {
  .w(375);
  .h(44);
  .t_c();
  .l_h(44);
  background: @bkcolor;
  img:nth-of-type(1) {
    margin-top: 6px;
    .w(30);
    .h(32);
    margin-right: 9px;
  }
  span {
    display: inline-block;
    color: @colored;  
    font-size: @fs-l;
    vertical-align: top;
  }
  img:nth-of-type(2) {
    .h(28);
    float: right;
    margin: 10px 10px 0 0;
  }
}
</style>