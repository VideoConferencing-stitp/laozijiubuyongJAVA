import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Visualize from './views/Visualize'
import Edit from './views/Edit'
import Fill from './views/Fill'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect:'/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/visualize', component: Visualize },
  { path: '/fill', component: Fill },
  { path: '/edit', component: Edit },
]

export default new VueRouter({
  routes,
})