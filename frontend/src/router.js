import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Visualize from './views/Visualize'
import Edit from './views/Edit'
import Fill from './fill/Fill'
import Preview from './views/Preview'
import Page404 from './views/Page404'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect:'/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/visualize', component: Visualize },
  { path: '/preview', component: Preview },
  { path: '/edit', component: Edit },
  { path: '/fill', component: Fill },
  { path: '*', component: Page404 }
]

export default new VueRouter({
  routes,
})