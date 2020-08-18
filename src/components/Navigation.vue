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
            v-for="(value, name) in routes"
            :key="name"
            :to="parseTo(name, value)"
            class="flex items-center h-16 pl-3"
          >
            <img
              class="mr-3"
              :src="parseImgSrc(value.icon)"
              alt="Marketing Icon"
            >
            {{ value.title }}
          </router-link>
        </div>
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
import { mapActions, mapState, mapGetters } from 'vuex';
import ToggleButton from '@/components/ToggleButton.vue';

export default {
  name: 'Navigation',
  computed: {
    ...mapState([
      'routes'
    ]),
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
    ]),
    parseTo(name, value) {
      return name === 'tab1'
        ? '/'
        : value.title.toLowerCase();
    },
    parseImgSrc(icon) {
      return require(`../assets/${icon}.svg`)
    }
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
