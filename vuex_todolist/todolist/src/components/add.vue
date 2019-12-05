<template>
  <div class="A">
      <input type="text" v-model="inputValue" />
      <button @click='addmsg' >add</button>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
export default {
  data(){
    return{
      inputValue:'输入内容'
    }
  },
  methods:{
    ...mapMutations(['add']),
    addmsg(){
      this.add(this.inputValue)
    }
  },
  created(){
    console.log(this)
  }
}
</script>

<style scoped>

</style>
