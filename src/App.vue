<template>
  <div id="app">
    <Navigation class="fixed top-0 left-0 h-full w-64" />

    <div class="content ml-64 p-8">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',
  methods: {
    ...mapActions([
      'loadRoutes'
    ])
  },
  created() {
  },
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
</style>
