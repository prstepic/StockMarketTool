import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import DetailedPage from '../views/DetailedPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/homepage',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/detailed/:ticker',
    name: 'Detailed',
    component: DetailedPage
  },
  {
    path: '/',
    redirect: '/homepage'
  },
  {
    path:'/detailed',
    redirect: '/homepage'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
