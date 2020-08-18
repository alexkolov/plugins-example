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
            v-for="item in routes"
            :key="item.id"
            :to="parseTo(item.id, item.title)"
            class="flex items-center h-16 pl-3"
          >
            <img
              class="mr-3"
              :src="parseImgSrc(item.icon)"
              alt="Marketing Icon"
            >
            {{ item.title }}
          </router-link>
        </div>
      </div>

      <div class="bottom h-16 flex">
        <div>
          All plugins {{ pluginsStatus }}
        </div>
        <ToggleButton
          :value="!isDisabled"
          @toggle="toggle($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ToggleButton from '@/components/ToggleButton.vue';

export default {
  name: 'Navigation',
  data() {
    return {
      isDisabled: false
    }
  },
  computed: {
    ...mapState([
      'routes'
    ]),
    pluginsStatus() {
      return this.isDisabled
        ? 'disabled'
        : 'enabled';
    }
  },
  methods: {
    ...mapActions([
      'setPluginsIsDisabled',
    ]),
    toggle(event) {
      this.isDisabled = !event;
      this.setPluginsIsDisabled(!event);
    },
    parseTo(id, title) {
      return id === 'tab1'
        ? '/'
        : title.toLowerCase();
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
