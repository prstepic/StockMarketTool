import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import DetailedPage from '../views/DetailedPage.vue'
import DowJonesPage from '../views/DowJonesPage.vue'
import NasdaqPage from '../views/NasdaqPage.vue'
import SandP500Page from '../views/SandP500Page.vue'

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
    path: '/detailed',
    redirect: '/homepage'
  },
  {
    path: '/djia',
    name: 'DowJones',
    component: DowJonesPage
  },
  {
    path: '/ixic',
    name: 'NASDAQ',
    component: NasdaqPage
  },
  {
    path: '/inx',
    name: 'SaP500',
    component: SandP500Page
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
