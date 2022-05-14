<template>
  <input
    :name="name"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :class="css"
    :aria-label="name"
  />
</template>
<script>
import { computed } from '@vue/reactivity';

export default {
  name: 'UInput',
  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    style: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  setup() {
    const css = computed(() => 'ss');

    return { css };
  },
};
</script>
<style scoped>

</style>