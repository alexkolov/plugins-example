import Vue from 'vue'
import VueToggles from 'vue-toggles';
import App from './App.vue'
import store from './store'
import '@/assets/tailwind.scss';

(async () => {
  Vue.config.productionTip = false

  await store.dispatch('loadRoutes');
  const router = (await import('./router/index')).default;

  Vue.component('VueToggles', VueToggles);

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})();
