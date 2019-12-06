import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Recommend from '../pages/Recommend.vue'
import Singer from '../pages/singer/Singer.vue'
import Rank from '../pages/Rank.vue'
import Search from '../pages/Search.vue'
import Detail from 'pages/detail/detail.vue'


let router = new Router({
  mode:'hash',
  routes:[
    {
      path:'/',
      redirect:'recommend'//重定向主页
    },
    {
      name:'recommend',
      path:'/recommend',
      component:Recommend
    },
    {
      name:'singer',
      path:'/singer',
      component:Singer,
      children:[
        {
          path:':mid',
          component:Detail
        }
      ]
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
