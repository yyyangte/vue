<template>
  <div id="app">
    <component-add></component-add>
    <component-list></component-list>
    <component-tab></component-tab>
  </div>
</template>

<script>
import componentAdd from './components/add'
import componentList from './components/list'
import componentTab from './components/tab'
export default {
  name: 'app',
  components: {
    componentAdd,componentList,componentTab
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 60px;
}
li{list-style: none;}
</style>
