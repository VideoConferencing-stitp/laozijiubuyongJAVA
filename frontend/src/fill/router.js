import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Page404 from '../views/Page404'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '*', component: Page404 }
]

export default new VueRouter({
  routes,
})