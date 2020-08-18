<template>
  <div>
    <h1 class="mb-4 text-xl">
      {{ routeTitle }} Plugins
    </h1>

    <div class="plugins flex flex-wrap justify-between">
      <PluginCard
        v-for="item in plugins"
        :key="item.id"
        :plugin="item"
      />
    </div>
  </div>
</template>

<script>
import pageMixin from '@/mixins/page';
import PluginCard from '@/components/PluginCard.vue';

export default {
  name: 'Marketing',
  data() {
    return {
      type: 'marketing'
    };
  },
  mixins: [pageMixin],
  components: {
    PluginCard
  }
};
</script>

<style scoped lang="scss">
</style>
