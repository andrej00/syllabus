import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import OpisKolegija from '../views/OpisKolegija.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/opiskolegija",
    name: "OpisKolegija",
    component: OpisKolegija,
  }
]

const router = new VueRouter({
  routes
})

export default router
