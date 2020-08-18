import Vue from 'vue'
import Vuex from 'vuex'
import Service from './api';

Vue.use(Vuex)

const SET_ROUTES = 'SET_ROUTES';
const SET_PLUGINS = 'SET_PLUGINS';
const SET_PLUGIN_IS_ACTIVE = 'SET_PLUGIN_IS_ACTIVE';
const SET_PLUGINS_IS_DISABLED = 'SET_PLUGINS_IS_DISABLED';

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
    [SET_PLUGINS_IS_DISABLED](state, value) {
      state.plugins = state.plugins.map(
        (plugin) => {
          plugin.isDisabled = value;
          return plugin;
        }
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
    async setPluginsIsDisabled({ commit }, value) {
      console.log('setPluginsIsDisabled', value);
      commit(
        SET_PLUGINS_IS_DISABLED,
        value
      );
    }
  }
})
