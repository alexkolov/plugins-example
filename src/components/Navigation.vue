<template>
  <div class="navigation bg-gray-400">
    <div class="flex flex-col h-full">
      <div class="top flex-1">
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

      <div
        :class="[isDisabled ? 'red' : 'green']"
        class="bottom h-16 p-6 pb-10 flex justify-between items-center"
      >
        <div class="text-sm">
          All plugins {{ pluginsStatus }}
        </div>
        <VueToggles
          :width="60"
          :height="36"
          @click="toggle($event)"
          :value="!isDisabled"
          :checkedBg="'#68D391'"
          :uncheckedBg="'#f56565'"
          class="with-on-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
      this.isDisabled = event;
      this.setPluginsIsDisabled(event);
    },
    parseTo(id, title) {
      return id === 'tab1'
        ? '/'
        : '/' + title.toLowerCase();
    },
    parseImgSrc(icon) {
      return require(`../assets/${icon}.svg`)
    }
  }
};
</script>

<style scoped lang="scss">
  .bottom {
    &.red {
      background: rgb(245,96,96);
      background: linear-gradient(0deg, rgba(245,96,96,1) 0%, rgba(0,0,0,0) 40%);
    }

    &.green {
      background: rgb(104,211,145);
      background: linear-gradient(0deg, rgba(104,211,145,1) 0%, rgba(0,0,0,0) 36%);
    }
  }
</style>
