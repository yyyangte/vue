<template>
  <div>
    <ul>
      <li @click="change(0)">全部</li>
      <li @click="change(1)">已完成</li>
      <li @click="change(-1)">未完成</li>
    </ul>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  methods:{
    ...mapMutations(['changeIndex']),
    change(index){
      this.changeIndex(index)
    }
  }
}
</script>
<style scoped>
  li{
    float: left;margin-right: 20px;border:1px solid yellow;
  }
</style>