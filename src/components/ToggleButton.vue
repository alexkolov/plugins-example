<template>
  <div>
    <div class="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
      <label class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
        <input
          :checked="value"
          :disabled="disabled"
          :class="{ onIcon: 'with-on-icon'}"
          @change="$emit('toggle', $event.target.checked)"
          type="checkbox"
          name="toggle"
          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: {
    value: Boolean,
    disabled: Boolean,
    onIcon: Boolean
  }
};
</script>

<style scoped lang="postcss">
.toggle-checkbox.with-on-icon {
  background:url(../assets/icon-on.svg) no-repeat auto;
}

.toggle-checkbox:checked {
  right: 0;
  border-color: #68D391;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #68D391;
}
</style>
