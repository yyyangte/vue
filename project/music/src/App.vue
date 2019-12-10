<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <router-view></router-view>
    <player></player>
  </div>
</template>
<script>
import myHeader from './components/my-header.vue';
import myTab from './components/my-tab.vue';
import player from 'pages/player/player'
export default {
  components:{myHeader,myTab,player},
};
</script>
<style lang="less">


</style>