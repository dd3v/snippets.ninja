<template>
  <div class="editor-indent-wrapper">
    Tabs:
    <u-button @click="size--">
      <u-icon name="minus" />
    </u-button>
    <span>{{ size }}</span>
    <u-button @click="size++">
      <u-icon name="plus" />
    </u-button>
  </div>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'EditorIndent',
  props: {
    modelValue: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const size = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return { size };
  },
};
</script>

<style scoped>
</style>