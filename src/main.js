import Vue from 'vue'
import App from './App.vue'
import router from './router'
import JsonExcel from "vue-json-excel";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.component("downloadExcel", JsonExcel);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
