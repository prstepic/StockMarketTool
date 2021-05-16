import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import DetailedPage from '../views/DetailedPage.vue'
import DowJonesPage from '../views/DowJonesPage.vue'
import NasdaqPage from '../views/NasdaqPage.vue'
import SandP500Page from '../views/SandP500Page.vue'
import PageNotFound from '../views/PageNotFound.vue'
import LandingPage from '../views/LandingPage.vue'

Vue.use(VueRouter)

/* routes each url to a Vue in the project using the component: property
The '*' handles other url's not handled by the router
the homepage route will be the same for each user at /homepage
the :ticker in /detailed/:ticker represents the route paramater that will be used by
the DetailedPage view to get the stock symbol requested
*/
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
    name: 'Landing',
    component: LandingPage
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
  },
  {
    path: '*',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
