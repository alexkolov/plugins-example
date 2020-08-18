import Vue from 'vue'
import Vuex from 'vuex'
import Service from './api';

Vue.use(Vuex)

const SET_ROUTES = 'SET_ROUTES';

export default new Vuex.Store({
  state: {
    routes: []
  },
  mutations: {
    [SET_ROUTES](state, routes) {
      state.routes = routes;
    }
  },
  actions: {
    async loadRoutes({ commit }) {
      const { status, data } = await Service.loadRoutes();
      if (status === 'success') {
        commit(
          SET_ROUTES,
          data
        );
      }
    }
  },
  modules: {
  }
})
