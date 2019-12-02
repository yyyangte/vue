<template>
  <div calss="search">
    <div id="box">
      <div>
        <img src="../images/search.png" />
        <input type="text" placeholder="搜索歌曲、歌手" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    console.log("search");
  }
};
</script>
<style lang="less">
@color: rgb(155, 152, 152);
#box {
  padding: 20px;
  div {
    display: flex;
    box-sizing: border-box;
    height: 40px;
    background: #333;
    border-radius: 6px;
    img {
      height: 24px;
      margin-top: 8px;
    }
    input {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: #333;
      color: #fff;
      font-size: 14px;
      outline: 0;
      border: none;
    }
  }
}
</style>