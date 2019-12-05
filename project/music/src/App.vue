<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <router-view></router-view>
  </div>
</template>
<script>
import myHeader from './components/my-header.vue';
import myTab from './components/my-tab.vue';

export default {
  components:{myHeader,myTab},
};
</script>
<style lang="less">


</style>