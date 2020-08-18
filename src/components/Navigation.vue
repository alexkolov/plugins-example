<template>
  <div class="navigation bg-gray-400">
    <div class="flex flex-col h-full">
      <div class="top flex-1">
        <div class="top">
          <img
            class="h-20 ml-8 w-3/5"
            src="../assets/logo.svg"
            alt="Logo"
          >

          <router-link
            to="/"
            class="flex items-center h-16 pl-3"
          >
            <img
              class="mr-3"
              src="../assets/marketing-icon.svg"
              alt="Marketing Icon"
            >
            Marketing
          </router-link>
        </div>

        <router-link
          class="flex items-center h-16 pl-3"
          to="/finance"
        >
          <img
            class="mr-3"
            src="../assets/finance-icon.svg"
            alt="Finance Icon"
          >
          Finance
        </router-link>

        <router-link
          class="flex items-center h-16 pl-3"
          to="/personnel"
        >
          <img
            class="mr-3"
            src="../assets/personnel-icon.svg"
            alt="Personnel Icon"
          >
          Personnel
        </router-link>
      </div>

      <div class="bottom h-16 flex">
        <div>
          All plugins {{ pluginsStatus }}
        </div>
        <ToggleButton
          :value="getArePluginsEnabled"
          @toggle="saveArePluginsEnabled($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ToggleButton from '@/components/ToggleButton.vue';

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters([
      'getArePluginsEnabled'
    ]),
    pluginsStatus() {
      return this.getArePluginsEnabled
        ? 'enabled'
        : 'disabled';
    }
  },
  methods: {
    ...mapActions([
      'saveArePluginsEnabled',
      'loadArePluginsEnabled'
    ])
  },
  created() {
    this.loadArePluginsEnabled();
  },
  components: {
    ToggleButton
  }
};
</script>

<style lang="scss">
a {
  font-weight: bold;
  color: #2c3e50;
  border-left: 8px transparent solid;

  &.router-link-exact-active {
    background-color: white;
    border-left: 8px darkred solid;
  }
}
</style>
