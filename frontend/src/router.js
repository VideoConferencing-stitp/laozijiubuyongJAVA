import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Visualize from './views/Visualize'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/visualize', component: Visualize },
]

export default new VueRouter({
  routes,
})