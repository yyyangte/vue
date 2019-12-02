<template>
  <div calss="singer">
    <h3 id="rank">热门</h3>
  </div>
</template>
<script>
export default {
  created () {
    console.log('singer')
  }
}

</script>
<style lang="less">
@color:rgb(155, 152, 152);
  #rank{
    height:30px;
    line-height: 30px;
    padding-left:20px;
    font-size:12px;
    color:@color;
    text-align: left;
  }
</style>