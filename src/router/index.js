import Vue from 'vue';
import VueRouter from 'vue-router';
import OpisPrograma from '../views/OpisPrograma.vue';
import OpisKolegija from '../views/OpisKolegija.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OpisPrograma',
    component: OpisPrograma
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
