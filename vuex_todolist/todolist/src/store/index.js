import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[{msg:'dd',state:true}],
    index:0// 0表示全部 1 已完成  -1 未完成
  },
  mutations: {
    // 两个参数，第一个必填，代表state  第二个是传过来的参数
    add(state,params){
      console.log(state,params)
      state.list.push({msg:params,state:false})
    },
    update(state,index){
      console.log(state,index)
      state.list[index].state=true;
    },
    del(state,index){
      state.list.splice(index,1)
    },
    changeIndex(state,index){
      state.index=index
    }

  },
  actions: {
    //用来做异步请求的数据  例
    // addNet(context,params){
    //   let {commit}=context
    //   setTimeout(()=>{
    //     commit('add',params)
    //   },1000) 
    // }
  },
  modules: {
  },
  getters:{
    getterList(state){
      let index=state.index;//取默认值
      let result=state.list.filter((item)=>{
        switch (index){
          case 0:
            return true
          case 1:
            return item.state==true
          case -1:
            return item.state==false
        }
      })
      return result
    }
  }
})
