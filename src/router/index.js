import Vue from 'vue'
import  VueRouter from 'vue-router'
import Login from '../pages/Login/Login'
import Misite from '../pages/Misite/Misite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopGoods/ShopInfo'
import ShopRatings from '../pages/Shop/ShopGoods/ShopRatings'

Vue.use(VueRouter)
const routes = [
  {path:'/login',component:Login, meta: { requiresAuth: false }},
  {path:'/misite',component:Misite,meta: { requiresAuth: true }},
  {path:'/order',component:Order,meta: { requiresAuth: true }},
  {path:'/profile',component:Profile,meta: { requiresAuth: true }},
  {path:'/search',component:Search,meta: { requiresAuth: true }},
  {path:'/shop',component:Shop,meta: { requiresAuth: false },name:'shop',
    redirect:{name:'goods'},
  children:[
    {path:'/shop/goods',component:ShopGoods,name:'goods'},
    {path:'/shop/info',component:ShopInfo,name:'info'},
    {path:'/shop/ratings',component:ShopRatings},
  ]
  },
  {path:'/',redirect:'/misite'}
]
export const router = new VueRouter({
  routes
})
