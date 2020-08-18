import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

export const parseRoutes = () => {
  return store.state.routes
    .map(({ id, title }) => {
      const path = id === 'tab1'
        ? '/'
        : title.toLowerCase();
      const component = () => import(
        `../views/${title}.vue`
      )
      return {
        path,
        name: title,
        component,
        meta: { id, title }
      }
  });
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: parseRoutes()
})

export default router
