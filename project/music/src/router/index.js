import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '../components/Home.vue'
import Singer from '../components/Singer.vue'
import Rank from '../components/Rank.vue'
import Search from '../components/Search.vue'

let router = new Router({
  mode:'hash',
  routes:[
    {
      path:'/',
      redirect:'home'//重定向主页
    },
    {
      name:'home',
      path:'/home',
      component:Home
    },
    {
      name:'singer',
      path:'/singer',
      component:Singer
    },
    {
      name:'rank',
      path:'/rank',
      component:Rank
    },
    {
      name:'search',
      path:'/search',
      component:Search
    }
  ]
})

export default router
