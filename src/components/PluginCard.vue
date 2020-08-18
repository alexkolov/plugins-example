<template>
  <div
    :class="{ 'opacity-50': plugin.isDisabled }"
    class="plugin mt-8 min-w-md border-2 border-gray-700 rounded"
  >
    <div class="px-6 py-4">
      <div class="flex justify-between">
        <div class="font-bold text-xl mb-2">
          {{ plugin.title }}
        </div>

        <div class="flex flex-col items-center">
          <ToggleButton
            :value="plugin.isActive"
            :disabled="plugin.isDisabled"
            @toggle="setPluginIsActive({
              routeId,
              pluginId: plugin.id,
              value: $event
            })"
          />
          <div
            :class="[plugin.isActive ? 'text-green-500' : 'text-red-500']"
            class="mt-1 text-xs"
          >
            {{ labelText }}
          </div>
        </div>
      </div>

      <p class="mt-2 text-gray-700 text-base">
        {{ plugin.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ToggleButton from '@/components/ToggleButton.vue';

export default {
  name: 'PluginCard',
  props: {
    plugin: Object
  },
  computed: {
    labelText() {
      return this.plugin.isActive
        ? 'Allowed'
        : 'Blocked';
    },
    routeId() {
      return this.$route.meta.id
    }
  },
  methods: {
    ...mapActions([
      'setPluginIsActive'
    ])
  },
  components: {
    ToggleButton
  }
};
</script>

<style scoped lang="scss">
  .plugin {
    flex: 0 0 30%;
    min-width: 16rem;
    min-height: 14rem;
  }
</style>
