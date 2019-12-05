<template>
  <div class="A">
      <ul>
        <li v-for='(item,index) in getterList' :key="index">
          {{item.msg}}
          <span v-if='item.state'>已完成</span>
          <button v-else @click='update2(index)'>完成</button>
          <button @click='del(index)'>del</button>
        </li>
      </ul>
  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
export default {
  computed:{
    // ...mapState(['list']),
    ...mapGetters(['getterList'])
  },
  methods:{
    ...mapMutations(['update']),
    update2(index){   
      this.update(index)
    },
    del(index){
      console.log(this);
      this.$store.commit('del',index)
    }
  }
    
  

}
</script>

<style scoped>

</style>
