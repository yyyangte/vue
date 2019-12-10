import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    fullScreen:true,//大小播放器
    songList:[],
    nowIndex:-1,
  },
  mutations:{
    // 点击歌曲时把列表加进来
    addSongList(state,params){
      state.songList = params;
    },
    // 更改播放窗口大小
    toggleScreen(state,params){
      state.fullScreen = params;
    },
    // 更改列表的索引
    changeNowIndex(state,playIndex){
      if(playIndex>=0&&playIndex<state.songList.length){
        state.nowIndex = playIndex;
      }
      
    },
    
  },
  getters:{
    currentSong(state){
      return state.songList[state.nowIndex]
    }
  }
})
export default store