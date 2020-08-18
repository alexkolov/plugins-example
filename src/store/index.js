import Vue from 'vue'
import Vuex from 'vuex'
import Service from './api';

Vue.use(Vuex)

const SET_ROUTES = 'SET_ROUTES';
const SET_PLUGINS = 'SET_PLUGINS';
const SET_PLUGIN_IS_ACTIVE = 'SET_PLUGIN_IS_ACTIVE';
const DISABLE_ALL_PLUGINS = 'DISABLE_ALL_PLUGINS';

export default new Vuex.Store({
  state: {
    routes: [],
    plugins: []
  },
  getters: {
    plugins(state) {
      return state.plugins;
    }
  },
  mutations: {
    [SET_ROUTES](state, routes) {
      state.routes = routes;
    },
    [SET_PLUGINS](state, plugins) {
      state.plugins = plugins;
    },
    [SET_PLUGIN_IS_ACTIVE](state, { pluginId, value }) {
      state.plugins = state.plugins.map(
        (plugin) => {
          if (plugin.id === pluginId) {
            plugin.isActive = value
          }
          return plugin;
        }
      );
    },
    [DISABLE_ALL_PLUGINS](state) {
      state.plugins = state.plugins.map(
        (plugin) => plugin.status = 'disabled'
      )
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
    },
    async loadPlugins({ commit }, { routeId }) {
      const { status, data } = await Service.loadPlugins(routeId);
      if (status === 'success') {
        commit(
          SET_PLUGINS,
          data
        );
      }
    },
    async setPluginIsActive({ commit }, { routeId, pluginId, value }) {
      console.log('setPluginIsActive', value);
      const { status } = await Service.updatePlugin(
        routeId,
        pluginId,
        { isActive: value }
      );

      if (status === 'success') {
        commit(
          SET_PLUGIN_IS_ACTIVE,
          { pluginId, value }
        );
      }
    },
    async disableAllPlugins({ commit }) {
      commit(
        DISABLE_ALL_PLUGINS
      );
    }
  }
})
