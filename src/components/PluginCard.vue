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
          <VueToggles
            :width="40"
            :height="24"
            :disabled="plugin.isDisabled"
            :value="plugin.isActive"
            @click="setPluginIsActive({
              routeId,
              pluginId: plugin.id,
              value: !$event
            })"
            :checkedBg="'#68D391'"
            :uncheckedBg="'#f56565'"
            :style="getInlineColor(plugin.isDisabled, plugin.isActive)"
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
    ]),
    getInlineColor(isDisabled, isActive) {
      if (isDisabled) {
        const color = isActive ? '#f56565' : '#68D391';
        return { background: `${color} !important` };
      }
      return {};
    }
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
